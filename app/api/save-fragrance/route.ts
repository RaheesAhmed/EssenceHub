import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { userId, name, notes, description } = await request.json();

  if (!userId || !name || !notes || notes.length === 0) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const fragrance = await prisma.fragrance.create({
      data: {
        userId,
        name,
        description,
        notes: {
          create: notes.map((note: any) => ({
            noteId: note.id,
            intensity: note.intensity,
          })),
        },
      },
      include: {
        notes: true,
      },
    });

    return NextResponse.json({ fragrance });
  } catch (error) {
    console.error('Error saving fragrance:', error);
    return NextResponse.json({ error: 'Failed to save fragrance' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}