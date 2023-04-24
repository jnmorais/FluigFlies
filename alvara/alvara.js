$(document).ready(function () {
    var editor = FLUIGC.richeditor('txt_obspassagem');
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