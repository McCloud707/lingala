"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const isValidEmail = (test_email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(test_email);
  };

  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    "Join the waitlist with your email"
  );
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      setMessage("");

      if (!isValidEmail(email)) {
        throw new Error("Failed to submit email");
      }

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: email }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit email");
      }

      setLoading(false);
      setSuccess(true);
    } catch {
      setLoading(false);
      setEmail("");
      setError(true);
      setMessage("Ensure email is valid and not already on waitlist");
    }
  };

  return (
    <div className="min-h-screen max-w-3xl flex items-center justify-center text-center">
      <div className="container max-w-3xl text-center px-4 py-12">
        <h1 className="text-7xl font-extrabold mb-8">Lingala</h1>
        <h2 className="text-4 sm:text-lg md:text-xl mb-16 font-medium">
          A comprehensive language learning application that learns about you
        </h2>

        <main className="font-medium text-sm sm:text-lg w-full">
          <ol className="grid grid-cols-3 grid-rows-2 gap-12 mb-16">
            <li>Listen</li>
            <li>Read</li>
            <li>Translate</li>
            <li>Flashcards</li>
            <li>Immersive Scenarios</li>
            <li>Personalized Chat-Bots</li>
          </ol>
        </main>

        <div className="flex gap-4 justify-center font-medium items-center">
          {success ? (
            <p className="text-lg">
              You&apos;ve been added to the Waitlist. See you soon
            </p>
          ) : (
            <>
              <Input
                value={email}
                className={
                  "w-6/8 text-center py-4 " +
                  "text-xs md:text-lg " + // responsive text size
                  "placeholder:text-black focus:placeholder-transparent " + // placeholder hidden on focus
                  (error
                    ? " placeholder:text-red-500"
                    : " placeholder:text-[2px] md:placeholder:text-base")
                }
                placeholder={error ? message : message}
                onChange={handleInputChange}
              />
              <Button
                disabled={loading}
                size="lg"
                className="min-w-[100px]"
                onClick={handleEmailSubmit}
              >
                {!loading ? <></> : <Loader2 className="animate-spin" />}
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
