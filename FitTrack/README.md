# FitTrack — Personal Gym Workout Tracker (MERN Stack)



## Folder structure
```
FitTrack/
  client/   → React (Vite) frontend
  server/   → Node.js + Express backend
```

## Setup

### 1. Backend

```bash
cd server
npm install
```

`.env` is already configured to point at your Atlas cluster, database `fittrack`:
```
MONGO_URI=mongodb+srv://akshayzoro:<password>@cluster0.q43pnzs.mongodb.net/fittrack?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=changeThisSecretKey123
PORT=5000
```

Before running, in Atlas make sure:
- **Network Access** has your IP whitelisted (or `0.0.0.0/0` for dev)
- The password in the string above matches your actual Atlas user password

Start the server:
```bash
npm run dev
```
You should see:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

### 2. Frontend

In a new terminal:
```bash
cd client
npm install
npm run dev
```
App runs at `http://localhost:5173`. The `.env` here just points to your local backend (`http://localhost:5000/api`) — no changes needed.

## How it works

- **Auth**: Register hashes the password with bcrypt and saves the user. Login checks the password and returns a JWT. The frontend stores the JWT + user in `localStorage` via `AuthContext`.
- **Protected requests**: `src/api/axios.js` automatically attaches the JWT as `Authorization: Bearer <token>` on every request. The backend's `middleware/auth.js` verifies it and attaches `req.userId`, so every workout/weight entry is scoped to the logged-in user.
- **Data storage**: everything lives in your Atlas cluster's `fittrack` database, in 3 collections — `users`, `workouts`, `bodyweights` — created automatically the first time you register, add a workout, or log a weigh-in.

## API Reference

| Method | Route | Auth required | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Create a new user |
| POST | /api/auth/login | No | Login, returns JWT + user |
| GET | /api/auth/profile | Yes | Get the logged-in user's fresh profile |
| PUT | /api/auth/profile | Yes | Update the logged-in user's name |
| PUT | /api/auth/password | Yes | Change the logged-in user's password |
| GET | /api/workouts | Yes | Get all workouts for logged-in user |
| POST | /api/workouts | Yes | Create a workout |
| PUT | /api/workouts/:id | Yes | Update a workout |
| DELETE | /api/workouts/:id | Yes | Delete a workout |
| GET | /api/bodyweight | Yes | Get all body-weight entries for logged-in user |
| POST | /api/bodyweight | Yes | Log a new body-weight entry |
| DELETE | /api/bodyweight/:id | Yes | Delete a body-weight entry |

## Features

- **Calories burned tracking** — optional calorie estimate per workout; Dashboard shows totals for today and this week.
- **Body weight progress** — Progress page to log weight over time, view an SVG trend chart, and see change since last entry / since you started.
- **Dark, white & red theme** with original inline-SVG dumbbell/barbell/flexed-arm graphics (no external image files).
- **Motivational quote banner** on Home and Dashboard.
- **Dashboard stats** — total workouts, workouts this week, total volume lifted, calories today, calories this week.
- **Search & sort in History** — filter by workout name/exercise, sort newest/oldest/heaviest.
- **Editable profile** — change your display name and password.
- **Toast notifications** and a **custom delete-confirmation modal**.
