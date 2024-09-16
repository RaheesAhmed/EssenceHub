export type Note = {
  id: string;
  name: string;
  category: string;
  placement: string;
  description: string;
  image?: string;
};

export const notes: Note[] = [
  {
    id: '1',
    name: 'Sea Water',
    category: 'OCEANIC AROMA',
    placement: 'Top',
    description: "A fresh, invigorating aquatic note that evokes the crisp, salty air of the ocean, adding a cooling, breezy marine essence to any fragrance."
  },
  {
    id: '2',
    name: 'Earth Water',
    category: 'OCEANIC AROMA',
    placement: 'Heart',
    description: "A deep, earthy aquatic note with mineral and damp soil nuances, capturing the essence of natural water sources blending with the richness of earth."
  },
  {
    id: '3',
    name: 'Mineral Salt',
    category: 'OCEANIC AROMA',
    placement: 'Heart',
    description: "Crisp and clean, mineral salt provides a sharp, briny note, evoking the purity of oceanic minerals and adding a fresh, grounding element to fragrances."
  },
  // ... Add more notes from the CSV file
];

export const categories = Array.from(new Set(notes.map(note => note.category)));
export const placements = ['Top', 'Heart', 'Base'];