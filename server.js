const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Allow frontend to communicate with backend (CORS policy)
app.use(cors());

// API route to handle form submission
app.post("/submit", (req, res) => {
    const newData = req.body; // Get data from request body

    // Read existing data from data.json
    fs.readFile("data.json", (err, fileData) => {
        let jsonData = [];
        if (!err && fileData.length) {
            jsonData = JSON.parse(fileData);
        }

        // Add new data to the array
        jsonData.push(newData);

        // Write updated data back to file
        fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Error saving data" });
            }
            res.json({ message: "Data saved successfully!" });
        });
    });
});

// API route to retrieve stored submissions
app.get("/submissions", (req, res) => {
    fs.readFile("data.json", (err, fileData) => {
        if (err || !fileData.length) {
            return res.json([]);
        }
        res.json(JSON.parse(fileData));
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
