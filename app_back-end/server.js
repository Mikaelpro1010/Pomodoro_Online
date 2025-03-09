const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb+srv://mikael:mikaelan100@cluster0.gvgsp.mongodb.net/");
  if(!conn) return new Error("Can't connect");
    global.db = await conn.db("Desenvolvimento_Web");
  return global.db;
}

const express = require('express');

const app = express();         
const port = 3000; //porta padrão

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

/* GET user */
router.get('/user/:id?', async function(req, res, next) {
    try{
      const db = await connect();
      if(req.params.id)
        res.json(await db.collection("user").findOne({_id: new ObjectId(req.params.id)}));
      else
        res.json(await db.collection("user").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// POST /register
router.post('/register', async function(req, res, next){
    try{
      const { name, email, password } = req.body;
      const db = await connect();

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {name, email, password: hashedPassword}
      res.json(await db.collection("user").insertOne(user));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// POST /login
router.post('/login', async function(req, res, next){
    try{
      const { email, password } = req.body;
      const db = await connect();

      const userAuth = await db.collection('user').findOne({email});

      if(!userAuth) {
        return res.status(404).json({error: 'Usuário não encontrado!'});
      }

      const passwordValid = await bcrypt.compare(password, userAuth.password);

      if(!passwordValid){
        return res.status(401).json({error: 'Senha inválida!'});
      }
      
      const token = jwt.sign({ id: userAuth._id }, 'def5eb50dca1270a015c1ac2a8569fb69d0584d5fbd76f45e6f706517be1e63d', { expiresIn: '1h' });
      res.json({ token });
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// PUT /user/{id}
router.put('/user/:id', async function(req, res, next){
    try{
      const user = req.body;
      const db = await connect();
      res.json(await db.collection("user").updateOne({_id: new ObjectId(req.params.id)}, {$set: user}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// DELETE /user/{id}
router.delete('/user/:id', async function(req, res, next){
  try{
    const db = await connect();
    res.json(await db.collection("user").deleteOne({_id: new ObjectId(req.params.id)}));
  }
  catch(ex){
    console.log(ex);
    res.status(400).json({erro: `${ex}`});
  }
})

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');