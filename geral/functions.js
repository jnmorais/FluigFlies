// Ação ao clicar no botão documento
$(document).ready(function () {
    displayBtnFiles()
    tableLineCount()
    if (FM == "VIEW") {
        $(".btnAddNewRow").remove();
        $(".tdDeleteRow").remove();
    }
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
    var url = "https://meuinc136393.fluig.cloudtotvs.com.br/portal/p/1/ecmnavigation?app_ecm_navigation_doc=";
    parent.open(url + $("#documento").val());
}
function visualizarSolicitacao() {
    var url = "https://meuinc136393.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="
    parent.open(url + $("#solicitacao").val());
}
function visualizarRelacao() {
    let url = "https://meuinc136393.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?processID=relacao_cargoAtividade"
    parent.open(url);
}
function openForm() {
    $("#overlay").toggle();
    window.parent.$("#workflowview-header").toggle()
    window.parent.$("#breadcrumb").toggle()
    window.parent.$("#breadcrumb").prop("style", "z-index:-1")
    $("#teste").toggle();
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
function getIndice(id) {
    return id.split('___').pop();
}
function tableLineCount(tablename) {
    try {
        let atributo = "[tablename]";
        if (tablename) {
            atributo = `[tablename='${tablename}']`
        }
        $.each($(atributo), function (index) {
            const tabelaRow = $(this).find('tbody tr').not(':first');
            tabelaRow.each(function (i) {
                tabelaRow.eq(i).find('td.count').html(`<span>${i + 1}</span>`);
            });
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função tableLineCount")
        console.error(e)
    }
}
function loadDatasetCargos(verificador, campoId) {
    var dataset = DatasetFactory.getDataset("ds_cargos", null, null, null).values;
    if (verificador != null) {
        for (const item of dataset) {
            if (item.vrf == verificador) {
                $(campoId).append(`<option value="${item.Cargo}">${item.Cargo}</option>`);
            }
        }
    } else {
        $(campoId).append(`<option value="${item.Cargo}">${item.Cargo}</option>`);
    }
}