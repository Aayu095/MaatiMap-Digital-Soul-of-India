import { Dialog } from '@headlessui/react';

interface PrizeModalProps {
  isOpen: boolean;
  prize: any;
  onClose: () => void;
}

export default function PrizeModal({ isOpen, prize, onClose }: PrizeModalProps) {
  if (!prize) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-center space-y-4">
          <img src={prize.image} alt={prize.option} className="h-40 mx-auto" />
          <Dialog.Title className="text-xl font-bold text-indigo-600">{prize.option}</Dialog.Title>
          <p className="text-gray-700 text-sm">{prize.fact}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Spin Again
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
