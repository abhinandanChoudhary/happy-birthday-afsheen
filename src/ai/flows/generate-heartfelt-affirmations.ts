'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating heartfelt affirmations tailored for a 17-year-old girl named Afsheen.
 *
 * - generateHeartfeltAffirmations - A function that generates personalized birthday wishes for Afsheen.
 * - GenerateHeartfeltAffirmationsInput - The input type for the generateHeartfeltAffirmations function.
 * - GenerateHeartfeltAffirmationsOutput - The return type for the generateHeartfeltAffirmations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeartfeltAffirmationsInputSchema = z.object({
  name: z.string().describe('The name of the birthday girl.'),
  age: z.number().describe('The age of the birthday girl.'),
  senderCrush: z
    .string()
    .optional()
    .describe('The sender of the card has a crush on the birthday girl.'),
});
export type GenerateHeartfeltAffirmationsInput = z.infer<
  typeof GenerateHeartfeltAffirmationsInputSchema
>;

const GenerateHeartfeltAffirmationsOutputSchema = z.object({
  affirmation: z.string().describe('A heartfelt birthday affirmation.'),
});
export type GenerateHeartfeltAffirmationsOutput = z.infer<
  typeof GenerateHeartfeltAffirmationsOutputSchema
>;

export async function generateHeartfeltAffirmations(
  input: GenerateHeartfeltAffirmationsInput
): Promise<GenerateHeartfeltAffirmationsOutput> {
  return generateHeartfeltAffirmationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeartfeltAffirmationsPrompt',
  input: {schema: GenerateHeartfeltAffirmationsInputSchema},
  output: {schema: GenerateHeartfeltAffirmationsOutputSchema},
  prompt: `You are a thoughtful and caring AI assistant helping to create a birthday card for a special person.

  Compose a heartfelt and kind birthday affirmation tailored for {{name}}, who is turning {{age}}.
  Consider that the sender of this card has a crush on {{name}}.
  The affirmation should be appropriate for a teenage girl and express genuine best wishes and admiration.
  Keep the message concise and uplifting.
  `,
});

const generateHeartfeltAffirmationsFlow = ai.defineFlow(
  {
    name: 'generateHeartfeltAffirmationsFlow',
    inputSchema: GenerateHeartfeltAffirmationsInputSchema,
    outputSchema: GenerateHeartfeltAffirmationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
