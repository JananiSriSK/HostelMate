
# HostelMate – Complaint Management System for Hostels

HostelMate is a real-time, full-stack complaint management system designed for hostel environments. It facilitates efficient communication between students, workers, and administrators to manage and resolve issues under a single interface.

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
├── backend/                # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── .env
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
cd hostelmate
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
npm install
```

### Running Locally

Start the frontend:

```bash
cd frontend
npm run dev
```

Start the backend:

```bash
cd backend
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
PORT=5000
```

4. Start backend using PM2:

```bash
pm2 start server.js --name hostelmate-backend
pm2 save
pm2 startup
```

5. Ensure the EC2 security group allows the backend port (e.g., 5000) and HTTP/HTTPS traffic.

---

### Database (MongoDB Atlas)

* Use MongoDB Atlas cluster for production.
* Configure database user credentials and whitelist IPs (EC2 server IP and local IP for testing).

---

### Frontend (Vercel)

1. Push the `frontend` folder to GitHub.
2. Import the project into Vercel and configure environment variables:

```
VITE_API_URL=http://<your-ec2-ip>:5000
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


