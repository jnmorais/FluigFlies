$(document).ready(function () {
    $(".select2").select2();
    $.ajax({
        type: "GET",
        url: "https://experterp.com.br/inter/apiFluig/getCentroCusto.php",
        dataType: "json",
        success: function (response) {
            $.each(response.data, function (index) {
                $("<option></option>", {
                    value: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME,
                    text: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME
                }).appendTo("#slt_cc_atual,#slt_cc_destino");
            });
        },
        error: function () {
            $.each(response.data, function () {
                $("<option></option>", {
                    value: "Erro ao carregar centros de custo",
                    text: "Erro ao carregar centros de custo"
                }).appendTo("#slt_cc_atual,#slt_cc_destino");
            });
        }
    });
    $.ajax({
        type: "GET",
        url: "https://experterp.com.br/inter/apiFluig/getSPE.php",
        dataType: "json",
        success: function (response) {
            $.each(response.data, function (index) {
                $("<option></option>", {
                    value: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME,
                    text: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME
                }).appendTo("#slt_spe_atual,#slt_spe_destino");
            });
        },
        error: function () {
            $.each(response.data, function () {
                $("<option></option>", {
                    value: "Erro ao carregar SPEs",
                    text: "Erro ao carregar SPEs"
                }).appendTo("#slt_spe_atual,#slt_spe_destino");
            });
        }
    });
    // Ocultar campos
    $("#div_end_atual, #div_end_destino, #div_nv_salario, #div_carga_hr, #div_nv_cargo").hide()
    var processo_num, subprocesso;
    if ($("input[name$='processo_num']").val() != "" && $("input[name$='processo_num']").val() != undefined && $("input[name$='subprocesso']").val() != "" && $("input[name$='subprocesso']").val() != undefined) {
        processo_num = $("input[name$='processo_num']").val()
        subprocesso = $("input[name$='subprocesso']").val()
        $("#msg_processo").append("<strong style='color:#fff;text-align:right;'> - Origem: " + subprocesso + " Nº: " + processo_num + "</strong>")
    }

    show_on_click("rd_locA", "div_end_atual", "Obra")
    show_on_click("rd_locD", "div_end_destino", "Obra")
    show_on_click("rd_alt_sal", "div_nv_salario", "Sim")
    show_on_click("rd_alt_cargo", "div_nv_cargo", "Sim")
    show_on_click("rd_alt_cgH", "div_carga_hr", "Sim")
    show_on_click("rd_dp_infos", "div_dp_info", "Sim")

    show_on_load("rd_locA", "div_end_atual", "Obra")
    show_on_load("rd_locD", "div_end_destino", "Obra")
    show_on_load("rd_alt_sal", "div_nv_salario", "Sim")
    show_on_load("rd_alt_cargo", "div_nv_cargo", "Sim")
    show_on_load("rd_alt_cgH", "div_carga_hr", "Sim")
    show_on_load("rd_dp_infos", "div_dp_info", "Sim")
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