"use client";

import { useState } from "react";
import Link from "next/link";

interface ThumbnailConcept {
  headline: string;
  emoji: string;
  gradient: string;
  subtext: string;
}

function generateThumbnails(description: string): ThumbnailConcept[] {
  const words = description.trim().split(/\s+/);
  const seed = words.reduce((acc, w) => acc + w.charCodeAt(0), 0);

  const gradients = [
    "from-red-500 via-orange-400 to-yellow-300",
    "from-blue-600 via-purple-500 to-pink-400",
    "from-emerald-400 via-teal-500 to-cyan-400",
    "from-amber-400 via-orange-500 to-red-500",
    "from-violet-500 via-fuchsia-500 to-pink-400",
    "from-sky-400 via-blue-500 to-indigo-500",
  ];

  const emojis = ["🔥", "😱", "🤯", "💀", "🚀", "👀", "⚡", "🎯", "💰", "🏆"];

  const styles = [
    { transform: "uppercase", prefix: "" },
    { transform: "uppercase", prefix: "I TRIED " },
    { transform: "uppercase", prefix: "" },
  ];

  // Extract key phrases for headlines
  const cleanDesc = description.replace(/[.!?,]/g, "").trim();
  const headlines: string[] = [];

  // Style 1: dramatic short version
  const shortWords = cleanDesc.split(/\s+/).slice(0, 5).join(" ");
  headlines.push(shortWords.toUpperCase());

  // Style 2: "I TRIED..." variation
  const tryWords = cleanDesc.split(/\s+/).slice(0, 4).join(" ");
  headlines.push(`I TRIED ${tryWords.toUpperCase()}`);

  // Style 3: question / shock format
  const questionWords = cleanDesc.split(/\s+/).slice(0, 4).join(" ");
  headlines.push(`IS ${questionWords.toUpperCase()} REAL?`);

  return headlines.map((headline, i) => ({
    headline,
    emoji: emojis[(seed + i * 3) % emojis.length],
    gradient: gradients[(seed + i * 2) % gradients.length],
    subtext: ["Concept A", "Concept B", "Concept C"][i],
  }));
}

export default function TryPage() {
  const [description, setDescription] = useState("");
  const [thumbnails, setThumbnails] = useState<ThumbnailConcept[] | null>(null);
  const [generating, setGenerating] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setGenerating(true);
    // Fake a brief delay for realism
    setTimeout(() => {
      setThumbnails(generateThumbnails(description));
      setGenerating(false);
    }, 800);
  }

  function handleReset() {
    setDescription("");
    setThumbnails(null);
  }

  return (
    <>
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
          Thumblift
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:opacity-70">
            Home
          </Link>
          <a
            href="/#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-600">
            Try it out
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Describe your video, get thumbnails
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-neutral-600">
            Tell us what your video is about and we&apos;ll generate three thumbnail concepts
            instantly. Pure CSS mockups — no image generation.
          </p>
        </div>

        {/* Input form */}
        {!thumbnails && (
          <form onSubmit={handleSubmit} className="mt-12 mx-auto max-w-xl">
            <label htmlFor="video-desc" className="block text-sm font-medium text-neutral-700 mb-2">
              Video description
            </label>
            <textarea
              id="video-desc"
              rows={3}
              placeholder="e.g. I survived 24 hours in a haunted house with no phone"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 resize-none"
            />
            <button
              type="submit"
              disabled={generating || !description.trim()}
              className="mt-4 w-full rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
            >
              {generating ? "Generating..." : "Generate thumbnails"}
            </button>
          </form>
        )}

        {/* Loading */}
        {generating && (
          <div className="mt-16 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
            <p className="mt-3 text-sm text-neutral-500">Cooking up your thumbnails...</p>
          </div>
        )}

        {/* Results */}
        {thumbnails && !generating && (
          <div className="mt-12">
            <div className="grid gap-6 sm:grid-cols-3">
              {thumbnails.map((thumb, i) => (
                <div key={i} className="group">
                  <div
                    className={`aspect-video rounded-xl bg-gradient-to-br ${thumb.gradient} flex flex-col items-center justify-center p-4 text-center shadow-lg transition group-hover:scale-[1.02]`}
                  >
                    <span className="text-4xl mb-2">{thumb.emoji}</span>
                    <p className="text-white font-black text-lg leading-tight drop-shadow-md">
                      {thumb.headline}
                    </p>
                  </div>
                  <p className="mt-2 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {thumb.subtext}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium transition hover:border-neutral-900"
              >
                Try another video
              </button>
              <a
                href="/#waitlist"
                className="rounded-full bg-orange-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-700"
              >
                Join the waitlist for real thumbnails
              </a>
            </div>

            <p className="mt-6 text-center text-xs text-neutral-400">
              This is a v0 mock. The full product generates real, high-quality thumbnail images
              powered by AI.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-auto">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
            Thumblift
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </>
  );
}
