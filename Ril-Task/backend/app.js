//import all the functions
let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
const bcrypt=require("bcrypt");

let mongoClient = require("mongodb").MongoClient;
let PORT = 3001;
let dbURL = "mongodb://localhost:27017";

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
});

//apply the middleware
app.use(cors());
app.use(bodyParser.json());

//create the the services for app

//bcrpyt password
// const securePassword = async (password)=>{
//     let passwordHash= await bcrypt.hash(password, 10);
//     console.log(passwordHash);
//     let passwordMatch= await bcrypt.compare(password,passwordHash);
//     console.log(passwordMatch)
// }
//creating users 
app.post("/user/create/:id/:name/:pass",(request, response) => {
    let id = parseInt(request.params.id);
    let name = request.params.name;
    let pass = request.params.pass;
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hash = await bcrpyt.hash(pass, saltRounds);
    console.log(name)
    console.log(btoa("pass")); 
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if (error) {
            throw error;
        } else {
            let db = client.db("task");
            db.collection("user").insertOne({_id: id, username: name, password: pass })
            .then((doc) => {
                if (doc != null) {
                    response.status(200).json(doc)
                } else {
                    response.status(404).json({ "message": `Please fill all the  details` })
                }
                client.close();
            });
        }
    })
});

// //Storing users
// app.post("/user/create/:id/:name/:pass",(request, response) => {
//     let id = parseInt(request.params.id);
//     let name = request.params.name;
//     let pass = request.params.pass;
//     // const saltRounds = 10;
//     // const salt = await bcrypt.genSalt(saltRounds);
//     // const hash = await bcrpyt.hash(pass, saltRounds);
//     console.log(name)
//     console.log(btoa("pass")); 
//     mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
//         if (error) {
//             throw error;
//         } else {
//             let db = client.db("task");
//             db.collection("user").insertOne({_id: id, username: name, password: pass })
//             .then((doc) => {
//                 if (doc != null) {
//                     response.status(200).json(doc)
//                 } else {
//                     response.status(404).json({ "message": `Please fill all the  details` })
//                 }
//                 client.close();
//             });
//         }
//     })
// });

// getting all the user
app.get("/user", (request, response) => {
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("task");
            let cursor = db.collection("user").find()
            let users = [];
             
            cursor.forEach((doc,err) => {
                if(err) throw err;
                else users.push(doc);
            }, () => {
                response.json(users);
                client.close();
            })
        }
    });
});

// login service -> /user/:id/:password ---> done
app.get("/user/:name/:pass", (request, response) => {
    let name = request.params.name;
    console.log(name)
    let pass = request.params.pass;
    console.log(pass)
    mongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        } else {
            let db = client.db("task");
            db.collection("user").findOne({ username: name, password: pass })
                .then((doc) => {
                    if (doc != null) { 
                        console.log(doc)
                        response.status(200).json({"message":`Success`})
                    } else {
                        response.status(404).json({ "message": `Sorry Check The Values Inserted!` })
                    }
                    client.close();
                });
            }
        });
    });

// getting all employee details
app.get("/emp", (request, response) => {
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("task");
            let cursor = db.collection("employee").find()
            let employees = [];
             
            cursor.forEach((doc,err) => {
                if(err) throw err;
                else employees.push(doc);
            }, () => {
                response.json(employees);
                client.close();
            })
        }
    });
});

//api for search employee by name
app.get("/emp/name/:name", (request, response) => {
    let name = request.params.name.toLowerCase();
    console.log(name);
    mongoClient.connect( dbURL, { useNewUrlParser :  true}, (error, client) => {
        if(error){
            throw error;
        }
        else{
            let db = client.db("task");
            let cursor = db.collection("employee").find();
            let allEmployee = [];
            let employeeName =[];
            let counter = 0;
            
            cursor.forEach((doc, err)=> {
                if(err) throw err;
                else allEmployee.push(doc);
            }, () => {
                for(let i=0; i<allEmployee.length ; i++){
                    if(allEmployee[i].emp_name.toLowerCase().startsWith(name)){
                        counter++;
                        employeeName.push(allEmployee[i]);
                    }
                }
                if(counter == 0) response.status(404).json({"message":"Employee not Available"});
                else response.json(employeeName);
                client.close();
            });
        }
    });
});

