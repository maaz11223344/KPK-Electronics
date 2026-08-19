# KPK Electronics — Full-Stack Premium E-Commerce

KPK Electronics is a React + Vite storefront with an Express + **MySQL** backend and protected admin portal.

## Database migration

The backend has been converted from MongoDB/Mongoose to **MySQL 8+**. The frontend/API endpoints remain compatible with the existing React application.

### Requirements

- Node.js 18+ (20+ recommended)
- MySQL 8+ (XAMPP, WAMP, MySQL Community Server, or another local MySQL installation)
- VS Code

### 1. Configure MySQL

Make sure the MySQL server is running. For XAMPP, start **MySQL** from the XAMPP Control Panel.

Open `backend/.env` and set your local MySQL credentials:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=kpk_electronics
DB_USER=root
DB_PASSWORD=
```

If your MySQL root account has a password, put it in `DB_PASSWORD`.

### 2. Install backend packages and create the database

```bash
cd backend
npm install
npm run setup
npm run seed
npm run dev
```

`npm run setup` creates the `kpk_electronics` database and all tables from `schema.sql`.

`npm run seed` creates the admin account and initializes store settings.

Default admin credentials:

```text
Email: admin@kpkelectronics.com
Password: KPKAdmin@2026
```

Change these through environment variables before running the seed in a real deployment.

### 3. Start the frontend

Open a second VS Code terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

Admin: `http://localhost:5173/admin`

### 4. Database structure

The MySQL database contains:

- `users`
- `brands`
- `categories`
- `products`
- `orders`
- `order_items`
- `reviews`
- `store_settings`

Product specifications, tags, images and user addresses are stored as MySQL JSON columns. Orders and reviews use normalized relational tables with foreign keys.

### 5. Product images

Product images are still uploaded by administrators only. They are stored in:

```text
backend/uploads/products/
```

The database stores their relative `/uploads/products/...` paths.

### 6. Frontend API

The frontend continues to use:

```env
VITE_API_URL=http://localhost:5000/api
```

No MongoDB connection string is required anymore.

### 7. Production/deployment note

MySQL must be available to the backend wherever the backend is deployed. A local MySQL server is excellent for local development, but a public website cannot connect to the MySQL server on your personal PC once deployed. For production, use a hosted MySQL-compatible database and put its credentials in environment variables.
