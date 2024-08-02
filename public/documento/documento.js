import { emitirDocumento, emitirExcluirDocumento, emitirTextoEditor } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const textoEditor = document.getElementById("editor-texto");
const nomeDocumento = parametros.get("nome");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
const listaUsuarios = document.getElementById("usuarios-conectados");

tituloDocumento.textContent = nomeDocumento || "Documento sem titulo";

function tratarAutorizacaoSucesso(payloadToken){
    emitirDocumento({nomeDocumento, nomeUsuario: payloadToken.nomeUsuario});
}

function  atualizarInterfacesUsuarios(usuariosNoDocumento){
    listaUsuarios.innerHTML = "";

    usuariosNoDocumento.forEach((usuario) => {
        listaUsuarios.innerHTML += `
             <li class="list-group-item">${usuario}</li>
        `
    });
}

textoEditor.addEventListener("keyup", () => {
   emitirTextoEditor({
    texto: textoEditor.value, 
    nomeDocumento,
});
});


function atualizaTextoeditor(texto){
    textoEditor.value = texto;
}

function alertarEredirecionar(nome){
    if(nome === nomeDocumento){
        alert(`Documento ${nome} foi removido com sucesso!`);
        window.location.href = "/";
    }
}

botaoExcluir.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir este documento?")) {
        if (nomeDocumento) {
            emitirExcluirDocumento(nomeDocumento);
        }
    }
});

export { atualizaTextoeditor, alertarEredirecionar, tratarAutorizacaoSucesso, atualizarInterfacesUsuarios };