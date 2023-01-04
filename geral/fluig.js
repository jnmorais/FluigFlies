// VARIAVEIS GLOBAIS
const url_prod    = "https://meuinc136393.fluig.cloudtotvs.com.br/"
const url_homg    = "https://meuinc136608.fluig.cloudtotvs.com.br/"
const url_docs    = "portal/p/1/ecmnavigation?app_ecm_navigation_doc="
const url_slts    = "portal/p/1/pageworkflowview?app_ecm_workflowview_processInstanceId="
// Retornar a URL do ambiente
function getBaseUrl(url){
    if(url.match("136393")){
        return url_prod
    }else{
        return url_homg
    }
}
// Abre o documento da solicitação
function viewDoc() {
    parent.open(getBaseUrl(window.location.href) + url_docs + $("#documento").val())
}
// Abre a solicitação
function visualizarSolicitacao() {
    parent.open(getBaseUrl(window.location.href) + url_slts + $("#solicitacao").val())
}
// Controla a exibição ao clicar
/* Para verificar mais clicks, basta criar outra linha passando os parametros*/
function fluig_click(campo, div, valor) {
    // $("input[name$='" + campo + "']").click(function () {
        $("input[name$='" + campo + "']") == valor ? $("#" + div).show() : $("#" + div).hide()
    // })
}
// Controla a exibição dos campos ocultos
/* A função busca o campo passado e o valor que deverá ser verificado para exibição, caso não bata, ocultará a div */
function fluig_display(campo, div, valor) {
    $("input[name$='" + campo + "']:checked").val() == valor ? $("#" + div).show() : $("#" + div).hide()
}