import { prisma } from '@/lib/prisma';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      author: { select: { email: true } },
    },
  });
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        📝 Articles du Blog
      </h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-900">Aucun article publié pour le moment</p>
          <p className="text-gray-900 mt-2">Allez dans l&apos;admin pour créer votre premier article !</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">{post.title}</h2>
              <div className="prose max-w-none mb-4">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
              
              {post.imageUrl && (
                <div className="mb-4 relative w-full h-64">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-center text-sm text-gray-900 pt-4 border-t">
                <span>👤 {post.author.email}</span>
                <span>📅 {new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
