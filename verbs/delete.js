import axios from 'axios';
import express from "express";

axios.delete('http://localhost:3000/livros/1')
   
    .then(response => {
        console.log('Livro excluído do catálogo!', response.data)
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error)
    })