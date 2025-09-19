'use server';

import {
  suggestComponentStyling,
  type SuggestComponentStylingInput,
  type SuggestComponentStylingOutput,
} from '@/ai/flows/suggest-component-styling';
import { z } from 'zod';

const ActionInputSchema = z.object({
  logoDataUri: z.string(),
  brandingDescription: z.string(),
});

export async function getStyleSuggestions(
  input: SuggestComponentStylingInput
): Promise<{ success: true; data: SuggestComponentStylingOutput } | { success: false; error: string }> {
  const parsedInput = ActionInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }

  try {
    const result = await suggestComponentStyling(parsedInput.data);
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to get style suggestions from AI.' };
  }
}
