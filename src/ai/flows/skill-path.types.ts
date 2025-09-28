
import {z} from 'zod';

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
