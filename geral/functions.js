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
// VALIDAR FORM 
$('.create-form-components').on('keyup', 'input[required="required"][type="text"], input[required="required"][type="number"], input[required="required"][type="date"], textarea[required="required"]', function () {
    validationFieldsForm($(this), $(this).parents('.form-field').data('type'));
});
$('.create-form-components').on('change', 'input[required="required"][type="checkbox"], input[required="required"][type="radio"], select[required="required"]', function () {
    validationFieldsForm($(this), $(this).parents('.form-field').data('type'));
});
function validationFieldsForm(field, type) {
    if (type === "checkbox" || type === "radio") {
        if (!field.is(':checked')) {
            field.parents('.form-field').addClass('required');
        } else {
            field.parents('.form-field').removeClass('required');
        }
    } else {
        if (!field.val().trim()) {
            field.parents('.form-field').addClass('required');
        } else {
            field.parents('.form-field').removeClass('required');
        }
    }
}