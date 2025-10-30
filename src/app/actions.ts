'use server';

import { generateHeartfeltAffirmations } from '@/ai/flows/generate-heartfelt-affirmations';
import { generatePersonalizedMessage } from '@/ai/flows/generate-personalized-message';

export async function getPersonalizedMessage() {
  const result = await generatePersonalizedMessage({
    name: 'Afsheen',
    age: 17,
    senderFeelings:
      'I have a crush on her and I want to express my admiration and best wishes in a heartfelt, but not overly intense way.',
  });
  return result?.message;
}

export async function getHeartfeltAffirmations() {
  const affirmationsPromises = Array(3)
    .fill(0)
    .map(() =>
      generateHeartfeltAffirmations({
        name: 'Afsheen',
        age: 17,
        senderCrush: 'The sender of this card has a crush on her.',
      })
    );
  const results = await Promise.all(affirmationsPromises);
  const newAffirmations = results
    .map(r => r?.affirmation)
    .filter(Boolean) as string[];
  return newAffirmations;
}
