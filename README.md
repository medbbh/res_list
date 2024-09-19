# How to Run Django REST + Vite React App

This README provides instructions on how to run the Django REST Framework backend and Vite React frontend.

## Prerequisites

Ensure you have the following installed:
- Python 3.8+
- Node.js 14+
- Pipenv
- npm

## Running the Backend (Django REST Framework)

1. Navigate to the project root directory.

2. Activate the Pipenv shell:
   ```
   pipenv shell
   ```

3. Run the Django development server:
   ```
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`.

## Running the Frontend (Vite React)

1. Open a new terminal window.

2. Navigate to the frontend directory:
   ```
   cd frontend
   ```

3. Install dependencies (if not already done):
   ```
   npm install
   ```

4. Start the Vite development server:
   ```
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

## Accessing the Application

With both servers running, you can access the full application by opening `http://localhost:5173` in your web browser.

## Stopping the Application

To stop the servers:
1. Press `Ctrl + C` in each terminal window.
2. Deactivate the Pipenv shell by typing `exit` or `deactivate`.
