
'use server';

/**
 * @fileOverview AI-powered personalized recommendations for students.
 *
 * - getPersonalizedRecommendations - A function that returns personalized recommendations.
 */

import {ai} from '@/ai/genkit';
import { PersonalizedRecommendationsInputSchema, PersonalizedRecommendationsOutputSchema, type PersonalizedRecommendationsInput, type PersonalizedRecommendationsOutput } from './personalized-recommendations.types';


export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI-powered recommendation engine for the NexusConnect platform. Your goal is to provide highly relevant recommendations to help students with their career development.

  Based on the student's profile and recent platform activity, generate a list of 3-4 recommendations for mentors, jobs, articles, or communities.
  For each recommendation, provide a clear, concise, and compelling one-sentence reason explaining why it is a great fit for the student.

  **Student Profile:**
  {{{studentProfile}}}

  **Student Activity:**
  {{{studentActivity}}}

  **Available Item IDs (use these in your response):**
  - Mentors: mentor-1, mentor-2, mentor-3, mentor-4, mentor-5, mentor-6
  - Jobs: job1, job2, job3
  - Articles: No specific IDs, generate a compelling, realistic article title and use a placeholder ID like 'article-123'.
  - Communities: comm-1, comm-2, comm-3

  **Example Response:**
  {
    "recommendations": [
      {
        "type": "mentor",
        "itemId": "mentor-2",
        "reason": "David Chen's expertise in System Design directly aligns with your interest in cloud architecture."
      },
      {
        "type": "job",
        "itemId": "job1",
        "reason": "This Frontend Developer role is a great fit for your strong React and Next.js skills."
      },
      {
        "type": "community",
        "itemId": "comm-2",
        "reason": "Joining the 'AI Innovators' community will connect you with peers who share your passion for machine learning."
      }
    ]
  }`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
