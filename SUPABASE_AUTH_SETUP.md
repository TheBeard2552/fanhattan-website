# Supabase Auth Setup Guide

This guide will help you set up user authentication using Supabase Auth with magic link/OTP email login.

## What's Implemented

✅ **Passwordless authentication** (magic link / OTP via email)
✅ **User profiles** stored in Supabase `profiles` table
✅ **Session management** via cookies (works across Server/Client Components)
✅ **Protected routes** (`/account` requires authentication)
✅ **Auth pages**: `/signup`, `/login`, `/account`
✅ **Newsletter signup** (existing, unchanged) via `/api/subscribe`

## Setup Steps

### 1. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
# Public keys (used for client-side Supabase Auth)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key_here

# Service role key (server-side only, for admin operations like /api/subscribe)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find these:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Run Database Migrations

Run the SQL migrations in your Supabase SQL Editor:

#### a. Email signups table (if not already done)
```bash
# In Supabase Dashboard → SQL Editor, run:
cat supabase-setup.sql
```

#### b. User profiles table
```bash
# In Supabase Dashboard → SQL Editor, run:
cat supabase-profiles.sql
```

This creates:
- `profiles` table with RLS policies
- Auto-creation trigger (new auth users get a profile row automatically)
- Proper indexes and permissions

### 3. Configure Supabase Auth Settings

1. Go to Authentication → URL Configuration in Supabase Dashboard
2. Add your Site URL: `http://localhost:3000` (dev) and your production URL
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`

4. Go to Authentication → Providers
5. Enable **Email** provider
6. Choose **Magic Link** or **OTP** (or both)
7. Customize the email template if desired

### 4. Test the Flow

```bash
npm run dev
```

1. Visit `http://localhost:3000/signup`
2. Enter your email
3. Check your inbox for the magic link/OTP
4. Click the link → redirects to `/account`
5. You're logged in! The nav shows "Account" button

## User Flow

```mermaid
graph LR
    A[User visits /signup] --> B[Enters email]
    B --> C[Supabase sends magic link]
    C --> D[User clicks link in email]
    D --> E[/auth/callback validates]
    E --> F[Session cookie set]
    F --> G[Redirect to /account]
```

## Architecture

### Files Created

**Supabase Client Utilities:**
- `src/lib/supabase/client.ts` - Browser client (Client Components)
- `src/lib/supabase/server.ts` - Server client (Server Components, Route Handlers)
- `src/lib/supabase/proxy.ts` - Session refresh logic

**Middleware:**
- `middleware.ts` - Refreshes auth sessions + protects `/studio` routes

**Auth Pages:**
- `app/signup/page.tsx` - Signup with email
- `app/login/page.tsx` - Login with email (same UX as signup)
- `app/account/page.tsx` - Protected user account page
- `app/auth/callback/route.ts` - Handles magic link verification
- `app/auth/auth-code-error/page.tsx` - Error page for invalid links

**Database:**
- `supabase-profiles.sql` - Profiles table with RLS

### Session Management

- Sessions stored in **httpOnly cookies** (secure, can't be read by JS)
- Middleware automatically refreshes expired sessions on every request
- Works seamlessly across:
  - Server Components (can read user state)
  - Client Components (can read user state)
  - API Routes (can read user state)

### Security

- **Magic links expire** after use or timeout
- **RLS policies** ensure users can only access their own profile
- **Service role key** kept server-side only for admin operations
- **Middleware validates JWT** on every request using `getClaims()`

## Usage in Components

### Server Component (read user)

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function MyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return <div>Hello {user.email}</div>;
}
```

### Client Component (read user)

```typescript
'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [user, setUser] = useState(null);
  const supabase = createClient();
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);
  
  return <div>{user?.email}</div>;
}
```

### Sign Out (Server Action)

```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
```

## Adding More Auth Methods Later

Supabase supports multiple auth methods. To add more:

### Email + Password
Enable in Supabase Dashboard → Authentication → Providers → Email → Enable password

Then use `signUp()` and `signInWithPassword()`:
```typescript
await supabase.auth.signUp({ email, password });
await supabase.auth.signInWithPassword({ email, password });
```

### OAuth (Google, Apple, etc.)
1. Enable provider in Supabase Dashboard
2. Configure OAuth credentials
3. Use `signInWithOAuth()`:
```typescript
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

## Newsletter vs User Accounts

You now have **two separate signup flows**:

| Feature | Newsletter Signup | User Account Signup |
|---------|------------------|---------------------|
| **Endpoint** | `/api/subscribe` | Supabase Auth |
| **Table** | `email_signups` | `auth.users` + `profiles` |
| **Purpose** | Marketing emails | App access, personalization |
| **Auth** | None | Magic link/OTP |
| **UI** | `EmailForm` component | `/signup` page |

**Optional:** You can link them by adding a `user_id` column to `email_signups` and auto-subscribe authenticated users.

## Troubleshooting

### "Configuration must contain projectId"
- Missing Sanity env vars (unrelated to auth)
- Add `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local`

### Magic link doesn't work
- Check Supabase Dashboard → Authentication → URL Configuration
- Ensure redirect URLs match exactly (including protocol)
- Check spam folder

### Session not persisting
- Verify middleware is running (check `middleware.ts`)
- Check browser cookies - should see `sb-*` cookies
- Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are set

### Can't access profiles table
- Run `supabase-profiles.sql` in Supabase SQL Editor
- Check RLS policies are created
- Verify trigger is active

## Next Steps

- [ ] Customize email templates in Supabase Dashboard
- [ ] Add OAuth providers (Google, Apple) if desired
- [ ] Build user profile editing page
- [ ] Add user-specific features (collections, favorites, etc.)
- [ ] Connect user accounts to shop purchases
- [ ] Add streak tracking and leaderboards

## Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
