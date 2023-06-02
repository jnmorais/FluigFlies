let contadorUnidades = 0;
function adicionarUnd(event) {
    contadorUnidades++;
    if (contadorUnidades >= 1) {
        document.getElementById("btnEnviar").classList.remove("d-none");
    }
    document.getElementById("contadorUnidades").value = contadorUnidades
    // Cria um novo conjunto de tens adicionais
    var unidadesAdicionais = document.createElement('div');
    unidadesAdicionais.classList.add("col-12", "mb-2")
    unidadesAdicionais.id = `unidade_${contadorUnidades}`
    unidadesAdicionais.innerHTML = `<div class="form-floating">
                                        <input type="text" class="form-control" 
                                        id="unidade_${contadorUnidades}" name="unidade_${contadorUnidades}">
                                        <label>Unidade #${contadorUnidades}</label>
                                    </div>`
    document.getElementById('unidades').appendChild(unidadesAdicionais);
    var objDiv = document.getElementById("unidades");
    objDiv.scrollTop = objDiv.scrollHeight;
    event.preventDefault()
}