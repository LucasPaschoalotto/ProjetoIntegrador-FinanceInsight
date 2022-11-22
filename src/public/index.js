import Usuario from "../classes/Usuario.js"
import Renda from "../classes/Renda.js"
import Despesa from "../classes/Despesa.js"
import Saldo from "../classes/Saldo.js"

var logado = 0;
var existeSaldo = 0;

//Seleciona os botões do HTML
var buttonCreateUsuario = document.getElementById("createUsuario")
var buttonLogarUsuario = document.getElementById("logarUsuario");

//Função para remover elementos
function removeMsg(element){
    return element.forEach(msg => msg.remove());
}

//Método para criar usuários
buttonCreateUsuario.addEventListener("click", async(form) => {
    //Previne comportamento da tag FORM
    form.preventDefault();

    //Seleciona elementos HTML
    var campoCreate = document.querySelectorAll(".msgCreate");
    var campoRetorno = document.querySelectorAll(".msgRetorno");
    var campoLogar = document.querySelectorAll(".msgLogar");
    var retornoUsuario = document.getElementById("retorno");

    //Remove listas printadas anteriormente e mensagem de erro
    removeMsg(campoCreate);
    removeMsg(campoRetorno);
    removeMsg(campoLogar);
    
    //Armazena valores do usuário
    const nome = document.getElementById("setNome").value;
    const email = document.getElementById("setEmail").value;
    const cpf = document.getElementById("setCpf").value;
    
    //Verifica se nome e email estão vazios
    if(!nome || !email || !cpf) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgCreate'>Nome, email e cpf precisam ser preenchidos</p>");
    const newUsuario = new Usuario(0, nome, email, cpf);
    
    //Verifica se usuário existe
    let verificaUsuarioCreate;
    await fetch("/users/getAllUsers",{
        method: "GET"
        })
        .then(response => response.json())          
        .then(json => verificaUsuarioCreate = json);

        console.log(verificaUsuarioCreate);
        
    //Verifica, da lista retornada pelo DB, se existe algum usuário com mesmo CPF
    for(var i = 0; i < verificaUsuarioCreate.length; i++){
        if(verificaUsuarioCreate[i].cpf === newUsuario.cpf){
            newUsuario.id = verificaUsuarioCreate[i].uuid;
            verificaUsuarioCreate = 1;
        };
    };
    
    //Return caso usuário exista no DB
    if(verificaUsuarioCreate === 1) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgCreate'>Usuário já existente</p>");
    
    //Cria usuário caso não exista
    await fetch('/users', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome: newUsuario.nome, email: newUsuario.email, cpf: newUsuario.cpf})
    });
    retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgCreate'>Usuário criado!</p>")
    
});

