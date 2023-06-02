var slt_chk_nome = document.getElementById("slt_chk_nome").onchange = () => { exibirItens() }
const exibirItens = () => {
    var element = document.getElementById("slt_chk_nome")
    var chk_selected = element.options[element.selectedIndex].value;
    var table = document.getElementById("tbEdit").querySelector("tbody")
    table.innerHTML = ""
    !document.getElementById("btnEnviar").classList.contains("d-none") ?
        document.getElementById("btnEnviar").classList.add("d-none") : false
    fetch(`/checklist_item/${chk_selected}`, { method: "GET" })
        .then(response => response.json())
        .then(response => {
            if (response.length > 0) {
                for (const item of response) {
                    let dataRow = table.insertRow();
                    dataRow.innerHTML = `
                    <td>
                        <input type="hidden" name="item_id_${item.id}" id="item_id_${item.id}" value="${item.id}">
                        <button class="btn btn-danger" onclick="deletarItem(event, ${item.id})"><i class="bi bi-trash"></i></button>
                    </td>
                    <td>
                        <input type="text" name="item_nome_${item.id}" id="item_nome_${item.id}" value="${item.item_nome}" class="form-control">
                    </td>
                    <td>
                        <textarea name="item_descricao_${item.id}" id="item_descricao_${item.id}" rows="1" class="form-control">${item.item_descricao}</textarea>
                    </td>
                    <td>
                        <textarea name="item_dica_${item.id}" id="item_dica_${item.id}" rows="1" class="form-control">${item.item_dica}</textarea>
                    </td>
                    <td>
                        <select name="item_tipo_${item.id}" id="item_tipo_${item.id}" class="form-control">
                            <option>Selecione</option>
                            <option value="Avaliativo" ${item.item_tipo == 'Avaliativo' ? "selected" : ''}>Avaliativo</option>
                            <option value="Texto" ${item.item_tipo == 'Texto' ? "selected" : ''}>Texto</option>
                            <option value="Data" ${item.item_tipo == 'Data' ? "selected" : ''}>Data</option>
                            <option value="Cadastro" ${item.item_tipo == 'Cadastro' ? "selected" : ''}>Cadastro</option>
                            <option value="Numérico" ${item.item_tipo == 'Numérico' ? "selected" : ''}>Numérico</option>
                            <option value="Lista de seleção" ${item.item_tipo == 'Lista de seleção' ? "selected" : ''}>Lista de seleção</option>
                        </select>
                    </td>`
                    if (item.item_tipo != "Texto" && item.item_tipo != "Avaliativo") {
                        dataRow.innerHTML += `<td>
                        <select name="item_formato_${item.id}" id="item_formato_${item.id}" class="form-control">
                            <optgroup class="" label="Data">
                                <option ${item.item_formato == "Horário 24h" ? "selected" : ''} value="Horário 24h">Horário 24h</option>
                                <option ${item.item_formato == "Horário 24h(s)" ? "selected" : ''} value="Horário 24h(s)">Horário 24h(s)</option>
                                <option ${item.item_formato == "Data: dd/mm/aaaa" ? "selected" : ''} value="Data: dd/mm/aaaa">Data: dd/mm/aaaa</option>
                                <option ${item.item_formato == "Data: mm/aaaa" ? "selected" : ''} value="Data: mm/aaaa">Data: mm/aaaa</option>
                                <option ${item.item_formato == "Data: dd/mm/aaaa até dd/mm/aaaa" ? "selected" : ''} value="Data: dd/mm/aaaa até dd/mm/aaaa">Data: dd/mm/aaaa até dd/mm/aaaa</option>
                            </optgroup>
                            <optgroup class="" label="Cadastro">
                                <option ${item.item_formato == "Cadastro" ? "selected" : ''} value="Cadastro">Cadastro</option>
                                <option ${item.item_formato == "E-mail" ? "selected" : ''} value="E-mail">E-mail</option>
                                <option ${item.item_formato == "Estado" ? "selected" : ''} value="Estado">Estado</option>
                                <option ${item.item_formato == "UF e Cidade" ? "selected" : ''} value="UF e Cidade">UF e Cidade</option>
                                <option ${item.item_formato == "CEP" ? "selected" : ''} value="CEP">CEP</option>
                                <option ${item.item_formato == "Telefone" ? "selected" : ''} value="Telefone">Telefone</option>
                                <option ${item.item_formato == "CNPJ" ? "selected" : ''} value="CNPJ">CNPJ</option>
                                <option ${item.item_formato == "CPF" ? "selected" : ''} value="CPF">CPF</option>
                                <option ${item.item_formato == "Placa Automóvel" ? "selected" : ''} value="Placa Automóvel">Placa Automóvel</option>
                                <option ${item.item_formato == "Placa Mercosul" ? "selected" : ''} value="Placa Mercosul">Placa Mercosul</option>
                            </optgroup>
                            <optgroup class="" label="Numérico">
                                <option ${item.item_formato == "Quantidade" ? "selected" : ''} value="Quantidade">Quantidade</option>
                                <option ${item.item_formato == "Monetário" ? "selected" : ''} value="Monetário">Monetário</option>
                                <option ${item.item_formato == "Decimal" ? "selected" : ''} value="Decimal">Decimal</option>
                            </optgroup>
                            <optgroup class="" label="Lista de seleção">
                                <option ${item.item_formato == "Seleção única" ? "selected" : ''} value="Seleção única">Seleção única</option>
                                <option ${item.item_formato == "Seleção múltipla" ? "selected" : ''} value="Seleção múltipla">Seleção múltipla</option>
                            </optgroup>
                        </select>
                    </td>`
                    }
                }
                document.getElementById("btnEnviar").classList.remove("d-none")
            } else {
                alert("O checklist não possui campos!")
                document.location.reload(true)
            }
        })
}
const enviarItens = (event) => {
    event.preventDefault()
    let itens = [];
    let table = document.getElementById("tbEdit").querySelector("tbody");
    let tableSize = table.rows.length
    // // percorre as linhas da tabela
    for (let i = 0; i < tableSize; i++) {
        if (table.rows[i].querySelector("[name^='item_formato_']")) {
            let item = {
                id: table.rows[i].querySelector("[name^='item_id_']").value,
                item_nome: table.rows[i].querySelector("[name^='item_nome_']").value,
                item_descricao: table.rows[i].querySelector("[name^='item_descricao_']").value,
                item_dica: table.rows[i].querySelector("[name^='item_dica_']").value,
                item_tipo: table.rows[i].querySelector("[name^='item_tipo_']").value,
                item_formato: table.rows[i].querySelector("[name^='item_formato_']").value
            };
            itens.push(item);
        } else {
            let item = {
                id: table.rows[i].querySelector("[name^='item_id_']").value,
                item_nome: table.rows[i].querySelector("[name^='item_nome_']").value,
                item_descricao: table.rows[i].querySelector("[name^='item_descricao_']").value,
                item_dica: table.rows[i].querySelector("[name^='item_dica_']").value,
                item_tipo: table.rows[i].querySelector("[name^='item_tipo_']").value
            };
            itens.push(item);
        }
        update(itens[i].id, itens)
    }
}
const deletarItem = (event, id) => {
    event.preventDefault()
    if (confirm("Deseja deletar o item?") == true) {
        fetch(`/checklist_item/${id}`, { method: "DELETE" })
            .then(response => {
                response.status == 200 ? alert("Item deletado com sucesso") : false;
                document.location.reload(true)
            })
    }
}
const update = (id, itens) => {
    fetch(`/checklist_item/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itens)
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });
}