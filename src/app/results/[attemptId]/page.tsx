"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ResultsView } from "@/components/test/results-view";
import { getAttempt } from "@/lib/store";

export default function ResultsPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = use(params);
  const attempt = getAttempt(attemptId);

  if (!attempt) notFound();

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <ResultsView attempt={attempt} />
    </div>
  );
}
