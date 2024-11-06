import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // Simulate a call to an AI API like GPT-3
    const botResponse = `You said: ${message}`;

    res.status(200).json({ reply: botResponse });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
