
'use server';
import { z } from 'zod';

// Schema for a single Alumni record, mirroring the UserProfile structure for alumni
export const AlumniRecordSchema = z.object({
  name: z.string().describe('The full name of the alumnus.'),
  email: z.string().email().describe('The email address of the alumnus.'),
  phone: z.string().optional().describe('The phone number of the alumnus.'),
  address: z.string().optional().describe('The physical address of the alumnus.'),
  graduationYear: z.number().describe('The year the alumnus graduated.'),
  major: z.string().describe('The major or degree of the alumnus.'),
  currentCompany: z.string().optional().describe('The current company where the alumnus works.'),
  role: z.string().optional().describe('The current role or job title of the alumnus.'),
});
export type AlumniRecord = z.infer<typeof AlumniRecordSchema>;

// Input schema for the CSV mapping flow
export const MapCsvToAlumniInputSchema = z.object({
  csvData: z.string().describe('The raw text content of the CSV file to be parsed.'),
});
export type MapCsvToAlumniInput = z.infer<typeof MapCsvToAlumniInputSchema>;

// Output schema for the CSV mapping flow
export const MapCsvToAlumniOutputSchema = z.object({
  alumni: z.array(AlumniRecordSchema).describe('An array of structured alumni records parsed from the CSV.'),
});
export type MapCsvToAlumniOutput = z.infer<typeof MapCsvToAlumniOutputSchema>;
