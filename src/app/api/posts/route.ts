import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { createPostSchema } from "@/lib/validators/post.validator";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";
import { put } from "@vercel/blob";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        imageUrl: true,
        createdAt: true,
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erreur GET posts:", error);
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true },
    });
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Permissions insuffisantes" }, { status: 403 });
    }
    const formData = await request.formData();
    let imageUrl: string | null = null;
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      const blob = await put(image.name, image, { access: "public" });
      imageUrl = blob.url;
    }
    const validatedData = createPostSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      published: formData.get("published") === "true",
      imageUrl,
    });
    const post = await prisma.post.create({
      data: { ...validatedData, authorId: user.id },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation echouee", details: error.errors.map((e) => ({ path: e.path.join("."), message: e.message })) },
        { status: 400 }
      );
    }
    console.error("Erreur creation post:", error);
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}
