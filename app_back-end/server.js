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
const port = 3333; //porta padrão

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
  try {
    const { email, password } = req.body;

    // Verifique se o email e a senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios!' });
    }

    const db = await connect();
    const userAuth = await db.collection('user').findOne({ email });

    if (!userAuth) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    // Verificando se a senha fornecida corresponde à senha armazenada no banco
    const passwordValid = await bcrypt.compare(password, userAuth.password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Senha inválida!' });
    }

    // Criando o token JWT com expiração de 1 hora
    const token = jwt.sign({ id: userAuth._id }, 'def5eb50dca1270a015c1ac2a8569fb69d0584d5fbd76f45e6f706517be1e63d', { expiresIn: '1h' });

    return res.json({ token }); // Retorna o token JWT ao usuário
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
  }
});

// PUT /user/{id}
// router.put('/user/:id', async function(req, res, next){
//     try{
//       const user = req.body;
//       const db = await connect();
//       res.json(await db.collection("user").updateOne({_id: new ObjectId(req.params.id)}, {$set: user}));
//     }
//     catch(ex){
//       console.log(ex);
//       res.status(400).json({erro: `${ex}`});
//     }
// })

// DELETE /user/{id}
// router.delete('/user/:id', async function(req, res, next){
//   try{
//     const db = await connect();
//     res.json(await db.collection("user").deleteOne({_id: new ObjectId(req.params.id)}));
//   }
//   catch(ex){
//     console.log(ex);
//     res.status(400).json({erro: `${ex}`});
//   }
// })

//Rota do To do List
router.post('/tasks', async function(req, res, next) {
  try {
    const { description } = req.body;
    const db = await connect();

    // Pega o ID do usuário do token JWT
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'def5eb50dca1270a015c1ac2a8569fb69d0584d5fbd76f45e6f706517be1e63d');
    const userId = decoded.id;

    const task = {
      user_id: new ObjectId(userId),
      description,
      completed: false,
      created_at: new Date()
    };

    const result = await db.collection("tasks").insertOne(task);
    res.status(201).json(result);
  }
  catch(ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
});

router.get('/tasks', async function(req, res, next) {
  try {
    const db = await connect();

    // Pega o ID do usuário do token JWT
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'def5eb50dca1270a015c1ac2a8569fb69d0584d5fbd76f45e6f706517be1e63d');
    const userId = decoded.id;

    const tasks = await db.collection("tasks")
      .find({ user_id: new ObjectId(userId) })
      .toArray();

    res.json(tasks);
  }
  catch(ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
});

router.put('/tasks/:id', async function(req, res, next){
    try{
      const tasks = req.body;
      const db = await connect();
      res.json(await db.collection("tasks").updateOne({_id: new ObjectId(req.params.id)}, {$set: tasks}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})


router.delete('/tasks/:id', async function(req, res, next) {
  try {
    const db = await connect();

    // Verifica se a tarefa pertence ao usuário
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'def5eb50dca1270a015c1ac2a8569fb69d0584d5fbd76f45e6f706517be1e63d');
    const userId = decoded.id;

    const taskId = new ObjectId(req.params.id);

    const result = await db.collection("tasks").deleteOne(
      { _id: taskId, user_id: new ObjectId(userId) }
    );

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada ou não pertence ao usuário." });
    }

    res.json(result);
  }
  catch(ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
});


app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');