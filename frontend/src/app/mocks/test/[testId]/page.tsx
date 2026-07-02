"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { TestInterface } from "@/components/test/test-interface";
import { getTestDefinition } from "@/lib/store";

export default function MockTestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params);
  const testDef = getTestDefinition(testId);

  if (!testDef || testDef.type !== "mock") notFound();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <TestInterface testDef={testDef} />
    </div>
  );
}
