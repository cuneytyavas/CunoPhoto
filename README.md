# CunoPhoto

The backend is powered by Express.js and MongoDB, while the frontend is crafted with React, utilizing Zustand for state management.

---

## Requirements

- **Node.js**
- **MongoDB**
- **NPM** or **Yarn**

---

## Installation Steps

### .Env File Should Include these to make the app work properly

```env
MONGO_URL=<MongoDB Connection Address>
PORT=<Port Number for Backend>
JWT_SECRET=<JWT Secret key>
CLOUDINARY_CLOUD_NAME=<Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Cloudinary API Key>
CLOUDINARY_API_SECRET=<Cloudinary API Secret>
NODE_ENV=development
```

---

### Backend Installation

- Open a terminal in the project's root directory and run the following commands:

```bash
npm install
```

```bash
npm run dev
```

---

### Frontend Installation

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

---

- ### Default Url's

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

---

- ### About CunoPhoto
- Users can create a new account by signing up or log in to an existing one.
- Unregistered users can explore and filter uploaded photos with ease, as well as access the profile pages of uploaders, where they can view select details and curated photo collections. Registered users gain elevated privileges, including the ability to personalize their profiles and contribute their own content. Admin users, however, hold ultimate authority—empowered to manage users, oversee content, and maintain complete control over the platform’s ecosystem.
