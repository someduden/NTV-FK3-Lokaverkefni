🛍️ Supabase Shop

A modern full-stack e-commerce application built with Supabase and a custom frontend.
This project demonstrates a complete shopping flow including products, cart, orders, and a mock checkout system.

✨ Features
🛒 Product listing and detail pages
➕ Add to cart functionality
🧾 Order creation with order_items
💳 Mock checkout (no real payment required)
🔐 Supabase Authentication

🚀 Getting Started

1. Clone the repo
   git clone https://github.com/someduden/NTV-FK3-Lokaverkefni
   cd your-repo
2. Install dependencies
   npm install
3. Set environment variables

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key 4. Run the app
npm run dev

🛒 Checkout Flow (Mock)
User adds items to cart
Order is created in database (status = pending)
Cart items saved to order_items
User completes fake payment
Order updated → status = paid

⚠️ Disclaimer

This project uses a mock payment system for development and demo purposes.
It is not suitable for production payments.

📄 License

MIT License

👨‍💻 Author

Daníel Máni
GitHub: https://github.com/someduden
