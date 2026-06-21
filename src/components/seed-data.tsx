"use client";

import { useEffect, useRef } from "react";
import { addMockQuestions, addPyqQuestions, addTestDefinition, addFlashcardDecks, addFlashcards } from "@/lib/store";
import { getTestDefinitions, clearAll } from "@/lib/store";
import { mockQuestions } from "@/data/mock-questions";
import { pyqQuestions } from "@/data/pyq-questions";
import { allTestDefs } from "@/data/test-definitions";
import { flashcardDecks, flashcards } from "@/data/flashcards";

const DATA_VERSION = 6;

export function SeedData() {
  const seeded = useRef(false);

  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;

    const version = parseInt(localStorage.getItem("cuetpioneer_version") || "0", 10);
    if (version >= DATA_VERSION) {
      const existing = getTestDefinitions();
      if (existing.length > 0) return;
    }

    clearAll();
    addMockQuestions(mockQuestions);
    addPyqQuestions(pyqQuestions);
    for (const def of allTestDefs) addTestDefinition(def);
    addFlashcardDecks(flashcardDecks);
    addFlashcards(flashcards);
    localStorage.setItem("cuetpioneer_version", String(DATA_VERSION));

    console.log("CUETPioneer: Data seeded successfully (v" + DATA_VERSION + ")");
  }, []);

  return null;
}
