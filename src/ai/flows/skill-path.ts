'use server';

/**
 * @fileOverview A file that provides AI-powered skill path recommendations.
 *
 * - skillPath - A function to generate skill recommendations.
 * - SkillPathInput - The input type for the skillPath function.
 * - SkillPathOutput - The output type for the skillPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SkillPathInputSchema = z.object({
  currentSkills: z.array(z.string()).describe('The current skills of the user.'),
  learningGoals: z.string().describe('The user\'s learning goals.'),
});
export type SkillPathInput = z.infer<typeof SkillPathInputSchema>;

export const SkillPathOutputSchema = z.object({
  suggestedSkills: z
    .array(
      z.object({
        name: z.string().describe('The name of the suggested skill.'),
        reason: z.string().describe('The reason for suggesting this skill.'),
      })
    )
    .describe('A list of suggested skills for the user to learn.'),
});
export type SkillPathOutput = z.infer<typeof SkillPathOutputSchema>;

export async function skillPath(input: SkillPathInput): Promise<SkillPathOutput> {
  return skillPathFlow(input);
}

const skillPathPrompt = ai.definePrompt({
  name: 'skillPathPrompt',
  input: {schema: SkillPathInputSchema},
  output: {schema: SkillPathOutputSchema},
  prompt: `You are an expert career coach and technical skills advisor.
  Your goal is to recommend a "future stack" of 3-4 technologies for a user to learn based on their current skills and learning goals.

  Current Skills: {{#each currentSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Learning Goals: {{{learningGoals}}}

  Provide a list of suggested skills, and for each skill, give a concise, one-sentence reason why it's a good next step for the user.
  Focus on skills that are in high demand and complement their existing knowledge.
`,
});

const skillPathFlow = ai.defineFlow(
  {
    name: 'skillPathFlow',
    inputSchema: SkillPathInputSchema,
    outputSchema: SkillPathOutputSchema,
  },
  async input => {
    const {output} = await skillPathPrompt(input);
    return output!;
  }
);
