'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      // Rester sur cette page si authentifié
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">🔐 Connexion Admin</h1>
        
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            
            const result = await signIn('credentials', {
              email,
              password,
              redirect: false,
            });

            if (result?.error) {
              alert('Identifiants incorrects');
            } else {
              router.refresh();
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">🛠️ Dashboard Admin</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Déconnexion
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-lg text-black mb-4">Bienvenue, {session.user?.email} !</p>
        <p className="text-black">Utilisez le panneau ci-dessous pour gérer votre blog.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => router.push('/admin/new')}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
        >
          <div className="text-4xl mb-4">✍️</div>
          <h2 className="text-2xl font-bold mb-2">Créer un article</h2>
          <p className="opacity-90">Rédiger et publier un nouveau post</p>
        </div>
        
        <div 
          onClick={() => router.push('/')}
          className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
        >
          <div className="text-4xl mb-4">🌐</div>
          <h2 className="text-2xl font-bold mb-2">Voir le blog</h2>
          <p className="opacity-90">Accéder à la page publique</p>
        </div>
      </div>
    </div>
  );
}
