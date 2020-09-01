const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let database = {
    users: [
        {
            id:'1',
            name:'john',
            email:'john@gmail.com',
            password:'banana',
            entries:0
        },
        {
            id:'2',
            name:'sara',
            email:'sara@gmail.com',
            password:'apple',
            entries:0
        },
    ]
}

app.get('/', (req, res)=>{
    res.json(database.users)
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    } else{
        res.status(404).json('error Logging In')
    }
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id:'3',
        name:name,
        email:email,
        password:password,
        entries:0,
        joind: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach((user) => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).json('User Not found')
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json('user Not Found')
    }
})

app.listen(3001);