$(document).ready(function () {
    let arr_cbxsi = []

    if (ATV == 0 || ATV == 1) {
        var sistemas = ["Nenhum sistema será necessário", "Mega", "Expert", "Approvo", "Adobe/Doc Sign", "Construtor de vendas", "Fluig", "HCM"];
        /* Instantiated new autocomplete */
        var myAutocomplete = FLUIGC.autocomplete('#slt_sistemas', { source: substringMatcher(sistemas), name: 'sistemas', displayKey: 'sistema', tagClass: 'tag-gray', type: 'tagAutocomplete', highlight: true, hint: 'true', autoLoading: 'false' });
    }
    // Controla os cliques nos campos
    if (ATV) {
        // $("#rd_etp_na, #vl_crtComb, #rd_tpPc,#entrg_RossiEqp,#pastasRede,#anx_ctt_ass,#show_acessos,#mega, #expert, #approvo, #adobe, #cv, #hcm, #microtik, #uc2b").hide()
        $("#rd_patrm,#entrg_Rossi,#softwares").hide()
        // Habilita pesquisa em select
        $(".select2").select2()
        // CHECKBOX SISTEMAS
        $(".cbx_si").change(function () {
            $("#" + $(this).attr('id_div')).toggle();
        });
        // Desmarca todos os sistemas ao marcar o cbx_nhm
        var divs = ['mega', 'expert', 'approvo', 'adobe', 'cv', 'hcm', 'microtik', 'uc2b'];
        $("#cbx_nhm").click(function () {
            $("input[type='checkbox'].cbx_si:checked").prop('checked', false);
            for (var i = 0; i < divs.length; i++) {
                if ($("#" + divs[i]).is(':visible')) {
                    $("#" + divs[i]).hide()
                }
            }
        });
        // Bloqueia os sistemas caso cbx_nhm esteja marcado
        $('#cbx_nhm').change(function () {
            if ($(this).prop("checked")) {
                $('.cbx_si').attr('disabled', true);
                return;
            }
            $('.cbx_si').attr('disabled', false);
            // not checked
        });
        // EXIBE OS SISTEMAS CLICADOS
        $($('#sistemas').find("input[type='checkbox']:checked")).each(function () {
            $("#" + $(this).attr('id_div')).show()
            arr_cbxsi.push($(this).attr('id_div'))
        });
        // CHECKBOX SISTEMAS FIM
        show_on_click("rd_na", "Sim", null, "rd_etp_na")
        show_on_click("rd_crtComb", "Sim", null, "vl_crtComb")
        show_on_click("juridico_analise", "Não", null, "anx_ctt_ass")
        show_on_click("rd_etg_si", "Sim", null, "show_acessos")
        show_on_click('rd_pc', 'Sim, já tem computador', null, 'rd_patrm')
        show_on_click('rd_pc', 'Não, mas será necessário alugar um computador', null, 'entrg_Rossi')
        show_on_click('rd_pc', 'Não, mas será necessário alugar um computador', null, 'softwares')
        show_on_click('rd_acsRd', 'Sim', null, 'pastasRede')
        show_on_click('rd_eqpRossi', 'Sim', null, 'entrg_RossiEqp')
        // show_on_click_mult("pf_analise", "Sim", "pf_obs", "pf_justv")
        // show_on_click_mult("cntb_analise", "Sim", "cntb_obs", "cntb_justv")
        // ATV 89 - (SISTEMAS) - Mega, Expert, Approvo
        if (ATV == 89 || ATV == null) {
            show_on_click("rd_etg_si_1", "Sim", null, "show_acessos_1")
        }
        // ATV 91 - (SISTEMAS) - CV e Adobe
        if (ATV == 91 || ATV == null) {
            show_on_click("rd_etg_si_2", "Sim", null, "show_acessos_2")
        }
        // ATV 92 - (SISTEMAS) - FLUIG;
        if (ATV == 92 || ATV == null) {
            show_on_click("rd_etg_si_3", "Sim", null, "show_acessos_3")
        }
        // ATV 93 - (SISTEMAS) - HCM;
        if (ATV == 93 || ATV == null) {
            show_on_click("rd_etg_si_4", "Sim", null, "show_acessos_4")
        }
    }
    if (ATV > 4) {
        hide_on_load("rd_na", "Sim", null, "rd_etp_na")
        hide_on_load("rd_crtComb", "Sim", null, "vl_crtComb")
        hide_on_load("juridico_analise", "Não", null, "anx_ctt_ass")
        hide_on_load("rd_etg_si", "Sim", null, "show_acessos")
        hide_on_load('rd_pc', 'Sim, já tem computador', null, 'rd_patrm')
        hide_on_load('rd_pc', 'Não, mas será necessário alugar um computador', null, 'entrg_Rossi')
        hide_on_load('rd_pc', 'Não, mas será necessário alugar um computador', null, 'softwares')
        hide_on_load('rd_acsRd', 'Sim', null, 'pastasRede')
        hide_on_load('rd_eqpRossi', 'Sim', null, 'entrg_RossiEqp')
        // hide_on_load_mult("pf_analise", "Sim", "pf_obs", "pf_justv")
        // hide_on_load_mult("cntb_analise", "Sim", "cntb_obs", "cntb_justv")
        // ATV 89 - (SISTEMAS) - Mega, Expert, Approvo
        hide_on_load("rd_etg_si_1", "Sim", null, "show_acessos_1")
        // ATV 91 - (SISTEMAS) - CV e Adobe
        hide_on_load("rd_etg_si_2", "Sim", null, "show_acessos_2")
        // ATV 92 - (SISTEMAS) - FLUIG;
        hide_on_load("rd_etg_si_3", "Sim", null, "show_acessos_3")
        // ATV 93 - (SISTEMAS) - HCM;
        hide_on_load("rd_etg_si_4", "Sim", null, "show_acessos_4")
    }
    // Sistemas
    if (ATV == 39 || ATV == null || FM == "VIEW") {
        $("#entrg_fwc,#entrg_mega,#entrg_expert,#entrg_approvo,#entrg_adobe,#entrg_cv,#entrg_hcm,#entrg_microtik,#entrg_uc2b").hide()
        for (let index = 0; index < arr_cbxsi.length; index++) {
            arr_cbxsi[index] == "mega" || arr_cbxsi[index] == "expert" ? $("#entrg_fwc").show() : false
            $("#entrg_" + arr_cbxsi[index]).show()
        }
    }
});
// Controlador dos clicks (nome do input,valor pra verificar, ..., id da div pra exibir)
function show_on_click(campo, valor1, valor2, show) {
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
// Controlador dos clicks multiplicos
function show_on_click_mult(campo, valor, div1, div2) {
    $("[name$='" + campo + "']").click(function () {
        if ($(this).val() == valor) {
            $("#" + div1).show()
            $("#" + div2).hide()
        } else {
            $("#" + div1).hide()
            $("#" + div2).show()
        }
    });
}
function hide_on_load_mult(campo, valor, div1, div2) {
    $("[name$='" + campo + "']").click(function () {
        if ($("[name$='" + campo + "']:checked").val() == valor) {
            $("#" + div1).show()
            $("#" + div2).hide()
        } else {
            $("#" + div1).hide()
            $("#" + div2).show()
        }
    });
}
// Controla a exibição dos campos ocultos
function hide_on_load(campo, valor1, valor2, show) {
    if (valor2 == null) {
        if ($("[name$='" + campo + "']:checked").val() == valor1) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    } else {
        if ($("[name$='" + campo + "']:checked").val() == valor1 || $("[name$='" + campo + "']:checked").val() == valor2) {
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
                    sistema: str
                });
            }
        });
        cb(matches);
    };
}