const router = require('express').Router();
const Libro = require('../model/libro');

router.get("/api/libros", async (req, res) => {
    const libros = await Libro.find({})
        return res.status(200).json({libros:libros})
    })

router.post("/api/libros", async (req, res) => {
const {isbn, titulo, autor} = req.body;
    if(!(isbn && titulo && autor)) {
            res.status(400).send("Faltan datos")
        }
        const compruebaIsbn = await Libro.findOne({isbn});

        if(compruebaIsbn){
            return res.status(409).send("ISBN ya existe");
        }

    const crearLibro = await Libro.create({isbn, titulo, autor});
        return res.status(200).send("Libro creado correctamente");
})

router.get("/api/libros/:isbn", async (req, res) => {
    const libroId = req.params.isbn;
    const consulta = {
        isbn:libroId
    }
    const resultado = await Libro.findOne(consulta);

        if(resultado){
            return res.status(200).json({resultado : resultado});
        } else {
            return res.status(404).send(`No se pueden leer los datos de ${libroId}`);
        }
})

router.put("/api/libros/:isbn", async (req, res) => {
const libroId = req.params.isbn;
const modificaIsbn = {
    isbn:libroId
}
const updateLibro = {
    $set: {
        titulo:req.body.titulo,
        autor:req.body.autor
    }
}
const resultado = await Libro.updateOne(modificaIsbn, updateLibro);
    if(resultado.matchedCount === 1){
            return res.status(200).json({message: "Datos actualizados correctamente " + libroId});
        } else {
            return res.status(404).send(`No existe el isbn ${libroId}`);
        }
});

router.delete("/api/libros/:isbn", async (req, res) => {
const libroId = req.params.isbn;

const eliminaIsbn = {
    isbn:libroId
}
const resultado = await Libro.deleteOne(eliminaIsbn);
        if(resultado.deletedCount === 1){
            return res.status(200).json({message:`Libro ${libroId} eliminado correctamente`});
        } else {
            return res.status(404).send(`No existe el código ${libroId}`);
        }
});

module.exports = router;