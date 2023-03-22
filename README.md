## KuyNgecafe 🍵

MERN `(MySQL, Express, React, Node)` stack Cafe Cashier App for UKK Framework SMK Telkom Malang.

### Getting Started

First, open your terminal and enter into this project. Then, go into the backend folder and install the required dependencies, and run the development server:

```
# install depedencies
npm install

# run the server
npm run dev
```

Second, open your XAMPP Control Panel (or etc.) and running the server. Then open your phpmyadmin and create database named `db_cafe` or something you like.

Third, don't forget to configure database name on `./backend/config/config.json`. And then running the migrate db command:

```
# running migrate db
sequelize db:migrate
```

Fourth, go into the frontend folder and install the required dependencies, and run the development server:

```
# install depedencies
npm install

# run the server
npm run dev
```

Open [http://localhost:3000](http://localhost:8000) with your browser to see the result.
