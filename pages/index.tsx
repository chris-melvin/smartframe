import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [image, setImage] = useState();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [error, setError] = useState("");

  // post request to the generateImage api
  const generateImage = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/generateImage", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      setImage(data[0].url);
      setCurrentPrompt(prompt);
      setPrompt("");
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && prompt !== "" && !isLoading) {
      generateImage();
    }
  };

  return (
    <>
      <Head>
        <title>Smart Frame</title>
        <meta
          name="description"
          content="Transform your images with SmartFrame AI: the ultimate tool for enhancing, organizing, and optimizing your visual content."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center  bg-gradient-to-b from-zinc-100 to-zinc-200">
        <section className="m-3 w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.h1
              key={image ? "prompt" : "default"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center text-3xl font-bold text-slate-800 mb-6"
            >
              {!image ? "Generate an image with a prompt" : currentPrompt}
            </motion.h1>
          </AnimatePresence>

          <div className="relative aspect-square w-full mb-6 bg-gray-50 rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                </motion.div>
              )}
              {image && !isLoading && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={image}
                  alt={currentPrompt}
                  className="w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your prompt here..."
                disabled={isLoading}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                prompt === "" || isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
              }`}
              onClick={generateImage}
              disabled={prompt === "" || isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
