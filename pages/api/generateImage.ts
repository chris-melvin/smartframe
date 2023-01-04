import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface Image {
  url?: string | undefined;
}

type Data = {
  created: number;
  data: Image[];
};

interface Error {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    try {
      const response = await openai.createImage({
        prompt: prompt,
      });

      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
