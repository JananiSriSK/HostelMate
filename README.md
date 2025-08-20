# HostelMate – Complaint Management System for Hostels

HostelMate is a real-time, full-stack complaint management system designed for hostel environments. It facilitates efficient communication between students, workers, and administrators to manage and resolve issues under a single interface.

---

## Features

### For Students

* Submit new complaints
* View history of submitted complaints

### For Workers

* View complaints filtered by category (e.g., Electrical, Plumbing)
* Update status once a complaint is resolved

### For Admin

* View all complaints
* Identify unresolved complaints older than 7 days
* Add new workers to the system
* Post announcements to students

---

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React.js + Tailwind CSS |
| Backend  | Node.js + Express       |
| Database | MongoDB Atlas           |
| Auth     | JWT                     |
| Tools    | GitHub, VS Code         |

---

## File Structure

```
hostelmate/
├── frontend/               # React + Tailwind
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── ...
├── backend/
│   ├── student-api/        # Microservice: student operations
│   ├── worker-api/         # Microservice: worker operations
│   ├── admin-api/          # Microservice: admin operations
│   └── shared/             # Auth, DB utils, middlewares
└── README.md
```

---

## Local Setup

### Prerequisites

* Node.js (v18+)
* MongoDB (for local testing)
* Git

### Installation

1. Clone the repository:

```bash
git clone git@github.com:YOUR_USERNAME/hostelmate.git
```

2. Navigate to the project directory:

```bash
cd hostelmate
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

4. Install backend dependencies:

```bash
cd ../backend/student-api
npm install

cd ../worker-api
npm install

cd ../admin-api
npm install
```

### Running Locally

Start the frontend:

```bash
cd frontend
npm run dev
```

Start backend services:

```bash
cd backend/student-api
npm run dev

cd ../worker-api
npm run dev

cd ../admin-api
npm run dev
```

---

## Deployment

### Backend (AWS EC2)

1. Launch an EC2 instance and install Node.js and Git.
2. Clone the backend repository on EC2.
3. Configure environment variables in `.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hostelmate
JWT_SECRET=your_jwt_secret
```

4. Start backend services using PM2:

```bash
pm2 start server.js --name hostelmate-backend
pm2 save
pm2 startup
```

5. Ensure the EC2 security group allows your backend port and any HTTP/HTTPS traffic.

### Database (MongoDB Atlas)

* Use MongoDB Atlas cluster for production.
* Configure database user credentials and whitelist IPs (EC2 server IP and local IP for testing).

### Frontend (Vercel)

1. Push the `frontend` folder to GitHub.
2. Import the project into Vercel and configure environment variables:

```
VITE_API_URL=http://<your-ec2-ip>:<backend-port>
```

3. Deploy; Vercel will provide the frontend URL.

---

## Environment Variables

### Backend `.env` example

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hostelmate
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend `.env` example

```env
VITE_API_URL=http://<your-ec2-ip>:5000
```

---

## Team

**HostelMate Development Team**

* Janani Sri – Frontend Developer (& Deployment)
* Rahul – Backend Developer
* Kathir – Full Stack Integration

---

## Feedback & Contributions

For bugs, suggestions, or contributions, open an issue or start a discussion in the repository. Collaboration and feedback are welcome.


