import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routesApiCaller from "./routes/routes_api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5100;
//const TOKEN_KEY = process.env.TOKEN_KEY; // when you create .env file to add custom TOKEN_KEY
const TOKEN_KEY = 'aw482qQweu299Xo';
app.use(cors());
app.use(express.json());

// 🔐 Auth middleware
app.use((req, res, next) => {
  const clientToken = req.headers["x-api-key"];
  if (!clientToken) {
    return res.status(401).json({ status: false, error: "Token Key Not Found." });
  }
  if (clientToken !== TOKEN_KEY) {
    return res.status(403).json({ status: false, error: "Invalid API token." });
  }
  next();
});

// ✅ API Routes
app.use("/funblast", routesApiCaller);

// 🌐 Redirect root
app.get("/", (req, res) => {
  res.redirect("https://github.com/rahul-hytrox/funblastAPI");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 funblast API running securely on port ${PORT}`);
});
