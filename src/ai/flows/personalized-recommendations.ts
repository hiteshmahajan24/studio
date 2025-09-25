
'use server';

/**
 * @fileOverview AI-powered personalized recommendations for students.
 *
 * - getPersonalizedRecommendations - A function that returns personalized recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const PersonalizedRecommendationsInputSchema = z.object({
  studentProfile: z
    .string()
    .describe("The student's profile information including skills, interests, and academic background."),
  studentActivity: z
    .string()
    .describe("The student's recent activity on the platform, such as posts viewed, jobs applied for, and mentors contacted."),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const RecommendationSchema = z.object({
  type: z.enum(['mentor', 'job', 'article', 'community']).describe('The type of recommendation.'),
  itemId: z.string().describe('The ID of the recommended item.'),
  reason: z.string().describe('A concise, one-sentence explanation for why this item is recommended to the student.'),
});

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('A list of 3-4 personalized recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

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
