# Job Application Management API

This is a Backend built with Node.js and Express for managing job postings, user registrations, and job applications. It provides endpoints to create, update, fetch, and delete jobs and applications, with user authentication and role-based access control.

---

## Features

- **User Management**
  - User registration with hashed passwords using bcrypt.
  - User login with JWT-based authentication.
  - Role-based user roles (e.g., user, admin).

- **Job Postings**
  - Create new job posts with unique slugs.
  - Fetch job posts by slug.
  - Update existing job posts.
  - Delete job posts (with validation to prevent deletion if pending applications exist).

- **Job Applications**
  - Create job applications tied to a specific job and user.
  - Fetch all applications or filter applications by user or job.
  - Update application details (resume, cover letter) with restrictions if application is approved or denied.
  - Delete applications with validation on application status.
  - Update application status (approved or denied) with business logic to prevent status reversal.

- **Email Notifications (using Nodemailer)**
  - Nodemailer is integrated for sending emails (e.g., notifications or confirmations).
  - Easily customizable transporter setup to connect with SMTP providers.

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- A database supported by Sequelize ORM (e.g., MySQL, PostgreSQL, SQLite)
- SMTP credentials for email notifications (if using Nodemailer)

### Installation

download the file from github and extract in vs code.

>then run npm install
>then run npm start
