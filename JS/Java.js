
//Progress Bar
$(document).ready(function(){

    //Progress breakAfter: 
    let containerA = document.getElementById("circuloA");
    
    let circuloA = new ProgressBar.Circle(containerA,{
        color: '#65DAF9',
        strokeWidth: 8,
        duration: 1400,
        from: {color: '#AAA'},
        to: {color: '#65DAF9'},
        
        step: function(state, circle){
            circle.path.setAttribute('stroke', state.color);
            let value = Math.round(circle.value() * 60);

            circle.setText(value);
        }
    });

    //Circulo B
    let containerB = document.getElementById("circuloB");
    
    let circuloB = new ProgressBar.Circle(containerB,{
        color: '#65DAF9',
        strokeWidth: 8,
        duration: 1600,
        from: {color: '#AAA'},
        to: {color: '#65DAF9'},
        
        step: function(state, circle){
            circle.path.setAttribute('stroke', state.color);
            let value = Math.round(circle.value() * 254);

            circle.setText(value);
        }
    });

    //Circulo c
    let containerC = document.getElementById("circuloC");
    
    let circuloC = new ProgressBar.Circle(containerC,{
        color: '#65DAF9',
        strokeWidth: 8,
        duration: 2000,
        from: {color: '#AAA'},
        to: {color: '#65DAF9'},
        
        step: function(state, circle){
            circle.path.setAttribute('stroke', state.color);
            let value = Math.round(circle.value() * 32);

            circle.setText(value);
        }
    });

    //Circulo D
    let containerD = document.getElementById("circuloD");
    
    let circuloD = new ProgressBar.Circle(containerD,{
        color: '#65DAF9',
        strokeWidth: 8,
        duration: 2200,
        from: {color: '#AAA'},
        to: {color: '#65DAF9'},
        
        step: function(state, circle){
            circle.path.setAttribute('stroke', state.color);
            let value = Math.round(circle.value() * 5240);

            circle.setText(value);
        }
    });
    //Iniciciando o loader
    let dataAreaOffset = $('#data-area').offset();
    let stop = 0;

    $(window).scroll(function(e) {
        let scroll = $(window).scrollTop();
        if(scroll > (dataAreaOffset.top - 500) && stop ==0 ){
             //Inicializar as animações
            circuloA.animate(1.0);
            circuloB.animate(1.0);
            circuloC.animate(1.0);
            circuloD.animate(1.0);

            stop = 1;
        }
    });

    //Paralax
    

    //filtro de portfólio
    $('.filter-btn').on('click', function(){
        let type = $(this).attr('id');
        let boxes =$('.project-box');

        $('.main-btn').removeClass('active');
        $(this).addClass('active');
        
        if(type =='dsg-btn'){
            eachBox('dsg', boxes)
        } else if(type =='dev-btn'){
            eachBox('dev', boxes)
        } else if (type =='seo-btn'){
            eachBox('seo', boxes)
        } else {
            eachBox('all', boxes)
        }


    })
    function eachBox(type, boxes){
        if(type =="all"){
            $(boxes).fadeIn();
        } else{
            $(boxes).each(function(){
                if(!$(this).hasClass(type)){
                    $(this).fadeOut('slow');
                } else{
                    $(this).fadeIn();
                }
            })
        }
    }
   //Scrool para Seccoes
    let navBtn = $('.nav-item');

    let bannerSection = $('#mainSlider');
    let aboutSection = $('#about-area');
    let servicesSection = $('#services-area');
    let teamSection = $('#team-area');
    let portfolioSection = $('#portfolio-area');
    let contactSection = $('#contact-area');

    let scrollTo = '';

    $(navBtn).click(function() {

        let btnId = $(this).attr('id');

        if(btnId == 'about-menu') {
        scrollTo = aboutSection;
        } else if(btnId == 'services-menu') {
        scrollTo = servicesSection;
        } else if(btnId == 'team-menu') {
        scrollTo = teamSection;
        } else if(btnId == 'portfolio-menu') {
        scrollTo = portfolioSection;
        } else if(btnId == 'contact-menu') {
        scrollTo = contactSection;
        } else {
        scrollTo = bannerSection;
        } 
    });
});




//area Votar

function inserir(valor){
    let valor1 = document.getElementById("valor1").value;
    let valor2 = document.getElementById("valor2").value;

    if(valor1 ==""){
        document.getElementById("valor1").value = valor;
    } else if(valor2 ==""){
        document.getElementById("valor2").value = valor;
    }
}

function corrigir(){
    document.getElementById("valor1").value = null;
    document.getElementById("valor2").value = null;

}

function votar(){
    let valor1 = parseInt(document.getElementById("valor1").value);
    let valor2 = parseInt(document.getElementById("valor2").value);

    let candidato =(valor1*10)+ valor2;
    if(sessionStorage.getItem(candidato) !== null){
        let votos = parseInt(sessionStorage.getItem(candidato)) +1;
        sessionStorage.setItem(candidato, votos)
    } else{
        sessionStorage.setItem(candidato, 1);
    }
    //alert("Confirmado o seu foto "+ candidato);
   
    document.getElementById("notificar").innerHTML ="Já Votou";
    document.getElementById("valor1").value = "";
    document.getElementById("valor2").value = "";
}


