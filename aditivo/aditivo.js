// Controla exibição na atividade 1
$(document).ready(function () {
    $("#infoNec_estOrc", "#attestOrc", "#infoNec_estOrc", "#attestOrc", "#att_estViab", "#att_estViab", "#nvInf_vldNegTer_s", "#nvInf_vldNegTer_n", "#nvInf_vldNegTer_s", "#nvInf_vldNegTer_n", "#nvInf_vldSolct_s", "#nvInf_vldSolct_n", "#nvInf_vldSolct_s", "#nvInf_vldSolct_n", "#mtv_distrato_txt", "#mtv_distrato_txt", "#nvInf_elbAdtv", "#anx_elbAdtv", "#nvInf_elbAdtv", "#anx_elbAdtv", "#nvInf_vldInfos", "#nvInf_vldInfos", "#info_ansAdtViab", "#info_ansAdtViab", "#reprov_vldAltaDir", "#nvInf_vldAltaDir_n", "#reprov_vldAltaDir", "#nvInf_vldAltaDir_n", "#att_crntAdtv", "#anx_crntAdtv", "#dtCmpTerr", "#att_crntAdtv", "#anx_crntAdtv", "#dtCmpTerr").hide()
    // Controla os cliques nos campos
    if (FM == "MOD" || FM == "ADD") {
        // ATUALIZAÇÃO DA ESTIMATIVA DO ORÇAMENTO
        show_on_click("nvInf_estOrc", "Sim", null, "infoNec_estOrc")
        show_on_click("nvInf_estOrc", "Não", null, "attestOrc")
        hide_on_load("nvInf_estOrc", "Sim", null, "infoNec_estOrc")
        hide_on_load("nvInf_estOrc", "Não", null, "attestOrc")
        // ATUALIZAÇÃO DA ESTIMATIVA DA VIABILIDADE
        show_on_click("nvInf_estViab", "Sim", null, "att_estViab")
        hide_on_load("nvInf_estViab", "Sim", null, "att_estViab")
        show_on_click("nvInf_estViab", "Não", null, "div_anx_attViab")
        hide_on_load("nvInf_estViab", "Não", null, "div_anx_attViab")
        // Validação das Informações e Negociação com o Terrenista
        show_on_click("nvInf_vldNegTer", "Sim", null, "nvInf_vldNegTer_s")
        show_on_click("nvInf_vldNegTer", "Não", null, "nvInf_vldNegTer_n")
        hide_on_load("nvInf_vldNegTer", "Sim", null, "nvInf_vldNegTer_s")
        hide_on_load("nvInf_vldNegTer", "Não", null, "nvInf_vldNegTer_n")
        // VALIDAÇÃO DA SOLICITAÇÃO (DIREÇÃO)
        show_on_click("nvInf_vldSolct", "Sim", null, "nvInf_vldSolct_s")
        show_on_click("nvInf_vldSolct", "Não", null, "nvInf_vldSolct_n")
        hide_on_load("nvInf_vldSolct", "Sim", null, "nvInf_vldSolct_s")
        hide_on_load("nvInf_vldSolct", "Não", null, "nvInf_vldSolct_n")
        // nvInf_vldSolct_n
        show_on_click("nvInf_vldSolct_n", "Distrato", null, "mtv_distrato_txt")
        hide_on_load("nvInf_vldSolct_n", "Distrato", null, "mtv_distrato_txt")
        // Informações Jurídicas
        show_on_click("nvInf_elbAdtv", "Sim", null, "infos_elbAdtv")
        show_on_click("nvInf_elbAdtv", "Não", null, "anx_elbAdtv")
        hide_on_load("nvInf_elbAdtv", "Sim", null, "infos_elbAdtv")
        hide_on_load("nvInf_elbAdtv", "Não", null, "anx_elbAdtv")
        // Validação das Informações
        show_on_click("nvInf_vldInfos", "Não", null, "nvInf_vldInfos")
        hide_on_load("nvInf_vldInfos", "Não", null, "nvInf_vldInfos")
        // Análise do Aditivo x Viabilidade
        show_on_click("nvInf_ansAdtViab", "Não", null, "info_ansAdtViab")
        hide_on_load("nvInf_ansAdtViab", "Não", null, "info_ansAdtViab")
        // Validação da alta direção
        show_on_click("nvInf_vldAltaDir", "Não", null, "reprov_vldAltaDir")
        show_on_click("nvInf_vldAltaDir", "Não", null, "nvInf_vldAltaDir_n")
        hide_on_load("nvInf_vldAltaDir", "Não", null, "reprov_vldAltaDir")
        hide_on_load("nvInf_vldAltaDir", "Não", null, "nvInf_vldAltaDir_n")
        // Lançamento do contrato de aditivo
        show_on_click("nvInf_crntAdtv", "Não", null, "att_crntAdtv")
        show_on_click("nvInf_crntAdtv", "Sim", null, "anx_crntAdtv")
        show_on_click("nvInf_crntAdtv", "Sim", null, "dtCmpTerr")
        hide_on_load("nvInf_crntAdtv", "Não", null, "att_crntAdtv")
        hide_on_load("nvInf_crntAdtv", "Sim", null, "anx_crntAdtv")
        hide_on_load("nvInf_crntAdtv", "Sim", null, "dtCmpTerr")
    }
});
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
function setSelectedZoomItem(selectedItem) {
    $(".input_reset").val("")
    if (selectedItem.inputId == "slt_terreno") {
        $("#txt_codigoTrr").val("").val(selectedItem["codigoterreno"])
        $("#txt_codigoContrato").val("").val(selectedItem["Código Contrato"])
        $("#txt_codigoEstudo").val("").val(selectedItem["Código Estudo"])
        $("#txt_nomenclatura").val("").val(selectedItem["Nomenclatura"])
        $("#txt_enderecoTrr").val("").val(selectedItem["Endereço"])
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