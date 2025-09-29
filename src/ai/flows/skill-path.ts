
'use server';

/**
 * @fileOverview A file that provides AI-powered skill path recommendations.
 *
 * - skillPath - A function to generate skill recommendations.
 */

import {ai} from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { SkillPathInputSchema, SkillPathOutputSchema, type SkillPathInput, type SkillPathOutput } from './skill-path.types';


export async function skillPath(input: SkillPathInput): Promise<SkillPathOutput> {
  return skillPathFlow(input);
}

const skillPathPrompt = ai.definePrompt({
  name: 'skillPathPrompt',
  input: {schema: SkillPathInputSchema},
  output: {schema: SkillPathOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
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
