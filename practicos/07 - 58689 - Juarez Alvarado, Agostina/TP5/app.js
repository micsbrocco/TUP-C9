import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Agostina', apellido: 'Juarez', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Maria', apellido: 'Becerra', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Facundo', apellido: 'Diaz', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Marcelo', apellido: 'Diaz', edad: 28, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Leonel', apellido: 'Guzman', edad: 22, borrado: false, actualizado: Date.now() },
];

app.get('/personas', (req, res) => {
    const activas = datos.filter(persona => !persona.borrado);
    res.status(200).json(activas);
});

app.put('/personas', (req, res) => {
    const persona = req.body;

    if (persona.id) {
        const index = datos.findIndex(p => p.id === persona.id);
        if (index !== -1) {
            if (persona.borrado) {
                datos[index].borrado = true;
                datos[index].actualizado = Date.now();
            } else {
                datos[index] = { ...datos[index], ...persona, actualizado: Date.now() };
            }
            res.status(201).json(datos[index]);
        } else {
            res.status(404).send({ error: 'Persona no encontrada' });
        }
    } else {
        persona.id = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        persona.actualizado = Date.now();
        datos.push(persona);
        res.status(201).json(persona);
    }
});

export default app;
