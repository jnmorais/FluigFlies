$(document).ready(function () {
    var filtros = new Array(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", $("#txt_codigoEstudo").val(), $("#txt_codigoEstudo").val(), ConstraintType.MUST))
    var workflowProcess = DatasetFactory.getDataset("workflowProcess", null, filtros, null);
    var numDoc = workflowProcess.values[0].cardDocumentId
    let tb_areas = DatasetFactory.getDataset("formulario_estudoterreno", null, new Array(DatasetFactory.createConstraint("tablename", "tipos_areas", "tipos_areas", ConstraintType.MUST), DatasetFactory.createConstraint("documentid", numDoc, numDoc, ConstraintType.MUST)), null);
    if (tb_areas.length > 0) {
        tb_areas.values.forEach(item => {
            $("#tbTpArTkM tbody").append("<tr><td>" + item['txt_tp_planta'] + "</td><td>" + item['vlr_tp_area'] + "</td><td>" + item['vlr_tp_tktM'] + "</td></tr>");
        });
    }
    $(".input_custom").attr("readonly", true)
    // DADOS CONTRATO
    carregarValores("ds_contratos", $("#txt_codigoContrato").val(), ["dt_ppl_ri", "dt_ppl_alvara"], "solicitacao_contrato", false)
    // DADOS ESTUDO - TIPO EMPREENDIMENTO
    carregarValores("formulario_estudoterreno", $("#txt_codigoEstudo").val(), ["slt_tpEmprd_1", "slt_tpEmprd_2", "slt_tpEmprd_3", "slt_tpEmprd_4"], "solicitacao_estudo", true)
    // DADOS ESTUDO - TIPO EMPREENDIMENTO
    carregarValores("formulario_estudoterreno", $("#txt_codigoEstudo").val(), ["dataSolicitacao"], "solicitacao_estudo", false)
    // DADOS TERRENO - ANALISE TECNICA
    carregarValores("formulario_cadastroterreno", $("#txt_codigoTrr").val(), ["txtAr_obsansCoord", "txtAr_obsansDirt", "txtAr_obsansComercial"], "solicitacao_cadastro", false)
});
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
// BUSCA INFORMACOES DO TERRENO|ESTUDO CRIADOS
function carregarValores(processo, solicitacao, campos, campo_vrf, vrf) {
    // console.log(processo, solicitacao, campos, campo_vrf, vrf)
    if (vrf) {
        var filter = new Array(DatasetFactory.createConstraint(campo_vrf, solicitacao, solicitacao, ConstraintType.MUST));
        var ds_values = DatasetFactory.getDataset(processo, null, filter, null);
        var tpEmprd = ""
        ds_values.values.forEach(itemTrr => {
            for (const campo of campos) {
                if (itemTrr[campo] != "" && itemTrr[campo] != undefined && itemTrr[campo] != "undefined") {
                    tpEmprd += itemTrr[campo] + " - "
                }
            }
        })
        $("#slt_tpEmprd").val(tpEmprd).prop('readonly', true).css('pointer-events', 'none')
    } else {
        var filter = new Array(DatasetFactory.createConstraint(campo_vrf, solicitacao, solicitacao, ConstraintType.MUST));
        var ds_values = DatasetFactory.getDataset(processo, null, filter, null);
        ds_values.values.forEach(itemTrr => {
            for (const campo of campos) {
                if (itemTrr[campo]) {
                    $("#" + campo).val(itemTrr[campo]).prop('readonly', true).css('pointer-events', 'none')
                } else {
                    $("#" + campo).val("Não preenchido na origem!").prop('readonly', true).css('pointer-events', 'none')
                }
            }
        })
    }
}
function carregarValoresTbl(solicitacao, tblName, campos, tblDestino) {
    var filtros = new Array(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", solicitacao, solicitacao, ConstraintType.MUST))
    var workflowProcess = DatasetFactory.getDataset("workflowProcess", null, filtros, null);
    var numDoc = workflowProcess.values[0].cardDocumentId
    let table = DatasetFactory.getDataset("formulario_estudoterreno", null, new Array(DatasetFactory.createConstraint("tablename", tblName, tblName, ConstraintType.MUST), DatasetFactory.createConstraint("documentid", numDoc, numDoc, ConstraintType.MUST)), null);
    table.values.forEach(item => {
        $("#" + tblDestino + " tbody").append("<tr><td>" + item["txt_tpPlanta"] + "</td><td>" + item["vlr_ticketMedio"] + "</td><td>" + item["txt_obs_ticketMedio"] + "</td></tr>");
    });
}