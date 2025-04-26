# AI Study Platform - Early Access Landing Page

This is an early access landing page for an AI-powered study and exam preparation platform. The landing page is designed to collect payments and feedback from users interested in early access.

## Features

- Modern, responsive landing page design
- Stripe integration for payments
- Telegram bot integration
- Social proof section with counter
- Feature showcase section
- Supabase integration for data storage
- Beautiful thank you page
- Feedback form integration

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `src/config/env.example` to `.env` and fill in your credentials:
   - Supabase credentials
   - Stripe API keys
   - Resend API key for emails
4. Run the development server: `npm run dev`

## Supabase Setup

This project uses Supabase for backend functionality. To set up:

1. Create a new Supabase project
2. Run the migrations in `supabase/migrations/` to set up the database schema
3. Deploy the edge functions in `supabase/functions/`
4. Set up the following environment variables in your Supabase project:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`

## Stripe Setup

To set up Stripe:

1. Create a Stripe account
2. Create a product and price in your Stripe dashboard
3. Set up a webhook endpoint in your Stripe dashboard pointing to your Supabase edge function
4. Add the following environment variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_STRIPE_PRICE_ID`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

## Telegram Bot Setup

To set up the Telegram bot:

1. Create a new bot using BotFather on Telegram
2. Set the webhook URL to your deployed Supabase edge function
3. Update the Telegram bot link in the components

## Feedback Form Setup

The project uses Tally.so for the feedback form. To set up:

1. Create a new form on Tally.so
2. Add the form URL to the ThankYouPage component
3. Configure the form to collect the following information:
   - Quiz features preferences
   - Summary languages
   - Video-to-quiz tools
   - Personalized study plan
   - AI tutor features

## Technologies Used

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for routing
- Stripe for payments
- Supabase for backend functionality
- Tally.so for feedback forms