//  adding employees!
// app.get("/emp/:id/:name/:dept/:email/:level",(request, response) => {
//     let id = request.params.id
//     let name = request.params.name;
//     console.log(name)

//     let dept = request.params.dept;
//     console.log(dept)

//     let email = request.params.email;
//     console.log(email)

//     let level = request.params.level;
//     console.log(level)

//     mongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
//         if (error) {
//             throw error;
//         } else {
//             let db = client.db("task");
//             db.collection("employee").insertOne({_id: id, emp_name: name, dept: dept, email: email, level: level })
//             .then((doc) => {
//                 if (doc != null) {
//                     response.status(200).json(doc)
//                 } else {
//                     response.status(404).json({ "message": `Please fill all the  details` })
//                 }
//                 client.close();
//             });
//         }
//     })
// });

app.post("/emp/add",(request, response) => {
    let id = request.body.id
    let name = request.body.name;
    console.log(name)

    let dept = request.body.dept;
    console.log(dept)

    let email = request.body.email;
    console.log(email)

    let level = request.body.level;
    console.log(level)

    mongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        } else {
            let db = client.db("task");
            db.collection("employee").insertOne({_id: id, emp_name: name, dept: dept, email: email, level: level })
            .then((doc) => {
                if (doc != null) {
                    response.status(200).json(doc)
                } else {
                    response.status(404).json({ "message": `Please fill all the  details` })
                }
                client.close();
            });
        }
    })
});



//delete employees
app.get("/deleteUser/:id",(request, response) => {
    let id = request.params.id;
    mongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        } else {
            let db = client.db("task");
            db.collection("employee").deleteOne({_id: id })
            .then((doc) => {
                if (doc != null) {
                    response.status(200).json(doc)
                } else {
                    response.status(404).json({ "message": `Please fill correct ID` })
                }
                client.close();
            });
        }
    })
});


// //Updating employee name!
// app.put("/emp/:id/name/:name", (request, response) => {
//     let id = request.params.id;
//     let name = request.params.name;
//     mongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
//         if (error) {
//             throw error;
//         } else {
//             let db = client.db("task");
//             db.collection("employee").updateOne({ _id: id }, { $set: { emp_name: name} })
//            .then((doc) => {
//                if (doc != null) {
//                    response.json(doc);
//                 } else {
//                     response.json({ "message": `Sorry wrong id ${id} `})
//                 }
//                 client.close();
//             });
//         }
//     });
// });

//updating employee dept
app.put("/emp/update/:id/:dept", (request, response) => {
    // console.log("-------------" )
    console.log(request.params);
    let id = request.params.id;
    let dept = request.params.dept;
    mongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
        console.log(id,dept)
        if (error) {
            throw error;
        } else {
            let db = client.db("task");
            db.collection("employee").updateOne({ _id: id }, { $set: { dept: dept } })
           .then((doc) => {
               if (doc != null) {
                   response.json(doc);
                } else {
                    response.json({ "message": `Sorry wrong id ${id} `})
                }
                client.close();
            });
        }
    });
});

// //updating employee email
// app.put("/emp/:id/email/:email", (request, response) => {
//     let id = request.params.id
//     let email = request.params.email;
//     mongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
//         if (error) {
//             throw error;
//         } else {
//             let db = client.db("task");
//             db.collection("employee").updateOne({ _id: id }, { $set: {  email: email } })
//            .then((doc) => {
//                if (doc != null) {
//                    response.json(doc);
//                 } else {
//                     response.json({ "message": `Sorry wrong id ${id} `})
//                 }
//                 client.close();
//             });
//         }
//     });
// });

// //updating employee level
// app.put("/emp/:id/level/:level", (request, response) => {
//     let id = request.params.id
//     let level = request.params.level;
//     mongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
//         if (error) {
//             throw error;
//         } else {
//             let db = client.db("task");
//             db.collection("employee").updateOne({ _id: id }, { $set: {  level: level } })
//            .then((doc) => {
//                if (doc != null) {
//                    response.json(doc);
//                 } else {
//                     response.json({ "message": `Sorry wrong id ${id} `})
//                 }
//                 client.close();
//             });
//         }
//     });
// });




