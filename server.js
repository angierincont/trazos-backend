const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   CLIENTES
========================= */

// INSERTAR CLIENTE
app.post("/clientes", async (req, res) => {

  const { nombre, email, telefono, activo } = req.body;

  try {

    const sql = "INSERT INTO clientes (nombre,email,telefono,activo) VALUES (?,?,?,?)";

    await db.query(sql,[nombre,email,telefono,activo]);

    res.json({message:"Cliente agregado correctamente"});

  } catch(err){

    res.status(500).json(err);

  }

});


// OBTENER CLIENTES
app.get("/clientes", async (req,res)=>{

  try{

    const [rows] = await db.query("SELECT * FROM clientes");

    res.json(rows);

  }catch(err){

    res.status(500).json(err);

  }

});


/* =========================
   REGISTRO USUARIO
========================= */

app.post("/register", async (req,res)=>{

  const {nombre,email,password,rol} = req.body;

  try{

    const sql = `
      INSERT INTO usuarios (nombre,email,password,rol)
      VALUES (?,?,?,?)
    `;

    await db.query(sql,[nombre,email,password,rol]);

    res.json({message:"Usuario registrado correctamente"});

  }catch(err){

    res.status(500).json({
      message:"Error al registrar usuario"
    });

  }

});


/* =========================
   LOGIN
========================= */

app.post("/login", async (req,res)=>{

  const {email,password} = req.body;

  try{

    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email=? AND password=?",
      [email,password]
    );

    if(rows.length > 0){

      res.json({
        success:true,
        usuario:rows[0]
      });

    }else{

      res.json({
        success:false
      });

    }

  }catch(err){

    res.status(500).json(err);

  }

});

app.listen(3000,()=>{

  console.log("Servidor corriendo en puerto 3000");

});