//Método para logar usuário
buttonLogarUsuario.addEventListener("click", async(form) => {
    //Previne comportamento da tag FORM
    form.preventDefault();

    //Seleciona elementos HTML
    var campoCreate = document.querySelectorAll(".msgCreate");
    var campoRetorno = document.querySelectorAll(".msgRetorno");
    var campoLogar = document.querySelectorAll(".msgLogar");
    var retornoUsuario = document.getElementById("retorno");
    var campoForm = document.getElementById("login");

    //Remove listas printadas anteriormente e mensagem de erro
    removeMsg(campoCreate);
    removeMsg(campoRetorno);
    removeMsg(campoLogar);

    //Armazena valores do usuário
    const nome = document.getElementById("setNome").value;
    const email = document.getElementById("setEmail").value;
    const cpf = document.getElementById("setCpf").value;
    
    //Verifica se nome e email estão vazios
    if(!nome || !email || !cpf) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgLogar'>Nome, email e cpf precisam ser preenchidos</p>");
    const logarUsuario = new Usuario(0, nome, email, cpf);

    //Verifica se usuário existe
    let verificaUsuarioLogin;
    await fetch("/users/getAllUsers",{
        method: "GET"
        })
        .then(response => response.json())          
        .then(json => verificaUsuarioLogin = json);
        
    //Verifica, da lista retornada pelo DB, se existe um usuário com mesmo nome e cpf
    for(var i = 0; i < verificaUsuarioLogin.length; i++){
        if(verificaUsuarioLogin[i].nome === logarUsuario.nome && verificaUsuarioLogin[i].cpf === logarUsuario.cpf){
            //Variável para manter dados do usuário logado
            var usuarioLogado = new Usuario(verificaUsuarioLogin[i].uuid, verificaUsuarioLogin[i].nome, verificaUsuarioLogin[i].email, verificaUsuarioLogin[i].cpf)
            logado = 1;
        };
    };

    //Return caso usuário exista no DB
    if(logado == 0){
        return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgLogar'>Usuário não cadastrado</p>")
    } else{  
        removeMsg(campoForm);
        
        //Atualiza HTML após logar
        const formStart = document.getElementById("start");
        formStart.insertAdjacentHTML("afterbegin", `
        <p> Usuário "${usuarioLogado.nome}" logado com sucesso! </p>
        <form>
        <p>Rendas:</p>
        <input id="setValorRenda" placeholder="Valor da Renda ex: 25.99"/>
        <input id="setDescricaoRenda" placeholder="Descrição"/>
        <button id="inserirRenda">Inserir Renda</button>
        <button id="exibirRendas">Exibir Rendas</button>
        </form>
        <form>
            <p>Despesas:</p>
            <input id="setValorDespesa" placeholder="Valor da Despesa ex: 25.99"/>
            <input id="setDescricaoDespesa" placeholder="Descrição"/>
            <button id="inserirDespesa">Inserir Despesa</button>
            <button id="exibirDespesas">Exibir Despesas</button>
        </form>
        <p></p>
        <button id="exibirExtrato">Salvar e Exibir Extrato e Saldo</button>
        `);

        //Método para inserir RENDA
        const setRenda = document.getElementById("inserirRenda");
        setRenda.addEventListener("click", async(form) => {
            //Previne comportamento da tag FORM
            form.preventDefault();

            //Seleciona elementos HTML
            const retornoUsuario = document.getElementById("retorno");
            const campoRenda = document.querySelectorAll(".msgRenda");
            const campoValorRenda = document.getElementById("setValorRenda");
            const campoDescricaoRenda = document.getElementById("setDescricaoRenda")
            const campoDespesa = document.querySelectorAll(".msgDespesa")
            const campoRetorno = document.querySelectorAll(".msgRetorno");

            //Remove mensagem printada anteriormente
            removeMsg(campoRenda);
            removeMsg(campoDespesa);
            removeMsg(campoRetorno);

            //Armazena valores da renda
            const id_usuario = usuarioLogado.id;
            const valor = campoValorRenda.value;
            const descricao = campoDescricaoRenda.value;
            
            //Verifica se dados estão preenchidos
            if(!valor || !descricao) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgRenda'>Valor e Descrição precisam ser preenchidos</p>");
            
            //Verifica se valor da renda é um valor numérico
            if(isNaN(valor) === true) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgRenda'>Valor da Renda precisa ser um valor numérico!</p>");

            //Cria nova renda
            const newRenda = new Renda(0, id_usuario, valor, descricao)

            await fetch('/users/renda', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_usuario: newRenda.id_usuario, valor: newRenda.valor, descricao: newRenda.descricao})
            });
            retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgRenda'>Renda inserida com sucesso!</p>");
            
            campoValorRenda.value = "";
            campoDescricaoRenda.value = "";
        });

        //Método para inserir Despesas
        const setDespesa = document.getElementById("inserirDespesa");
        setDespesa.addEventListener("click", async(form) => {
            //Previne comportamento da tag FORM
            form.preventDefault();

            //Seleciona elementos HTML
            const retornoUsuario = document.getElementById("retorno");
            const campoRenda = document.querySelectorAll(".msgRenda");
            const campoDespesa = document.querySelectorAll(".msgDespesa")
            const campoValorDespesa = document.getElementById("setValorDespesa");
            const campoDescricaoDespesa = document.getElementById("setDescricaoDespesa")
            const campoRetorno = document.querySelectorAll(".msgRetorno");


            //Remove mensagem printada anteriormente
            removeMsg(campoRenda);
            removeMsg(campoDespesa);
            removeMsg(campoRetorno);

            //Armazena valores da despesa
            const id_usuario = usuarioLogado.id;
            const valor = campoValorDespesa.value;
            const descricao = campoDescricaoDespesa.value;
            
            //Verifica se dados estão preenchidos
            if(!valor || !descricao) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgDespesa'>Valor e Descrição precisam ser preenchidos</p>");
            
            //Verifica se valor da renda é um valor numérico
            if(isNaN(valor) === true) return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgDespesa'>Valor da Despesa precisa ser um valor numérico!</p>");

            //Cria nova renda
            const newDespesa = new Despesa(0, id_usuario, valor, descricao)

            await fetch('/users/despesa', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_usuario: newDespesa.id_usuario, valor: newDespesa.valor, descricao: newDespesa.descricao})
            });
            retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgDespesa'>Despesa inserida com sucesso!</p>");
            
            campoValorDespesa.value = "";
            campoDescricaoDespesa.value = "";
        });

        //Método para exibir Rendas
        const exibirRenda = document.getElementById("exibirRendas");
        exibirRenda.addEventListener("click", async(form) => {
            //Previne comportamento da tag FORM
            form.preventDefault();   

            //Seleciona elementos HTML
            const campoRetorno = document.querySelectorAll(".msgRetorno");
            const campoRenda = document.querySelectorAll(".msgRenda");
            const campoDespesa = document.querySelectorAll(".msgDespesa")
            const listaRetorno = document.getElementById("lista");

            //Remove mensagem printada anteriormente
            removeMsg(campoRenda);
            removeMsg(campoDespesa);
            removeMsg(campoRetorno);

            //Retorna todas as rendas do DB
            let verificaUsuarioRenda;
            await fetch("/users/getAllRendas",{
                method: "GET"
                })
                .then(response => response.json())          
                .then(json => verificaUsuarioRenda = json);
              
            //Verifica, da lista retornada pelo DB, as rendas que possuem o id do usuário logado como FK
            for(var i = 0; i < verificaUsuarioRenda.length; i++){
                if(verificaUsuarioRenda[i].id_usuario === usuarioLogado.id){
                    let data = new Date(verificaUsuarioRenda[i].datahora)
                    let dataFormatada = ((data.getDate() + "-" + ((data.getMonth() + 1)) + "-" + data.getFullYear()));
                    //Printa a lista de Rendas do usuário
                    listaRetorno.insertAdjacentHTML("afterbegin", `<li class="msgRetorno">Valor: R$${verificaUsuarioRenda[i].valor} - Descrição: ${verificaUsuarioRenda[i].descricao} - Data: ${dataFormatada}</li>`);
                };
            };

            return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgRetorno'>Extrato das Rendas:</p>");
        });
        
        //Método para exibir Despesas
        const exibirDespesa = document.getElementById("exibirDespesas");
        exibirDespesa.addEventListener("click", async(form) => {
            //Previne comportamento da tag FORM
            form.preventDefault();   

            //Seleciona elementos HTML
            const campoRetorno = document.querySelectorAll(".msgRetorno");
            const campoRenda = document.querySelectorAll(".msgRenda");
            const campoDespesa = document.querySelectorAll(".msgDespesa")
            const listaRetorno = document.getElementById("lista");

            //Remove mensagem printada anteriormente
            removeMsg(campoRenda);
            removeMsg(campoDespesa);
            removeMsg(campoRetorno);

            //Retorna todas as despesas do DB
            let verificaUsuarioDespesa;
            await fetch("/users/getAllDespesas",{
                method: "GET"
                })
                .then(response => response.json())          
                .then(json => verificaUsuarioDespesa = json);

            //Verifica, da lista retornada pelo DB, as despesas que possuem o id do usuário logado como FK
            for(var i = 0; i < verificaUsuarioDespesa.length; i++){
                if(verificaUsuarioDespesa[i].id_usuario === usuarioLogado.id){
                    let data = new Date(verificaUsuarioDespesa[i].datahora)
                    let dataFormatada = ((data.getDate() + "-" + ((data.getMonth() + 1)) + "-" + data.getFullYear()));
                    //Printa a lista de Despesa do usuário
                    listaRetorno.insertAdjacentHTML("afterbegin", `<li class="msgRetorno">Valor: R$${verificaUsuarioDespesa[i].valor} - Descrição: ${verificaUsuarioDespesa[i].descricao} - Data: ${dataFormatada}</li>`);
                };
            };

            return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgRetorno'>Extrato das Despesas:</p>");
        });

        const exibirExtrato = document.getElementById("exibirExtrato");
        exibirExtrato.addEventListener("click", async(form) => {
            //Previne comportamento da tag FORM
            form.preventDefault();   

            //Seleciona elementos HTML
            const campoRetorno = document.querySelectorAll(".msgRetorno");
            const campoRenda = document.querySelectorAll(".msgRenda");
            const campoDespesa = document.querySelectorAll(".msgDespesa")
            const listaRetorno = document.getElementById("lista");

            //Remove mensagem printada anteriormente
            removeMsg(campoRenda);
            removeMsg(campoDespesa);
            removeMsg(campoRetorno);

            //Verifica se há conta Saldo pro usuário logado
            var newContaSaldo = new Saldo(0, usuarioLogado.id, 0, 0, 0)
            let verificaContaSaldo;
            await fetch("/users/getAllSaldos",{
                method: "GET"
            })
            .then(response => response.json())          
            .then(json => verificaContaSaldo = json);
            
            for(var i = 0; i < verificaContaSaldo.length; i++){
                //Se existe, atribui valores para a contaSaldoLogado e retorna
                if(verificaContaSaldo[i].id_usuario === newContaSaldo.id_usuario){
                    newContaSaldo.id = verificaContaSaldo[i].uuid;
                    newContaSaldo.renda = verificaContaSaldo[i].renda;
                    newContaSaldo.despesa = verificaContaSaldo[i].despesa;
                    newContaSaldo.saldo = verificaContaSaldo[i].saldo;
                    existeSaldo = 1;
                } 
            };

            //Se não existe, cria a conta Saldo pro usuário
            if(existeSaldo === 0){
                //Caso não, cria nova conta Saldo pro usuário
                await fetch('/users/saldo', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id_usuario: usuarioLogado.id, renda: 0, despesa: 0, saldo: 0})
                });
                //Retorna valor uuid pra conta Saldo
                let verificaNewContaSaldo;
                await fetch("/users/getAllSaldos",{
                    method: "GET"
                })
                .then(response => response.json())          
                .then(json => verificaNewContaSaldo = json);
                
                for(var i = 0; i < verificaNewContaSaldo.length; i++){
                    //Atribui uuid pra nova conta Saldo
                    newContaSaldo.id = verificaNewContaSaldo[i].uuid;
                    newContaSaldo.renda = verificaNewContaSaldo[i].renda;
                    newContaSaldo.despesa = verificaNewContaSaldo[i].despesa;
                    newContaSaldo.saldo = verificaNewContaSaldo[i].saldo;
                    existeSaldo = 1;
                };
            };

            //Pega todos as rendas da conta do usuário
            let verificaRendaSaldo;
            await fetch("/users/getAllRendas",{
                method: "GET"
            })
            .then(response => response.json())          
            .then(json => verificaRendaSaldo = json);
            
            //Soma todas as rendas e atribui ao usuário
            var rendaTemporaria = new Renda(0, newContaSaldo.id_usuario, 0, 0);
            for(var i = 0; i < verificaRendaSaldo.length; i++){
                if(verificaRendaSaldo[i].id_usuario === newContaSaldo.id_usuario){
                    rendaTemporaria.depositar(verificaRendaSaldo[i].valor);
                };            
            };

            //Pega todos as despesas da conta do usuário
            let verificaDespesaSaldo;
            await fetch("/users/getAllDespesas",{
                method: "GET"
                })
                .then(response => response.json())          
                .then(json => verificaDespesaSaldo = json);

            //Soma todas as rendas e atribui ao usuário
            var despesaTemporaria = new Despesa(0, newContaSaldo.id_usuario, 0, 0);
            for(var i = 0; i < verificaDespesaSaldo.length; i++){
                if(verificaDespesaSaldo[i].id_usuario === newContaSaldo.id_usuario){
                    despesaTemporaria.debitar(verificaDespesaSaldo[i].valor);
                };            
            };

            //Retorna como saldo pro usuário e faz Update no DB
            newContaSaldo.renda = rendaTemporaria.valor;
            newContaSaldo.despesa = despesaTemporaria.valor;
            newContaSaldo.saldo = newContaSaldo.renda - newContaSaldo.despesa;

            //Mostra o extrato pro usuário
            listaRetorno.insertAdjacentHTML("afterbegin", `<li class="msgRetorno">Total de Rendas: R$${newContaSaldo.renda.toFixed(2)}</li><li class="msgRetorno">Total de Despesas: R$${newContaSaldo.despesa.toFixed(2)}</li><li class="msgRetorno">Saldo: R$${newContaSaldo.saldo.toFixed(2)}</li>`);

            //Faz o Update dos valores no DB
            await fetch('/users/updateSaldo', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id_usuario: newContaSaldo.id_usuario, renda: newContaSaldo.renda, despesa: newContaSaldo.despesa, saldo: newContaSaldo.saldo})
            });
         
        });





    };
});