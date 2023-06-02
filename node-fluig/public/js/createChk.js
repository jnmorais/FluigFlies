let contadorItens = 0;
let contadorAreas = 0;
function adicionarArea(event) {
    contadorAreas++;
    if (contadorAreas >= 1) {
        document.getElementById("msg_checklist").classList.add("d-none");
        document.getElementById("acc_checklist_itens").classList.remove("d-none");
    }
    document.getElementById("contadorAreas").value = contadorAreas
    // Cria um novo conjunto de tens adicionais
    var areasAdicionais = document.createElement('div');
    areasAdicionais.classList.add("area_panel", "mb-5")
    areasAdicionais.id = `checklist_area_${contadorAreas}`
    areasAdicionais.innerHTML = `<div class="row p-3" id="area_${contadorAreas}_header">
                                        <div class="col-9">
                                            <div class="input-group">
                                            <input
                                                type="text"
                                                name="area_nome_${contadorAreas}"
                                                id="area_nome_${contadorAreas}"
                                                class="form-control"
                                                placeholder="Nome da área ${contadorAreas}"
                                                required
                                            />
                                            <span class="input-group-text">-</span>
                                            <input
                                                type="text"
                                                name="area_desc_${contadorAreas}"
                                                id="area_desc_${contadorAreas}"
                                                class="form-control"
                                                placeholder="Descrição da área ${contadorAreas}"
                                                required
                                            />
                                            </div>
                                        </div>
                                        <div class="col-1">
                                            <button
                                            type="button"
                                            class="btn btn-success w-100 h-100 d-flex justify-content-center"
                                            onclick="adicionarItens(event,'${contadorAreas}')"
                                            >
                                            <i class="bi bi-plus"></i>
                                            </button>
                                        </div>
                                        <div class="col-1">
                                            <button
                                            type="button"
                                            class="btn btn-danger w-100 h-100 d-flex justify-content-center"
                                            onclick="deletarArea(event,'${contadorAreas}')"
                                            >
                                            <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                        <div class="col-1">
                                            <button
                                            type="button"
                                            class="btn btn-warning w-100 h-100 d-flex justify-content-center"
                                            onclick="visualizarArea(event,'${contadorAreas}')"
                                            >
                                            <i class="bi bi-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="row p-3 area_content" id="area_${contadorAreas}_body">
                                        <ul class="nav nav-tabs" id="area_${contadorAreas}_tab" role="tablist"></ul>
                                        <div class="tab-content" id="area_${contadorAreas}_content"></div>
                                    </div>`
    document.getElementById('acc_checklist_itens').appendChild(areasAdicionais);
    event.preventDefault()
}
function adicionarItens(event, pos) {
    event.preventDefault()
    // captura o nome da area e verifica se a mesma está preenchida
    var area_nome = document.getElementById(`area_nome_${pos}`).value
    var area_desc = document.getElementById(`area_desc_${pos}`).value
    if (area_nome) {
        contadorItens++;
        if (contadorItens <= 50) {
            document.getElementById("contadorItens").value = contadorItens
            // Cria um novo nav-item pro item
            var navItensAdicionais = document.createElement('li');
            navItensAdicionais.classList.add("nav-item")
            navItensAdicionais.setAttribute("role", "presentation")
            navItensAdicionais.innerHTML = `
            <button class="nav-link" id="checklist_item_${contadorItens}_tab" data-bs-toggle="tab" 
            data-bs-target="#checklist_item_${contadorItens}" type="button" role="tab"
            aria-controls="checklist_item_${contadorItens}" aria-selected="false">
                Item #${contadorItens}
            </button>`
            // Insere o nav item na nav-tabs
            document.querySelector(`#checklist_area_${pos} #area_${pos}_tab`).appendChild(navItensAdicionais);
            // Cria um novo conjunto de itens adicionais
            var itensAdicionais = document.createElement('div');
            itensAdicionais.classList.add("tab-pane", "fade", "mt-2")
            itensAdicionais.id = `checklist_item_${contadorItens}`
            itensAdicionais.setAttribute("role", "tabpanel")
            itensAdicionais.setAttribute("aria-labelledby", `checklist_itens_${contadorItens}_tab`)
            itensAdicionais.setAttribute("tabindex", "0")
            itensAdicionais.innerHTML = `
                                <input type="hidden" name="area_nome_desc_${contadorItens}" value="${area_nome + "-" + area_desc}">
                                <div class="row">
                                    <div class="col-8">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="item_nome_${contadorItens}" placeholder="Item ${contadorItens}"
                                                name="item_nome_${contadorItens}" required>
                                                <label for="item_nome_${contadorItens}">Item ${contadorItens}</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-floating">
                                            <select name="item_obrigatorio_${contadorItens}" id="item_obrigatorio_${contadorItens}"
                                                class="form-control" required>
                                                <option value="">Selecione</option>
                                                <option value="Sim">Sim</option>
                                                <option value="Não">Não</option>
                                            </select>
                                            <label for="item_obrigatorio_${contadorItens}">Item ${contadorItens} obrigatório?</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <select name="item_tipo_${contadorItens}" id="item_tipo_${contadorItens}" class="form-control"
                                                onchange="changeTipo('item_tipo_${contadorItens}')" required>
                                                <option value="">Selecione</option>
                                                <option value="Avaliativo">Avaliativo</option>
                                                <option value="Texto">Texto</option>
                                                <option value="Data">Data</option>
                                                <option value="Cadastro">Cadastro</option>
                                                <option value="Numérico">Numérico</option>
                                                <option value="Lista de seleção">Lista de seleção</option>
                                            </select>
                                            <label for="item_tipo_${contadorItens}">Tipo do Item ${contadorItens}</label>
                                        </div>
                                    </div>
                                    <div class="col d-none" id="div_item_peso_${contadorItens}">
                                        <div class="form-floating">
                                            <input type="number" min="0" max="100" maxlength="3" class="form-control"
                                                id="item_peso_${contadorItens}" placeholder="Peso Item ${contadorItens}" name="item_peso_${contadorItens}" required>
                                                <label for="item_peso_${contadorItens}">Peso do Item ${contadorItens}</label>
                                        </div>
                                    </div>
                                    <div class="col d-none" id="div_item_tpAvl_${contadorItens}">
                                        <div class="form-floating">
                                            <select id="item_tpAvl_${contadorItens}" name="item_tpAvl_${contadorItens}"
                                                onchange="changeTipoAvl('item_tpAvl_${contadorItens}')"
                                                class="form-control sltIcons" required>
                                                <option value="">Selecione</option>
                                                <option value="Nota (Ruim/Reg/Bom)" style="font-weight:bold;">&#xF31D; &#xF31B; &#xF327;</option>
                                                <option value="Nota (Ruim/Bom)" style="font-weight:bold;">&#xF31D; &#xF327;</option>
                                                <option value="Opinião (Não/Sim)" style="font-weight:bold;">N S</option>
                                                <option value="Opinião (Não/Sim/N.A)" style="font-weight:bold;">N S N/A</option>
                                            </select>
                                            <label for="item_tpAvl_${contadorItens}">Tipo de avaliação do Item ${contadorItens}</label>
                                        </div>
                                    </div>
                                    <div class="col d-none" id="div_item_formato_${contadorItens}">
                                        <div class="form-floating">
                                            <select name="item_formato_${contadorItens}" id="item_formato_${contadorItens}" class="form-control">
                                                <optgroup class="d-none" label="Data" required>
                                                    <option value="">Selecione</option>
                                                    <option value="Horário 24h">Horário 24h</option>
                                                    <option value="Horário 24h(s)">Horário 24h(s)</option>
                                                    <option value="Data: dd/mm/aaaa">Data: dd/mm/aaaa</option>
                                                    <option value="Data: mm/aaaa">Data: mm/aaaa</option>
                                                    <option value="Data: dd/mm/aaaa até dd/mm/aaaa">Data: dd/mm/aaaa até dd/mm/aaaa</option>
                                                </optgroup>
                                                <optgroup class="d-none" label="Cadastro">
                                                    <option value="">Selecione</option>
                                                    <option value="E-mail">E-mail</option>
                                                    <option value="Estado">Estado</option>
                                                    <option value="UF e Cidade">UF e Cidade</option>
                                                    <option value="CEP">CEP</option>
                                                    <option value="Telefone">Telefone</option>
                                                    <option value="CNPJ">CNPJ</option>
                                                    <option value="CPF">CPF</option>
                                                    <option value="Placa Automóvel">Placa Automóvel</option>
                                                    <option value="Placa Mercosul">Placa Mercosul</option>
                                                </optgroup>
                                                <optgroup class="d-none" label="Numérico">
                                                    <option value="">Selecione</option>
                                                    <option value="Monetário">Monetário</option>
                                                    <option value="Quantidade">Quantidade</option>
                                                    <option value="Decimal">Decimal</option>
                                                </optgroup>
                                                <optgroup class="d-none" label="Lista de seleção">
                                                    <option value="">Selecione</option>
                                                    <option value="Seleção única">Seleção única</option>
                                                    <option value="Seleção múltipla">Seleção múltipla</option>
                                                </optgroup>
                                            </select>
                                            <label for="item_formato_${contadorItens}">Tipo de item ${contadorItens}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2 d-none" id="div_complemento_${contadorItens}">
                                    <div class="col">
                                        <div class="d-flex align-items-center border border-black rounded p-2">
                                            <label for="rd_complemento_comentario_${contadorItens}">Selecione os complementos obrigatórios: </label>
                                            <ul class="checkbox-group">
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="comentario">
                                                    <input type="checkbox" id="rd_complemento_comentario_${contadorItens}"
                                                        name="rd_complemento_comentario_${contadorItens}" value="comentario">
                                                        <label for="rd_complemento_comentario_${contadorItens}">
                                                            <i class="bi bi-chat-left-text-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="plnAcao">
                                                    <input type="checkbox" id="rd_complemento_plnAcao_${contadorItens}"
                                                        name="rd_complemento_plnAcao_${contadorItens}" value="plnAcao">
                                                        <label for="rd_complemento_plnAcao_${contadorItens}">
                                                            <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="anexos">
                                                    <input type="checkbox" id="rd_complemento_anexos_${contadorItens}"
                                                        name="rd_complemento_anexos_${contadorItens}" value="anexos">
                                                        <label for="rd_complemento_anexos_${contadorItens}" value="anexos"> <i
                                                            class=" bi bi-paperclip mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ass">
                                                    <input type="checkbox" id="rd_complemento_ass_${contadorItens}"
                                                        name="rd_complemento_ass_${contadorItens}" value="ass">
                                                        <label for="rd_complemento_ass_${contadorItens}">
                                                            <i class="bi bi-pen mx-2"></i>
                                                        </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2 d-none px-2" id="div_avlTpAvaliativo_${contadorItens}">
                                    <div class="col">
                                        <div class="d-flex align-items-center border border-black rounded p-2 justify-content-center">
                                            <strong style="color:#b50000;font-size: 20px;">N</strong>
                                            <ul class="checkbox-group">
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="comentario">
                                                    <input type="checkbox" id="rd_avlAvaliativo_n_comentario_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_n_${contadorItens}" value="comentario">
                                                        <label for="rd_avlAvaliativo_n_comentario_${contadorItens}">
                                                            <i class="bi bi-chat-left-text-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="plnAcao">
                                                    <input type="checkbox" id="rd_avlAvaliativo_n_plnAcao_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_n_${contadorItens}" value="plnAcao">
                                                        <label for="rd_avlAvaliativo_n_plnAcao_${contadorItens}">
                                                            <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="anexos">
                                                    <input type="checkbox" id="rd_avlAvaliativo_n_anexos_${contadorItens}" value="anexos">
                                                        <label for="rd_avlAvaliativo_n_anexos_${contadorItens}" value="anexos"> <i
                                                            class=" bi bi-paperclip mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ass">
                                                    <input type="checkbox" id="rd_avlAvaliativo_n_ass_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_n_${contadorItens}" value="ass">
                                                        <label for="rd_avlAvaliativo_n_ass_${contadorItens}">
                                                            <i class="bi bi-pen mx-2"></i>
                                                        </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="d-flex align-items-center border border-black rounded p-2 justify-content-center">
                                            <strong style="color:#00b51e;font-size: 20px;">S</strong>
                                            <ul class="checkbox-group">
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="comentario">
                                                    <input type="checkbox" id="rd_avlAvaliativo_s_comentario_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_s_${contadorItens}" value="comentario">
                                                        <label for="rd_avlAvaliativo_s_comentario_${contadorItens}">
                                                            <i class="bi bi-chat-left-text-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="plnAcao">
                                                    <input type="checkbox" id="rd_avlAvaliativo_s_plnAcao_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_s_${contadorItens}" value="plnAcao">
                                                        <label for="rd_avlAvaliativo_s_plnAcao_${contadorItens}">
                                                            <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="anexos">
                                                    <input type="checkbox" id="rd_avlAvaliativo_s_anexos_${contadorItens}" value="anexos">
                                                        <label for="rd_avlAvaliativo_s_anexos_${contadorItens}" value="anexos"> <i
                                                            class=" bi bi-paperclip mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ass">
                                                    <input type="checkbox" id="rd_avlAvaliativo_s_ass_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_s_${contadorItens}" value="ass">
                                                        <label for="rd_avlAvaliativo_s_ass_${contadorItens}">
                                                            <i class="bi bi-pen mx-2"></i>
                                                        </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col" id="opt_na">
                                        <div class="d-flex align-items-center border border-black rounded p-2 justify-content-center">
                                            <strong style="color:#9625a9;font-size: 20px;">N/A</strong>
                                            <ul class="checkbox-group">
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="comentario">
                                                    <input type="checkbox" id="rd_avlAvaliativo_na_comentario_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_na_${contadorItens}" value="comentario">
                                                        <label for="rd_avlAvaliativo_na_comentario_${contadorItens}">
                                                            <i class="bi bi-chat-left-text-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="plnAcao">
                                                    <input type="checkbox" id="rd_avlAvaliativo_na_plnAcao_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_na_${contadorItens}" value="plnAcao">
                                                        <label for="rd_avlAvaliativo_na_plnAcao_${contadorItens}">
                                                            <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="anexos">
                                                    <input type="checkbox" id="rd_avlAvaliativo_na_anexos_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_na_${contadorItens}" value="anexos">
                                                        <label for="rd_avlAvaliativo_na_anexos_${contadorItens}">
                                                            <i class="bi bi-paperclip mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ass">
                                                    <input type="checkbox" id="rd_avlAvaliativo_na_ass_${contadorItens}"
                                                        name="rd_avlTpAvaliativo_na_${contadorItens}" value="ass">
                                                        <label for="rd_avlAvaliativo_na_ass_${contadorItens}">
                                                            <i class="bi bi-pen mx-2"></i>
                                                        </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2 d-none px-2" id="div_avlTpNota_${contadorItens}">
                                    <div class="col">
                                        <div class="d-flex align-items-center border border-black rounded p-2 justify-content-center">
                                            <i class="bi bi-emoji-frown" style="color:#b50000;font-size: 20px;"></i>
                                            <ul class="checkbox-group">
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="comentario">
                                                    <input type="checkbox" id="rd_avlTpNota_ruim_comentario_${contadorItens}"
                                                        name="rd_avlTpNota_ruim_${contadorItens}" value="comentario">
                                                        <label for="rd_avlTpNota_ruim_comentario_${contadorItens}">
                                                            <i class="bi bi-chat-left-text-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="plnAcao">
                                                    <input type="checkbox" id="rd_avlTpNota_ruim_plnAcao_${contadorItens}"
                                                        name="rd_avlTpNota_ruim_${contadorItens}" value="plnAcao">
                                                        <label for="rd_avlTpNota_ruim_plnAcao_${contadorItens}">
                                                            <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="anexos">
                                                    <input type="checkbox" id="rd_avlTpNota_ruim_anexos_${contadorItens}"
                                                        name="rd_avlTpNota_ruim_${contadorItens}" value="anexos">
                                                        <label for="rd_avlTpNota_ruim_anexos_${contadorItens}">
                                                            <i class="bi bi-paperclip mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ass">
                                                    <input type="checkbox" id="rd_avlTpNota_ruim_ass_${contadorItens}"
                                                        name="rd_avlTpNota_ruim_${contadorItens}" value="ass">
                                                        <label for="rd_avlTpNota_ruim_ass_${contadorItens}">
                                                            <i class="bi bi-pen mx-2"></i>
                                                        </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col d-none" id="opt_regular">
                                        <div class="d-flex align-items-center border border-black rounded p-2 justify-content-center">
                                            <i class="bi bi-emoji-neutral" style="color:#a9b500;font-size: 20px;"></i>
                                            <ul class="checkbox-group">
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="comentario">
                                                    <input type="checkbox" id="rd_avlTpNota_regular_comentario_${contadorItens}"
                                                        name="rd_avlTpNota_regular_${contadorItens}" value="comentario">
                                                        <label for="rd_avlTpNota_regular_comentario_${contadorItens}">
                                                            <i class="bi bi-chat-left-text-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="plnAcao">
                                                    <input type="checkbox" id="rd_avlTpNota_regular_plnAcao_${contadorItens}"
                                                        name="rd_avlTpNota_regular_${contadorItens}" value="plnAcao">
                                                        <label for="rd_avlTpNota_regular_plnAcao_${contadorItens}">
                                                            <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="anexos">
                                                    <input type="checkbox" id="rd_avlTpNota_regular_anexos_${contadorItens}"
                                                        name="rd_avlTpNota_regular_${contadorItens}" value="anexos">
                                                        <label for="rd_avlTpNota_regular_anexos_${contadorItens}">
                                                            <i class="bi bi-paperclip mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ass">
                                                    <input type="checkbox" id="rd_avlTpNota_regular_ass_${contadorItens}"
                                                        name="rd_avlTpNota_regular_${contadorItens}" value="ass">
                                                        <label for="rd_avlTpNota_regular_ass_${contadorItens}">
                                                            <i class="bi bi-pen mx-2"></i>
                                                        </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="d-flex align-items-center border border-black rounded p-2 justify-content-center">
                                            <i class="bi bi-emoji-smile" style="color:#00b51e;font-size: 20px;"></i>
                                            <ul class="checkbox-group">
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="comentario">
                                                    <input type="checkbox" id="rd_avlTpNota_bom_comentario_${contadorItens}"
                                                        name="rd_avlTpNota_bom_${contadorItens}" value="comentario">
                                                        <label for="rd_avlTpNota_bom_comentario_${contadorItens}">
                                                            <i class="bi bi-chat-left-text-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="plnAcao">
                                                    <input type="checkbox" id="rd_avlTpNota_bom_plnAcao_${contadorItens}" name="rd_avlTpNota_bom_${contadorItens}"
                                                        value="plnAcao">
                                                        <label for="rd_avlTpNota_bom_plnAcao_${contadorItens}">
                                                            <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="anexos">
                                                    <input type="checkbox" id="rd_avlTpNota_bom_anexos_${contadorItens}" name="rd_avlTpNota_bom_${contadorItens}"
                                                        value="anexos">
                                                        <label for="rd_avlTpNota_bom_anexos_${contadorItens}">
                                                            <i class="bi bi-paperclip mx-2"></i>
                                                        </label>
                                                </li>
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ass">
                                                    <input type="checkbox" id="rd_avlTpNota_bom_ass_${contadorItens}"
                                                        name="rd_avlTpNota_bom_${contadorItens}" value="ass">
                                                        <label for="rd_avlTpNota_bom_ass_${contadorItens}">
                                                            <i class="bi bi-pen mx-2"></i>
                                                        </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <textarea class="form-control"
                                                placeholder="Descrição do item ${contadorItens}" id="item_descricao_${contadorItens}"
                                                rows="2" name="item_descricao_${contadorItens}"></textarea>
                                            <label for="item_descricao_${contadorItens}">Descrição do item ${contadorItens}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <textarea class="form-control"
                                                placeholder="Dica do item ${contadorItens}" id="item_dica_${contadorItens}"
                                                rows="2" name="item_dica_${contadorItens}"></textarea>
                                            <label for="item_dica_${contadorItens}">Dica do item ${contadorItens}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-5">
                                    <div class="col form-group d-flex">
                                        <button type="button" class="btn btn-danger w-100"
                                            onclick="deletarItem(event,${contadorItens})">
                                            <i class="bi bi-trash"></i>
                                            Excluir Item ${contadorItens}
                                        </button>
                                    </div>
                                </div>`;
            // Adiciona os novos itens ao formulário em forma de tab-pane
            document.querySelector(`#checklist_area_${pos} #area_${pos}_content`).appendChild(itensAdicionais);
        } else {
            alert("Este checklist esgotou o limite de campos! (Limite: 50)")
        }
    } else {
        alert(`Preencha o nome da área ${pos} para continuar!`)
    }
    if (contadorItens >= 1) {
        document.getElementById("btnEnviar").classList.remove("d-none");
    }
    event.preventDefault()
}
function deletarItem(event, id) {
    if (confirm("Deseja deletar o item?") == true) {
        contadorItens--;
        document.getElementById("contadorItens").value = contadorItens
        let divPai = document.getElementById("checklist_itens_" + id);
        divPai.remove();
    }
    if (contadorItens < 1) {
        contadorItens = 0
        document.getElementById("btnEnviar").classList.add("d-none");
        document.getElementById("acc_checklist_itens").classList.add("d-none");
        document.getElementById("msg_checklist").classList.remove("d-none");
    }
    event.preventDefault()
}
function deletarArea(event, id) {
    if (confirm("Deseja deletar a área e seus itens?") == true) {
        contadorAreas--
        // Captura a area a ser deletada
        let divPai = document.getElementById("checklist_area_" + id);
        // Verifica quantas areas estão em exibição e iguala o contador
        var contadorAreasInput = document.getElementById("contadorAreas").value
        var AreasExb = document.querySelectorAll("[id^='checklist_area_']").length - 1
        AreasExb != contadorAreasInput ? document.getElementById("contadorAreas").value = AreasExb : false
        // Remove o numero de itens do contador de itens
        var totalItens = document.getElementById("contadorItens").value
        document.getElementById("contadorItens").value = totalItens - parseInt(divPai.querySelectorAll("[id^='checklist_itens_']").length)
        // Remove a area e seus itens
        divPai.remove();
        // Esconde o botao de enviar caso nao tenha mais nenhum item
        if (document.getElementById("contadorItens").value < 1) {
            document.getElementById("btnEnviar").classList.add("d-none");
            contadorItens = 0
        }
        // Exibe o texto inicial caso nao exista areas criadas
        if (contadorAreas < 1) {
            document.getElementById("msg_checklist").classList.remove("d-none");
            document.getElementById("acc_checklist_itens").classList.add("d-none");
            contadorAreas = 0
        }
    }
    event.preventDefault()
}
function changeTipo(that) {
    const select = document.getElementById(that);
    const selectedValue = select.options[select.selectedIndex].value;
    const posItem = select.id.replace("item_tipo_", "")
    if (!document.getElementById(`div_item_formato_${posItem}`).classList.contains("d-none")) {
        document.getElementById(`div_item_formato_${posItem}`).classList.add("d-none")
    }
    if (!document.getElementById(`div_item_peso_${posItem}`).classList.contains("d-none")) {
        document.getElementById(`div_item_peso_${posItem}`).classList.add("d-none")
    }
    if (!document.getElementById(`div_item_tpAvl_${posItem}`).classList.contains("d-none")) {
        document.getElementById(`div_item_tpAvl_${posItem}`).classList.add("d-none")
    }
    if (!document.getElementById(`div_avlTpNota_${posItem}`).classList.contains("d-none")) {
        document.getElementById(`div_avlTpNota_${posItem}`).classList.add("d-none")
    }
    if (!document.getElementById(`div_avlTpAvaliativo_${posItem}`).classList.contains("d-none")) {
        document.getElementById(`div_avlTpAvaliativo_${posItem}`).classList.add("d-none")
    }
    if (!document.getElementById(`div_complemento_${posItem}`).classList.contains("d-none")) {
        document.getElementById(`div_complemento_${posItem}`).classList.add("d-none")
    }
    if (selectedValue == "Avaliativo") {
        if (document.getElementById(`div_item_peso_${posItem}`).classList.contains("d-none")) {
            document.getElementById(`div_item_peso_${posItem}`).classList.remove("d-none")
        }
        if (document.getElementById(`div_item_tpAvl_${posItem}`).classList.contains("d-none")) {
            document.getElementById(`div_item_tpAvl_${posItem}`).classList.remove("d-none")
        }
    } else if (selectedValue != "Texto") {
        if (document.getElementById(`div_complemento_${posItem}`).classList.contains("d-none")) {
            document.getElementById(`div_complemento_${posItem}`).classList.remove("d-none")
        }
        if (document.getElementById(`div_item_formato_${posItem}`).classList.contains("d-none")) {
            document.getElementById(`div_item_formato_${posItem}`).classList.remove("d-none")
        }
        const selectFormatos = document.getElementById(`item_formato_${posItem}`);
        selectFormatos.value = ""
        const optgroups = selectFormatos.getElementsByTagName("optgroup");
        for (let i = 0; i < optgroups.length; i++) {
            if (optgroups[i].label === selectedValue) {
                optgroups[i].classList.remove("d-none");
            } else {
                optgroups[i].classList.add("d-none");
            }
        }
    }
}
function changeTipoAvl(that) {
    const select = document.getElementById(that);
    const selectedValue = select.options[select.selectedIndex].value;
    const posItem = select.id.replace("item_tpAvl_", "")
    if (!document.getElementById(`div_avlTpNota_${posItem}`).classList.contains("d-none")) {
        document.getElementById(`div_avlTpNota_${posItem}`).classList.add("d-none")
    }
    if (!document.getElementById(`div_avlTpAvaliativo_${posItem}`).classList.contains("d-none")) {
        document.getElementById(`div_avlTpAvaliativo_${posItem}`).classList.add("d-none")
    }
    switch (selectedValue) {
        case "Nota (Ruim/Reg/Bom)":
            if (document.getElementById(`div_avlTpNota_${posItem}`).classList.contains("d-none")) {
                document.getElementById(`div_avlTpNota_${posItem}`).classList.remove("d-none")
            }
            if (document.querySelector(`#div_avlTpNota_${posItem} #opt_regular`).classList.contains("d-none")) {
                document.querySelector(`#div_avlTpNota_${posItem} #opt_regular`).classList.remove("d-none")
            }
            break;
        case "Nota (Ruim/Bom)":
            if (document.getElementById(`div_avlTpNota_${posItem}`).classList.contains("d-none")) {
                document.getElementById(`div_avlTpNota_${posItem}`).classList.remove("d-none")
            }
            if (!document.querySelector(`#div_avlTpNota_${posItem} #opt_regular`).classList.contains("d-none")) {
                document.querySelector(`#div_avlTpNota_${posItem} #opt_regular`).classList.add("d-none")
            }
            break;
        case "Opinião (Não/Sim)":
            if (document.getElementById(`div_avlTpAvaliativo_${posItem}`).classList.contains("d-none")) {
                document.getElementById(`div_avlTpAvaliativo_${posItem}`).classList.remove("d-none")
            }
            if (!document.querySelector(`#div_avlTpAvaliativo_${posItem} #opt_na`).classList.contains("d-none")) {
                document.querySelector(`#div_avlTpAvaliativo_${posItem} #opt_na`).classList.add("d-none")
            }
            break;
        case "Opinião (Não/Sim/N.A)":
            if (document.getElementById(`div_avlTpAvaliativo_${posItem}`).classList.contains("d-none")) {
                document.getElementById(`div_avlTpAvaliativo_${posItem}`).classList.remove("d-none")
            }
            if (document.querySelector(`#div_avlTpAvaliativo_${posItem} #opt_na`).classList.contains("d-none")) {
                document.querySelector(`#div_avlTpAvaliativo_${posItem} #opt_na`).classList.remove("d-none")
            }
            break;
    }
}
function visualizarArea(event, pos) {
    if (document.querySelector(`#checklist_area_${pos} #area_${pos}_body`).classList.contains("d-none")) {
        document.querySelector(`#checklist_area_${pos} #area_${pos}_body`).classList.remove("d-none")
    } else {
        document.querySelector(`#checklist_area_${pos} #area_${pos}_body`).classList.add("d-none")
    }
    event.preventDefault()
}