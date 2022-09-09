$(document).ready(function () {
    // Controla os cliques nos campos
    if (ATV == "null" || FM == "VIEW" || FM == "MOD" || FM == "ADD") {
        $(".select2").select2()
        $("#div_jur_just, #div_fis_just").hide()
    }
    //FORMULÁRIO INICIAL:
    $("input[name$='jur_analise']").click(function () {
        // alert()
        if ($(this).val() == "Sim") {
            $("#div_jur_just").show()
        } else {
            $("#div_jur_just").hide()
        }
        // $(this).val() == "Sim" ? $("#div_jur_just").show() : $("#div_jur_just").hide()
    });
    //FISCAL:
    $("input[name$='fis_analise']").click(function () {
        // alert()
        if ($(this).val() == "Sim") {
            $("#div_fis_just").show()
        } else {
            $("#div_fis_just").hide()
        }
    });
    exibircampo("fis_analise", "Sim", "div_fis_just")
    exibircampo("jur_analise", "Sim", "div_jur_just")
});
function exibircampo(campo, valor, div) {
    $("input[name$='" + campo + "']:checked").val() == valor ? $("#" + div).show() : $("#" + div).hide()
}