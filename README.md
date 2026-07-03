# repoB

A basic Node.js backend for user registration, authentication, profile updates, and Cloudinary-backed image uploads.

## Features

- User registration with avatar and optional cover image upload
- JWT-based authentication with access and refresh tokens
- Login, logout, and token refresh flows
- Protected routes for updating user profile, avatar, and cover image
- MongoDB storage via Mongoose
- Cloudinary integration for file upload handling
- Global error handler and standardized API responses

## Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- Multer
- Cloudinary
- JWT
- bcrypt
- dotenv

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance available
- Cloudinary account with API credentials

### Install dependencies

```bash
cd /home/aditya/PROJECTS/repoB
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017
DB_NAME=Minions
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the server

```bash
npm run dev
```

The app listens on the configured port and exposes routes under `/api/v1/users`.

## Project Structure

- `src/index.js` — app entrypoint and DB connection
- `src/app.js` — Express app, middleware, and route registration
- `src/routes/user.routes.js` — user-related API routes
- `src/controllers/user.controllers.js` — route handlers
- `src/middlewares/auth.middleware.js` — JWT verification middleware
- `src/middlewares/multer.middleware.js` — file upload middleware
- `src/config/db.js` — MongoDB connection helper
- `src/models/user.models.js` — User schema and auth helpers
- `src/utils/cloudinary.js` — Cloudinary upload helper
- `src/utils/apiResponse.js` — standardized response wrapper
- `src/utils/apiErrors.js` — custom error class

## API Endpoints

### Register

`POST /api/v1/users/register`

Form data fields:

- `fullName` (string, required)
- `email` (string, required)
- `username` (string, required)
- `password` (string, required)
- `avatar` (file, required)
- `coverImage` (file, optional)

Response:

- `201 Created` with created user data (excluding password and refresh token)

### Login

`POST /api/v1/users/login`

JSON body:

```json
{
  "username": "user123",
  "password": "securePass"
}
```

or use `email` instead of `username`.

Response:

- `200 OK` with user data, `accessToken`, and `refreshToken`
- tokens are also set as HTTP-only cookies

### Logout

`POST /api/v1/users/logout`

Requires valid access token in cookie or `Authorization` header.

Response:

- `200 OK` and clears auth cookies

### Refresh Token

`POST /api/v1/users/refreshToken`

Uses refresh token from cookie or request body.

Response:

- `200 OK` with new access and refresh tokens

### Current User

`GET /api/v1/users/current-user`

Protected route.

Response:

- `200 OK` with authenticated user profile

### Update Account

`PATCH /api/v1/users/update-account`

Protected route. JSON body:

```json
{
  "fullName": "New Name",
  "email": "new@example.com"
}
```

Response:

- `200 OK`

### Update Avatar

`PATCH /api/v1/users/update-avatar`

Protected route. Form data with single file field `avatar`.

Response:

- `200 OK` with updated user record

### Update Cover Image

`PATCH /api/v1/users/update-coverimage`

Protected route. Form data with single file field `coverImage`.

Response:

- `200 OK` with updated user record

### Get Channel Profile

`GET /api/v1/users/c/:username`

Protected route.

Response:

- `200 OK` with user channel profile and subscription counts

### Watch History

`GET /api/v1/users/history`

Protected route.

Response:

- `200 OK` with video watch history data

## Upload Handling

- File uploads are stored temporarily in `public/temp` using Multer disk storage.
- Uploaded image files are then sent to Cloudinary via `src/utils/cloudinary.js`.
- Temporary local files are cleaned up if Cloudinary upload fails.

## Notes

- Tokens are signed with `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`.
- Passwords are hashed with bcrypt before saving.
- The app uses `express.json()` and `express.urlencoded()` with a `16kb` limit.
- The global error handler returns JSON with `success`, `message`, and `statusCode`.


## Multer Memory Storage

//diskStorage const storage = multer.diskStorage({ destination: function (req, file, cb) { cb(null, '/tmp/my-uploads') }, filename: function (req, file, cb) { cb(null, file.fieldname + '-' + {Date.now()}) } })

//bufferStorage const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
