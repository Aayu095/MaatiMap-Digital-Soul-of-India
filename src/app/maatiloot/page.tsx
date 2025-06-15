"use client";
import dynamic from "next/dynamic";

const MaatiSpinWheel = dynamic(() => import("@/components/MaatiSpinWheel"), {
  ssr: false,
});

export default function MaatiLootPage() {
  return (
    <main className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-semibold text-[#bfa048] drop-shadow-lg mb-4">
        🎉 Welcome to Maati Loot
      </h1>
      <p className="text-lg text-center max-w-xl text-neutral-300 mb-10">
        Spin the wheel to uncover hidden gems of Indian culture — each spin reveals a unique tradition, story, or art form.
      </p>

      <MaatiSpinWheel />
    </main>
  );
}
