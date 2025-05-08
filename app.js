const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const userRoutes = require("./routes/user");

const applicationRoutes = require("./routes/Application")

const jobRoutes = require("./routes/Job")



const app = express();

const PORT = 4080;

// const db = mysql.createConnection({

//     host: "217.21.84.1",
//     user: "u949388422_navneet",
//     password: "Nav@1803",
//     database: "u949388422_navneet"
// });

// db.connect((err) => {
//     if (err) {
//         console.log("Failed to connect to the database", err)
//         return
//     }

//     console.log("Connected to the database")
// })

// db.query('SELECT * FROM user', (err, results) => {

//     if (err) {
//         console.error('Failed to fetch the data', err)
//     }
//     else {
//         console.log("Succesfully Fetched the data", results);
//     }

// })


app.use(express.json());

// If you are sending form-data (URL-encoded), add this too:
app.use(express.urlencoded({ extended: true }));

const db = require("./models")


app.use("/application", applicationRoutes);


app.use("/user", userRoutes);
app.use("/job", jobRoutes);



app.get('/', (req, res) => {
    res.send("WElcome to ehte portst")

});

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
});



// db.sequelize.sync().then((req) => {
//     app.listen(PORT, () => { console.log(`The project is running on the port number: ${PORT}`) })

// });




app.listen(PORT, () => {
    console.log(`The project is running on the port number: ${PORT}`);
});






console.log("hello my niggadasfasdff");

console.log("to the dawn");

console.log("hehehehe");


function add(a, b) {
    return a + b;
}


function sub(a, b) {
    return a - b;
}
















