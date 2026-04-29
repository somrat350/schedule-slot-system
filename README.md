# 📚 Teacher–Student Slot Booking System

A simple full-stack slot booking system where teachers can create time slots and students can view and book available slots.

---

# 🚀 How to Run the Project

## 1️⃣ Clone the repository and install dependencies

```bash
git clone https://github.com/somrat350/schedule-slot-system.git
cd schedule-slot-system
npm install
```

## 2️⃣ Setup Environment Variables

```bash
NEXTAUTH_SECRET=your_next_auth_secret
NEXTAUTH_URL=http://localhost:3000
MONGO_URI=your_mongo_uri
DB_NAME=your_db_name
```

## 3️⃣ Run the Project

```bash
npm run dev
```

## 🧠 What I Implemented

### 👨‍🏫 Teacher Features

- Teacher can create time slots
- Teacher can view all slots
- Teacher can manage slot status
- Teacher can see booked slots

### 🎓 Student Features

- Student can view available slots
- Student can book a slot
- Once booked → slot becomes unavailable
- Students can see their booked slots

### 🔐 Authentication System

- JWT based authentication
- Role-based access control:
  - Teacher
  - Student
- Protected API routes

## 🔑 Demo Login Credentials

### 👨‍🏫 Teacher Account

- **Email:** teacher@test.com
- **Password:** teacher123

### 🎓 Student Account

- **Email:** student@test.com
- **Password:** student123
