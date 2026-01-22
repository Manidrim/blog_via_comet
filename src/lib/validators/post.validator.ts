// src/lib/validators/post.validator.ts
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

// ✅ Schéma de validation strict avec sanitization
export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Titre trop court (min 3 caractères)")
    .max(200, "Titre trop long (max 200 caractères)")
    .regex(
      /^[a-zA-Z0-9\s\-_',.!?àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ]+$/,
      "Caractères invalides dans le titre"
    )
    .transform((val) => val.trim()),
  
  content: z
    .string()
    .min(10, "Contenu trop court (min 10 caractères)")
    .max(50000, "Contenu trop long (max 50 000 caractères)")
    .transform((val) => {
      // ✅ Sanitization systématique avec DOMPurify
      return DOMPurify.sanitize(val, {
        ALLOWED_TAGS: [
          "p", "br", "strong", "em", "u", "ul", "ol", "li",
          "h1", "h2", "h3", "h4", "blockquote", "code", "pre",
          "a"
        ],
        ALLOWED_ATTR: ["href", "title"],
        ALLOW_DATA_ATTR: false,
      });
    }),
  
  published: z.boolean().default(false),
  
  imageUrl: z
    .string()
    .url("URL d'image invalide")
    .regex(
      /^https:\/\/.*\.vercel-storage\.com\/.+$/,
      "Seuls les domaines Vercel Storage sont autorisés"
    )
    .optional()
    .nullable(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;