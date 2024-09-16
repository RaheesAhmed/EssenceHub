import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { notes } = await request.json();

  if (!notes || notes.length === 0) {
    return NextResponse.json({ error: 'No notes provided' }, { status: 400 });
  }

  const prompt = `Create a brief, enticing description for a custom perfume with the following notes:
${notes.map((note: { name: any; category: any; placement: any; }) => `- ${note.name} (${note.category}, ${note.placement})`).join('\n')}

Description:`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const description = completion.choices[0].message.content?.trim();

    return NextResponse.json({ description });
  } catch (error) {
    console.error('Error generating description:', error);
    return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
  }
}