"use strict";

/*
  Caminho relativo: scripts\main.js;
  Descrição: Arquivo único para definições JS;
  Autor: Samuel Tank;
  Data de criação: 05/Jun/2023, 01:36;
  Última modificação: 05/Jun/2023, 01:36;

*/

const btnEncrypt = document.querySelector(".app__encrypt");
const btnDecrypt = document.querySelector(".app__decrypt");
const btnCopy = document.querySelector(".app__copy");
const inputText = document.querySelector(".app__input-box");
const outputText = document.querySelector(".app__output-box");

const ciphers = new Map([
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
]);

const activeOut = () => {
  if (outputText.value === "") return;

  const classHidden = "is-hidden";
  const adjustSection = "app__output--activated";

  /* Esconde a imagem e os textos */
  document.querySelector(".app__out-woman-img").classList.add(classHidden);
  document.querySelector(".app__msg-block").classList.add(classHidden);

  /* Ativa a caixa de saída e o botão "copiar" */
  outputText.classList.remove(classHidden);
  btnCopy.classList.remove(classHidden);

  /* Ajuste da seção */
  document.querySelector(".app__output").classList.add(adjustSection);
}

/* converte todas os caracteres para minúsculo */
inputText.addEventListener("input", (event) => {
  let btnDisabled = "app__decrypt--disabled";
  const input = event.target;
  input.value = input.value.toLowerCase();

  if (inputText.value !== "") {
    btnDecrypt.classList.remove(btnDisabled);
    btnDecrypt.addEventListener("click", decrypt, true);
  } else {
    btnDecrypt.classList.add(btnDisabled);
    btnDecrypt.removeEventListener("click", decrypt, true);
  }
});

/* Encripta a mensagem */
const encrypt = () => {
  let input = inputText.value;

  ciphers.forEach((value, key) => {
    input = input.replaceAll(key, value);
  });

  outputText.textContent = input;

  activeOut();
}

/* Decripta a mensagem */
const decrypt = () => {
  let input = inputText.value;

  ciphers.forEach((value, key) => {
    input = input.replaceAll(value, key);
  });

  outputText.textContent = input;

  console.log("Clicou!");

  activeOut();
}

/* Faz o resguardo do conteúdo na área de transferência do navegador */
const clipboardCopy = async () => {
  /* FAZER: tratar a rejeição do Promise */
  let txt = outputText.value;
  if (txt === "") return;
  await navigator.clipboard.writeText(txt);

  console.log("copiado");
}

/* Ativa a função ao clicar no botão "copiar" */
btnCopy.addEventListener("click", () => {
  /*
  continua retornando undefined - IIFE resolve
  */
  (async () => {
    await clipboardCopy();
  })();
});

btnEncrypt.addEventListener("click", encrypt);
