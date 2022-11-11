$(document).ready(function () {
    let cc_atual, cc_destino, processo_num, subprocesso
    // Ocultar campos
    // #div_dp_info
    $("#div_end_atual, #div_end_destino, #div_nv_salario, #div_carga_hr, #div_nv_cargo,#apv_diretor,#alert_transferencia,#alert_promocao,#div_dt_dp_transfr").hide()
    if ($("input[name$='processo_num']").val() != "" && $("input[name$='processo_num']").val() != undefined && $("input[name$='subprocesso']").val() != "" && $("input[name$='subprocesso']").val() != undefined) {
        processo_num = $("input[name$='processo_num']").val()
        subprocesso = $("input[name$='subprocesso']").val()
        $("#msg_processo").append("<strong style='color:#fff;text-align:right;'> - Origem: " + subprocesso + " Nº: " + processo_num + "</strong>")
    }
    show_on_click("rd_locA", "div_end_atual", "Obra")
    show_on_click("rd_locD", "div_end_destino", "Obra")
    show_on_click("rd_alt_sal", "div_nv_salario", "Sim")
    show_on_click("rd_alt_sal", "apv_diretor", "Sim")
    show_on_click("rd_alt_cargo", "div_nv_cargo", "Sim")
    show_on_click("rd_alt_cgH", "div_carga_hr", "Sim")
    show_on_click("rd_tp_procs", "alert_transferencia", "Transferência")
    show_on_click("rd_tp_procs", "alert_promocao", "Promoção")
    show_on_click("rd_dp_infos", "div_dt_dp_transfr", "Não")
    show_on_load("rd_locA", "div_end_atual", "Obra")
    show_on_load("rd_locD", "div_end_destino", "Obra")
    show_on_load("rd_alt_sal", "div_nv_salario", "Sim")
    show_on_load("rd_alt_cargo", "div_nv_cargo", "Sim")
    show_on_load("rd_alt_cgH", "div_carga_hr", "Sim")
    show_on_load("rd_dp_infos", "div_dt_dp_transfr", "Não")
    show_on_load("rd_tp_procs", "alert_transferencia", "Transferência")
    show_on_load("rd_tp_procs", "alert_promocao", "Promoção")
});
// Controla a exibição ao clicar
function show_on_click(campo, div, valor) {
    $("input[name$='" + campo + "']").click(function () {
        $(this).val() == valor ? $("#" + div).show() : $("#" + div).hide()
    })
}
// Controla a exibição dos campos ocultos
function show_on_load(campo, div, valor) {
    $("input[name$='" + campo + "']:checked").val() == valor ? $("#" + div).show() : $("#" + div).hide()
}
// function setSelectedZoomItem(selectedItem) {
//     selectedItem.inputId == "cc_atual" ? cc_atual = selectedItem["CC"] : false
//     selectedItem.inputId == "cc_destino" ? cc_destino = selectedItem["CC"] : false
//     cc_atual != cc_destino ? $("#apv_diretor").show() : $("#apv_diretor").hide()
// }