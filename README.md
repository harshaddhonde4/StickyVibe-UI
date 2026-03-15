# 🎨 StickyVibe UI

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![AWS](https://img.shields.io/badge/AWS_Amplify-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/amplify/)

A modern, responsive e-commerce frontend for **StickyVibe** — a sticker store built with React, Vite, and Tailwind CSS.

> ✨ Add a touch of creativity to your space with fun and unique stickers!

**[🌐 Live Demo](https://main.d3u0qv6dwhg83o.amplifyapp.com)**

</div>

---

## 🌐 Live Demo

| Service        | URL                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------ |
| **Frontend**   | [AWS Amplify](https://main.d3u0qv6dwhg83o.amplifyapp.com)                                       |
| **Backend API**| [AWS CloudFront](https://d1dz15aly7dp8q.cloudfront.net/api/v1)                                  |

---

## ✨ Features

| Feature | Description |
| ------- | ----------- |
| 🛒 **Product Browsing** | Search, sort, and explore stickers with a smooth UX |
| 📦 **Cart Management** | Add/remove items with Redux state management |
| 💳 **Stripe Checkout** | Secure, PCI-compliant payment integration |
| 👤 **User Authentication** | JWT-based login & registration with protected routes |
| 📋 **Order Tracking** | View full order history per user |
| 👨‍💼 **Admin Panel** | Manage orders and customer support messages |
| 📬 **Contact Form** | Submit inquiries with server-side validation |
| 🌗 **Dark Mode** | Toggle between light and dark themes |
| 📱 **Responsive Design** | Mobile-friendly layout across all pages |
| 🔒 **Protected Routes** | Auth-guarded pages for logged-in users only |

---

## 🛠️ Tech Stack

| Category        | Technology                                            |
| --------------- | ----------------------------------------------------- |
| **Framework**   | React 19                                              |
| **Build Tool**  | Vite 7                                                |
| **Styling**     | Tailwind CSS 4                                        |
| **Routing**     | React Router DOM 7 (Loaders & Actions)                |
| **State**       | Redux Toolkit + React Redux                           |
| **HTTP Client** | Axios                                                 |
| **Payments**    | Stripe (React Stripe.js)                              |
| **Icons**       | FontAwesome + React Icons                             |
| **Toasts**      | React Toastify                                        |
| **Deployment**  | AWS Amplify (Frontend) + CloudFront/EC2 (Backend API) |

---

## 📁 Project Structure

```
src/
├── api/
│   └── apiClient.js          # Axios instance with interceptors
├── assets/
│   └── util/
├── components/
│   ├── Header.jsx             # Responsive navigation bar
│   ├── Home.jsx               # Product listing page
│   ├── ProductListings.jsx    # Search, sort & product grid
│   ├── ProductCard.jsx        # Individual product card
│   ├── ProductDetail.jsx      # Product detail view
│   ├── Cart.jsx               # Shopping cart page
│   ├── CartTable.jsx          # Cart items table
│   ├── CheckoutForm.jsx       # Stripe payment form
│   ├── OrderSuccess.jsx       # Order confirmation
│   ├── Orders.jsx             # User order history
│   ├── Contact.jsx            # Contact form with validation
│   ├── About.jsx              # About page
│   ├── Login.jsx              # Login form
│   ├── Register.jsx           # Registration form
│   ├── Profile.jsx            # User profile management
│   ├── ProtectedRoute.jsx     # Auth route guard
│   ├── ErrorPage.jsx          # Error boundary page
│   ├── SearchBox.jsx          # Product search input
│   ├── Dropdown.jsx           # Sort dropdown
│   ├── Price.jsx              # Price display component
│   ├── PageTitle.jsx          # Page title component
│   ├── PageHeading.jsx        # Page heading component
│   ├── admin/
│   │   ├── AdminOrders.jsx    # Admin order management
│   │   └── Messages.jsx       # Admin contact messages
│   └── footer/
│       └── Footer.jsx         # Site footer
├── store/
│   ├── Store.js               # Redux store configuration
│   ├── Auth-Slice.js          # Authentication state
│   ├── Auth-Context.jsx       # Auth context (legacy)
│   ├── Cart-Slice.js          # Cart state management
│   └── Cart-Context.jsx       # Cart context (legacy)
├── App.jsx                    # Root layout with Outlet
├── main.jsx                   # Router & provider setup
├── App.css
└── index.css                  # Tailwind directives & custom theme
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/harshaddhonde4/StickyVibe-UI.git
cd StickyVibe-UI

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL="https://localhost:8080/api/v1"
```

### Development

```bash
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173)

### Build

```bash
# Production build
npm run build

# Dev environment build
npm run build:dev

# Preview production build locally
npm run preview
```

---

## 🔑 Environment Modes

| Mode           | Command             | API Target     |
| -------------- | ------------------- | -------------- |
| **Local**      | `npm run dev`       | localhost:8080 |
| **Dev Build**  | `npm run build:dev` | Dev API server |
| **Production** | `npm run build`     | CloudFront CDN |

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add some amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 👤 Author

<div align="center">

**Harshad Dhonde**

[![GitHub](https://img.shields.io/badge/GitHub-harshaddhonde4-181717?style=for-the-badge&logo=github)](https://github.com/harshaddhonde4)

</div>

---

## 📄 License

This project is private and not licensed for public distribution.
