
import {z} from 'zod';

export const AIQuestInputSchema = z.object({
  studentProfile: z
    .string()
    .describe('The profile of the student, including their interests and activity on the platform.'),
  platformFeatures: z
    .array(z.string())
    .describe('A list of available features on the platform, such as posting articles, joining groups, finding mentors, or applying for jobs.'),
});
export type AIQuestInput = z.infer<typeof AIQuestInputSchema>;

export const AIQuestOutputSchema = z.object({
  questTitle: z.string().describe('A catchy, short title for the AI-generated quest (e.g., "Community Connector").'),
  questDescription: z.string().describe('A detailed, one-to-two sentence description of the quest and the specific actions required to complete it.'),
  knowledgeCoinsReward: z
    .number()
    .describe('The number of Knowledge Coins the student will receive upon completion. This should be between 10 and 100, based on quest difficulty.'),
});
export type AIQuestOutput = z.infer<typeof AIQuestOutputSchema>;
