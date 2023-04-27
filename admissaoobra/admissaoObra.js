$(document).ready(function () {
    $(".select2").select2();
    $('[data-toggle="tooltip"]').tooltip()
    $("#div_treinamentos").hide()
    $("#div_novo_cargo").hide()
    // ATV 0|1|4
    if (ATV == 0 || ATV == 1 || ATV == null || ATV == "null") {
        loadDatasetCargos("Obra", "#slt_cargo")
    }
    if (ATV == 0 || ATV == 1 || ATV == 4 || ATV == null) {
        show_on_click('rd_mtvCntr', 'Substituição de colaborador', null, null, 'txt_prSb');
        show_on_click('rd_mtvCntr_subst', 'Sim', null, null, 'div_mtvCntr_subst_1');
        show_on_click('rd_mtvCntr_subst', 'Não', null, null, 'div_mtvCntr_subst_2');
        show_on_click('rd_hrtb', 'Outros', null, null, 'txt_hrtb');
        show_on_click('rd_colabVaga', 'Sim', null, null, 'txt_nmColab');
        $("[name$='rd_semNivelamento']").click(function (e) {
            if ($(this).val() == "Sim") {
                $("#div_infoCrgSal,#alert_cargoSalario,#div_infoSal").show()
                $("#alert_cargo").hide()
            } else if ($(this).val() == "Não") {
                $("#div_infoCrgSal,#alert_cargo,#div_infoCrg").show()
                $("#div_infoSal,#alert_cargoSalario").hide()
            }
        });
    }
    if (ATV == 23 || ATV == null) {
        show_on_click('rd_ans_sst', 'Sim', null, null, 'div_anxAdendo');
    }
    if (ATV == 19) {
        show_on_click('rd_cntr_dp', 'Não', null, null, 'cntr_dp_ok');
    }
    if (ATV == 28) {
        $("#dt_inicio_clb,#anexos").hide()
    }
    if (ATV || FM) {
        // ATV 0/4
        hide_on_load('rd_mtvCntr', 'Substituição de colaborador', null, null, 'txt_prSb');
        hide_on_load('rd_mtvCntr_subst', 'Sim', null, null, 'div_mtvCntr_subst_1');
        hide_on_load('rd_mtvCntr_subst', 'Não', null, null, 'div_mtvCntr_subst_2');
        hide_on_load('rd_hrtb', 'Outros', null, null, 'txt_hrtb');
        hide_on_load('rd_colabVaga', 'Sim', null, null, 'txt_nmColab');
        // hide_on_load('rd_semNivelamento', 'Não', null, null, 'div_infoCrgSal');
        hide_on_load('rd_ans_sst', 'Sim', null, null, 'div_anxAdendo');
        hide_on_load('rd_cntr_dp', 'Não', null, null, 'cntr_dp_ok');
        // CARGOS E TREINAMENTOS/NR
        switch ($("#slt_cargo option:selected").val()) {
            case "ELETRICISTA DE INSTALAÇÕES":
            case "AUXILIAR DE ELETRICISTA":
                $("#div_treinamentos").show()
                $("#nr_txt").text("NR 10")
                break;
            case "OPERADOR DE GRUA":
            case "OPERADOR DE MINI PÁ CARREGADEIRA":
            case "OPERADOR DE CREMALHEIRA":
            case "OPERADOR DE BETONEIRA":
            case "OPERADOR DE RETRO ESCAVADEIRA":
                $("#div_treinamentos").show()
                $("#nr_txt").text("NR 12")
                break;
            default:
                $("#div_treinamentos").hide()
                $("#nr_txt").text("")
                break;
        }
    }
    $("#slt_cargo,#txt_setor_slt").change(function () {
        // e.preventDefault();
        var cargo = $("#slt_cargo").val()
        var setor = $("#txt_setor_slt").val()
        switch (cargo + "|" + setor) {
            case "ENCARREGADO ALMOXARIFADO|" + setor:
            case "ENCARREGADO DE CARPINTEIRO|" + setor:
            case "ENCARREGADO DE OBRA|" + setor:
            case "ENCARREGADO DE ACABAMENTO|" + setor:
            case "ENCARREGADO DE ARMADOR|" + setor:
            case "ENCARREGADO DE OBRA|" + setor:
            case "ENCARREGADO DE INSTALAÇÕES|" + setor:
            case "MESTRE DE OBRA|" + setor:
            case "PEDREIRO DE ACABAMENTO|Assistência Técnica":
                $("#vlr_cargos_rh").val("Sim")
                break;
            default:
                $("#vlr_cargos_rh").val("Não")
                break;
        }
    });
})
// DETECTA ALTERACOES NO ZOOM
function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "txt_cargo") {
        selectedItem["Cargo"] == "Novo cargo" || selectedItem["Cargo"] == "" ? $("#div_novo_cargo").show() : $("#div_novo_cargo").hide()
    }
}
// Controlador dos clicks (nome do input,valor pra verificar, ..., id da div pra exibir)
function show_on_click(campo, valor1, valor2, valor3, show) {
    $("[name$='" + campo + "']").click(function () {
        if (valor2 == null) {
            if ($(this).val() == valor1) {
                $("#" + show).show();
            } else {
                $("#" + show).hide();
            }
        } else {
            if ($(this).val() == valor1 || $(this).val() == valor2 || $(this).val() == valor3) {
                $("#" + show).show();
            } else {
                $("#" + show).hide();
            }
        }
    });
}
// Controla a exibição dos campos ocultos
function hide_on_load(campo, valor1, valor2, valor3, show) {
    if (valor2 == null) {
        if ($("[name$='" + campo + "']:checked").val() == valor1) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    } else {
        if ($("[name$='" + campo + "']:checked").val() == valor1 || $("[name$='" + campo + "']:checked").val() == valor2 || $("[name$='" + campo + "']:checked").val() == valor3) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    }
}
function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    Cargo: str
                });
            }
        });
        cb(matches);
    };
}
function searchSetores(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    Nome: str
                });
            }
        });
        cb(matches);
    };
}