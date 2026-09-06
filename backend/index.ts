import "reflect-metadata";
import express, { Request, Response } from 'express';
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // Cambiar a usuario de postgres
  password: "admin",    // Cambiar
  database: "farmacia_db",  // Cambiar al nombre de la base de datos
  synchronize: true,    // Crea las tablas
  logging: true,        // Muestra las consultas SQL en la terminal 
  entities: [],         // Aquí agregamos nuestros modelos
})

// Inicializa la conexión a la db y luego levanta express
AppDataSource.initialize()
  .then(() => {
    console.log("conexión a postgres");

    const app = express();
    const port = 3000;

    app.get('/api/status', (req: Request, res: Response) => {
      res.json({ mensaje: '¡El servidor Node.js y BD está funcionando!' });
    });

    app.get('/', (req: Request, res: Response) => {
      res.send('Bienvenido a la raíz del backend http://localhost:${port}');
    });
    app.listen(port, () => {
      console.log(`Servidor backend corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a postgres", error);
  });
