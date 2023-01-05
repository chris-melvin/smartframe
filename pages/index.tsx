import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  // post request to the generateImage api
  const generateImage = async () => {
    setIsLoading(true);
    const res = await fetch("/api/generateImage", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await res.json();
    setIsLoading(false);
    setImage(data[0].url);
    setCurrentPrompt(prompt);
    setPrompt("");
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

      <main className="flex justify-center items-center min-h-screen bg-zinc-200">
        <section className="m-3">
          {!image ? (
            <h1 className="text-center text-2xl text-slate-800">
              Generate an image with a prompt
            </h1>
          ) : (
            <h1 className="text-center text-2xl text-slate-700">
              {currentPrompt}
            </h1>
          )}
          <div className="max-w-2xl">
            {image ? <img src={image} alt="" /> : null}
          </div>
          <div className="mt-4 w-full">
            <input
              className="border border-gray-400 rounded-md p-3 w-full mr-1 "
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className={`bg-blue-400 w-full text-white p-3 rounded-md mt-2 ${
                prompt === "" || isLoading ? "opacity-50" : ""
              }`}
              onClick={generateImage}
              disabled={prompt === "" || isLoading}
            >
              Generate
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
