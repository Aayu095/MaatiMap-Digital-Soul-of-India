'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else router.push('/auth/login'); // Redirect if not logged in
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/auth/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1C1C1E] text-[#F3E4BE] font-body">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1C1C1E] text-[#F3E4BE] font-body px-4 relative">
      {/* 🏠 Back to Home Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 p-2 rounded-full bg-[#2A2A2D] hover:bg-[#3A3A3E] text-[#F3E4BE] hover:text-[#B08D57] shadow-lg transition-colors z-50"
        aria-label="Back to homepage"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="bg-[#2A2A2D] p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-headline mb-4">
          Welcome, {user.displayName || user.email}
        </h1>

        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 bg-[#F3E4BE] text-[#1C1C1E] rounded font-semibold hover:bg-[#d8c293] transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
