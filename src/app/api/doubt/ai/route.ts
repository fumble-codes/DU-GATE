import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { question, subject } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    }

    const systemPrompt = subject && subject !== "Select subject"
      ? `You are a CUET exam tutor specializing in ${subject}. Answer the student's doubt concisely and clearly. Use examples where helpful. Keep responses focused on exam-relevant content.`
      : "You are a CUET exam tutor. Answer the student's doubt concisely and clearly. Use examples where helpful.";

    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `Groq API error: ${err}` }, { status: 502 });
    }

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ answer });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
