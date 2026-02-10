# Admin Panel Setup Guide

This guide will help you set up the admin panel for the College Referral Website.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with the following:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

**Important:** Change `NEXTAUTH_SECRET` to a random string in production. You can generate one using:
```bash
openssl rand -base64 32
```

### 3. Initialize Database

```bash
npm run db:migrate
```

This will create the SQLite database and all necessary tables.

### 4. Create Admin User

```bash
npm run db:seed
```

This creates a default admin user:
- **Email:** admin@example.com
- **Password:** admin123

**⚠️ Important:** Change this password immediately after first login!

### 5. Start Development Server

```bash
npm run dev
```

### 6. Access Admin Panel

Navigate to: http://localhost:3000/admin/login

Login with the credentials created in step 4.

## Admin Panel Features

The admin panel allows you to manage:

1. **Colleges** - Add, edit, delete colleges with images and logos
2. **Courses** - Manage course listings by category
3. **Articles** - Create and manage articles with categories
4. **Scholarships** - Manage scholarship listings
5. **News** - Create and publish news articles
6. **Exams** - Manage exam listings
7. **Testimonials** - Add student testimonials
8. **Stats** - Manage statistics displayed on the homepage

## Database Management

### Generate Prisma Client (after schema changes)
```bash
npm run db:generate
```

### Create a new migration
```bash
npm run db:migrate
```

## Security Notes

1. **Change Default Password:** The default admin password is `admin123`. Change it immediately!
2. **NEXTAUTH_SECRET:** Use a strong, random secret in production
3. **Database:** For production, consider using PostgreSQL instead of SQLite
4. **Environment Variables:** Never commit `.env` file to version control

## Production Deployment

1. Set up a production database (PostgreSQL recommended)
2. Update `DATABASE_URL` in `.env`
3. Generate a secure `NEXTAUTH_SECRET`
4. Run migrations: `npm run db:migrate`
5. Build the application: `npm run build`
6. Start the server: `npm start`

## Troubleshooting

### Database Connection Issues
- Ensure `DATABASE_URL` is set correctly in `.env`
- Run `npm run db:generate` to regenerate Prisma Client

### Authentication Issues
- Check that `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain

### Migration Errors
- Delete `prisma/dev.db` and run `npm run db:migrate` again
- Check Prisma schema for syntax errors

## Support

For issues or questions, please check the documentation or create an issue in the repository.





