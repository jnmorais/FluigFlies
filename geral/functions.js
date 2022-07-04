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
function loadData(){
    var contentLoaded = 0;
    var centro_custo = [];
    var spes = [];
    var cidades = [];
    if (contentLoaded == 0) {
        $.ajax({
            type: "GET",
            url: "https://experterp.com.br/inter/apiFluig/getCentroCusto.php",
            dataType: "json",
            success: function (response) {
                centro_custo = response.data
            }
        });
        $.ajax({
            type: "GET",
            url: "https://experterp.com.br/inter/apiFluig/getSPE.php",
            dataType: "json",
            success: function (response) {
                spes = response.data
            }
        });
        $.ajax({
            type: "GET",
            url: "https://rawcdn.githack.com/marllonsousa/FluigFiles/c9dcc197a7c44a346af03969e13e2953e98f5cfa/geral/cidades.json",
            dataType: "json",
            success: function (response) {
                cidades = response.cidades
            }
        });
        contentLoaded = 1;
    }
    if(contentLoaded == 1){
        $.each(spes, function (index, value) {
            $("<option></option>", {
                value: "(" + spes[index].CODIGO + ") - " + spes[index].NOME,
                text: "(" + spes[index].CODIGO + ") - " + spes[index].NOME
            }).appendTo("#slt_spe");
        });
        $.each(cidades, function (index, value) {
            $("<option></option>", {
                value: "(" + cidades[index] + ") - " + cidades[index],
                text: "(" + cidades[index] + ") - " + cidades[index]
            }).appendTo("#slt_cidade");
        });
    }
}