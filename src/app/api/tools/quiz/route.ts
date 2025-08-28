import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const quizRequestSchema = z.object({
  sourceText: z.string().min(100, "Text must be at least 100 characters long."),
  questionCount: z.number().min(1).max(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = quizRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    // TODO: Replace this mock with a real LLM API call (e.g., Gemini, OpenAI)
    // Pass validation.data.sourceText to the AI model
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    const mockResponse = {
      topic: "Mocked Topic: Kirchhoff's Laws",
      questions: [
        {
          q: "What is Kirchhoff's Current Law (KCL)?",
          choices: ["The sum of voltages around a loop is zero.", "The sum of currents entering a node is equal to the sum of currents leaving it.", "V=IR", "P=VI"],
          answer: "The sum of currents entering a node is equal to the sum of currents leaving it.",
          explanation: "KCL is based on the conservation of charge, stating that charge cannot accumulate at a node."
        },
        // ... more mock questions
      ],
      sourceText: validation.data.sourceText.substring(0, 200) + '...'
    };

    return NextResponse.json(mockResponse);

  } catch (error) {
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}