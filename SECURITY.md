# Rapport de Sécurité

## Vulnérabilités Connues

### undici < 6.23.0 (CRITIQUE)
- **Package** : undici (dépendance indirecte via Next.js/Vercel)
- **Vulnérabilité** : Unbounded decompression chain in HTTP responses
- **Impact** : Resource exhaustion via Content-Encoding
- **CVE** : https://github.com/advisories/GHSA-g9mf-h72j-4rv9
- **Correction** : En attente de mise à jour Next.js/dependencies
- **Mitigation** : Limiter les ressources serveur, monitoring

## Corrections Implémentées
✓ Middleware protection /admin/*  
✓ Validation Zod sur toutes les entrées
✓ Bcrypt pour passwords (10 rounds)
✓ Headers OWASP sécurisés
✓ Prisma requêtes paramétrées
✓ Prevention IDOR via session
✓ NextAuth JWT sessions courtes (30min)
