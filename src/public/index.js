import Usuario from "../classes/Usuario.js"
import Renda from "../classes/Renda.js"
import Despesa from "../classes/Despesa.js"
import Saldo from "../classes/Saldo.js"

var logado = 0;

//Seleciona os botões do HTML
const buttonGetUsuarios = document.getElementById("getUsuario");
const buttonCreateUsuario = document.getElementById("createUsuario")
const buttonLogarUsuario = document.getElementById("logarUsuario");


//Método para retornar usuários
buttonGetUsuarios.addEventListener("click", async (form) => {
    //Previne comportamento da tag FORM
    form.preventDefault();

    //Seleciona elementos do HTML
    const campoCreate = document.querySelectorAll(".msgCreate");
    const campoRetorno = document.querySelectorAll(".msgRetorno");
    const campoLogar = document.querySelectorAll(".msgLogar");
    const listaUsuarios = document.getElementById("lista");

    //Remove listas printadas anteriormente e mensagem de erro
    campoCreate.forEach(msg => msg.remove());
    campoRetorno.forEach(msg => msg.remove());
    campoLogar.forEach(msg => msg.remove());

    //Fetch GET do DB
    let usuario;
    await fetch("/users/getAllUsers",{
        method: "GET"
        })
        .then(response => response.json())          
        .then(json => usuario = json);
       
    //Printa todos os valores retornados do DB
    for(var i = 0; i < usuario.length; i++){
        listaUsuarios.insertAdjacentHTML("afterbegin", `<li class="msgRetorno">Nome: ${usuario[i].nome} | Email: ${usuario[i].email} | CPF: ${usuario[i].cpf}</li>`);
    };
});


//Método para criar usuários
buttonCreateUsuario.addEventListener("click", async(form) => {
    //Previne comportamento da tag FORM
    form.preventDefault();

    //Seleciona elementos HTML
    const campoCreate = document.querySelectorAll(".msgCreate");
    const campoRetorno = document.querySelectorAll(".msgRetorno");
    const campoLogar = document.querySelectorAll(".msgLogar");
    const retornoUsuario = document.getElementById("retorno");

    //Remove listas printadas anteriormente e mensagem de erro
    campoCreate.forEach(msg => msg.remove());
    campoRetorno.forEach(msg => msg.remove());
    campoLogar.forEach(msg => msg.remove());
    
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
        
        //Verifica, da lista retornada pelo DB, se existe algum usuário com mesmo CPF
        for(var i = 0; i < verificaUsuarioCreate.length; i++){
            if(verificaUsuarioCreate[i].cpf === newUsuario.cpf){
                verificaUsuarioCreate = 1;
        }
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
    const campoCreate = document.querySelectorAll(".msgCreate");
    const campoRetorno = document.querySelectorAll(".msgRetorno");
    const campoLogar = document.querySelectorAll(".msgLogar");
    const retornoUsuario = document.getElementById("retorno");
    const campoForm = document.getElementById("login");

    //Remove listas printadas anteriormente e mensagem de erro
    campoCreate.forEach(msg => msg.remove());
    campoRetorno.forEach(msg => msg.remove());
    campoLogar.forEach(msg => msg.remove());

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
        campoForm.remove();
        
        //Atualiza HTML
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
        <button id="exibirExtrato">Exibir Extrato e Saldo</button>
        `);

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
            campoRenda.forEach(msg => msg.remove());
            campoDespesa.forEach(msg => msg.remove());
            campoRetorno.forEach(msg => msg.remove());

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

            //Remove mensagem printada anteriormente
            campoRenda.forEach(msg => msg.remove());
            campoDespesa.forEach(msg => msg.remove());

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

        const exibirRenda = document.getElementById("exibirRendas");
        exibirRenda.addEventListener("click", async(form) => {
            //Previne comportamento da tag FORM
            form.preventDefault();   

            //Seleciona elementos HTML
            const campoRetorno = document.querySelectorAll(".msgRetorno");
            const campoRenda = document.querySelectorAll(".msgRenda");
            const campoDespesa = document.querySelectorAll(".msgDespesa")
            const listaUsuarios = document.getElementById("lista");

            //Remove mensagem printada anteriormente
            campoRetorno.forEach(msg => msg.remove());
            campoRenda.forEach(msg => msg.remove());
            campoDespesa.forEach(msg => msg.remove());

            //Retorna todas as rendas do DB
            let verificaUsuarioRenda;
            await fetch("/users/getAllRendas",{
                method: "GET"
                })
                .then(response => response.json())          
                .then(json => verificaUsuarioRenda = json);

                console.log(verificaUsuarioRenda);
                
            //Verifica, da lista retornada pelo DB, as rendas que possuem o id do usuário logado como FK
            for(var i = 0; i < verificaUsuarioRenda.length; i++){
                if(verificaUsuarioRenda[i].id_usuario === usuarioLogado.id){
                    let data = new Date(verificaUsuarioRenda[i].datahora)
                    let dataFormatada = ((data.getDate() + "-" + ((data.getMonth() + 1)) + "-" + data.getFullYear()));
                    //Printa a lista de Rendas do usuário
                    listaUsuarios.insertAdjacentHTML("afterbegin", `<li class="msgRetorno">Valor: R$${verificaUsuarioRenda[i].valor} - Descrição: ${verificaUsuarioRenda[i].descricao} - Data: ${dataFormatada}</li>`);
                };
            };

            return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgRetorno'>Extrato das Rendas:</p>");
        });
        
        const exibirExtrato = document.getElementById("exibirExtrato");
        exibirExtrato.addEventListener("click", async(form) => {
            //Previne comportamento da tag FORM
            form.preventDefault();   

            //Seleciona elementos HTML
            const campoRetorno = document.querySelectorAll(".msgRetorno");
            const campoRenda = document.querySelectorAll(".msgRenda");
            const campoDespesa = document.querySelectorAll(".msgDespesa")
            const listaUsuarios = document.getElementById("lista");

            //Remove mensagem printada anteriormente
            campoRetorno.forEach(msg => msg.remove());
            campoRenda.forEach(msg => msg.remove());
            campoDespesa.forEach(msg => msg.remove());

            //Verifica se existe uma conta Saldo do Usuário no DB
            let verificaUsuarioSaldo;
            await fetch("/users/getAllSaldos",{
                method: "GET"
                })
                .then(response => response.json())          
                .then(json => verificaUsuarioDespesa = json);

                console.log(verificaUsuarioDespesa);
                
                //Verifica, da lista retornada pelo DB, as despesas que possuem o id do usuário logado como FK
            for(var i = 0; i < verificaUsuarioDespesa.length; i++){
                if(verificaUsuarioDespesa[i].id_usuario === usuarioLogado.id){
                    let data = new Date(verificaUsuarioDespesa[i].datahora)
                    let dataFormatada = ((data.getDate() + "-" + ((data.getMonth() + 1)) + "-" + data.getFullYear()));
                    //Printa a lista de Despesa do usuário
                    listaUsuarios.insertAdjacentHTML("afterbegin", `<li class="msgRetorno">Valor: R$${verificaUsuarioRenda[i].valor} - Descrição: ${verificaUsuarioRenda[i].descricao} - Data: ${dataFormatada}</li>`);
                };
            };

            return retornoUsuario.insertAdjacentHTML("afterbegin", "<p class='msgRetorno'>Extrato das Despesas:</p>");
        });









    };
});