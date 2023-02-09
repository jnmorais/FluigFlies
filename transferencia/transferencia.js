$(document).ready(function () {
    let cc_atual, cc_destino, processo_num, subprocesso
    // Ocultar campos
    $("#div_end_atual, #div_end_destino, #div_nv_salario, #div_carga_hr, #div_nv_cargo,#apv_diretor,#alert_transferencia,#alert_promocao,#div_dt_dp_transfr,#rh_nivelamento,#div_infrasi").hide()
    if ($("input[name$='processo_num']").val() != "" && $("input[name$='processo_num']").val() != undefined && $("input[name$='subprocesso']").val() != "" && $("input[name$='subprocesso']").val() != undefined) {
        processo_num = $("input[name$='processo_num']").val()
        subprocesso = $("input[name$='subprocesso']").val()
        $("#msg_processo").append("<strong style='color:#fff;text-align:right;'> - Origem: " + subprocesso + " Nº: " + processo_num + "</strong>")
    }
    $("input[name$='rd_tp_procs']").click(function (e) {
        if ($(this).val() == "Transferência") {
            $("#slt_promocao,#alert_promocao").hide()
            $("#slt_promocao input:radio").prop("checked", false);
            $("#slt_promocao input:text, #slt_promocao textarea, #slt_promocao select, #slt_promocao .select2").val("");
            window["txt_cargo_atual_promo"].clear()
            window["txt_cargo_novo_promo"].clear()
            window["spe_promo"].clear()
            window["cc_promo"].clear()
            window["txt_cargo_att"].clear()
            window["txt_nivelamento_att"].clear()
            $("#slt_transferencia,#alert_transferencia").show()
        } else {
            $("#slt_transferencia,#alert_transferencia").hide()
            $("#slt_transferencia input:radio").prop("checked", false);
            $("#slt_transferencia input:text, #slt_transferencia textarea, #slt_transferencia select, #slt_transferencia .select2").val("");
            window["txt_cargo_atual"].clear()
            window["txt_cargo_novo"].clear()
            window["txt_gestor_novo"].clear()
            window["spe_atual"].clear()
            window["spe_destino"].clear()
            window["cc_atual"].clear()
            window["cc_destino"].clear()
            $("#slt_promocao,#alert_promocao").show()
        }
    });
    // show_on_click("rd_tp_procs", "slt_transferencia", "Transferência")
    // show_on_click("rd_tp_procs", "slt_promocao", "Promoção")
    hide_on_load("rd_tp_procs", "slt_transferencia", "Transferência")
    hide_on_load("rd_tp_procs", "slt_promocao", "Promoção")
    // TRANSFERENCIA
    show_on_click("rd_locD", "div_infrasi", "Escritório (Backoffice)", "Escritório de obra")
    show_on_click("rd_locD", "div_end_destino", "Obra", "Escritório de obra")
    show_on_click("rd_locA", "div_end_atual", "Obra", "Escritório de obra")
    show_on_click("rd_alt_sal", "div_nv_salario", "Sim")
    show_on_click("rd_alt_sal", "apv_diretor", "Sim")
    show_on_click("rd_alt_cargo", "div_nv_cargo", "Sim")
    show_on_click("rd_alt_cgH", "div_carga_hr", "Sim")
    show_on_click("rd_dp_infos", "div_dt_dp_transfr", "Não")
    show_on_click("rd_atv_rh", "rh_nivelamento", "Sim")
    hide_on_load("rd_alt_sal", "div_nv_salario", "Sim")
    hide_on_load("rd_alt_sal", "apv_diretor", "Sim")
    hide_on_load("rd_alt_cargo", "div_nv_cargo", "Sim")
    hide_on_load("rd_alt_cgH", "div_carga_hr", "Sim")
    hide_on_load("rd_dp_infos", "div_dt_dp_transfr", "Não")
    hide_on_load("rd_atv_rh", "rh_nivelamento", "Sim")
    hide_on_load("rd_locD", "div_infrasi", "Escritório (Backoffice)", "Escritório de obra")
    hide_on_load("rd_locD", "div_end_destino", "Obra", "Escritório de obra")
    hide_on_load("rd_locA", "div_end_atual", "Obra", "Escritório de obra")
    // PROMOCAO
    show_on_click("rd_locPromo", "div_loc_promo", "Obra")
    show_on_click("rd_alt_cargo_promo", "div_nv_cargo_promo", "Sim")
    show_on_click("rd_alt_sal_promo", "div_nv_salario_promo", "Sim")
    hide_on_load("rd_locPromo", "div_loc_promo", "Obra")
    hide_on_load("rd_alt_cargo_promo", "div_nv_cargo_promo", "Sim")
    hide_on_load("rd_alt_sal_promo", "div_nv_salario_promo", "Sim")
    // Cadstrar novo cargo
    $("#novo_cargo").val() != "" ? $("#div_novo_cargo").show() : $("#div_novo_cargo").hide()
});
// Controla a exibição ao clicar
function show_on_click(campo, div, valor1, valor2) {
    if (valor2 == null) {
        $("input[name$='" + campo + "']").click(function () {
            $(this).val() == valor1 ? $("#" + div).show() : $("#" + div).hide()
        })
    } else {
        $("input[name$='" + campo + "']").click(function () {
            $(this).val() == valor1 || $(this).val() == valor2 ? $("#" + div).show() : $("#" + div).hide()
        })
    }
}
// Controla a exibição dos campos ocultos
function hide_on_load(campo, div, valor1, valor2) {
    if (valor2 == null) {
        $("input[name$='" + campo + "']:checked").val() == valor1 ? $("#" + div).show() : $("#" + div).hide()
    } else {
        $("input[name$='" + campo + "']:checked").val() == valor1 || $("input[name$='" + campo + "']:checked").val() == valor2 ? $("#" + div).show() : $("#" + div).hide()
    }
}
function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "txt_cargo_att") {
        if (selectedItem["Cargo"] == "Novo cargo" || selectedItem["Cargo"] == "") {
            $("#div_novo_cargo").show()
            $("#novo_cargo,#txtAr_descricaoAtvs").text("")
            $("#novo_cargo,#txtAr_descricaoAtvs").val("")
        } else {
            $("#div_novo_cargo").hide()
            $("#novo_cargo,#txtAr_descricaoAtvs").text("")
            $("#novo_cargo,#txtAr_descricaoAtvs").val("")
        }
    }
}