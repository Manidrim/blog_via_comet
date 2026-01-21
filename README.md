# 🚀 Blog Via Comet

> Un blog dynamique moderne avec interface d'administration, créé avec Next.js, Prisma, et déployé sur Vercel.

## 📋 Description

Ce projet est un blog complet avec :
- ✍️ **Interface admin** pour créer/modifier des articles
- 🖼️ **Upload de photos** via Vercel Blob Storage
- 🔐 **Authentification sécurisée** avec NextAuth.js
- 📱 **Design responsive** avec Tailwind CSS
- 🗄️ **Base de données PostgreSQL** via Prisma
- ⚡ **Déploiement facile** sur Vercel

## 🛠️ Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Base de données**: PostgreSQL
- **ORM**: Prisma
- **Authentification**: NextAuth.js
- **Upload fichiers**: Vercel Blob Storage
- **Styling**: Tailwind CSS
- **Déploiement**: Vercel

## 📦 Structure du Projet

```
blog_via_comet/
├── prisma/
│   └── schema.prisma       # Modèles de données (User, Post)
├── src/
│   ├── app/
│   │   ├── page.tsx        # Page d'accueil publique
│   │   ├── admin/
│   │   │   ├── page.tsx    # Dashboard admin
│   │   │   └── new/
│   │   │       └── page.tsx # Créer un nouvel article
│   │   ├── api/
│   │   │   ├── auth/       # Routes d'authentification
│   │   │   └── posts/      # API CRUD pour les posts
│   │   └── layout.tsx      # Layout principal
│   └── lib/
│       └── prisma.ts       # Instance Prisma Client
├── .env.example            # Template des variables d'environnement
├── package.json
└── tsconfig.json
```

## 🚀 Installation

### Prérequis

- Node.js 18+
- PostgreSQL (ou utiliser un service comme Neon/Supabase)
- Un compte Vercel (pour le déploiement et le Blob Storage)

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/Manidrim/blog_via_comet.git
cd blog_via_comet
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Modifier `.env` avec vos valeurs :
- `DATABASE_URL`: Votre URL PostgreSQL
- `NEXTAUTH_SECRET`: Générer avec `openssl rand -base64 32`
- `ADMIN_EMAIL` et `ADMIN_PASSWORD`: Vos identifiants admin
- `BLOB_READ_WRITE_TOKEN`: Token Vercel Blob (voir ci-dessous)

4. **Créer la base de données**
```bash
npx prisma db push
npx prisma generate
```

5. **Lancer en développement**
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🔑 Configuration Vercel Blob Storage

1. Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Créer un nouveau Storage → Blob
3. Copier le token `BLOB_READ_WRITE_TOKEN`
4. L'ajouter dans votre `.env`

## 📝 Utilisation

### Accéder à l'admin

1. Aller sur `/admin`
2. Se connecter avec vos identifiants (ADMIN_EMAIL et ADMIN_PASSWORD)
3. Créer un nouvel article
4. Ajouter du texte en Markdown et/ou une image
5. Publier !

### Page publique

Tous les articles publiés apparaissent automatiquement sur la page d'accueil.

## 🌐 Déploiement sur Vercel

1. **Connecter le repository à Vercel**
   - Aller sur [Vercel](https://vercel.com)
   - Importer le projet GitHub

2. **Configurer les variables d'environnement**
   - Dans Vercel → Settings → Environment Variables
   - Ajouter toutes les variables de `.env.example`

3. **Déployer**
   - Vercel déploie automatiquement à chaque push sur `main`

## 🔧 Développement

### Commandes utiles

```bash
npm run dev          # Lancer en développement
npm run build        # Build de production
npm run start        # Lancer la build de production
npm run lint         # Linter le code
npx prisma studio    # Interface visuelle pour la DB
```

### Modifier le schéma de données

1. Éditer `prisma/schema.prisma`
2. Appliquer les changements :
```bash
npx prisma db push
npx prisma generate
```

## 📸 Features à venir

- [ ] Catégories et tags
- [ ] Recherche d'articles
- [ ] Commentaires
- [ ] RSS Feed
- [ ] Mode sombre
- [ ] Preview avant publication

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE)

## 💬 Contact

Créé avec ❤️ par Manidrim

---

**Note**: Ce projet a été créé comme démonstration avec Comet / Perplexity.
