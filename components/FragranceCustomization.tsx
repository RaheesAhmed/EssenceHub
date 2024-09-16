import React from 'react';
import { motion } from 'framer-motion';
import { Note } from '@/data/notes';
import { Plus, Minus } from 'lucide-react';

type NoteWithIntensity = Note & { intensity: number };

type FragranceCustomizationProps = {
    selectedNotes: NoteWithIntensity[];
    onIntensityChange: (noteId: string, change: number) => void;
};

const FragranceCustomization = ({ selectedNotes, onIntensityChange }: FragranceCustomizationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto mt-8 p-6 bg-primary-100 rounded-lg shadow-lg"
        >
            <h2 className="text-3xl font-bold mb-6 text-primary-800">
                Customize Your Fragrance
            </h2>
            {selectedNotes.map(note => (
                <motion.div
                    key={note.id}
                    className="mb-6 p-4 bg-white rounded-lg shadow"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-medium text-primary-700">{note.name}</span>
                        <div className="flex items-center">
                            <motion.button
                                onClick={() => onIntensityChange(note.id, -1)}
                                className="p-2 rounded-full bg-primary-200 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={note.intensity <= 1}
                            >
                                <Minus size={16} className="text-primary-700" />
                            </motion.button>
                            <span className="mx-4 text-lg font-medium text-primary-700">Intensity: {note.intensity || 1}</span>
                            <motion.button
                                onClick={() => onIntensityChange(note.id, 1)}
                                className="p-2 rounded-full bg-primary-200 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={note.intensity >= 3}
                            >
                                <Plus size={16} className="text-primary-700" />
                            </motion.button>
                        </div>
                    </div>
                    <p className="text-sm text-primary-600">{note.description}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default FragranceCustomization;