# 🎓 IEEE SB CEK Website 🌐

Welcome to the official website repository for **IEEE SB CEK**! Follow the steps below to set up the development environment and contribute to this community-driven project.

## 🚀 Setup Instructions

### 1️⃣ Create a Vercel Account 🔑

Sign up or log in to [Vercel](https://vercel.com/) for deploying your Next.js application.

### 2️⃣ Set Up PostgreSQL Database 🗄️

- Create a PostgreSQL storage instance on your preferred platform (e.g., [Supabase](https://supabase.com/), [Heroku](https://www.heroku.com/)).
- Keep your database credentials safe! 🔐

### 3️⃣ Clone the Repository ⬇️

```bash
git clone https://github.com/retr0717/ieee-cek.git
cd ieee-cek
```

### 4️⃣ Create a `.env` File 📄

In the root folder (`ieee-cek/`), create a `.env` file for storing your environment variables.

### 5️⃣ Add Database Credentials to `.env` 🗝️

Copy the PostgreSQL credentials from Step 2 into the `.env` file like so:

```
DATABASE_URL=<your-postgresql-url>
```

### 6️⃣ Set Up NEXTAUTH Secret 🔑

Generate a secret key for authentication using one of the following commands:

- Option 1:

  ```bash
  openssl rand -base64 32
  ```

- Option 2:
  ```bash
  npx auth secret
  ```

Once generated, add the secret key to your `.env` file:

```
NEXTAUTH_SECRET=<generated-secret-key>
```

### 7️⃣ Install Dependencies 📦

Install the project dependencies by running:

```bash
npm install
```

### 8️⃣ Seed the Database 🌱

Seed your PostgreSQL database with initial data:

```bash
npm run seed
```

### 9️⃣ Start the Development Server 🖥️

To run the project in development mode, use:

```bash
npm run dev
```

The server will be available at [http://localhost:3000](http://localhost:3000). 🎉

### 🔟 Create a New Branch for Changes 🌿

When making changes, always create a new branch for your work:

```bash
git checkout -b <branch-name>
```

## 🤝 Contributing

We welcome contributions! Feel free to fork the repository, make your changes, and submit a pull request. Every bit of help counts! 💪
