
'use server';

/**
 * @fileOverview An AI chatbot cultural guide for MaatiMap.
 *
 * - culturalChat - A function that handles the chatbot conversation.
 * - CulturalChatInput - The input type for the culturalChat function.
 * - CulturalChatOutput - The return type for the culturalChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CulturalChatInputSchema = z.object({
  userMessage: z.string().describe('The user message to the chatbot.'),
});

export type CulturalChatInput = z.infer<typeof CulturalChatInputSchema>;

const CulturalChatOutputSchema = z.object({
  chatbotResponse: z.string().describe('The chatbot response to the user.'),
});

export type CulturalChatOutput = z.infer<typeof CulturalChatOutputSchema>;

export async function culturalChat(input: CulturalChatInput): Promise<CulturalChatOutput> {
  return culturalChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'culturalChatPrompt',
  input: {schema: CulturalChatInputSchema},
  output: {schema: CulturalChatOutputSchema},
  prompt: `You are Maati, an AI cultural guide for MaatiMap, a platform dedicated to exploring India's rich culture.
Your role is to answer user questions about Indian culture, including art forms, food, heritage sites, rituals, music, festivals, and traditions.
You should provide informative and engaging responses.
If the user asks about something unrelated to Indian culture or the MaatiMap platform, politely decline to answer and steer the conversation back to relevant topics. For example, if they ask about quantum physics, say something like, "As MaatiMap's cultural guide, I specialize in India's vibrant culture. Perhaps we could explore a fascinating art form or a delicious regional dish instead?"
Do not engage in general conversation or topics outside your expertise as MaatiMap's cultural guide.
Keep your responses concise and helpful.

User's message: {{{userMessage}}}

Provide your response as Maati.`,
});

const culturalChatFlow = ai.defineFlow(
  {
    name: 'culturalChatFlow',
    inputSchema: CulturalChatInputSchema,
    outputSchema: CulturalChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
