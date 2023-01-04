import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <main>
        <h1 className="text-lg">Smart Frame</h1>
      </main>
    </>
  );
}
