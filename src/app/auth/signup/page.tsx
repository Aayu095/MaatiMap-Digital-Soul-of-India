"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google Sign-Up successful:", result.user);
      router.push("/profile");
    } catch (err: any) {
      console.error("🚨 Google Sign-Up error:", err.code, err.message);
      if (err.code === "auth/popup-blocked" || err.code === "auth/popup-closed-by-user") {
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirectErr: any) {
          setError(redirectErr.message);
        }
      } else if (err.code === "auth/unauthorized-domain") {
        setError("Unauthorized domain. Please ensure your domain is added in Firebase Auth settings.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C1C1E] text-[#F3E4BE] font-body px-4 relative">
      {/* 🏠 Back to Home Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 p-2 rounded-full bg-[#2A2A2D] hover:bg-[#3A3A3E] text-[#F3E4BE] hover:text-[#B08D57] shadow-lg transition-colors z-50"
        aria-label="Back to homepage"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="bg-[#2A2A2D] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-headline mb-4 text-center">Join MaatiMap</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-[#1C1C1E] text-[#F3E4BE] border border-[#F3E4BE] rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-[#1C1C1E] text-[#F3E4BE] border border-[#F3E4BE] rounded"
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSignup}
          className="w-full py-2 mb-3 bg-[#F3E4BE] text-[#1C1C1E] font-semibold rounded hover:bg-[#d8c293] transition-colors"
        >
          Sign up with Email
        </button>

        <div className="text-center text-sm mb-3 text-[#aaa]">OR</div>

        <button
          onClick={handleGoogleSignup}
          className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="text-sm text-center mt-4 text-[#aaa]">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-[#F3E4BE] underline hover:text-[#d8c293] transition-colors"
          >
            Log in here
          </a>
        </div>
      </div>
    </div>
  );
}
