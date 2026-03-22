const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" })
})

// Sample API
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Sara" }
  ])
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})