'use server';

/**
 * @fileOverview AI tool that serves as a cultural assistant, and generate cultural itineraries ('Plan My Tour').
 *
 * - planMyTour - A function that handles the cultural itinerary generation process.
 * - PlanMyTourInput - The input type for the planMyTour function.
 * - PlanMyTourOutput - The return type for the planMyTour function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlanMyTourInputSchema = z.object({
  interests: z
    .string()
    .describe("The user's interests, e.g., specific art forms, regions, historical periods."),
  duration: z.string().describe('The duration of travel, e.g., 3 days, 1 week.'),
});
export type PlanMyTourInput = z.infer<typeof PlanMyTourInputSchema>;

const PlanMyTourOutputSchema = z.object({
  itinerary: z.string().describe('A personalized cultural itinerary.'),
});
export type PlanMyTourOutput = z.infer<typeof PlanMyTourOutputSchema>;

export async function planMyTour(input: PlanMyTourInput): Promise<PlanMyTourOutput> {
  return planMyTourFlow(input);
}

const prompt = ai.definePrompt({
  name: 'planMyTourPrompt',
  input: {schema: PlanMyTourInputSchema},
  output: {schema: PlanMyTourOutputSchema},
  prompt: `You are an expert cultural tour guide specializing in India.

You will use this information to generate a personalized cultural itinerary for the user, including suggested locations, activities, and potential accommodations.  The itinerary should be formatted as markdown.

User Interests: {{{interests}}}
Duration of Travel: {{{duration}}}`,
});

const planMyTourFlow = ai.defineFlow(
  {
    name: 'planMyTourFlow',
    inputSchema: PlanMyTourInputSchema,
    outputSchema: PlanMyTourOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
