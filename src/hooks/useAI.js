import { useState } from 'react';

export function useAI() {
  const [loading, setLoading] = useState(false);

  const generateResponse = async (problem, language, level, isFinal = false) => {
    if (!problem.trim()) return null;
    setLoading(true);

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) throw new Error("Missing Gemini API key");

      const isSpecificRequest =
        problem.toLowerCase().includes('give me code') ||
        problem.toLowerCase().includes('write code') ||
        problem.toLowerCase().includes('implement') ||
        problem.toLowerCase().includes('solution for') ||
        problem.toLowerCase().includes('how to solve');

      const prompt = isFinal || isSpecificRequest
        ? `You are an AI coding mentor. Provide a complete solution in ${language} for: "${problem}"`
        : `You are an AI coding mentor. Provide hint ${level} for: "${problem}"`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 403) {
          return "API key invalid or quota exceeded. Please check your Gemini API key.";
        }
        return `API Error: ${res.status} - ${errorData.error?.message || 'Unknown error'}`;
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (!text) {
        return "No response generated. Please try again.";
      }
      return text;
      
    } catch (error) {
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  return { generateResponse, loading };
}