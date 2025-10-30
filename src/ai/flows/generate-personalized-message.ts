'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a personalized birthday message for Afsheen.
 *
 * It takes Afsheen's name, age, and the sender's feelings into account to create a heartfelt message.
 *
 * - generatePersonalizedMessage - A function that generates the personalized birthday message.
 * - GeneratePersonalizedMessageInput - The input type for the generatePersonalizedMessage function.
 * - GeneratePersonalizedMessageOutput - The return type for the generatePersonalizedMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedMessageInputSchema = z.object({
  name: z.string().describe('The name of the birthday recipient.'),
  age: z.number().describe('The age of the birthday recipient.'),
  senderFeelings: z
    .string()
    .describe('The sender\'s feelings toward the birthday recipient.'),
});
export type GeneratePersonalizedMessageInput = z.infer<
  typeof GeneratePersonalizedMessageInputSchema
>;

const GeneratePersonalizedMessageOutputSchema = z.object({
  message: z.string().describe('The personalized birthday message.'),
});
export type GeneratePersonalizedMessageOutput = z.infer<
  typeof GeneratePersonalizedMessageOutputSchema
>;

export async function generatePersonalizedMessage(
  input: GeneratePersonalizedMessageInput
): Promise<GeneratePersonalizedMessageOutput> {
  return generatePersonalizedMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedMessagePrompt',
  input: {schema: GeneratePersonalizedMessageInputSchema},
  output: {schema: GeneratePersonalizedMessageOutputSchema},
  prompt: `You are a birthday message generator. Your task is to create a heartfelt and personalized birthday message for {{name}}, who is turning {{age}} years old.

The message should also reflect the sender\'s feelings, which are described as: {{senderFeelings}}.

Write a birthday message that is appropriate for a 17 year old.
`,
});

const generatePersonalizedMessageFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedMessageFlow',
    inputSchema: GeneratePersonalizedMessageInputSchema,
    outputSchema: GeneratePersonalizedMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
