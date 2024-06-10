const express = require("express");
const morgan = require("morgan");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Middleware para el registro de solicitudes HTTP
app.use(morgan("dev"));
// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express.json());

// Método GET para obtener todos los feriados
app.get("/feriados", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM feriados");
    const feriados = result.rows;
    client.release();
    res.status(200).json(feriados);
  } catch (error) {
    console.error("Error al obtener los feriados:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Método POST para agregar un nuevo feriado
app.post("/feriados", async (req, res) => {
  try {
    const { fecha, nombre } = req.body;
    const client = await pool.connect();
    const queryText = "INSERT INTO feriados (fecha, nombre) VALUES ($1, $2)";
    const values = [fecha, nombre];
    await client.query(queryText, values);
    client.release();
    res.status(201).send("Feriado agregado correctamente.");
  } catch (error) {
    console.error("Error al agregar el feriado:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Método PUT para actualizar un feriado
app.put("/feriados/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, nombre } = req.body;
    const client = await pool.connect();
    const queryText =
      "UPDATE feriados SET fecha = $1, nombre = $2 WHERE id = $3";
    const values = [fecha, nombre, id];
    await client.query(queryText, values);
    client.release();
    res.status(200).send("Feriado actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el feriado:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Método DELETE para eliminar un feriado
app.delete("/feriados/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    const queryText = "DELETE FROM feriados WHERE id = $1";
    const values = [id];
    await client.query(queryText, values);
    client.release();
    res.status(200).send("Feriado eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el feriado:", error);
    res.status(500).send("Error interno del servidor");
  }
});


const PORT = process.env.PORT || 3000; // Utiliza el puerto proporcionado por Render o 3000 como valor predeterminado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

