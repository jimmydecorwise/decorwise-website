# Decorwise Paintings Website

A professional website for Decorwise Paintings, featuring services, gallery, and contact information. This is a static website built with Next.js and designed to be hosted on GitHub Pages.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Static site generation for fast loading
- Contact form functionality
- Easy to update and maintain

## Development

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a production build:

```bash
npm run build
```

## Deploying to GitHub Pages

1. Make sure your repository is initialized with Git and connected to GitHub
2. Run the deployment script:
   ```bash
   npm run deploy
   ```
3. Go to your GitHub repository's Settings > Pages
4. Under "Source", select "Deploy from a branch"
5. Select the `main` branch and `/docs` folder
6. Click "Save"

Your site will be available at `https://<your-username>.github.io/<repository-name>/`

## Configuration

- Update `next.config.js` if you need to change the base path or other settings
- The site is configured to output to the `docs` folder for GitHub Pages compatibility

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
