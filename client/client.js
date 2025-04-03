import axios from "axios";
import chalk from "chalk";
import fs from 'fs'
import inquirer from 'inquirer'
import { generateKey } from "crypto";
import { assert } from "console";
const API_URL = 'http://localhost:3000';


fs.readFile('../livros.json', 'utf8', (err, data) => {
    if (err) {
        console.log(chalk.red('Erro ao abrir JSON'), err);
        return;
    }

    const dados = JSON.parse(data);

    async function listaLivros() {
        try {
            const response = await axios.get(`${API_URL}/livros`)
            return response.data;
        } catch (error) {
            console.error(chalk.red('erro ao listar.'), error.message);
            return [];
        }

    }

    async function exibirDetalhesLivro(id) {
        try {
            const response = await axios.get(`${API_URL}/livros/${id}`)
            return response.data;
        } catch (error) {
            console.error(chalk.red(`erro ao exibir livros com id: ${id}`), error.message)
            return null
        }
    }



    async function exibirMenu() {
        console.log('\n');
        const perguntas = [
            {
                type: "list",
                name: "opcao",
                message: chalk.yellow('Escolha uma opção: '),
                choices: [
                    { name: chalk.cyanBright('Exibir Catálogo'), value: 'listar' },
                    { name: chalk.cyanBright('Exibir detalhes do livro'), value: 'exibir' },
                    { name: chalk.cyanBright('Adicionar um livro'), value: 'adicionar' },
                    { name: chalk.cyanBright('Atualizar um livro'), value: 'atualizar' },
                    { name: chalk.cyanBright('Deletar um livro'), value: 'deletar' },
                    { name: chalk.cyanBright('Sair da operação'), value: 'sair' }
                ]
            }

        ]

        try {
            const resposta = await inquirer.prompt(perguntas)

            switch (resposta.opcao) {
                case 'listar':
                    const livros = await listaLivros();

                    if (Array.isArray(livros) && livros.length > 0) {
                        console.log(chalk.green('Lista de livro'))

                        livros.forEach(livro => {
                            console.log(`${chalk.cyan(livro.id)}: ${chalk.blueBright(livro.titulo)} - ${chalk.yellow(livro.autor)}`)
                        })
                    } else {
                        console.log(chalk.yellow('nenhum livro foi encontrado'))
                    }

                    exibirMenu();
                    break;

                case 'adicionar':

                    const adicionarLivro = await inquirer.prompt([
                        {
                            message: "ID do livro: ",
                            type: "input",
                            name: "id",
                        },
                        {
                            message: "Titulo do livro: ",
                            type: "input",
                            name: "nome",
                        },
                        {
                            message: "Autor do livro: ",
                            type: "input",
                            name: "genero"

                        },

                    ]);

                    try {

                        adicionarLivro.id = parseInt(adicionarLivro.id)
                        dados.push(dados.id = adicionarLivro)

                        const jsonData = JSON.stringify(dados, null, 2)

                        console.log(chalk.green('livro adicionado com sucesso!'));
                        fs.writeFileSync('../livros.json', jsonData, err => {
                            if (err) throw err;
                        })

                        axios.post('http://localhost:3000/livros/', {
                            id: adicionarLivro.id,
                            titulo: adicionarLivro.titulo,
                            autor: adicionarLivro.autor
                        })

                            .then(response => {
                                console.log('livro adicionado ao catálogo com sucesso!!!\n: ', response.data)
                            })
                            .catch(error => {
                                console.error('Ocorreu um erro: ', error)
                            })


                    } catch (error) {
                        console.error(error)
                    }
                    exibirMenu();
                    break;

                case 'atualizar':
                    const patchLivro = await inquirer.prompt([
                        {
                            message: "Digite o ID do livro: ",
                            type: "input",
                            name: "id",
                        },
                        {
                            message: "Digite o titulo do livro: ",
                            type: "input",
                            name: "titulo",
                        },
                        {
                            message: "Digite o autor do livro: ",
                            type: "input",
                            name: "autor"

                        },

                    ]);

                    try {
                        patchLivro.id = parseInt(patchLivro.id)
                        
                        dados[patchLivro.id -1] = patchLivro
                        const jsonData = JSON.stringify(dados, null, 2)
                        
                        console.log(chalk.green('Livro atualizado com sucesso!'));
                        fs.writeFileSync('../livros.json', jsonData, err=> {
                            if (err) throw err;
                        })
                        

                    } catch (error) {
                        console.error(error)
                    }
                    exibirMenu();
                    break;

                case 'deletar':
                    const deleteLivro = await inquirer.prompt([
                        {
                            message: "Digite o ID do livro: ",
                            type: "input",
                            name: "id",
                        },

                    ]);

                    try {
                        deleteLivro.id = parseInt(deleteLivro.id)
                        dados.splice(dados.id = deleteLivro.id - 1, 1)
                        const jsonData = JSON.stringify(dados, null, 2)

                        console.log(chalk.green('livro deletado com sucesso!!'));
                        fs.writeFileSync('../livros.json', jsonData, err => {
                            if (err) throw err;
                        })

                        axios.delete(`http://localhost:3000/livros/${deleteLivro.id}`)

                            .then(response => {
                                console.log('livro excluído do catálogo!!!\n', response.data)
                            })
                            .catch(error => {
                                console.error('Ocorreu um erro: ', error)
                            })

                    } catch (error) {
                        console.error(error)
                    }
                    exibirMenu();
                    break;

                case 'exibir':
                    const idReposta = await inquirer.prompt([
                        {
                            type: "input",
                            name: "id",
                            message: chalk.blue('Digite o ID do produto: ')
                        }
                    ]);

                    const livro = await exibirDetalhesCatálogo(idReposta.id);
                    if (livro) {
                        console.log(`${chalk.cyan(livro.id)}: ${chalk.blueBright(livro.titulo)} ${chalk.yellow(livro.autor)}`)
                    } else {
                        console.log(chalk.yellow('livro não encontrado'))
                    }
                    exibirMenu();
                    break;

                case 'sair':
                    console.log(chalk.yellow('Saindo do sistema.'))
                    break;
            }
        } catch (error) {
            console.error('erro', error)
        }

    };
    exibirMenu();
});