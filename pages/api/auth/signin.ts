// pages/api/auth/signin.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/mongoose/middleware';
import User from '@/mongoose/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = password == user.password;
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    res.status(200).json({ user.id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}