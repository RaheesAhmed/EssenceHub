import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const { userId, name, notes, description } = await request.json();

  if (!userId || !name || !notes || notes.length === 0) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
   

return NextResponse.json({ response:"working" });
  } catch (error) {
    console.error('Error saving fragrance:', error);
    
    return NextResponse.json({ error: 'Failed to save fragrance' }, { status: 500 });
  }
}