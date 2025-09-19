'use server';

/**
 * @fileOverview Suggests styling options (colors, fonts) based on logo and branding materials.
 *
 * - suggestComponentStyling - A function that suggests styling options.
 * - SuggestComponentStylingInput - The input type for the suggestComponentStyling function.
 * - SuggestComponentStylingOutput - The return type for the suggestComponentStyling function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComponentStylingInputSchema = z.object({
  logoDataUri: z
    .string()
    .describe(
      "A logo image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  brandingDescription: z
    .string()
    .describe('A description of the branding and desired style.'),
});
export type SuggestComponentStylingInput = z.infer<
  typeof SuggestComponentStylingInputSchema
>;

const SuggestComponentStylingOutputSchema = z.object({
  colorSuggestions: z
    .array(z.string())
    .describe('An array of suggested color hex codes.'),
  fontSuggestions: z
    .array(z.string())
    .describe('An array of suggested font names.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the color and font suggestions, explaining why they are suitable for the given logo and branding.'
    ),
});
export type SuggestComponentStylingOutput = z.infer<
  typeof SuggestComponentStylingOutputSchema
>;

export async function suggestComponentStyling(
  input: SuggestComponentStylingInput
): Promise<SuggestComponentStylingOutput> {
  return suggestComponentStylingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComponentStylingPrompt',
  input: {schema: SuggestComponentStylingInputSchema},
  output: {schema: SuggestComponentStylingOutputSchema},
  prompt: `You are a branding expert. Analyze the provided logo and branding description to suggest styling options for a web component.

Logo: {{media url=logoDataUri}}
Branding Description: {{{brandingDescription}}}

Suggest three color hex codes that complement the logo and branding.
Suggest two font names that are suitable for the branding.
Provide reasoning for each suggestion, explaining why it is appropriate.

Format your response as a JSON object with the following keys:
- colorSuggestions: An array of color hex codes.
- fontSuggestions: An array of font names.
- reasoning: A string explaining the reasoning behind the suggestions.
`, // Modified prompt to request specific number of colors and fonts
});

const suggestComponentStylingFlow = ai.defineFlow(
  {
    name: 'suggestComponentStylingFlow',
    inputSchema: SuggestComponentStylingInputSchema,
    outputSchema: SuggestComponentStylingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
