// Ação ao clicar no botão documento
function viewDoc() {
    var url = "https://interconstrutora136608.fluig.cloudtotvs.com.br/portal/p/1/ecmnavigation?app_ecm_navigation_doc=";
    parent.open(url + $("#documento").val());
}
function visualizarSolicitacao() {
    var url = "https://interconstrutora136608.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_processInstanceId="
    parent.open(url + solicitacao);
}