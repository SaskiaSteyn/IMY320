# IMY320: UX Project

## 📝 Overview of the project

Build acohesive prototype of an exclusively online hobby store. The initial 3 submissions will be formatted to create individual components that will form your
final website. Submission 4 is a compulsory UX evaluation.

For each submission, the group will be provided with a list of functions to be completed and a problem statement (a quote from the owner) that needs to be resolved based on a particular
law of UX design covered in class. The group is required to conduct three (in total) short user experience research on an existing website (UEQ shortened questionnaire), take note of any criteria that scored relatively low/high, and use this to formulate a set of design guidelines. This will also help you establish common feature trends or existing practices used within the industry.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
-   **Git** - [Download here](https://git-scm.com/downloads)
-   **MongoDB Account** - You'll need MongoDB Atlas credentials

### � Download and Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/SaskiaSteyn/IMY320.git
    cd IMY320
    ```

2. **Add the .env file to the project (root folder):**

3. **Start the application:**

    ```bash
    docker compose up --build -d
    ```

4. **Access the application:**

    - **Frontend**: [http://localhost:5173](http://localhost:5173)
    - **Backend**: [http://localhost:3000](http://localhost:3000)
    - **Health Check**: [http://localhost:3000/health](http://localhost:3000/health)

5. **Stop the application:**
    ```bash
    docker compose down
    ```

### 🛠️ Development Setup (Alternative)

If you prefer to run without Docker:

1. **Backend setup:**

    ```bash
    cd backend
    npm install
    npm start
    ```

2. **Frontend setup (in a new terminal):**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### 🔧 Troubleshooting

-   **Environment Issues**: Ensure your `.env` file exists and contains valid MongoDB credentials
-   **Port Conflicts**: If ports 3000 or 5173 are in use, modify the ports in `docker-compose.yml`
-   **Docker Issues**: Try `docker system prune` to clean up Docker cache
-   **Build Failures**: Check logs with `docker compose logs backend` or `docker compose logs frontend`

### 📊 Project Features

The general operations of the website should allow user/customer to log in to access the website, allow browsing the store, add things to a cart, checkout, and check their order history (most general operations for an e-commerce website). In addition to these general operations, your group needs to determine what other features might be needed and implement them accordingly.

## 👥 Group Members

### Saskia Steyn

### Nicolaas Johan Jansen van Rensburg

### Rorisang Manamela
