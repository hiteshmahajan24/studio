'use server';

/**
 * @fileOverview AI-powered personalized recommendations for students.
 *
 * - getPersonalizedRecommendations - A function that returns personalized recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  type: z.enum(['mentor', 'job', 'article', 'project']).describe('The type of recommendation.'),
  itemId: z.string().describe('The ID of the recommended item.'),
  reason: z.string().describe('Explanation for why this item is recommended to the student.'),
});

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('A list of personalized recommendations.'),
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
  prompt: `You are an AI-powered recommendation engine that provides personalized recommendations for students.

  Based on the student's profile and activity, generate a list of recommendations for mentors, jobs, articles, and projects.
  For each recommendation, provide a clear explanation of why it is being recommended.

  Student Profile: {{{studentProfile}}}
  Student Activity: {{{studentActivity}}}

  Format your response as a JSON object with a "recommendations" array. Each object in the array should have a "type" (mentor, job, article, or project), an "itemId" (the ID of the item), and a "reason" (explanation for the recommendation).

  Example:
  {
    "recommendations": [
      {
        "type": "mentor",
        "itemId": "mentor123",
        "reason": "This mentor has expertise in your area of interest."
      },
      {
        "type": "job",
        "itemId": "job456",
        "reason": "This job matches your skills and experience."
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
