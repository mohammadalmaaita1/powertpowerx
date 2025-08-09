'use server';
/**
 * @fileOverview An AI agent that provides advice on telecom towers.
 *
 * - getTowerAdvice - A function that returns analysis and recommendations for a tower.
 * - TowerAdvisorInput - The input type for the getTowerAdvice function.
 * - TowerAdvisorOutput - The return type for the getTowerAdvice function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TowerAdvisorInputSchema = z.object({
    name: z.string().describe("The name of the tower."),
    status: z.enum(['normal', 'warning', 'critical']).describe("The current status of the tower."),
    userLoad: z.number().describe("The number of users currently connected to the tower."),
    signalStrength: z.number().describe("The signal strength in dBm."),
    latency: z.number().describe("The network latency in ms."),
    energyConsumption: z.number().describe("The energy consumption in kWh."),
});
export type TowerAdvisorInput = z.infer<typeof TowerAdvisorInputSchema>;

const TowerAdvisorOutputSchema = z.object({
  analysis: z.string().describe("A general analysis of the tower's current condition."),
  recommendations: z.array(z.string()).describe("A list of actionable recommendations to improve or maintain the tower's performance."),
});
export type TowerAdvisorOutput = z.infer<typeof TowerAdvisorOutputSchema>;

export async function getTowerAdvice(input: TowerAdvisorInput): Promise<TowerAdvisorOutput> {
  return towerAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'towerAdvisorPrompt',
  input: { schema: TowerAdvisorInputSchema },
  output: { schema: TowerAdvisorOutputSchema },
  prompt: `You are a telecommunications expert analyzing tower data.
  
  Tower: {{{name}}}
  Status: {{{status}}}
  User Load: {{{userLoad}}}
  Signal Strength: {{{signalStrength}}} dBm
  Latency: {{{latency}}} ms
  Energy Consumption: {{{energyConsumption}}} kWh

  Based on this data:
  1. Provide a general analysis of the tower's condition. Explain what these numbers mean.
  2. Provide a list of 2-3 actionable recommendations to improve performance or address potential issues.
  
  Example Analysis: "{{{name}}} is currently in a normal state but experiencing high user load, which may impact service quality."
  Example Recommendations: "Monitor load throughout the day to identify peak hours." or "Schedule preventive maintenance to check transmitters."
  
  The response should always be in English.`,
});

const towerAdvisorFlow = ai.defineFlow(
  {
    name: 'towerAdvisorFlow',
    inputSchema: TowerAdvisorInputSchema,
    outputSchema: TowerAdvisorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
