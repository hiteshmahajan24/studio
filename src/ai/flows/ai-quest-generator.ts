
'use server';

/**
 * @fileOverview This file defines the AI Quest Generator flow, which generates personalized quests for students to encourage platform engagement.
 *
 * @exports generateAIQuest - A function to generate an AI quest for a student.
 * @exports AIQuestInput - The input type for the generateAIQuest function.
 * @exports AIQuestOutput - The output type for the generateAIQuest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIQuestInputSchema = z.object({
  studentProfile: z
    .string()
    .describe('The profile of the student, including their interests and activity on the platform.'),
  platformFeatures: z
    .array(z.string())
    .describe('A list of available features on the platform, such as posting articles, joining groups, finding mentors, or applying for jobs.'),
});
export type AIQuestInput = z.infer<typeof AIQuestInputSchema>;

const AIQuestOutputSchema = z.object({
  questTitle: z.string().describe('A catchy, short title for the AI-generated quest (e.g., "Community Connector").'),
  questDescription: z.string().describe('A detailed, one-to-two sentence description of the quest and the specific actions required to complete it.'),
  knowledgeCoinsReward: z
    .number()
    .describe('The number of Knowledge Coins the student will receive upon completion. This should be between 10 and 100, based on quest difficulty.'),
});
export type AIQuestOutput = z.infer<typeof AIQuestOutputSchema>;

export async function generateAIQuest(input: AIQuestInput): Promise<AIQuestOutput> {
  return aiQuestGeneratorFlow(input);
}

const aiQuestGeneratorPrompt = ai.definePrompt({
  name: 'aiQuestGeneratorPrompt',
  input: {schema: AIQuestInputSchema},
  output: {schema: AIQuestOutputSchema},
  prompt: `You are an AI Quest Generator for the NexusConnect platform. Your goal is to create engaging and rewarding quests for students to encourage them to explore and use different aspects of the platform.

  Generate a quest that is achievable, clearly defined, and provides a valuable learning experience. The quest should have a catchy title, a clear description, and a Knowledge Coins reward between 10 and 100.

  Consider the student's profile and interests to tailor the quest. Also, consider the available platform features and create a quest that encourages usage of one or more of them.

  **Student Profile:**
  {{{studentProfile}}}

  **Available Platform Features:**
  - View articles
  - Find mentors
  - Apply for jobs
  - Join communities
  - Network with peers
  - Track academic progress

  **Example Quest:**
  {
    "questTitle": "Connect with a Mentor",
    "questDescription": "Find a mentor in the 'Tech' industry and send them a connection request to learn more about their career path.",
    "knowledgeCoinsReward": 30
  }

  Now, generate a new, creative quest for the student based on their profile and the available features.
`,
});

const aiQuestGeneratorFlow = ai.defineFlow(
  {
    name: 'aiQuestGeneratorFlow',
    inputSchema: AIQuestInputSchema,
    outputSchema: AIQuestOutputSchema,
  },
  async input => {
    const {output} = await aiQuestGeneratorPrompt(input);
    return output!;
  }
);
