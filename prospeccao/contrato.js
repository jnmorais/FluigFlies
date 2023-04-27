$(document).ready(function () {
    if (ATV) {
        // Controla o click na atividade do juridico
        show_on_click("rd_ctt", "Não", null, "div_rd_ctt")
        hide_on_load("rd_ctt", "Não", null, "div_rd_ctt")
    }
});
// Controlador dos clicks (nome do input,valor pra verificar, ..., id da div pra exibir)
function show_on_click(campo, valor1, valor2, show) {
    $("[name$='" + campo + "']").click(function () {
        if (valor2 == null) {
            if ($(this).val() == valor1) {
                $("#" + show).show();
            } else {
                $("#" + show).hide();
            }
        } else {
            if ($(this).val() == valor1 || $(this).val() == valor2) {
                $("#" + show).show();
            } else {
                $("#" + show).hide();
            }
        }
    });
}
// Controla a exibição dos campos ocultos
function hide_on_load(campo, valor1, valor2, show) {
    if (valor2 == null) {
        if ($("[name$='" + campo + "']:checked").val() == valor1) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    } else {
        if ($("[name$='" + campo + "']:checked").val() == valor1 || $("[name$='" + campo + "']:checked").val() == valor2) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    }
}
// SETA VALORES DE ACORDO COM O ZOOM SELECIONADO
function setSelectedZoomItem(selectedItem) {
    $(".input_reset").val("")
    if (selectedItem.inputId == "slt_terreno") {
        $("#txt_codigoTrr").val("").val(selectedItem["Codigo do terreno"])
        $("#txt_codigoEstudo").val("").val(selectedItem["Codigo do estudo"])
        $("#txt_nomenclatura").val("").val(selectedItem["Nomenclatura"])
        carregarAnexos(selectedItem["Codigo do terreno"])
        // VALORES DO ESTUDO
        carregarValores("formulario_estudoterreno", selectedItem["Codigo do estudo"], ["slt_fmrNeg", "txt_fNTorna", "txt_fNFisc", "txt_fNFinc", "txtAr_sugstViabilidade", "vlr_mrgBrt", "vlr_mrgLiq", "vlr_cst_uh", "vlr_preco_m2", "vlr_custo_m2", "vlr_vagas", "vlr_uhs", "txt_ticketMedio_abrt", "txtAr_tipologia", "slt_tpEmprd"], "solicitacao_estudo")
        // VALORES DO TERRENO
        carregarValores("formulario_cadastroterreno", selectedItem["Codigo do terreno"], ["slt_tpTerr", , "txt_areaTrr", "txt_vlrTerr", "txt_percCrr", "txt_enderecoTrr", "txtAr_obsansCoord", "txtAr_obsansDirt", "txtAr_obsansComercial"], "solicitacao_cadastro")
        // CARREGA TICKET MEDIO
        carregarValoresTbl(selectedItem["Codigo do estudo"], "tblTicketMedio", ["txt_tpPlanta", "vlr_ticketMedio", "txt_obs_ticketMedio"], "tblTicketMedio")
    }
}
// ABRE A SOLICITACAO DO ESTUDO SELECIONADO
function visualizarSolicitacao(campo) {
    let codigo = $("#" + campo).val()
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
// BUSCA INFORMACOES DO TERRENO|ESTUDO CRIADOS
function carregarValores(processo, solicitacao, campos, campo_vrf) {
    var filter = DatasetFactory.createConstraint(campo_vrf, solicitacao, solicitacao, ConstraintType.MUST);
    var ds_values = DatasetFactory.getDataset(processo, null, new Array(filter), null);
    ds_values.values.forEach(itemTrr => {
        for (const campo of campos) {
            if (itemTrr[campo]) {
                $("#" + campo).val(itemTrr[campo]).prop('readonly', true).css('pointer-events', 'none')
            } else {
                $("#" + campo).val("Não foi preenchido!").prop('readonly', true).css('pointer-events', 'none')
            }
        }
    })
}
// BUSCAR INFORMACOES DOS ANEXOS
function carregarAnexos(txt_solicitacao) {
    var filter = new Array(DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", txt_solicitacao, txt_solicitacao, ConstraintType.MUST),
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
// function carregarAnexosTbl(dataset, tablename, documento_solicitacao, nv_tbl, campos) {
//     // BUSCAR ANEXOS DO ESTUDO (PROCESSO PAI)
//     var filtro_doc = new Array(
//         DatasetFactory.createConstraint("documentPK.documentId", 1182, 1182, ConstraintType.MUST),
//         DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST)
//     );
//     // BUSCAR DADOS DO DOCUMENTO
//     var ds_doc = DatasetFactory.getDataset("document", null, filtro_doc, null);
//     // BUSCAR OS ANEXOS DA TABELA
//     var filter = new Array(
//         DatasetFactory.createConstraint("tablename", tablename, tablename, ConstraintType.MUST),
//         DatasetFactory.createConstraint("documentid", documento_solicitacao, documento_solicitacao, ConstraintType.MUST)
//     );
//     let dataset_tbl = DatasetFactory.getDataset(dataset, null, filter, null);
//     dataset_tbl.values.forEach(item => {
//     });
// }
function carregarValoresTbl(solicitacao, tblName, campos, tblDestino) {
    var filtros = new Array(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", solicitacao, solicitacao, ConstraintType.MUST))
    var workflowProcess = DatasetFactory.getDataset("workflowProcess", null, filtros, null);
    var numDoc = workflowProcess.values[0].cardDocumentId
    let table = DatasetFactory.getDataset("formulario_estudoterreno", null, new Array(DatasetFactory.createConstraint("tablename", tblName, tblName, ConstraintType.MUST), DatasetFactory.createConstraint("documentid", numDoc, numDoc, ConstraintType.MUST)), null);
    table.values.forEach(item => {
            $("#" + tblDestino + " tbody").append("<tr><td>" + item["txt_tpPlanta"] + "</td><td>" + item["vlr_ticketMedio"] + "</td><td>" + item["txt_obs_ticketMedio"] + "</td></tr>");
    });
}