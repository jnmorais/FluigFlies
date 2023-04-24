$(document).ready(function () {
    // Controla os cliques nos campos
    if (ATV == "null" || FM == "VIEW" || FM == "MOD" || FM == "ADD") {
        $("#div_jur_just, #div_fis_just").hide()
    }
    exibircampoClick("jur_analise", "Sim", null, "div_jur_just")
    exibircampoClick("fis_analise", "Sim", null, "div_fis_just")

    exibircampo("fis_analise", "Sim", "div_fis_just")
    exibircampo("jur_analise", "Sim", "div_jur_just")
});
function exibircampo(campo, valor, div) {
    $("input[name$='" + campo + "']:checked").val() == valor ? $("#" + div).show() : $("#" + div).hide()
}
function exibircampoClick(campo, valor1, valor2, show) {
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