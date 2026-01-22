'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NewPostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (status === 'loading') {
    return <div className="text-center py-12">Chargement...</div>;
  }

  if (!session) {
    router.push('/admin');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('✅ Article créé avec succès !');
        router.push('/admin');
        router.refresh();
      } else {
        throw new Error('Erreur lors de la création');
      }
    } catch (error) {
      alert('❌ Erreur lors de la création de l\'article');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
        >
          ← Retour
        </button>
        <h1 className="text-4xl font-bold">✍️ Nouvel Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Titre de l&apos;article *</label>
          <input
            type="text"
            name="title"
            required
            className="text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Ex: Mon premier article"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Contenu (Markdown supporté) *</label>
          <textarea
            name="content"
            required
            rows={12}
            className="text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="## Titre\n\nVotre contenu en Markdown...\n\n- Liste 1\n- Liste 2"
          />
          <p className="text-xs text-black mt-1">
            Vous pouvez utiliser Markdown : **gras**, *italique*, ## titres, etc.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image (optionnelle)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-black mb-2">Aperçu :</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="published"
            value="true"
            id="published"
            defaultChecked
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Publier immédiatement
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold text-lg"
          >
            {isSubmitting ? 'Création...' : '🚀 Publier l\'article'}
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
