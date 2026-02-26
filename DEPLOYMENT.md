# Top Cut Tree Felling - Deployment Guide

This guide explains how to set up continuous deployment for the Top Cut Tree Felling website using GitHub Actions and Vercel.

## Prerequisites

- A GitHub account with access to the repository
- A Vercel account (you can sign up at [vercel.com](https://vercel.com))

## Setting Up Vercel

1. **Create a Vercel Account**
   - Sign up at [vercel.com](https://vercel.com) if you don't have an account
   - You can sign up with your GitHub account for easier integration

2. **Import Your GitHub Repository**
   - From the Vercel dashboard, click "Add New..."
   - Select "Project"
   - Choose "Import Git Repository"
   - Select the Top Cut repository
   - Follow the setup wizard (the default settings should work for a Next.js project)

3. **Get Your Vercel Tokens and IDs**
   - Go to your Vercel account settings
   - Navigate to "Tokens" and create a new token with full scope
   - Copy this token (you'll need it for GitHub secrets)
   - Go to your project settings in Vercel
   - Find your "Project ID" and "Organization ID" (you'll need these for GitHub secrets)

## Setting Up GitHub Secrets

1. **Add Secrets to Your GitHub Repository**
   - Go to your GitHub repository
   - Click on "Settings" > "Secrets and variables" > "Actions"
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel API token
     - `VERCEL_ORG_ID`: Your Vercel Organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel Project ID

## How the CI/CD Pipeline Works

The CI/CD pipeline is defined in `.github/workflows/ci-cd.yml` and consists of two main jobs:

### 1. Build and Test
- Runs on every push to any branch and on pull requests to main
- Checks out the code
- Sets up Node.js
- Installs dependencies
- Runs linting
- Builds the project
- Caches the Next.js build for faster future builds

### 2. Deploy
- Only runs when changes are pushed to the main branch
- Depends on the build-and-test job completing successfully
- Deploys the site to Vercel production environment

## Manual Deployment

If you need to deploy manually:

1. **Using Vercel CLI**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy to production
   vercel --prod
   ```

2. **From Vercel Dashboard**
   - Go to your project in the Vercel dashboard
   - Click "Deployments"
   - Select the deployment you want to promote to production
   - Click "..." and select "Promote to Production"

## Troubleshooting

- **Build Failures**: Check the GitHub Actions logs for detailed error messages
- **Deployment Issues**: Verify your Vercel tokens and IDs are correct
- **Environment Variables**: Make sure any required environment variables are set in both GitHub Actions and Vercel

## Next Steps for Production Readiness

- Set up a custom domain in Vercel
- Configure environment variables for production
- Set up monitoring and analytics
- Implement error tracking with a service like Sentry 