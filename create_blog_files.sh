#!/bin/bash

echo "Creating blog source files..."

# Create directories
mkdir -p src/lib
mkdir -p src/app/admin/new
mkdir -p src/app/api/auth/[...nextauth]
mkdir -p src/app/api/posts

echo "Creating Prisma client..."
cat > src/lib/prisma.ts << 'EOF'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
EOF

echo "All files created successfully!"
