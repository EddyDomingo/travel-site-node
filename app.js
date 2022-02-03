// 1. Required Dependencies
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');

//2.Create express app instance
const app = express();

//3. connect to mongodb
const dbURI = SECRET
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

//4. Register view engine include listen
app.set('view engine', 'ejs');
// app.listen(3000);

//5. Static files to serve to browser
app.use(express.static('public'));

//6. Get information from url from
app.use(express.urlencoded({extended: true}));

// mongoose routes 
// save new document
app.get('/add-user', (req, res) =>{
    const user = new User({
        name: 'Amanda',
        email: "amanda@some.com",
        password: "1234567"
    });

    user.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err) =>{
        console.log(err);
    })
});
// get all documents
app.get('/all-users',(req, res)=>{
    User.find()
    .then((result)=>{
       res.send(result); 
    })
    .catch((err)=>{
        console.log(err);
    })
})
// get single documents by ID
app.get('/single-user', (req,res) =>{
    User.findById('61f36208160d70bfa96b3344')
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.log(err);
    })
})

app.post('/all-users', async (req, res) =>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    user.save()
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err) =>{
        console.log(err);
    })

})

app.post('/login-users', async (req, res) =>{
   const user = User.findOne({name: req.body.name}, async function(err, user){
       console.log('User Found')
       try{
        if(await bcrypt.compare(req.body.password, user.password)){
          res.redirect('/')
        } else{
            console.log('Not Allowed')
        }
     } catch {
         res.status(500).send()
     }
   })
  
  

})



app.get('/', (req, res)=>{
    res.render('index', {title: 'Home'})
})

app.get('/category', (req, res)=>{
    res.render('category', {title: 'Category'})
})

app.get('/destination', (req, res)=>{
    res.render('destination', {title: 'Destination'})
})

app.get('/bookTrip', (req, res)=>{
    res.render('bookTrip', {title: 'Book-Trip'})
})

app.get('/signUp', (req, res)=>{
    res.render('signUp', {title: 'Sign-Up'})
})

app.get('/login', (req, res)=>{
    res.render('login', {title: 'Login'})
})
