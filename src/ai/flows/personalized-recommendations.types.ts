
import {z} from 'zod';

export const PersonalizedRecommendationsInputSchema = z.object({
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

export const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('A list of 3-4 personalized recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;
