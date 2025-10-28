# IMY320: UX Project

## 📝 Overview of the project

Build acohesive prototype of an exclusively online hobby store. The initial 3 submissions will be formatted to create individual components that will form your
final website. Submission 4 is a compulsory UX evaluation.

For each submission, the group will be provided with a list of functions to be completed and a problem statement (a quote from the owner) that needs to be resolved based on a particular
law of UX design covered in class. The group is required to conduct three (in total) short user experience research on an existing website (UEQ shortened questionnaire), take note of any criteria that scored relatively low/high, and use this to formulate a set of design guidelines. This will also help you establish common feature trends or existing practices used within the industry.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **MongoDB Account** - You'll need MongoDB Atlas credentials

### � Download and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SaskiaSteyn/IMY320.git
   cd IMY320
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Configure your environment variables:**
   
   Open the `.env` file and add your MongoDB credentials:
   ```env
   DB_USERNAME=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   ```
   
   > ⚠️ **Important**: Never commit your `.env` file to the repository. It contains sensitive credentials.

### 🐳 Running with Docker (Recommended)

1. **Start the application:**
   ```bash
   docker compose up --build -d
   ```

2. **Access the application:**
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend**: [http://localhost:3000](http://localhost:3000)
   - **Health Check**: [http://localhost:3000/health](http://localhost:3000/health)

3. **Stop the application:**
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

- **Environment Issues**: Ensure your `.env` file exists and contains valid MongoDB credentials
- **Port Conflicts**: If ports 3000 or 5173 are in use, modify the ports in `docker-compose.yml`
- **Docker Issues**: Try `docker system prune` to clean up Docker cache
- **Build Failures**: Check logs with `docker compose logs backend` or `docker compose logs frontend`

### 📊 Project Features

The general operations of the website should allow user/customer to log in to access the website, allow browsing the store, add things to a cart, checkout, and check their order history (most general operations for an e-commerce website). In addition to these general operations, your group needs to determine what other features might be needed and implement them accordingly.

### 📋 Most Recent Submission

#### 🎯 **Group Design C: Customer Experience**

_Submitted: September 7, 2025_ ✅

---

## 📑 **Design Documentation: Design C**

-   📝 **[Design Choices - Adding Products](https://drive.google.com/file/d/1Kqg1pw5aQID_FPXTNl3Wko8n62zJmnEX/view?usp=sharing)** _(PDF)_

    > _Comprehensive design decisions and rationale for product addition features_

-   📊 **[UX Reports - Adding Products](https://drive.google.com/file/d/1Cw7NkZiagfajNBoCgHfXmpaVkmBlRZ98/view?usp=sharing)** _(PDF)_
    > _Detailed user experience analysis and evaluation findings_

##### 📈 **UEQ Comparative Analysis**

| Platform                                                                                                                                                  | Report Type    | Analysis Focus                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------- |
| **[PnP](https://docs.google.com/spreadsheets/d/1hvjZeoK7GhmQdQLNAWHxzuekNeYtn9G6/edit?usp=sharing&ouid=111657660373980998331&rtpof=true&sd=true)**        | UEQ Evaluation | Grocery e-commerce UX patterns      |
| **[Takealot](https://docs.google.com/spreadsheets/d/1bKoPtM3RIuO20NY_Q7pnigq0KrI46VdU/edit?usp=sharing&ouid=111657660373980998331&rtpof=true&sd=true)**   | UEQ Evaluation | General marketplace design analysis |
| **[Shopify](https://docs.google.com/spreadsheets/d/1KSN6UgQ1vS0TdyU0IcjfmIvuxwupxGnG/edit?usp=sharing&ouid=111657660373980998331&rtpof=true&sd=true)** | UEQ Evaluation | E-commerce platform benchmarking    |

> **Research Methodology**: User Experience Questionnaire (UEQ) shortened format applied across three major e-commerce platforms to establish industry benchmarks and identify optimization opportunities.

The general operations of the website should allow user/customer to log in to access the website, allow browsing the store, add things to a cart, checkout, and check their order history (most general operations for an e-commerce website). In addition to these general operations, your group needs to determine what other features might be needed and implement them accordingly.

## 👥 Group Members

### Saskia Steyn

### Nicolaas Johan Jansen van Rensburg

### Rorisang Manamela
