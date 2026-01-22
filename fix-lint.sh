#!/bin/bash
# Correction posts/route.ts - supprimer param request
sed -i 's/export async function GET(_request:/export async function GET(_:/g' src/app/api/posts/route.ts
sed -i 's/export async function GET(request:/export async function GET(_:/g' src/app/api/posts/route.ts

# Correction page.tsx - remplacer apostrophe
sed -i "s/dans l'/dans l\&apos;/g" src/app/page.tsx

# Correction auth-config.ts - enlever les any
sed -i 's/(user as any)/(user as { role?: string })/g' src/lib/auth-config.ts
sed -i 's/(session.user as any)/(session.user as { id?: string; role?: string })/g' src/lib/auth-config.ts