function resultado(){
    for(let i=0; i<100; i++){
        if(sessionStorage.getItem(i) !== null){
            document.getElementById("resultado").innerHTML += "Candidato" +i+ " tem " +sessionStorage.getItem(i) + "Votos</br>";

        }
    }
}


//Area do servidor
/*
document.addEventListener("DOMContentLoaded", () => {
    // Definindo a variável candidatosList
    let candidatosList = [];

    const formAdicionarCandidato = document.getElementById("formAdicionarCandidato");
    const listaCandidatos = document.getElementById("listaCandidatos");

    formAdicionarCandidato.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nomeCand").value;
        const informacoes = document.getElementById("informacoes").value;

        adicionarCandidato(nome, informacoes);
        formAdicionarCandidato.reset();
    });

    function exibirCandidatos() {
        listaCandidatos.innerHTML = "";

        candidatosList.forEach(candidato => {
            const itemLista = document.createElement("li");
            itemLista.innerHTML = `
                <span>${candidato.nome}</span>
                <button onclick="editarCandidato(${candidato.id})">Editar</button>
                <button onclick="removerCandidato(${candidato.id})">Remover</button>
            `;
            listaCandidatos.appendChild(itemLista);
        });
    }

    function adicionarCandidato(nome, informacoes) {
        const novoCandidato = {
            id: candidatosList.length + 1,
            nome: nome,
            informacoes: informacoes
        };

        candidatosList.push(novoCandidato);
        exibirCandidatos();
    }

    function editarCandidato(id) {
        const candidatoParaEditar = candidatosList.find(candidato => candidato.id === id);

        const novoNome = prompt('Novo nome:', candidatoParaEditar.nome);
        const novasInformacoes = prompt('Novas informações:', candidatoParaEditar.informacoes);

        candidatoParaEditar.nome = novoNome || candidatoParaEditar.nome;
        candidatoParaEditar.informacoes = novasInformacoes || candidatoParaEditar.informacoes;

        exibirCandidatos();
    }

    function removerCandidato(id) {
        candidatosList = candidatosList.filter(candidato => candidato.id !== id);
        exibirCandidatos();
    }

    // Chamada inicial para exibir a lista de candidatos no painel de gerenciamento
    exibirCandidatos();
    editarCandidato();
});
*/
//Fuciona simm bt
/*
document.addEventListener("DOMContentLoaded", () => {
    let candidatosList = [];

    const formAdicionarCandidato = document.getElementById("formAdicionarCandidato");
    const listaCandidatos = document.getElementById("listaCandidatos");


    formAdicionarCandidato.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nomeCand").value;
        const informacoes = document.getElementById("informacoes").value;
        const numero = document.getElementById("numeroCand").value;

        adicionarCandidato(nome, informacoes, numero);
        formAdicionarCandidato.reset();
    });

    function exibirCandidatos() {
        listaCandidatos.innerHTML = "";

        candidatosList.forEach(candidato => {
            const itemLista = document.createElement("li");
            itemLista.innerHTML = `
                <span>${candidato.nome} + ${candidato.numero}</span>
                <button class="editar-btn" data-id="${candidato.id}">Editar</button>
                <button class="remover-btn" data-id="${candidato.id}">Remover</button>
            `;
            listaCandidatos.appendChild(itemLista);

            // Adiciona eventos aos botões de editar e remover
            const btnEditar = itemLista.querySelector(".editar-btn");
            btnEditar.addEventListener("click", () => editarCandidato(candidato.id));

            const btnRemover = itemLista.querySelector(".remover-btn");
            btnRemover.addEventListener("click", () => removerCandidato(candidato.id));
        });
    }

    function adicionarCandidato(nome, informacoes, numero) {
        const novoCandidato = {
            id: candidatosList.length + 1,
            nome: nome,
            informacoes: informacoes,
            numero: numero
        };

        candidatosList.push(novoCandidato);
        exibirCandidatos();
    }

    function editarCandidato(id) {
        const candidatoParaEditar = candidatosList.find(candidato => candidato.id === id);

        const novoNome = prompt('Novo nome:', candidatoParaEditar.nome);
        const novoNumero = prompt('Novas Número:', candidatoParaEditar.numero);
        const novasInformacoes = prompt('Novas informações:', candidatoParaEditar.informacoes);


        candidatoParaEditar.nome = novoNome || candidatoParaEditar.nome;
        candidatoParaEditar.informacoes = novasInformacoes || candidatoParaEditar.informacoes;
        candidatoParaEditar.numero = novoNumero || candidatoParaEditar.numero;


        exibirCandidatos();
    }

    function removerCandidato(id) {
        candidatosList = candidatosList.filter(candidato => candidato.id !== id);
        exibirCandidatos();
    }

    // Chamada inicial para exibir a lista de candidatos no painel de gerenciamento
    exibirCandidatos();
});
*/
document.addEventListener("DOMContentLoaded", () => {
    let candidatosList = [];

    // Recupera os dados do armazenamento local ao carregar a página
    if (localStorage.getItem('candidatosList')) {
        candidatosList = JSON.parse(localStorage.getItem('candidatosList'));
    }

    const formAdicionarCandidato = document.getElementById("formAdicionarCandidato");
    const corpoTabelaCandidatos = document.getElementById("corpoTabelaCandidatos");
    const btnLimparCandidatos = document.getElementById("btnLimparCandidatos");
    const btnMostrarTodosDados = document.getElementById("btnMostrarTodosDados");

    formAdicionarCandidato.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const dataNas = document.getElementById("dataNas").value;
        const provincia = document.getElementById("provincia").value;
        const email = document.getElementById("email").value;
        const partido = document.getElementById("partido").value;
        const numeroCand = document.getElementById("numeroCand").value;


        adicionarCandidato(nome, dataNas, provincia, email, partido, numeroCand);
        formAdicionarCandidato.reset();
    });

    btnLimparCandidatos.addEventListener("click", function () {
        limparCandidatos();
    });

    btnMostrarTodosDados.addEventListener("click", function () {
        mostrarTodosDados();
    });

    function exibirCandidatos() {
        corpoTabelaCandidatos.innerHTML = "";

        candidatosList.forEach(candidato => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${candidato.id}</td>
                <td>${candidato.nome}</td>
                <td>${candidato.dataNas}</td>
                <td>${candidato.provincia}</td>
                <td>${candidato.email}</td>
                <td>${candidato.email}</td>
                <td>${candidato.numeroCand}</td>

                <td>
                    <button class="editar-btn fa fa-edit" data-id="${candidato.id}"></button>
                    <button class="remover-btn fa fa-trash" data-id="${candidato.id}"></button>
                </td>
            `;
            corpoTabelaCandidatos.appendChild(linha);

            // Adiciona eventos aos botões de editar e remover
            const btnEditar = linha.querySelector(".editar-btn");
            btnEditar.addEventListener("click", () => editarCandidato(candidato.id));

            const btnRemover = linha.querySelector(".remover-btn");
            btnRemover.addEventListener("click", () => removerCandidato(candidato.id));
        });

        // Atualiza os dados no armazenamento local
        atualizarLocalStorage();
    }
    
    function adicionarCandidato(nome, dataNas, provincia, email, partido, numeroCand ) {
        const novoCandidato = {
            id: candidatosList.length + 1,
            nome: nome,
            dataNas: dataNas,
            provincia: provincia,
            email: email,
            partido: partido,
            numeroCand:numeroCand
        };
        
        candidatosList.push(novoCandidato);
        exibirCandidatos();
    }
    
    function editarCandidato(id) {
        const candidatoParaEditar = candidatosList.find(candidato => candidato.id === id);
        //        adicionarCandidato(nome, dataNas, provincia, email, partido, numeroCand);

        const novoNome = prompt('Novo nome:', candidatoParaEditar.nome);
        const novadataNas = prompt('Novas Data de Nascimento:', candidatoParaEditar.dataNas);
        const novaProvincia = prompt('Nova Provincia: ', candidatoParaEditar.provincia);
        const novaEmail = prompt('Nova Email: ', candidatoParaEditar.email);
        const novoPartido = prompt('Nova Partido: ', candidatoParaEditar.partido);
        const novoNumeroCand = prompt('Nova Numero de Candidato: ', candidatoParaEditar.numeroCand);


        candidatoParaEditar.nome = novoNome || candidatoParaEditar.nome;
        candidatoParaEditar.dataNas = novadataNas || candidatoParaEditar.dataNas;
        candidatoParaEditar.provincia = novaProvincia || candidatoParaEditar.provincia;
        candidatoParaEditar.email = novaEmail || candidatoParaEditar.email;
        candidatoParaEditar.partido = novoPartido || candidatoParaEditar.partido;
        candidatoParaEditar.numeroCand = novoNumeroCand || candidatoParaEditar.informacoes;





        exibirCandidatos();
    }

    function removerCandidato(id) {
        candidatosList = candidatosList.filter(candidato => candidato.id !== id);
        exibirCandidatos();
    }

    function limparCandidatos() {
        candidatosList = [];
        exibirCandidatos();
    }

    function mostrarTodosDados() {
        // Exibe todos os dados no console (pode ser personalizado conforme necessário)
        console.log(candidatosList);
    }

    function atualizarLocalStorage() {
        // Salva os dados no armazenamento local
        localStorage.setItem('candidatosList', JSON.stringify(candidatosList));
    }

    // Chamada inicial para exibir a lista de candidatos no painel de gerenciamento
    exibirCandidatos();
});
