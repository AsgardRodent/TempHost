const express = require('express');
const cors = require('cors');
const supabase = require('./database');
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post("/", async (req, res) => {
    const { username, password } = req.body;
    console.log("Username:" + username);
    console.log("Password:" + password);
    console.log(req.body);

    try {
        const { data, error } = await supabase
            .from('userdetails')
            .insert([{ username, password }]);

        if (error) throw error;

        res.status(200).send("Response Received: " + JSON.stringify(req.body));
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error saving user details");
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
