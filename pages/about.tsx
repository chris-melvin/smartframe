import Head from "next/head";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About - AI Image Generator</title>
        <meta
          name="description"
          content="About our AI Image Generator project"
        />
      </Head>

      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            About This Project
          </h1>

          <p className="text-lg text-gray-700">
            This project is an AI-powered image generation tool that leverages
            OpenAI's DALL-E API to create unique images from text descriptions.
          </p>

          <p className="text-gray-600">
            Built as an exploration of OpenAI's capabilities, this application
            demonstrates the potential of AI in creative processes. Users can
            input text prompts and receive AI-generated images that match their
            descriptions.
          </p>

          <div className="space-y-2">
            <p className="text-gray-700">Technologies used:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Next.js with TypeScript</li>
              <li>OpenAI API</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>

          <p className="text-gray-600">
            This is a personal project created to learn more about working with
            AI APIs and exploring the possibilities of AI-generated art.
          </p>

          <a
            href="https://openai.com/blog/dall-e/"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about DALL-E
            <span className="ml-1">→</span>
          </a>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
