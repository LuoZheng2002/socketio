// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'database/mongodb';
import User from 'database/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }


    const user = new User({
      username,
      email,
      password: password,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}