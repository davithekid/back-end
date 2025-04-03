import express from "express";
import fs from 'fs'
const router = express.Router();

let livros = [];
try {
    const data = fs.readFileSync('livros.json', 'utf8');
    livros = JSON.parse(data);
} catch (error) {
    console.error('Erro ao ler o arquivo livros.json', error);
    livros = [];
}

// rota inicial /livros
router.get('/', (req, res) => {
    res.status(200).send(livros)
})

// get
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id)

    if (livro) {
        res.send(livro)
    } else {
        res.status(404).send('<h1 style="color:red;">ERROR 404... Produto não encontrado</h1>');
    }
})

// post
router.post('/', (req, res) => {
    const novoLivro = req.body;
    console.log('Novo livro adicionado: ', novoLivro);
    res.status(200).send('Livro adicionado com sucesso!')
})
// patch
router.patch('/:id', (req, res) => {
    const alterado = req.body;
    console.log('Livro alterado com sucesso: ', alterado);
    res.status(200).send('Livro alterado com sucesso!')
})

// delete
router.delete('/:id', (req, res) => {
    const deletado = req.body;
    console.log('Livro deletado com sucesso: ', deletado);
    res.status(200).send('Livro deletado com sucesso!')
})

router.options('/:id', (req, res) =>{
    res.header('Allow' , 'POST, GET, PATCH, DELETE');
    res.status(204).send();
})


export default router;