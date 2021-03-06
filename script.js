// - - | Salvar os elementos HTML que serΓ£o alterados | - - //
var divResultadoPc = document.getElementById(`divResultadoPc`);
var divResultadoJogador = document.getElementById(`divResultadoJogador`);
var popcaoPc = document.getElementById(`popcaoPc`);
var pEscolhaJogador = document.getElementById(`pEscolhaJogador`);
var pontosPc = 0
var pontosJogador = 0;
var pLogResultado = document.getElementById(`pLogResultado`);
var pPlacar = document.getElementById(`pPlacar`);
var selectHistorico = document.getElementById(`selectHistorico`);
var section3 = document.getElementById(`section3`);

function pegarResultado(opcaoPc, jogadorValue, novaOption) {
    // - - - - - - | retorno 1 na [0] robo venceu| - - - - - - //
    if (opcaoPc == `β` && jogadorValue == `βοΈ`) {
        novaOption.text = `π€ β X βοΈ πΉοΈ | Computador venceu`;
        return [1, 0];
    } else if (opcaoPc == `βοΈ` && jogadorValue == `ποΈ`) {
        novaOption.text = `π€ βοΈ X ποΈ πΉοΈ | Computador venceu`;
        return [1, 0];
    } else if (opcaoPc == `ποΈ` && jogadorValue == `β`) {
        novaOption.text = `π€ ποΈ X β πΉοΈ | Computador venceu`;
        return [1, 0];
    } else if (opcaoPc == jogadorValue) {
        // - - - - - - | retorno -1 na [0] empate| - - - - - - //
        novaOption.text = `π€ ${opcaoPc} X ${jogadorValue} πΉοΈ | Empate, sem vencedor`;
        return [-1];
    } else {
        // - - - - - - | retorno 1 na [1] jogador venceu| - - - - - - //
        novaOption.text = `π€ ${opcaoPc} X ${jogadorValue} πΉοΈ | Jogador venceu`;
        return [0, 1];
    }
}

function pegarNumAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function rodarJogo(opcao) {


    var novaOption = document.createElement(`option`);
    // - - - - - - | Salvar a opcao que foi escolhida | - - - - - - //
    var opcaoJogador = document.getElementById(`${opcao}`);
    var opcaoJogadorValue = opcaoJogador.value;

    // - - | Fazer o computador escolher uma opcao aleatoria | - - //
    var opcaoPc = [`β`, `ποΈ`, `βοΈ`];
    var emoji = pegarNumAleatorio(0, 2);
    opcaoPc = opcaoPc[emoji];

    // - - - - - - | Calcular o vencedor e salvar em uma option| - - - - - - //
    var vencedor = pegarResultado(opcaoPc, opcaoJogadorValue, novaOption);

    // - - - - - - | Add 1 ponto ao placar para o vencedor | - - - - - - //
    // - - - - - - | Add CSS Γ‘ divResultadoEscolha(pc || jogador) do vencedor | - - - - - - //
    switch (vencedor[0]) {
        case 1:
            pontosPc += 1;
            divResultadoPc.style.borderColor = `#05EE05`;
            divResultadoJogador.style.borderColor = `#FF3333`;
            break;
        case 0:
            pontosJogador += 1;
            divResultadoPc.style.borderColor = `#FF3333`;
            divResultadoJogador.style.borderColor = `#05EE05`;
            break;
        case -1:
            divResultadoPc.style.borderColor = `#ffff00`;
            divResultadoJogador.style.borderColor = `#ffff00`;
    }

    // - | Exibir quais foram as opcoes de cada player no pEscolha(pc || jogador) | - //
    pEscolhaPc.innerHTML = opcaoPc;
    pEscolhaJogador.innerHTML = opcaoJogadorValue;

    // - - - - - - | Atualizar placar | - - - - - - //
    pPlacar.innerHTML = `π€ ${pontosPc}/10 x ${pontosJogador}/10 πΉοΈ`;

    // - - - - - - | Mudar pLogResultado com um novo status |  - - - - - - //
    pLogResultado.innerHTML = `Para continuar escolha entre:`

    // - - - - - - | Add resultado ao historico como uma option | - - - - - - //
    selectHistorico.appendChild(novaOption);

    // - - - - - - | Fim de jogo | - - - - - - //
    //pontosPc += 9;
    if (pontosPc >= 10 || pontosJogador >= 10) {
        pLogResultado.innerHTML = `Aperte recomeΓ§ar para jogar novamente!`;
        if (pontosPc >= 10) {
            section3.innerHTML = `VOCΓ PERDEU! <br> π€ | Boa sorte na prΓ³xima vez!`;
        } else if (pontosJogador >= 10){
            section3.innerHTML = `VOCΓ GANHOU! <br> π€ | Que tal uma revanche?`;
        }
        section3.style.font = `bolder 24pt monospace`;
        section3.style.textAlign = `center`;
        section3.style.backgroundColor = `#181d20`;
        section3.style.borderRadius = `5px`;
        section3.style.padding = `5px`;
        section3.style.border = `3px solid`;
        section3.style.borderColor = `#ffff00`;
    }
}

function recomecar() {
    // - - - - - - | Pedir confirmaΓ§Γ£o | - - - - - - //
    var confirmacao = window.prompt(`Deseja realmente recomeΓ§ar?`);
    if (confirmacao.toLowerCase().startsWith(`s`) || confirmacao.toLowerCase().startsWith(`y`)) {
        // - - - - - - | Recarregar pag  | - - - - - - //
        return window.location.reload();
    }
    // - - - - - - | Continuar jogo | - - - - - - //
    return window.alert(`O jogo nΓ£o foi reiniciado!`);

}

function mouseOver(elementId) {
    if (elementId == `buttonReiniciar`) {
        var elemento = document.getElementById(`${elementId}`);
        elemento.style.backgroundColor = `#33383B`;
        elemento.style.borderColor = `#056162`;
    } else {
        var elemento = document.getElementById(`${elementId}`);
        elemento.style.backgroundColor = `#ff1919`;
        elemento.style.borderColor = `#FC2727`;
    }
}

function mouseleave(elementId) {
    if (elementId == `buttonReiniciar`) {
        var elemento = document.getElementById(`${elementId}`);
        elemento.style.backgroundColor = `#33383B`;
        elemento.style.borderColor = `#828689`;
    } else {
        var elemento = document.getElementById(`${elementId}`);
        elemento.style.backgroundColor = `#FF3333`;
        elemento.style.borderColor = `#FC2727`;
    }

}
