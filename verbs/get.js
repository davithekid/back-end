import axios from "axios"
import express from "express"

axios.get('http://localhost:3000/livros/')

    .then(response => {
        console.log('Lista de Livros completa: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })

axios.get('http://localhost:3000/livros/3')

    .then(response => {
        console.log('ID livro recebido: ', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })

