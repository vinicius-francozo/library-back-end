const express = require("express");
const CustomError = require("./utils/CustomError");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/authentication");
const authorRoutes = require("./routes/authors");
const categoryRoutes = require("./routes/categories");
const reviewRoutes = require("./routes/reviews");
const favoriteRoutes = require("./routes/favorites");
const rentRoutes = require("./routes/rents");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ exposedHeaders: ["x-access-token"] }));

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/rents", rentRoutes);
app.use("/authors", authorRoutes);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Não foi possível encontrar ${req.originalUrl}`,
    404
  );
  next(err);
});

// middlewares

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message || "Algo deu errado",
  });
});

app.listen(3001, () => {
  console.log("Server running");
});
