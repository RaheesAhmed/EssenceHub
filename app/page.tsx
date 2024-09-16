"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Note } from "@/data/notes";
import Hero from "@/components/Hero";


type NoteWithIntensity = Note & { intensity: number };

const Home = () => {



  return (
    <div className="min-h-screen bg-background text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <Hero />
        </motion.div>
      </main>
    </div>
  )
}

export default Home;

