
'use server';

/**
 * @fileOverview This file defines an AI flow for intelligently parsing CSV data into structured Alumni records.
 *
 * @exports mapCsvToAlumni - A function that takes CSV data and maps it to the Alumni schema.
 */

import { ai } from '@/ai/genkit';
import { MapCsvToAlumniInputSchema, MapCsvToAlumniOutputSchema, type MapCsvToAlumniInput, type MapCsvToAlumniOutput, AlumniRecordSchema } from './map-csv-to-alumni.types';

export async function mapCsvToAlumni(input: MapCsvToAlumniInput): Promise<MapCsvToAlumniOutput> {
  return mapCsvToAlumniFlow(input);
}

const mapCsvPrompt = ai.definePrompt({
  name: 'mapCsvToAlumniPrompt',
  input: { schema: MapCsvToAlumniInputSchema },
  output: { schema: MapCsvToAlumniOutputSchema },
  prompt: `
    You are an expert data mapping tool. Your task is to parse the provided CSV data and map it to a structured JSON format based on the provided Alumni schema.

    The CSV file may have inconsistent header names and data order. You must intelligently determine which column corresponds to which field in the Alumni schema.

    **Alumni Schema to map to:**
    - name: The full name of the alumnus.
    - email: The email address.
    - phone: The phone number.
    - address: The physical address.
    - graduationYear: The year of graduation (must be a number).
    - major: The academic major or degree.
    - currentCompany: The name of the company they currently work for.
    - role: Their current job title.

    **CSV Data:**
    {{{csvData}}}

    **Instructions:**
    1.  Analyze the headers and row data of the CSV to understand the mapping.
        - 'Full Name', 'Student Name', 'name' -> name
        - 'Email Address', 'email' -> email
        - 'Grad Year', 'Year' -> graduationYear
        - 'Degree', 'Major' -> major
        - 'Company', 'Employer' -> currentCompany
        - 'Job Title', 'Position', 'Role' -> role
    2.  For each row in the CSV, create a JSON object that conforms to the Alumni schema.
    3.  If a field is missing in the CSV, omit it from the JSON object.
    4.  Ensure 'graduationYear' is a number. If it's a string, convert it. If conversion is not possible, you may omit the record or the field.
    5.  Return an array of these JSON objects.
  `,
});

const mapCsvToAlumniFlow = ai.defineFlow(
  {
    name: 'mapCsvToAlumniFlow',
    inputSchema: MapCsvToAlumniInputSchema,
    outputSchema: MapCsvToAlumniOutputSchema,
  },
  async (input) => {
    const { output } = await mapCsvPrompt(input);
    return output!;
  }
);
