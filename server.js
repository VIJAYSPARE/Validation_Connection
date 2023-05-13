//import 'semantic-ui-css/semantic.min.css'

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({

    //port: "3306",
    user: "root",
    host: "localhost",
    password: "password",
    database: "userdb",
});


//create route

app.post("/registration", (req, res) => {


    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const mobilenumber = req.body.mobilenumber;



    const username = req.body.username;
    const password = req.body.password;

 // 1.find out data from the table using the entered user name .....select statement 
 // 2.if value is getting in the result, then show error message.
 // 3.else insert the value



    /* db.query(
        "INSERT INTO user(firstname,lastname,email,mobilenumber,username, password) VALUES (?,?,?,?,?,?)",
        [firstname,lastname,email,mobilenumber,username, password],
        (err, result) => {

            console.log(err);
        }
  
    );
}); */




db.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {

        if (err) {
           res.send({err:err});

        } 

            if (result.length > 0) {

                res.send(result);
            } else {

               // res.send({message:"Wrong username/ password combination!"});
               res.send({message:"Registration Successful..!!"});

                db.query(

                "INSERT INTO user(firstname,lastname,email,mobilenumber,username, password) VALUES (?,?,?,?,?,?)",
        [firstname,lastname,email,mobilenumber,username, password],
        (err, result) => {

            console.log(err);
        }
        
        );



            }

    }
);


});



















app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

     db.query(
        "SELECT * FROM user WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {

            if (err) {
               res.send({err:err});

            } 

                if (result.length > 0) {

                    res.send(result);
                } else {

                    res.send({message:"Wrong username/ password combination!"});
                }

        }
    );


}); 




app.listen(3001, () => {

    console.log("running server");
}); 



