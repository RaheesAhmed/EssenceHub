import { NextResponse } from 'next/server';
import { Note, notes } from '@/data/notes';

export async function POST(request: Request) {
  const { selectedNotes = [] } = await request.json();

  // In a real application, you would use an AI or recommendation algorithm
  // For now, we'll just return random notes
  const recommendations = getRandomNotes(notes, 5, selectedNotes);

  return NextResponse.json({ recommendations });
}

function getRandomNotes(allNotes: Note[], count: number, excludeNotes: Note[]): Note[] {
  const availableNotes = allNotes.filter(note => 
    !excludeNotes.some(excludeNote => excludeNote && excludeNote.id === note.id)
  );
  const shuffled = availableNotes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}