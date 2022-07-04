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
    if (contentLoaded == 0) {
        $.ajax({
            type: "GET",
            url: "https://experterp.com.br/inter/apiFluig/getCentroCusto.php",
            dataType: "json",
            success: function (centro_custo) {
                $.each(centro_custo.data, function (index, value) {
                    $("<option></option>", {
                        value: "(" + centro_custo.data[index].CODIGO + ") - " + centro_custo.data[index].NOME,
                        text: "(" + centro_custo.data[index].CODIGO + ") - " + centro_custo.data[index].NOME
                    }).appendTo("#slt_cc");
                });
            }
        });
        $.ajax({
            type: "GET",
            url: "https://experterp.com.br/inter/apiFluig/getSPE.php",
            dataType: "json",
            success: function (response) {
                $.each(spes.data, function (index, value) {
                    $("<option></option>", {
                        value: "(" + spes.data[index].CODIGO + ") - " + spes.data[index].NOME,
                        text: "(" + spes.data[index].CODIGO + ") - " + spes.data[index].NOME
                    }).appendTo("#slt_spe");
                });
            }
        });
        $.ajax({
            type: "GET",
            url: "https://rawcdn.githack.com/marllonsousa/FluigFiles/c9dcc197a7c44a346af03969e13e2953e98f5cfa/geral/cidades.json",
            dataType: "json",
            success: function (response) {
                $.each(response.cidades, function (index, value) {
                    $("<option></option>", {
                        value: "(" + response.cidades[index] + ") - " + response.cidades[index],
                        text: "(" + response.cidades[index] + ") - " + response.cidades[index]
                    }).appendTo("#slt_cidade");
                });
            }
        });
        contentLoaded = 1;
    }
}