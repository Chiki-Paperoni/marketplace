# Environment Variables

## Backend (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/marketplace"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# App
PORT=3000
NODE_ENV="development"
FRONTEND_URL="http://localhost:4200"
```

## Angular (environment.ts)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

## Next.js (.env.local)

```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```
