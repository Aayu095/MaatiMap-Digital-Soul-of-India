
import CulturalChatbot from '@/components/ai/cultural-chatbot'; // Updated import
import PlanMyTourForm from '@/components/ai/plan-my-tour-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessagesSquare, Bot } from 'lucide-react'; // Added Bot icon

export default function AiGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <MessagesSquare className="h-10 w-10 mx-auto text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2 font-headline">AI Cultural Guide</h1>
        <p className="text-muted-foreground font-body text-sm">
          Your personal assistant for exploring India's culture. Chat with our AI or plan your tour.
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="text-sm flex items-center justify-center">
            <Bot className="mr-2 h-4 w-4" /> Ask Maati
          </TabsTrigger>
          <TabsTrigger value="plan-tour" className="text-sm">Plan My Tour</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="mt-6">
          <CulturalChatbot />
        </TabsContent>
        <TabsContent value="plan-tour" className="mt-6">
          <PlanMyTourForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
