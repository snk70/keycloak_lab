let PORT=1100;

const express = require("express");

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Laptop"
        },
        {
            id: 2,
            name: "Phone"
        }
    ]);
});

app.listen(PORT, () => {
    console.log(`Product API running on port ${PORT}`);
});