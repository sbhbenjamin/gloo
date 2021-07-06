import path from "path"
import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import morgan from "morgan"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import conversationRoutes from "./routes/conversationRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import certRoutes from "./routes/certRoutes.js"
import certUploadRoutes from "./routes/certUploadRoutes.js"

import { createServer } from "http"
import { Server } from "socket.io"

dotenv.config()

connectDB() // connect to mongoDB

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/conversations", conversationRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/certUpload", certUploadRoutes)
app.use("/api/certs", certRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use(
  "/frontend/uploads",
  express.static(path.join(__dirname, "/frontend/uploads"))
)
app.use(
  "/frontend/certUploads",
  express.static(path.join(__dirname, "/frontend/certUploads"))
)

// deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("API is running..")
  })
}

app.use(notFound)

app.use(errorHandler)

// socket
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
})

// Run when a client connects
io.on("connection", (socket) => {
  console.log("a user connected.")

  socket.emit("message", "Welcome to Socket")

  // Broadcast when a user connects
  socket.broadcast.emit("message", "A user has joined the conversation")

  // Runs when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the conversation")
  })
})

const PORT = process.env.PORT || 5000

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
