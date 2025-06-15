"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { planMyTour, type PlanMyTourOutput } from '@/ai/flows/plan-my-tour'; 
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const FormSchema = z.object({
  interests: z.string().min(10, { message: "Please describe your interests (min 10 chars)." }),
  duration: z.string().min(3, { message: "Please specify the duration (e.g., 3 days, 1 week)." }),
});

export default function PlanMyTourForm() {
  const [itinerary, setItinerary] = useState<PlanMyTourOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interests: "",
      duration: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const result = await planMyTour(data);
      setItinerary(result);
    } catch (e) {
      setError("Failed to generate itinerary. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Plan My Cultural Tour</CardTitle>
        <CardDescription className="font-body text-xs">
          Tell us your interests and travel duration, and our AI will craft a personalized cultural itinerary for you in India.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="interests" className="font-body text-sm">Your Interests</FormLabel>
                  <FormControl>
                    <Textarea
                      id="interests"
                      placeholder="e.g., Ancient temples, Rajasthani folk music, North Indian cuisine, textile arts"
                      className="resize-none font-body text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="duration" className="font-body text-sm">Duration of Travel</FormLabel>
                  <FormControl>
                    <Input id="duration" placeholder="e.g., 7 days, 2 weeks, 3 weekends" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto text-sm">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Itinerary
            </Button>
          </CardFooter>
        </form>
      </Form>

      {error && <p className="p-4 text-destructive font-body text-sm">{error}</p>}

      {itinerary && (
        <CardContent className="mt-6">
          <h3 className="text-lg font-semibold mb-2 font-headline">Your Custom Itinerary:</h3>
           <div className="prose prose-sm max-w-none bg-secondary/30 p-4 rounded-md font-body text-sm">
             <ReactMarkdown>{itinerary.itinerary}</ReactMarkdown>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
