# Water Consumption Tracker

A modern, responsive web application for tracking daily water usage. This project was developed as an internship assignment to demonstrate full-stack development skills, including database management, RESTful API design, and responsive UI implementation.

## Features

- **Daily Water Entry**: Add water consumption records with date, amount (liters), and category (Cooking, Bathing, Washing, Drinking, Other).
- **Edit & Delete**: Full CRUD functionality for managing usage records.
- **Dynamic Dashboard**:
  - **Total Usage**: Real-time calculation of daily total vs. a 150L limit.
  - **Categorized Breakdown**: Visual breakdown of usage by type.
  - **Weekly Summary**: A bar chart visualizing consumption trends across the week.
- **Mobile Responsive**: Adaptive design that switches between a detailed table on desktop and a clean card-based layout on mobile.
- **Visual Feedback**: Real-time UI cues, including a visual indicator for "Edit Mode" and exceeding daily limits.

## Technology Stack

### Frontend
- **React** (Vite)
- **TypeScript**
- **Tailwind CSS** (Styling)
- **Lucide React** (Iconography)

### Backend
- **Node.js**
- **Express**
- **PostgreSQL** (Database)
- **dotenv** (Environment Configuration)

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v16+)
- PostgreSQL installed and running

### 1. Database Setup
Create a PostgreSQL database and a table for water usage:
```sql
CREATE TABLE water_usage (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL
);
```

### 2. Backend Configuration
Create a `.env` file in the `server` directory:
```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=water_tracker
```

### 3. Installation
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Running the Application
```bash
# Start the backend (from server directory)
npm run dev

# Start the frontend (from client directory)
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port) and the API will run on `http://localhost:5500`.

---

