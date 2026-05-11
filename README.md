# HomeNest – Real Estate Listing Platform
## Live Website

https://chipper-nougat-76a1d7.netlify.app/

## Client GitHub Repo

https://github.com/engsanjid/HomeNest-client

## Server GitHub Repo

https://github.com/engsanjid/homeNest-server-side

## Live Server API

VITE_API_URL/

## About HomeNest

HomeNest is a modern Real Estate Listing Platform that allows users to seamlessly manage property listings.
Users can:

Add their own properties

Update existing property information

Manage and delete listings

Visitors can explore a wide range of properties using advanced search, filtering, and sorting features.
HomeNest aims to provide an efficient, secure, and user-friendly experience for anyone looking to browse or manage real estate listings.

## Key Features

🏠 Add, Update & Delete Properties (Private Routes)

🔍 Search & Sort Properties (Backend-based sorting)

🌟 Ratings & Reviews (Star rating system)

🔐 Secure Authentication (Email & Google Login)

🌗 Light/Dark Mode Toggle

📱 Fully Responsive UI (Mobile, Tablet, Desktop)

⚡ Loading Spinner, Toast Alerts, 404 Page

🏙 Featured Properties (Latest 6 via MongoDB sort)

## Tech Stack
Frontend

React.js

React Router DOM

Firebase Authentication

Tailwind CSS

SweetAlert2 / React Hot Toast

Backend

Node.js

Express.js

MongoDB (Mongoose)

CORS

## Folder Structure
```
HomeNest-client/
│── public/
│── src/
│   ├── component/
│   ├── page/
│   ├── provider/
│   ├── router/
│   ├── hooks/
│   ├── firebase/
│   ├── App.jsx
│   ├── main.jsx
│── .env
│── package.json
│── README.md
```
## How to Run Locally
1️⃣ Clone the repository
git clone https://github.com/engsanjid/HomeNest-client.git

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
VITE_FIREBASE_API_KEY=xxxx
VITE_API_URL=VITE_API_URL/properties

4️⃣ Start the development server
npm run dev

## Author

Name: Md Sanjid Islam
Email: mdsanjidi36@gmail.com