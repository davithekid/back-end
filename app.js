import express from "express";
import fs from 'fs';
import axios from "axios";
import  rotaLivros  from './router/router_livros.js'
import rotasAdmin from './router/router_admin.js'
import { log } from "console";
const app = express();
const port = 3000;


const logger = (req, res, next) => {
    const data = new Date();
    console.log(`${data.toISOString()} ${req.method} ${req.url}`)
    next();

    const newLine = `${data.toISOString()} ${req.method} ${req.url}`;
    fs.appendFile('arquivo.txt', newLine, err => {
        if (err) throw err;
        console.log('Logging salvo')
    })
    
}

app.use(logger)

// app.use(logger)
app.use(express.json()); // middleware


// rota padrão
app.get('/' , (req, res) => {
    res.status(200).send('Home')
})

app.use('/livros', rotaLivros)
app.use('/admin', rotasAdmin)

app.use((req, res)=> {
    res.status(404).send('<h1 style="color:red;">ERROR 404... Página não encontrada</h1>');
    // res.send('<p style="color:red;">oops... essa página não existe.</p>');
})

// server rodando
app.listen(port, () => {
    console.log(`Server sendo executado em: http://localhost:${port}`);
})