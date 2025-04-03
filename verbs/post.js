import axios from "axios";
import express from "express";


axios.post('http://localhost:3000/livros/', {
    id: 11,
    titulo: 'One Piece',
    autor: 'Oda'
})

    .then(response => {
        console.log('Livro adicionado com sucesso!', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })

 