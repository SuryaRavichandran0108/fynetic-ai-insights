# FYNETIC - AI Sports Analytics Platform

**URL**: https://lovable.dev/projects/abac5da5-7342-4d72-b339-884790a590eb

Advanced AI-powered sports analytics platform providing data-driven insights for NFL, NBA, and MLB betting props.

## Features

- **Ask FYNETIC**: Natural language interface for sports analytics queries
- **Explore Players**: Search and analyze player statistics and trends
- **Prop Builder**: Create and analyze betting propositions with Vegas baselines

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **AI/LLM**: OpenAI integration via Edge Functions
- **Styling**: Dark-first design system with FYNETIC Green branding

## Branding

### Brand Colors

FYNETIC uses a vibrant green as its primary brand color:

**Primary Color Scale:**
- `primary-50`: #ECFFF5
- `primary-100`: #C9FFE3
- `primary-200`: #93FFC8
- `primary-300`: #5BFFAC
- `primary-400`: #2BFA8F
- **`primary-500`: #00E06A** ← Brand color
- `primary-600`: #00B956
- `primary-700`: #009246
- `primary-800`: #006E37
- `primary-900`: #004F2B

**CSS Variables:**
- `--primary`: 151 100% 44% (HSL)
- `--accent`: 151 100% 44% (HSL)

### Brand Assets

Logo assets are located in `public/brand/`:

- `fynetic-logo.svg` - Full logo with wordmark (for dark backgrounds)
- `fynetic-logo-light.svg` - Full logo (for light backgrounds)
- `fynetic-logo-dark.svg` - Full logo (deprecated, use fynetic-logo.svg)
- `fynetic-mark.svg` - Brain/basketball icon mark only
- `fynetic-mark.png` - Raster version of icon mark
- `fynetic-logo-primary.png` - Raster logo

Favicons:
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-512.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`

Open Graph:
- `og/fynetic-og.png` - Social media preview image (1200x630)

### Design Tokens

All brand colors are defined using HSL values for proper theming support in `src/index.css`:

```css
:root {
  --primary: 151 100% 44%;           /* FYNETIC Green */
  --primary-foreground: 0 0% 0%;     /* Black text on green */
  --accent: 151 100% 44%;
  --ring: 151 100% 44%;              /* Focus rings */
}
```

Tailwind utilities:
- `bg-primary-500` - Brand green background
- `text-primary-400` - Brand green text
- `border-primary-500` - Brand green border
- `ring-primary-400` - Brand green focus ring

### Usage Guidelines

1. **Primary CTAs**: Use `bg-primary-500 text-black hover:bg-primary-600`
2. **Focus States**: Use `focus:ring-2 focus:ring-primary-400`
3. **Links**: Use `text-primary-400 hover:text-primary-300`
4. **Accents**: Use `border-l-primary-500` for left borders on key elements

## Getting Started

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/abac5da5-7342-4d72-b339-884790a590eb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Project Structure

```
src/
├── components/        # React components
│   ├── layout/       # Header, navigation
│   ├── ui/           # shadcn/ui components
│   └── ...
├── pages/            # Route pages
├── lib/              # Utilities and services
├── hooks/            # Custom React hooks
├── types/            # TypeScript definitions
└── styles/           # CSS and design tokens

public/
├── brand/            # Logo assets
├── og/               # Open Graph images
└── ...               # Favicons

supabase/
├── functions/        # Edge Functions
└── migrations/       # Database migrations
```

## Deployment

Simply open [Lovable](https://lovable.dev/projects/abac5da5-7342-4d72-b339-884790a590eb) and click on Share -> Publish.

## Custom Domain

To connect a custom domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## License

Proprietary - All rights reserved
