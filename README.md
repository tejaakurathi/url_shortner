# URL Shortener Microservices Project

A scalable **URL Shortener** application built with **React**, **Node.js**, and **Microsoft SQL Server**, using a **microservices architecture**. Each service handles a specific responsibility, improving modularity and maintainability.

---

## 🚀 Features

- Shorten long URLs into concise links.
- Track clicks per URL in real-time.
- Simple user authentication (registration/login).
- Microservices architecture for scalability:
  - **AuthService** – Handles user registration and login.
  - **URLService** – Handles URL creation and redirection.
  - **AnalysisService** – Tracks analytics and click counts.
- Responsive React frontend.
- RESTful APIs for inter-service communication.

---

## 🛠️ Tech Stack

- **Frontend:** React, HTML, CSS, JavaScript
- **Backend / Microservices:** Node.js, Express.js
- **Database:** Microsoft SQL Server (SSMS)
- **Authentication:** Simple username/password authentication
- **Inter-service communication:** REST API calls

---

## ⚙️ Installation

### Prerequisites

- Node.js & npm
- SQL Server / SSMS
- Git

### Setup Microservices

```bash
# Clone the repo
git clone https://github.com/tejaakurathi/url_shortner
cd url-shortener

# Navigate to each service and install dependencies
cd authservice
npm install
cd ../urlservice
npm install
cd ../analysisservice
npm install

# Start each service (preferably in separate terminals)
cd authservice && npm start
cd ../urlservice && npm start
cd ../analysisservice && npm start
#Front End Setup
cd ../frontend
npm install
npm start
Frontend runs at http://localhost:5173
```

