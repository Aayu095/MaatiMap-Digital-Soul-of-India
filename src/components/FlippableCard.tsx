import { useState, useEffect } from "react";

type LootPrize = {
  option: string;
  image: string;
  fact: string;
};

type FlippableCardProps = {
  isOpen: boolean;
  prize: LootPrize | undefined;
  onClose: () => void;
};

export default function FlippableCard({ isOpen, prize, onClose }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset isFlipped when card opens
  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false); // Ensure front side shows first
    }
  }, [isOpen]);

  if (!isOpen || !prize) {
    return null;
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-80 h-96 perspective-1000">
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full bg-[#1C1C1C] border-2 border-[#bfa048] rounded-lg shadow-xl flex flex-col items-center justify-center backface-hidden p-6">
            <h3 className="text-2xl font-bold text-[#bfa048] mb-4 animate-pulse">You Won a Badge!</h3>
            <button
              onClick={handleFlip}
              className="px-6 py-3 bg-[#bfa048] text-black font-semibold rounded-full hover:opacity-90 transition shadow-md"
            >
              Flip the Card
            </button>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full bg-[#1C1C1C] border-2 border-[#bfa048] rounded-lg shadow-xl flex flex-col items-center justify-center backface-hidden rotate-y-180 p-6">
            <img
              src={prize.image || "https://via.placeholder.com/100"}
              alt={prize.option}
              className="w-24 h-24 object-cover rounded-full mb-4 border border-[#bfa048]"
            />
            <h3 className="text-xl font-bold text-[#bfa048] mb-2">{prize.option}</h3>
            <p className="text-white text-center text-sm px-4">{prize.fact}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-[#bfa048] text-black font-semibold rounded-full hover:opacity-90 transition shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}