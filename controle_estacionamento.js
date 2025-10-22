//RESERVA_VAGAS

function enviarFormulario() {
    // Verificar se a vaga selecionada está disponível
    if (!isVagaDisponivel()) {
        alert('Vaga selecionada está indisponível!');
        return false;
    }

    let reservaVaga = {};

    reservaVaga.placa = document.getElementById('placa').value.toUpperCase();
    reservaVaga.proprietario = document.getElementById('proprietario').value;
    reservaVaga.apartamento = document.getElementById('apartamento').value;
    reservaVaga.bloco = document.getElementById('bloco').value;
    reservaVaga.modelo = document.getElementById('modelo').value;
    reservaVaga.cor = document.getElementById('cor').value;
    reservaVaga.vaga = document.getElementById('vaga').value;

    console.log(reservaVaga);

    // Recuperando do localStorage as vagas reservadas
    let vagas_reservadas = JSON.parse(localStorage.getItem("vagas_reservadas"));

    // Quando não tiver nada dentro do localstorage (iniciando a tela a primeira vez)
    // Inicia as lista com um objeto vazio
    if (vagas_reservadas === null) {
        vagas_reservadas = {};
    }

    // Coloca a vaga dentro da lista
    vagas_reservadas[reservaVaga.vaga] = reservaVaga;

    // Salva a lista no localStorage
    localStorage.setItem("vagas_reservadas", JSON.stringify(vagas_reservadas));

    // Exibir pop-up de confirmação
    alert('Cadastro realizado com sucesso!\n\nDetalhes da reserva\n' +
           'Placa: ' + reservaVaga.placa + '\n' +
           'Proprietário: ' + reservaVaga.proprietario + '\n' +
           'Apartamento: ' + reservaVaga.apartamento + '- Bloco ' + reservaVaga.bloco  + '\n' +
           'Veículo: ' + reservaVaga.modelo + reservaVaga.cor + '\n' +
           'Vaga: ' + reservaVaga.vaga
        );

    document.getElementById('form-reserva').reset();

    return false;
}

function isVagaDisponivel() {

    let nr_vaga = document.getElementById('vaga').value;

    // Recuperar as informações gravadas no localstorage
    let vagas_reservadas = JSON.parse(localStorage.getItem("vagas_reservadas"));

    // Quando não tiver nada dentro do localstorage (iniciando a tela a primeira vez) ou 
    // Verificar se o nr_vaga está preenchido dentro do localstorage
    // Retorna vaga disponivel
    if (vagas_reservadas === null || vagas_reservadas[nr_vaga] === undefined) {
        return true;
    }

    return false;
}

//LISTAGEM_VAGAS

function listarVagas(){
    let vagas_reservadas = JSON.parse(localStorage.getItem("vagas_reservadas"));

    //substitui a vaga disponível pela vaga ocupada na lista de vagas 
    for (let nr_vaga in vagas_reservadas){
        let dados_vaga = vagas_reservadas[nr_vaga];

        let div_vaga = document.getElementById("vaga-" + nr_vaga);
        div_vaga.classList.remove("disponivel");
        div_vaga.classList.add("ocupada");
        
        let status_vaga = document.getElementById("vaga-status-" + nr_vaga);
        status_vaga.innerHTML = "Ocupada";

        let vaga_info = document.getElementById("vaga-info-" + nr_vaga);
        vaga_info.innerHTML = "<strong>Placa: </strong>" + dados_vaga.placa + "<br>";
        vaga_info.innerHTML+= "<strong>Proprietário: </strong>" + dados_vaga.proprietario + "<br>";
        vaga_info.innerHTML+= "<strong>Apartamento: </strong>" + dados_vaga.apartamento + " - " + "Bloco " + dados_vaga.bloco + "<br>";                       
        vaga_info.innerHTML+= "<strong>Veículo: </strong>" + dados_vaga.modelo + "("+ dados_vaga.cor + ")";                     
                              
       
    }
}