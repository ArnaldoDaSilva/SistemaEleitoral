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
                    <td scope="row">${candidato.id}</td>
                    <td>${candidato.nome}</td>
                    <td>${candidato.dataNas}</td>
                    <td>${candidato.provincia}</td>
                    <td>${candidato.email}</td>
                    <td>${candidato.partido}</td>
                    <td>${candidato.numeroCand}</td>

                    <td>
                        <button class="editar-btn fa fa-edit btn btn-outline-primary" data-id="${candidato.id}"></button>
                        <button class="remover-btn fa fa-trash btn btn-outline-danger" data-id="${candidato.id}"></button>
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
            candidatoParaEditar.numeroCand = novoNumeroCand || candidatoParaEditar.numeroCand;





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



        //Configuraçõ da Eleição
      
        let configuracaoEleicao = {};

        const formConfiguracaoEleicao = document.getElementById("formConfiguracaoEleicao");
    
        formConfiguracaoEleicao.addEventListener("submit", function (event) {
            event.preventDefault();
        });
    
        window.configurarEleicao = function () {
            const dataEleicao = document.getElementById("dataEleicao").value;
            const horarioEleicao = document.getElementById("horarioEleicao").value;
            const regrasEleicao = document.getElementById("regrasEleicao").value;
    
            configuracaoEleicao = {
                data: dataEleicao,
                horario: horarioEleicao,
                regras: regrasEleicao
            };
    
            // Exibe as configurações da eleição (pode ser personalizado conforme necessário)
            console.log(configuracaoEleicao);
        };
        

});

