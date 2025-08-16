# Personal Expense Tracker

A modern, full-stack Personal Expense Tracker built with Next.js, MongoDB, and TypeScript. This application allows users to track their daily expenses with features like user authentication, expense categorization, filtering, and data visualization.

![Expense Tracker](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 Features

### Core Features

-   ✅ **User Authentication** - JWT-based login and registration
-   ✅ **Expense Management** - Add, view, edit, and delete expenses
-   ✅ **Category System** - Organize expenses by categories (Food, Transport, Shopping, etc.)
-   ✅ **Date Validation** - Proper date handling and validation
-   ✅ **Responsive Design** - Mobile-first, fully responsive UI

### Advanced Features

-   ✅ **Data Visualization** - Interactive pie charts showing expenses by category
-   ✅ **Advanced Filtering** - Filter by category, date range, and amount
-   ✅ **Real-time Updates** - Instant UI updates after operations
-   ✅ **Total Calculation** - Automatic expense total calculation
-   ✅ **Protected Routes** - Secure API endpoints with JWT middleware

## 🛠 Tech Stack

### Frontend

-   **Next.js 15.2.4** - React framework with App Router
-   **TypeScript** - Type safety and better developer experience
-   **Tailwind CSS** - Utility-first CSS framework
-   **shadcn/ui** - Modern, accessible UI components
-   **Recharts** - Interactive charts and data visualization
-   **React Hook Form** - Form handling with validation

### Backend

-   **Node.js** - Runtime environment
-   **Next.js API Routes** - RESTful API endpoints
-   **MongoDB** - NoSQL database with Mongoose ODM
-   **JWT** - JSON Web Tokens for authentication
-   **bcryptjs** - Password hashing

## 📋 Requirements Met

This project fulfills all requirements from the MERN Stack Developer Assessment:

### ✅ Backend Requirements

-   **REST API Endpoints:**

    -   `POST /api/expenses` - Add new expense
    -   `GET /api/expenses` - Fetch all user expenses
    -   `PATCH /api/expenses/:id` - Update expense
    -   `DELETE /api/expenses/:id` - Delete expense

-   **Validation Rules:**

    -   Title: Required, minimum 3 characters
    -   Amount: Required, number greater than 0
    -   Date: Required, valid date format
    -   Category: Required, predefined categories

-   **Database:** MongoDB with Mongoose schemas

### ✅ Frontend Requirements

-   **Add Expense Form** - All required fields with dropdown and date picker
-   **Expense List View** - Table/card layout with total amount display
-   **Category Badges** - Visual category indicators
-   **Edit/Delete Functionality** - Full CRUD operations

### ✅ UI/UX & Responsiveness

-   Fully responsive for mobile, tablet, and desktop
-   Modern, clean design with Tailwind CSS
-   Intuitive user interface

### ✅ Bonus Features

-   Filter by category and date range ✅
-   Interactive pie chart visualization ✅
-   JWT authentication with login & register ✅
-   Ready for deployment ✅

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+ installed
-   MongoDB database (local or MongoDB Atlas)
-   Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expense-tracker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
MONGODB_URI=mongodb+srv://admin:admin@mariyaquiz.gd34udu.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=mariyaquiz
JWT_SECRET=your-super-secure-jwt-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Database Setup

#### Option A: MongoDB Atlas (Pre-configured)

The project is already configured to use MongoDB Atlas with the provided connection string. The database is ready to use with:

-   **Database**: `expense-tracker`
-   **Cluster**: `mariyaquiz.gd34udu.mongodb.net`
-   **Username**: `admin`
-   **Password**: `admin`

No additional setup required - just ensure your IP is whitelisted in the MongoDB Atlas dashboard.

#### Option B: Local MongoDB (Alternative)

1. Install MongoDB locally
2. Start MongoDB service
3. Change MONGODB_URI in `.env.local` to: `mongodb://localhost:27017/expense-tracker`

### 5. Run the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
expense-tracker/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── expenses/             # Expense CRUD endpoints
│   │       └── [id]/
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── auth-forms.tsx            # Login/Register forms
│   ├── auth-guard.tsx            # Authentication wrapper
│   ├── expense-tracker.tsx       # Main expense component
│   ├── expense-chart.tsx         # Pie chart visualization
│   ├── expense-filters.tsx       # Filtering component
│   └── user-header.tsx           # User navigation
├── contexts/                     # React contexts
│   └── auth-context.tsx          # Authentication context
├── lib/                          # Utilities and configurations
│   ├── models/                   # Mongoose schemas
│   │   ├── User.ts
│   │   └── Expense.ts
│   ├── auth.ts                   # Authentication utilities
│   ├── db.ts                     # Database connection
│   ├── jwt.ts                    # JWT utilities
│   └── utils.ts                  # General utilities
├── middleware.ts                 # Next.js middleware for auth
├── package.json                  # Dependencies
└── README.md                     # Project documentation
```

## 🔧 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Expense Endpoints (Requires Authentication)

#### Get All Expenses

```http
GET /api/expenses
Authorization: Bearer <jwt_token>
```

#### Add New Expense

```http
POST /api/expenses
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Lunch at restaurant",
  "amount": 25.50,
  "category": "Food",
  "date": "2024-01-15"
}
```

#### Update Expense

```http
PATCH /api/expenses/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated expense",
  "amount": 30.00,
  "category": "Food",
  "date": "2024-01-15"
}
```

#### Delete Expense

```http
DELETE /api/expenses/:id
Authorization: Bearer <jwt_token>
```

## 📱 Usage Guide

### 1. User Registration/Login

-   Visit the application homepage
-   Click "Sign Up" to create a new account
-   Or click "Sign In" if you already have an account
-   Fill in the required information

### 2. Adding Expenses

-   Click the "+" button to add a new expense
-   Fill in the expense details:
    -   Title (minimum 3 characters)
    -   Amount (must be greater than 0)
    -   Category (select from dropdown)
    -   Date (use date picker)
-   Click "Add Expense" to save

### 3. Managing Expenses

-   View all expenses in the main dashboard
-   See total amount at the top
-   Edit expenses by clicking the edit icon
-   Delete expenses by clicking the trash icon

### 4. Filtering and Analysis

-   Use the "Filters" button to filter expenses by:
    -   Category
    -   Date range
    -   Amount range
-   Click "Charts" to view pie chart visualization
-   Charts show expense distribution by category

## 🚀 Deployment

### Frontend (Vercel) - Recommended

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Backend API (Render) - If separate

1. Create account at [Render](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Add environment variables
5. Deploy

### Database (MongoDB Atlas)

1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Update MONGODB_URI in environment variables

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Git Commit History

This project maintains a clean git history with meaningful commits:

1. Initial project setup with Next.js and dependencies
2. Add MongoDB database models and connection
3. Implement user authentication (register/login)
4. Create expense CRUD API endpoints
5. Build responsive UI components
6. Add expense filtering functionality
7. Implement data visualization with charts
8. Add JWT middleware for API protection
9. Improve mobile responsiveness
10. Add comprehensive documentation

## 🔐 Security Features

-   **Password Hashing** - bcryptjs with salt rounds
-   **JWT Authentication** - Secure token-based auth
-   **Protected API Routes** - Middleware authentication
-   **Input Validation** - Server-side validation for all inputs
-   **User Data Isolation** - Users can only access their own data

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

    - Check MongoDB is running
    - Verify connection string in `.env.local`
    - Check network connectivity for Atlas

2. **Authentication Issues**

    - Verify JWT_SECRET is set
    - Check token expiration
    - Clear browser local storage

3. **Build Errors**
    - Delete `node_modules` and reinstall
    - Clear Next.js cache: `rm -rf .next`
    - Check TypeScript errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

-   GitHub: [@yourusername](https://github.com/yourusername)
-   Email: your.email@example.com

## 🙏 Acknowledgments

-   [Next.js](https://nextjs.org/) for the amazing React framework
-   [MongoDB](https://www.mongodb.com/) for the flexible database
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
-   [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
-   [Recharts](https://recharts.org/) for the data visualization

---

⭐ Star this repository if you find it helpful!
