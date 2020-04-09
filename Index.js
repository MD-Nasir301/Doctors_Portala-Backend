const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const app = express()

app.use(cors())
app.use(bodyParser.json())

//database connection start
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });
//database connection  end

// get appointments
app.get('/appointments', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("doctorPortal").collection("appointment");
            collection.find().toArray((err,document) =>{ 
                if(err){
                    console.log(err);
                    res.sent(err.message)
                }else{
                    res.send(document)
                }
              })
          client.close();
        });
})
//

// get by date
app.get('/appointments/:date',(req,res)=>{
    const date = req.params.date
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctorPortal").collection("appointment");
        collection.find({date:date}).toArray((err,document) =>{ 
            if(err){
                console.log(err);
                res.sent(err.message)
            }else{
                res.send(document)
            }
          })
      client.close();
    });
 
})


// book Appointment
    app.post('/bookAppointment',(req,res)=>{
        const client = new MongoClient(uri, { useNewUrlParser: true });
        const appointment = req.body
        client.connect(err => {
            const collection = client.db("doctorPortal").collection("appointment");
            collection.insert(appointment,(err,result) =>{ 
                if(err){
                    console.log(err);
                    res.sent(err.message)
                }else{
                    console.log("after save data ", result.ops[0]);
                    res.send(result.ops[0])
                }
              })
          client.close();
        });
    })

const port = process.env.PORT || 3300
app.listen(port, () => console.log(` listening at http://localhost:${port}`))