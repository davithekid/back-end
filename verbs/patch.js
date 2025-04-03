import axios from 'axios';
import express from "express";

axios.patch('http://localhost:3000/livros/2', {
    id: 2,
    nome: 'Percy Jackson',
    autor: 'nao lembro'
    
})

    .then(response => {
        console.log('Livro Atualizado com sucesso: \n', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })