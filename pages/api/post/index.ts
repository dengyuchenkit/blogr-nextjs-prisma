import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  if (session) {
    console.log('Authenticated user:', session.user);
  } else {
    console.log('User is not authenticated');
  }
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email} },
    },
  });
  res.json(result);
}