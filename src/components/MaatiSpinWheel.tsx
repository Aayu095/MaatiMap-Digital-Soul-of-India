"use client";
import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import confetti from "canvas-confetti";
import FlippableCard from "./FlippableCard";
import "./MaatiSpinWheel.css";

type LootPrize = {
  option: string;
  image: string;
  fact: string;
};

export default function MaatiSpinWheel() {
  const [lootPrizes, setLootPrizes] = useState<LootPrize[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/get-loot-prizes");
      const data = await res.json();
      setLootPrizes(data);
    };
    fetchData();
  }, []);

  const handleSpinClick = () => {
    if (!mustSpin) {
      // Reset card state before new spin
      setShowCard(false);
      const newIndex = Math.floor(Math.random() * lootPrizes.length);
      setPrizeIndex(newIndex);
      setMustSpin(true);
    }
  };

  const handleStop = () => {
    setMustSpin(false);
    // Show card after a slight delay for better UX
    setTimeout(() => {
      setShowCard(true);
    }, 300);

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#bfa048", "#ffffff", "#3B3B3B"],
    });

    fetch("/api/spin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "guest-user",
        prize: lootPrizes[prizeIndex]?.option,
      }),
    });
  };

  // Map lootPrizes to show badges on the wheel
  const data = lootPrizes.map((_, index) => ({
    option: `Badge${index + 1}`,
    style: { textColor: "#ffffff", backgroundColor: "#3B3B3B" },
  }));

  return (
    <div className="bg-[#1C1C1C] rounded-2xl p-6 border border-[#bfa048] w-full max-w-md text-center shadow-lg">
      <h2 className="text-2xl font-bold text-[#bfa048] mb-6 tracking-wide">
        🎯 Spin the Maati Loot!
      </h2>

      {/* Container for wheel */}
      <div className="relative w-full max-w-[300px] sm:max-w-[360px] aspect-square mx-auto overflow-visible">
        {/* Custom pointer */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#bfa048]" />
        </div>

        {lootPrizes.length > 0 && (
          <div
            className="flex justify-center"
            style={{
              transform: "scale(0.75)",
              transformOrigin: "center",
            }}
          >
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeIndex}
              data={data}
              backgroundColors={["#3B3B3B", "#2D2D2D", "#1C1C1C", "#bfa048", "#403930",]}
              outerBorderColor="#bfa048"
              radiusLineColor="#2b2b2b"
              textColors={["#ffffff"]}
              fontSize={16}
              perpendicularText={true}
              onStopSpinning={handleStop}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSpinClick}
        className="mt-6 px-6 py-3 bg-[#bfa048] text-black font-semibold rounded-full shadow hover:opacity-90 transition"
        disabled={mustSpin}
      >
        Spin the Wheel
      </button>

      <FlippableCard
        isOpen={showCard}
        prize={lootPrizes[prizeIndex]}
        onClose={() => setShowCard(false)}
      />
    </div>
  );
}