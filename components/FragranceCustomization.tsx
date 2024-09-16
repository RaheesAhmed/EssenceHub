import React from 'react';
import { Note } from '@/data/notes';
import { Plus, Minus } from 'lucide-react';

type FragranceCustomizationProps = {
    selectedNotes: Note[];
    onIntensityChange: (noteId: string, change: number) => void;
};

const FragranceCustomization = ({ selectedNotes, onIntensityChange }: FragranceCustomizationProps) => {
    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Customize Your Fragrance</h2>
            {selectedNotes.map(note => (
                <div key={note.id} className="flex items-center justify-between mb-4">
                    <span>{note.name}</span>
                    <div className="flex items-center">
                        <button
                            onClick={() => onIntensityChange(note.id, -1)}
                            className="p-1 rounded-full bg-primary-100 hover:bg-primary-200"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="mx-2">Intensity</span>
                        <button
                            onClick={() => onIntensityChange(note.id, 1)}
                            className="p-1 rounded-full bg-primary-100 hover:bg-primary-200"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FragranceCustomization;