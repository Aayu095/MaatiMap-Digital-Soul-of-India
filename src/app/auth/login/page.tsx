"use client";

import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In successful:", result.user);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C1C1E] text-[#F3E4BE] font-body px-4">
      <div className="bg-[#2A2A2D] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-headline mb-4 text-center">Login to MaatiMap</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-[#1C1C1E] text-[#F3E4BE] border border-[#F3E4BE] rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-[#1C1C1E] text-[#F3E4BE] border border-[#F3E4BE] rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-2 mb-3 bg-[#F3E4BE] text-[#1C1C1E] font-semibold rounded hover:bg-[#d8c293] transition-colors"
        >
          Login with Email
        </button>

        <div className="text-center text-sm mb-3 text-[#aaa]">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="text-sm text-center mt-4 text-[#aaa]">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/signup"
            className="text-[#F3E4BE] underline hover:text-[#d8c293] transition-colors"
          >
            Sign up here
          </a>
        </div>
      </div>
    </div>
  );
}
