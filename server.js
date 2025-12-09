import app from "./src/app.js";
import sequelize from "./src/config/database.js";

const port = process.env.PORT || 3000;


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    console.log("Models synchronized");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Database error:", err);
  }
}

startServer();
