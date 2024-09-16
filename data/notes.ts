import fragranceData from './Fragrance_Data.json';

export type Note = {
  id: string;
  name: string;
  category: string;
  placement: string;
  description: string;
  famousFragrances?: string;
  image?: string;
  intensity?: number;
};

export const notes: Note[] = fragranceData
  .map((item, index) => ({
    id: (index + 1).toString(),
    name: item.Note || '',
    category: item.Category || '',
    placement: item.Placement || '',
    description: item.Description || '',
    famousFragrances: item["Famous Fragrances with Price"] || undefined,
    image: item["Image 1"] || undefined,
  }))
  .filter(note => note.name && note.category && note.placement);

export const categories = Array.from(new Set(notes.map(note => note.category)));
export const placements = Array.from(new Set(notes.map(note => note.placement)));