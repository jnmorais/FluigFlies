$(document).ready(function () {
    if ($("#rd_iniciar_estudo").val() == "Sim") {
        var c1 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", $("#solicitacao_estudo").val(), $("#solicitacao_estudo").val(), ConstraintType.MUST);
        var constraints = new Array(c1);
        var dataset = DatasetFactory.getDataset("workflowProcess", null, constraints, null);
        $("#txt_codigoTrr").val(dataset.values[0].sourceProcess)

        if ($("#txt_codigoTrr").val()) {
            carregarAnexos($("#txt_codigoTrr").val())
            carregarTerreno("formulario_cadastroterreno", $("#txt_codigoTrr").val(), ["slt_tpTerr", "txt_areaTrr", "txt_vlrTerr", "txt_percCrr", "txt_enderecoTrr", "txt_nomenclatura"], "solicitacao_cadastro")
            $("#slt_terreno").val($("#txt_codigoTrr").val()).prop('readonly', true).css('pointer-events', 'none')
            $("#txt_codigoTrr").val($("#txt_codigoTrr").val())
            $("#slt_terreno").prop('readonly', true).css('pointer-events', 'none')
        }
    }
    if ($("#pnl_color").val()) {
        $("#pnl_infosTerreno .panel-heading").css("background-color", $("#pnl_color").val())
    }

    $("#show_fNTorna,#show_fNFisc,#show_fNFinc,#show_viabilidadeApv,#show_orcamento,#show_compra_venda").hide("slow")
    if (ATV) {
        $(".select2").select2();
        // Estudo massa terreno
        show_on_click("rd_slt_estudo", "Viabilidade", null, "div_viabilidade")
        hide_on_load("rd_slt_estudo", "Viabilidade", null, "div_viabilidade")
        // Estudo massa terreno
        show_on_click("rd_pss_estudo", "Sim", null, "div_rd_pss_estudo")
        hide_on_load("rd_pss_estudo", "Sim", null, "div_rd_pss_estudo")
        // CONTROLA CLICKS
        $("select[name$='slt_fmrNeg']").change(function () {
            $("#txt_fNTorna,#txt_fNFisc,#txt_fNFinc").val("");
            var click = $(this).val();
            switch (click) {
                case "Compra e Venda":
                    $("#show_fNTorna,#show_fNFisc,#show_fNFinc").hide("slow");
                    $("#show_compra_venda").show("slow")
                    break;
                case "Permuta Física":
                    $("#show_fNFisc").show("slow");
                    $("#show_fNFinc,#show_fNTorna,#show_compra_venda").hide("slow");
                    break;
                case "Permuta Financeira":
                    $("#show_fNFinc").show("slow");
                    $("#show_fNFisc,#show_fNTorna,#show_compra_venda").hide("slow");
                    break;
                case "Permuta Física e Financeira":
                    $("#show_fNFisc,#show_fNFinc").show("slow");
                    $("#show_fNTorna,#show_compra_venda").hide("slow");
                    break;
                case "Permuta Física e Torna":
                    $("#show_fNFisc,#show_fNTorna").show("slow");
                    $("#show_fNFinc,#show_compra_venda").hide("slow");
                    break;
                case "Permuta Financeira e Torna":
                    $("#show_fNFinc,#show_fNTorna").show("slow");
                    $("#show_fNFisc,#show_compra_venda").hide("slow");
                    break;
                case "Permuta Física, Financeira e Torna":
                    $("#show_fNTorna, #show_fNFisc, #show_fNFinc").show("slow");
                    $("#show_compra_venda").hide("slow")
                    break;
                default:
                    $("#show_fNTorna, #show_fNFisc, #show_fNFinc,#show_compra_venda").hide("slow");
                    break;
            }
        });
        selectShow("slt_fmrNeg")
        // Orçamento
        show_on_click("rd_orcamento", "Não, seguir para validação do orçamento", null, "show_orcamento")
        hide_on_load("rd_orcamento", "Não, seguir para validação do orçamento", null, "show_orcamento")
        // Viabilidade
        show_on_click("rd_viabilidade", "Não, prosseguir para validação", null, "show_viabilidadeApv")
        //Quando o campo cep perde o foco.
        $("#txt_cep").blur(function () {
            var cep = $(this).val().replace(/\D/g, '');
            if (cep != "") {
                var validacep = /^[0-9]{8}$/;
                if (validacep.test(cep)) {
                    //Preenche os campos com "..." enquanto consulta webservice.
                    $("#txt_logradouro").val("...");
                    $("#txt_bairro").val("...");
                    $("#txt_cidade").val("...");
                    $("#txt_uf").val("...");
                    //Consulta o webservice viacep.com.br/
                    $.getJSON("https://viacep.com.br/ws/" + cep + "/json/", function (dados) {
                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.
                            $("#txt_logradouro").val(dados.logradouro);
                            $("#txt_bairro").val(dados.bairro);
                            $("#txt_cidade").val(dados.localidade);
                            $("#txt_uf").val(dados.uf);
                        } //end if.
                        else {
                            //CEP pesquisado não foi encontrado.
                            limpa_formulário_cep();
                            alert("CEP não encontrado.");
                        }
                    });
                } //end if.
                else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    alert("Formato de CEP inválido.");
                }
            } //end if.
            else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        });
    }
    if (ATV == 40) {
        let anexos = parent.parent.ECM.attachmentTable.getData()
        for (let i = 0; i < anexos.length; i++) {
            if (anexos[i].description.search("Viabilidade elaborada") == 0) {
                let codigo = anexos[i].description.split("Viabilidade elaborada_")[1]
                // anexosArr.push({codigo: codigo,descricao: anexos[i].description, nome_arquivo:anexos[i].name})
                $("<option></option>", {
                    text: "Código do anexo da viabilidade escolhida: " + codigo,
                    value: "Código do anexo da viabilidade escolhida: " + codigo
                }
                ).appendTo("#slt_viabFinal");
            }
        }
    }
    if (ATV > 6) {
        let prioridade = $("[name$='rd_prioridade']:checked").val()
        let prioridade_texto = ""
        switch (prioridade) {
            case "Baixa":
                prioridade_texto = "<strong style='background-color:#148b30;color:#fff;padding:5px;'> " + prioridade + "</strong>"
                break;
            case "Média":
                prioridade_texto = "<strong style='background-color:#e3b420;color:#fff;padding:5px;'> " + prioridade + "</strong>"
                break;
            case "Alta":
                prioridade_texto = "<strong style='background-color:#cc3d3d;color:#fff;padding:5px;'> " + prioridade + "</strong>"
                break;
        }
        FLUIGC.toast({
            title: 'Atenção!',
            message: 'Este estudo tem a prioridade ' + prioridade_texto,
            type: 'info'
        });
    }
    // ALTERANDO PRIORIDADE DO FORMULARIO ALTERA A COR DOS ELEMENTOS
    $("[name$='rd_prioridade']").change(function () {
        let prioridade = $(this).val()
        $("#nomenclatura_prioridade").val("")
        switch (prioridade) {
            case "Baixa":
                $("#div_rd_prioridade").css({ "border": "solid 2px #148b30", "padding": "10px" })
                $("#pnl_infosTerreno .panel-heading").css("background-color", "#148b30")
                $("#pnl_color").val("#148b30")
                $("#nomenclatura_prioridade").val($("#txt_nomenclatura").val() + " - PR: " + prioridade)
                break;
            case "Média":
                $("#div_rd_prioridade").css({ "border": "solid 2px #e3b420", "padding": "10px" })
                $("#pnl_infosTerreno .panel-heading").css("background-color", "#e3b420")
                $("#pnl_color").val("#e3b420")
                $("#nomenclatura_prioridade").val($("#txt_nomenclatura").val() + " - PR: " + prioridade)
                break;
            case "Alta":
                $("#div_rd_prioridade").css({ "border": "solid 2px #cc3d3d", "padding": "10px" })
                $("#pnl_infosTerreno .panel-heading").css("background-color", "#cc3d3d")
                $("#pnl_color").val("#cc3d3d")
                $("#nomenclatura_prioridade").val($("#txt_nomenclatura").val() + " - PR: " + prioridade)
                break;
        }
    });
});
// Controlador dos clicks (nome do input,valor pra verificar, ..., id da div pra exibir)
function show_on_click(campo, valor1, valor2, show) {
    $("[name$='" + campo + "']").click(function () {
        if (valor2 == null) {
            if ($(this).val() == valor1) {
                $("#" + show).show("slow");
            } else {
                $("#" + show).hide("slow");
            }
        } else {
            if ($(this).val() == valor1 || $(this).val() == valor2) {
                $("#" + show).show("slow");
            } else {
                $("#" + show).hide("slow");
            }
        }
    });
}
// Controla a exibição dos campos ocultos
function hide_on_load(campo, valor1, valor2, show) {
    if (valor2 == null) {
        if ($("[name$='" + campo + "']:checked").val() == valor1) {
            $("#" + show).show("slow");
        } else {
            $("#" + show).hide("slow");
        }
    } else {
        if ($("[name$='" + campo + "']:checked").val() == valor1 || $("[name$='" + campo + "']:checked").val() == valor2) {
            $("#" + show).show("slow");
        } else {
            $("#" + show).hide("slow");
        }
    }
}
function limpa_formulário_cep() {
    $("#txt_logradouro").val("");
    $("#txt_bairro").val("");
    $("#txt_cidade").val("");
    $("#txt_uf").val("");
}
function selectShow(selectName) {
    let sltName = $("select[name$='" + selectName + "']").val()
    switch (sltName) {
        case "Compra e Venda":
            $("#show_fNTorna,#show_fNFisc,#show_fNFinc").hide("slow");
            break;
        case "Permuta Física":
            $("#show_fNFisc").show("slow");
            $("#show_fNFinc,#show_fNTorna").hide("slow");
            break;
        case "Permuta Financeira":
            $("#show_fNFinc").show("slow");
            $("#show_fNFisc,#show_fNTorna").hide("slow");
            break;
        case "Permuta Física e Financeira":
            $("#show_fNFisc,#show_fNFinc").show("slow");
            $("#show_fNTorna").hide("slow");
            break;
        case "Permuta Física e Torna":
            $("#show_fNFisc,#show_fNTorna").show("slow");
            $("#show_fNFinc").hide("slow");
            break;
        case "Permuta Financeira e Torna":
            $("#show_fNFinc,#show_fNTorna").show("slow");
            $("#show_fNFisc").hide("slow");
            break;
        case "Permuta Física, Financeira e Torna":
            $("#show_fNTorna, #show_fNFisc, #show_fNFinc").show("slow");
            break;
        default:
            $("#show_fNTorna, #show_fNFisc, #show_fNFinc").hide("slow");
            break;
    }
}
// SETA VALORES DE ACORDO COM O ZOOM SELECIONADO
function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "slt_terreno") {
        $("#txt_codigoTrr").val("").val(selectedItem["Código"])
        $("#txt_nomenclatura").val("").val(selectedItem["Nomenclatura"])
        carregarAnexos(selectedItem["Código"])
        carregarTerreno("formulario_cadastroterreno", selectedItem["Código"], ["slt_tpTerr", "txt_areaTrr", "txt_vlrTerr", "txt_percCrr", "txt_enderecoTrr"], "solicitacao_cadastro")
    }
}
// ABRE A SOLICITACAO DO ESTUDO SELECIONADO
function visualizarSolicitacao() {
    let codigo = $("#txt_codigoTrr").val()
    let serverUrl = window.location.href.split(".fluig")[0] + ".fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="
    if (codigo == "undefined") {
        FLUIGC.toast({
            title: 'Atenção: ',
            message: 'Código do terreno/estudo não encontrado!',
            type: 'warning'
        });
    } else {
        if (codigo) {
            window.open(serverUrl + codigo)
        } else {
            FLUIGC.toast({
                title: 'Atenção: ',
                message: 'Selecione um terreno/estudo para visualizar!',
                type: 'warning'
            });
        }
    }
}
// ABRE O ARQUIVO REFERENTE AO VALOR DO CAMPO INFORMADO
function visualizarAnexos(campo) {
    if ($("#" + campo).val()) {
        parent.WKFViewAttachment.openAttachmentView("admin", $("#" + campo).val())
    } else {
        FLUIGC.toast({
            title: 'Atenção: ',
            message: 'Não foi possível localizar o anexo!',
            type: 'warning'
        });
    }
}
// BUSCA INFORMACOES DO TERRENO CADASTRADO
function carregarTerreno(processo, solicitacao, campos, campo_vrf) {
    var filter = DatasetFactory.createConstraint(campo_vrf, solicitacao, solicitacao, ConstraintType.MUST);
    var ds_terrenos = DatasetFactory.getDataset(processo, null, new Array(filter), null);
    ds_terrenos.values.forEach(itemTrr => {
        for (const campo of campos) {
            $("#" + campo).val(itemTrr[campo]).prop('readonly', true).css('pointer-events', 'none')
        }
    })
}
// BUSCAR INFORMACOES DOS ANEXOS
function carregarAnexos(txt_codigoTrr) {
    var filter = new Array(DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", txt_codigoTrr, txt_codigoTrr, ConstraintType.MUST),
        DatasetFactory.createConstraint("processAttachmentPK.attachmentSequence", 1, 1, ConstraintType.MUST_NOT),
        DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST))
    // BUSCAR TODOS OS ANEXOS DO PROCESSO SELECIONADO
    var ds_terrenos = DatasetFactory.getDataset("processAttachment", null, filter, null);
    ds_terrenos.values.forEach(itemTrr => {
        var campos_doc = new Array("documentDescription");
        var filtro_doc = new Array(DatasetFactory.createConstraint("documentPK.documentId", itemTrr.documentId, itemTrr.documentId, ConstraintType.MUST), DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST))
        // BUSCAR DADOS DO DOCUMENTO
        var ds_doc = DatasetFactory.getDataset("document", campos_doc, filtro_doc, null);
        // PERCORRENDO OS DOCUMENTOS
        ds_doc.values.forEach(itemDoc => {
            switch (itemDoc.documentDescription) {
                case "Matricula":
                    $("#anx_matriculaTrr").val(itemTrr.documentId)
                    break;
                case "Arquivo KMZ":
                    $("#anx_kmzTrr").val(itemTrr.documentId)
                    break;
                case "IPTU":
                    $("#anx_iptu").val(itemTrr.documentId)
                    break;
            }
        });
    });
}