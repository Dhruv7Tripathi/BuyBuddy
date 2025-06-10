# BuyBuddy

BuyBuddy is a modern and responsive e-commerce website that allows users to browse, search, and purchase products with ease. Built using the latest web technologies, BuyBuddy focuses on performance, design, and seamless user experience.

## Features

- 🚀 **Next.js** for server-side rendering and static site generation.
- 📝 **TypeScript** for type safety and better development experience.
- 🎨 **Tailwind CSS** for a fully responsive and beautiful design.
- 📄 **Razorpay Integration** for payment gateway method.
- 🔍 **SEO Optimized** for better search rankings.
- ⚡ **Fast and Lightweight** for a seamless user experience.

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Razorpay:** Payment Gateway
- **Database:** PostgreSQL (if needed for additional features)
- **Hosting:** Vercel (Recommended)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dhruv7tripathi/buybuddy.git
   cd blogiffy
   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Set up environment variables:
   Create a `.env.local` file and add the necessary configurations:

   ```env
   DATABASE_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=
   NEXT_PUBLIC_RAZORPAY_KEY_ID=
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET=
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Deployment

To deploy BuyBuddy on Vercel, follow these steps:

1. Push your repository to GitHub/GitLab.
2. Go to [Vercel](https://vercel.com/) and import your repository.
3. Set up the environment variables in Vercel.
4. Deploy and enjoy! 🚀

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request to improve BuyBuddy.

Made with ❤️ by Dhruv Tripathi
