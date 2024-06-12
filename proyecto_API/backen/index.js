

const express = require("express");
const cors= require('cors');
const morgan = require("morgan");
//const path = require('path'); // Importa el módulo 'path'
const { Pool } = require("pg");
require("dotenv").config();


const app = express();

//enlace con la bd
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:true
  
});

// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express.json({
  type : "*/*"
}));

// Middleware para el registro de solicitudes HTTP
app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended:true
  })
)

app.use(cors());




app.get('/tiem',async (req,res)=>{
   const result = await pool.query('SELECT NOw()')
   return res.send.json(result.rows[0])
})


// Crear la tabla `feriados` si no existe
app.get("/create-table", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS feriados (
        id SERIAL PRIMARY KEY,
        fecha DATE NOT NULL,
        nombre VARCHAR(255) NOT NULL
      )
    `);
    client.release();
    res.status(200).send("Tabla `feriados` creada o ya existe.");
  } catch (error) {
    console.error("Error al crear la tabla:", error);
    res.status(500).send("Error interno del servidor");
  }
});


//METODO POST para agregar un feriado
app.post ('feriados', async (req,res)=>{
     try{
      const client = await pool.connect();
      const result = await client.query('INSERT INTO feriados(fecha,nombre) VALUES($1,$2) RETURNING*',[fecha,nombre]);
      const nuevoFeriado = result.rows[0];
      client.release();
      res.status(201).json(nuevoFeriado);

     }catch(error){
      console.error("error al agregar feriado: ", error);
      res.status(500).send('error del servidor');
     }
});




// Método GET para obtener todos los feriados
app.get("/feriados", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM feriados");
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener los feriados:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Servir el archivo HTML principal
app.use(express.static('public'));



app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
