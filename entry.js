const express = require("express");
const mysql = require("mysql");
const colors = require("colors");

const app = express();
const PORT = 3005;

// 00. Initialize app
app.use(express.json());

// 01. DB MySQL Connection Setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "g!1234",
  database: "api_database",
});

// 02. Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("DB is Connected!".rainbow);
});

// 03:POST:http://localhost:3005/students
// Create a new student
app.post("/students", (req, res) => {
  const { username, firstname, lastname, email, gender, telephone } = req.body;
  const sql =
    "INSERT INTO `students`(`username`, `firstname`, `lastname`, `email`, `gender`, `telephone`) VALUES (?,?,?,?,?,?)";
  db.query(
    sql,
    [username, firstname, lastname, email, gender, telephone],
    (err, result) => {
      if (err) throw err;
      res.status(201).send({
        message: "success",
        username,
        firstname,
        lastname,
        email,
        gender,
        telephone,
      });
    }
  );
});

// 04:GET:http://localhost:3005/students
// Get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 05:GET:http://localhost:3005/students/:id
// Get single student
app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students WHERE id=?";
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 06:GET:http://localhost:3005/student/:id
// Update a student
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { username, firstname, lastname, email, gender, telephone } =
    req.params;

  const sql =
    "UPDATE students SET username=?, firstname=?, lastname=?, email=?, gender=?, telephone=? WHERE id=?";
  db.query(
    sql,
    [username, firstname, lastname, email, gender, telephone, id],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        return res.status(404).send("User not found!");
      }
      res.send({ id, usename, firstname, lastname, email, gender, telephone });
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
