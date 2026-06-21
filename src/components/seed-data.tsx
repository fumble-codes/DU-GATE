"use client";

import { useEffect, useRef } from "react";
import { addMockQuestions, addPyqQuestions, addTestDefinition } from "@/lib/store";
import { getTestDefinitions } from "@/lib/store";
import { mockQuestions } from "@/data/mock-questions";
import { pyqQuestions } from "@/data/pyq-questions";
import { allTestDefs } from "@/data/test-definitions";

export function SeedData() {
  const seeded = useRef(false);

  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;

    const existing = getTestDefinitions();
    if (existing.length > 0) return;

    addMockQuestions(mockQuestions);
    addPyqQuestions(pyqQuestions);
    for (const def of allTestDefs) addTestDefinition(def);

    console.log("CUETPioneer: Data seeded successfully");
  }, []);

  return null;
}
