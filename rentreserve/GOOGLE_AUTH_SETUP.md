# Google OAuth Setup Instructions

This guide will help you set up Google OAuth authentication for your RentReserve application.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Give your project a name (e.g., "RentReserve Auth")
4. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google+ API" and click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Give it a name (e.g., "RentReserve Web Client")
5. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-domain.vercel.app/api/auth/callback/google`
6. Click "Create"

## Step 4: Configure Environment Variables

1. Copy your Client ID and Client Secret from the Google Cloud Console
2. Create a `.env.local` file in your project root:

```bash
# NextAuth.js Configuration
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

### Important Notes:

- **NEXTAUTH_SECRET**: Generate a random secret key (you can use: `openssl rand -base64 32`)
- **NEXTAUTH_URL**: Use `http://localhost:3000` for development, your production URL for deployment
- **GOOGLE_CLIENT_ID**: From Google Cloud Console OAuth credentials
- **GOOGLE_CLIENT_SECRET**: From Google Cloud Console OAuth credentials

## Step 5: Update Production Environment

For Vercel deployment:

1. Go to your Vercel dashboard
2. Select your RentReserve project
3. Go to "Settings" → "Environment Variables"
4. Add the same environment variables:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production URL)
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

## Step 6: Test the Authentication

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Log in" or "Start preparing"
4. You should be redirected to the Google OAuth signin page
5. After successful authentication, you'll be redirected to `/app/dashboard`

## How It Works

1. **Sign In Flow**:
   - User clicks "Log in" → redirected to `/auth/signin`
   - User clicks "Continue with Google" → redirected to Google OAuth
   - After successful authentication → redirected to `/app/dashboard`

2. **Protected Routes**:
   - All `/app/*` routes require authentication
   - Unauthenticated users are redirected to `/auth/signin`
   - Authenticated users accessing `/auth/*` are redirected to `/app/dashboard`

3. **Sign Out**:
   - Users can sign out from the sidebar in the app
   - After sign out, they're redirected to the homepage

## Security Features

- ✅ **Middleware Protection**: App routes are protected by authentication middleware
- ✅ **Session Management**: Secure session handling with NextAuth.js
- ✅ **CSRF Protection**: Built-in CSRF protection
- ✅ **OAuth Security**: Google handles password security, no passwords stored
- ✅ **Secure Cookies**: HTTP-only cookies for session management

## Troubleshooting

### Common Issues:

1. **"Configuration" error**: Check that all environment variables are set correctly
2. **"AccessDenied" error**: Verify your redirect URIs in Google Cloud Console
3. **Build errors**: Ensure all dependencies are installed (`npm install`)
4. **Redirect loops**: Check that NEXTAUTH_URL matches your current environment

### Testing Checklist:

- [ ] Google Cloud project created and APIs enabled
- [ ] OAuth credentials created with correct redirect URIs  
- [ ] Environment variables set in `.env.local`
- [ ] Development server starts without errors
- [ ] Login flow works end-to-end
- [ ] Protected routes redirect unauthenticated users
- [ ] Sign out functionality works
- [ ] Production deployment has environment variables set

## Next Steps

Once authentication is working:

1. **User Profile**: The app already displays user info in the sidebar
2. **Personalization**: Use `session.user` data to personalize the experience
3. **Database Integration**: Connect user sessions to your database (optional)
4. **Additional Providers**: Add more OAuth providers if needed

Your RentReserve app now has secure Google OAuth authentication! 🎉