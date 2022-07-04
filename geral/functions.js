// Ação ao clicar no botão documento
$(document).ready(function () {
    displayBtnFiles()
    $(".copyCode").click(function (e) {
        e.preventDefault()
        navigator.clipboard.writeText($(this).val())
        FLUIGC.toast({
            title: '',
            message: 'O Código ' + $(this).val() + ' foi copiado!',
            type: 'success'
        });
    })
})
function viewDoc() {
    var url = "https://interconstrutora136393.fluig.cloudtotvs.com.br/portal/p/1/ecmnavigation?app_ecm_navigation_doc=";
    parent.open(url + $("#documento").val());
}
function visualizarSolicitacao() {
    var url = "https://interconstrutora136393.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_processInstanceId="
    parent.open(url + $("#solicitacao").val());
}
function openForm() {
    $("#overlay").toggle();
    window.parent.$("#workflowview-header").toggle()
    window.parent.$("#breadcrumb").toggle()
    window.parent.$("#breadcrumb").prop("style", "z-index:-1")
    $("#email_si").toggle();
}
function anexarFile(nome, input) {
    var btn = parent.document.getElementById("ecm-navigation-inputFile-clone");
    if (btn && document.createEvent) {
        btn.setAttribute("data-on-camera", "true");
        if (nome && input) {
            btn.setAttribute("data-file-name-camera", nome)
            btn.setAttribute("data-inputNameFile", input)
        }
        btn.click();
    }
}
function loadMsg(process) {
    if (process == "ADM" && ATV == 37 || ATV == 109 || ATV == 9) {
        FLUIGC.toast({
            title: 'Atenção!',
            message: 'A edição do formulário está habilitada nesta tarefa!',
            type: 'success'
        });
    }
}

