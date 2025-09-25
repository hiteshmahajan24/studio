'use server';

/**
 * @fileOverview This file defines the AI Quick Apply flow, which generates a personalized cover letter
 * and suggests relevant documents for a job application.
 *
 * @exports quickApply - A function to generate a cover letter and suggest documents.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define schemas for user profile nested structures
const ResumeSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string().describe('The text content of the resume.'),
});

const CertificateSchema = z.object({
  id: z.string(),
  name: z.string(),
  tech: z.array(z.string()).describe('Technologies or skills related to the certificate.'),
});

// Input schema for the Quick Apply flow
const QuickApplyInputSchema = z.object({
  studentProfile: z.object({
    name: z.string(),
    skills: z.array(z.string()),
    experience: z.string(),
    resumes: z.array(ResumeSchema),
    certificates: z.array(CertificateSchema),
  }),
  jobDetails: z.object({
    title: z.string(),
    company: z.string(),
    description: z.string(),
  }),
});
export type QuickApplyInput = z.infer<typeof QuickApplyInputSchema>;

// Output schema for the Quick Apply flow
const QuickApplyOutputSchema = z.object({
  coverLetter: z.string().describe('The AI-generated cover letter, written in the first person.'),
  suggestedDocuments: z
    .array(
      z.object({
        id: z.string().describe('The ID of the suggested document.'),
        name: z.string().describe('The name of the suggested document.'),
        reason: z.string().describe('A brief reason why this document was suggested.'),
      })
    )
    .describe('A list of suggested documents (resumes, certificates) to include with the application.'),
});
export type QuickApplyOutput = z.infer<typeof QuickApplyOutputSchema>;

export async function quickApply(input: QuickApplyInput): Promise<QuickApplyOutput> {
  return quickApplyFlow(input);
}

const quickApplyPrompt = ai.definePrompt({
  name: 'quickApplyPrompt',
  input: { schema: QuickApplyInputSchema },
  output: { schema: QuickApplyOutputSchema },
  prompt: `
    You are an expert career coach acting on behalf of a student named {{{studentProfile.name}}}.
    Your task is to generate a compelling, formal cover letter for a job application and suggest the most relevant documents to attach.

    The response should be in the first person, as if written by the student.

    **Student Profile:**
    - Name: {{{studentProfile.name}}}
    - Skills: {{#each studentProfile.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    - Experience: {{{studentProfile.experience}}}

    **Available Documents:**
    - Resumes:
      {{#each studentProfile.resumes}}
      - ID: {{{id}}}, Name: {{{name}}}
      {{/each}}
    - Certificates:
      {{#each studentProfile.certificates}}
      - ID: {{{id}}}, Name: {{{name}}}, Tech: {{#each tech}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
      {{/each}}

    **Job Details:**
    - Title: {{{jobDetails.title}}}
    - Company: {{{jobDetails.company}}}
    - Description: {{{jobDetails.description}}}

    **Instructions:**

    1.  **Generate Cover Letter:**
        - Write a formal, enthusiastic, and professional cover letter from the perspective of {{{studentProfile.name}}}.
        - The letter should be addressed to the "Hiring Manager" at {{{jobDetails.company}}}.
        - It must express genuine interest in the {{{jobDetails.title}}} position.
        - Highlight how the student's skills ({{#each studentProfile.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}) and experience ({{{studentProfile.experience}}}) make them a perfect fit for the role, referencing specific requirements from the job description.
        - Maintain a confident and professional tone.
        - Conclude by expressing eagerness for an interview and mentioning that a resume and relevant certifications are attached.
        - The cover letter should be well-structured and at least 4 paragraphs long.

    2.  **Suggest Documents:**
        - Based on the job description, select the most relevant resume and up to two relevant certificates from the student's available documents.
        - For each suggested document, provide a concise one-sentence reason for its selection. For example, "This resume best highlights your web development experience." or "This certificate is relevant because the job requires GCP knowledge."
  `,
});

const quickApplyFlow = ai.defineFlow(
  {
    name: 'quickApplyFlow',
    inputSchema: QuickApplyInputSchema,
    outputSchema: QuickApplyOutputSchema,
  },
  async (input) => {
    const { output } = await quickApplyPrompt(input);
    return output!;
  }
);
