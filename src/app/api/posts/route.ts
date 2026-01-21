import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { put } from '@vercel/blob';

// GET - Récupérer tous les posts
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { email: true } } },
  });
  return NextResponse.json(posts);
}

// POST - Créer un nouveau post
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    //52
    // const content = formData.get('content') as string;
    const published = formData.get('published') === 'true';
    const image = formData.get('image') as File | null;

    let imageUrl: string | null = null;

    // Upload image to Vercel Blob if provided
    if (image && image.size > 0) {
      const blob = await put(image.name, image, {
        access: 'public',
      });
      imageUrl = blob.url;
    }

    // Get or create user
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        title,
//        content,
        published,
        imageUrl,
        authorId: user.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
