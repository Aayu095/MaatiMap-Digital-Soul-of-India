
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { culturalChat, type CulturalChatOutput } from '@/ai/flows/cultural-chat-flow';
import { Loader2, Send, User, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

const FormSchema = z.object({
  userMessage: z.string().min(1, { message: "Please enter a message." }),
});

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const chatBackgroundUrl = 'https://i.postimg.cc/8kXHWVs6/Chat-GPT-Image-Jun-5-2025-10-52-10-AM.png'; // data-ai-hint="Indian motifs pattern dark gold"

export default function CulturalChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userMessage: "",
    },
  });

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setError(null);

    const userMessage: Message = { id: Date.now().toString() + '-user', sender: 'user', text: data.userMessage };
    setMessages(prev => [...prev, userMessage]);
    form.reset();

    try {
      const result: CulturalChatOutput = await culturalChat({ userMessage: data.userMessage });
      const botMessage: Message = { id: Date.now().toString() + '-bot', sender: 'bot', text: result.chatbotResponse };
      setMessages(prev => [...prev, botMessage]);
    } catch (e) {
      setError("Sorry, I encountered an issue. Please try again.");
      console.error(e);
      const errorMessage: Message = { id: Date.now().toString() + '-error', sender: 'bot', text: "Sorry, I couldn't process that. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg flex flex-col h-[600px]">
      <CardHeader>
        <CardTitle className="font-headline flex items-center text-xl">
          <Bot className="mr-2 h-6 w-6 text-primary" /> Ask Maati - Your Cultural Guide
        </CardTitle>
        <CardDescription className="font-body text-xs">
          Chat with Maati about Indian culture, art, food, heritage, and more!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea 
          className="h-full p-4" 
          ref={scrollAreaRef}
          style={{
            backgroundImage: `url('${chatBackgroundUrl}')`,
            backgroundSize: 'cover', // Or 'contain' or 'auto' depending on desired effect
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat', // Or 'repeat' if it's a tileable pattern
          }}
          data-ai-hint="Indian motifs pattern dark gold"
        >
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg shadow ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card border border-border rounded-bl-none'
                }`}>
                  <div className="prose prose-sm max-w-none text-sm font-body">
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-0" {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg shadow bg-card border border-border rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            {error && (
                 <div className="flex justify-start">
                    <div className="max-w-[70%] p-3 rounded-lg shadow bg-destructive text-destructive-foreground rounded-bl-none">
                        <p className="text-sm font-body">{error}</p>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full space-x-2">
            <FormField
              control={form.control}
              name="userMessage"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="Ask about Indian culture..." {...field} autoComplete="off" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="icon">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
