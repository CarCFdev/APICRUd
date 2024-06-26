/*

const express = require("express");
const cors= require('cors');
const morgan = require("morgan");
//const path = require('path'); // Importa el módulo 'path'
const { Pool } = require("pg");
require("dotenv").config();
*/const express = require('express');
require('dotenv').config();
const { Pool } = require('pg'); // Importar pg usando require

// Crear una nueva aplicación Express
const app = express();

// Conectar a la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Para evitar problemas con SSL
  },
  connectionTimeoutMillis: 5000, // Tiempo de espera de conexión en milisegundos
  idleTimeoutMillis: 10000, // Tiempo de espera de inactividad en milisegundos
  max: 10 // Número máximo de conexiones en el pool
});

// Manejar errores de conexión a la base de datos
pool.on('error', (err) => {
  console.error('Error en el cliente de la base de datos:', err);
});

// Definir una ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al realizar la consulta', error);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

/*
const app = express();

//enlace con la bd
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:true
  
});

// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express.json({
  type : "*//*"
}));  */
/*
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
*/