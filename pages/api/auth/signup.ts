// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/mongoose/middleware';
import AccountModel from 'mongoose/account/model';
import { createAccount, findByEmail, findByUsername } from '@/mongoose/account/services';
import { AccountInterface } from '@/mongoose/account/interface';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const existingUsername = await findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: 'User name already in use' });
    }
    const existingEmail = await findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
  const account: AccountInterface = {
    username,
    email,
    password: password,
    nickname: `user_${username}`,
    titleinfo: {
      titlename: 'bronze',
      currentxp: 0
    }
  };
  try {
    await createAccount(account);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
  res.status(201).json({ message: 'User created successfully' });

}