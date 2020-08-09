#!/usr/bin/env node

//Descripcion de dependencias
/*
  Figlet: permite escribir texto con formatos de fuentes en la consola
  chalk: permite dar formato al texto en consola
  inquirer: permite construir preguntas en la terminal


*/

const shelljs = require('shelljs')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')

const hacerPreguntas = () => {
  const preguntas = [
    {
      name: "Fichero",
      type: "input",
      message: "¿Como se va a llamar tu fichero?" 
    },
    {
      name: "Extension",
      type: "list",
      message: "¿Qué extension tiene tu fichero?",
      choices: [".rb",".js",".kt", ".java", ".ts", ".php"],
      filter: function(val) {
        return val.split(".")[1]
      }
    }
  ]

  return inquirer.prompt(preguntas);
}

const iniciar = () => {
    console.log(
        chalk.green(
            figlet.textSync('Creador de ficheros con CLI',
            {
                font: 'Bubble',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    )
}

const crearFichero = (nombreFichero, extension) => {
  const pathFichero = `${process.cwd()}/${nombreFichero}.${extension}`
  shelljs.touch(pathFichero)
  return pathFichero
}

const ejecutar = async () => {
    //Mostrar la info de la libreria en la cabecera, es decir, el título con figlet
    iniciar()
    //Preguntas necesarias para crear el fichero, es decir el nombre y la extensión
    const respuestas = await hacerPreguntas()
    const {Fichero, Extension} = respuestas //corresponden a la variable name de las preguntas en inquirer
    //Creamos el fichero
    const pathFichero = crearFichero(Fichero, Extension)
    //Añadimos el mensaje que el fichero se ha creado correctamente
}

ejecutar()