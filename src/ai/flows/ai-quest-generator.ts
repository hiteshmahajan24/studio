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
    .describe('A list of available features on the platform, such as posting articles, joining groups, etc.'),
});
export type AIQuestInput = z.infer<typeof AIQuestInputSchema>;

const AIQuestOutputSchema = z.object({
  questTitle: z.string().describe('The title of the AI-generated quest.'),
  questDescription: z.string().describe('A detailed description of the quest and how to complete it.'),
  knowledgeCoinsReward: z
    .number()
    .describe('The number of Knowledge Coins the student will receive upon completion.'),
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

  Consider the student's profile and interests to tailor the quest to their individual needs and preferences. Also consider the availablePlatformFeatures and create a quest that encourges usage of these features.

  Student Profile: {{{studentProfile}}}
  Available Platform Features: {{#each platformFeatures}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Generate a quest that is achievable, clearly defined, and provides a valuable learning experience.
  The quest should have a title, a detailed description of how to complete it, and a Knowledge Coins reward. The knowledgeCoinsReward should be a number between 10 and 100.

  Quest Example:
  {
    questTitle: "Complete Your Profile",
    questDescription: "Add a bio, skills, and a profile picture to your profile to earn 25 Knowledge Coins.",
    knowledgeCoinsReward: 25
  }

  Now, generate a quest for this student:
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
