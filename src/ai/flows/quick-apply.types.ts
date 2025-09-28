
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
export const QuickApplyInputSchema = z.object({
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
export const QuickApplyOutputSchema = z.object({
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
