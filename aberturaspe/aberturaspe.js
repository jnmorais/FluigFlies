$(document).ready(function () {
    // Controla os cliques nos campos
    if (ATV == "null" || FM == "VIEW" || FM == "MOD" || FM == "ADD") {
        $("#div_jur_just, #div_fis_just").hide()
    }
    exibircampoClick("jur_analise","Sim",null,"div_jur_just")
    exibircampoClick("fis_analise","Sim",null,"div_fis_just")
    
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