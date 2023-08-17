$(document).ready(function () {
    var rd_mtvDslg1 = "Antecipação do término de contrato de experiência"
    var rd_mtvDslg2 = "Término do contrato de experiência"
    var rd_mtvDslg3 = "Desligamento Empregador (Empresa)"
    var rd_mtvDslg6 = "Acordo entre as partes (conforme art. 484-A CLT)"
    $("#div_anx_demissao,#div_txt_acrdPts,#div_patr_eqp,#div_rd_eftv,#div_rd_mtvDslg").hide()
    $("#div_txt_cargo,#div_rd_tpAvs,#txt_altr_rh,#rh_fdbk,#div_txt_rh_fdb,#premioApv").hide()
    $("#msg_transf,#div_rd_clbLocS,#div_rd_clbLocAnx,#aso_obrigatorio,#sistemas_utilizados,#dp_obra").hide()
    if (FM == "ADD" || FM == "MOD") {
        $(".select2").select2()
    }
    if (ATV == 0 || ATV == 1) {
        var sistemas = ["Nenhum sistema era utilizado", "Mega", "Expert", "Approvo", "Adobe/Doc Sign", "Construtor de vendas", "Fluig", "HCM"];
        /* Instantiated new autocomplete */
        var myAutocomplete = FLUIGC.autocomplete("#slt_sistemas", { source: substringMatcher(sistemas), name: "sistemas", displayKey: "sistema", tagClass: "tag-gray", type: "tagAutocomplete", highlight: true, hint: "true", autoLoading: "false" });
    }
    if (ATV) {
        // CONTROLA EXIBICAO DOS INPUTS QUANDO CLICADOS
        $("input[name$='rd_Estg']").click(function (e) {
            $("input[name$='rd_mtvDslg']").removeAttr('checked')
            $("input[name$='rd_tpAvs']").removeAttr('checked')
            if ($("#div_anx_demissao").is(":visible")) $("#div_anx_demissao").hide()
            if ($("#div_rd_tpAvs").is(":visible")) $("#div_rd_tpAvs").hide()
            if ($("#div_rd_mtvDslg").is(":visible")) $("#div_rd_mtvDslg").hide()
            if ($("input[name$='rd_Estg']:checked").val() == "Não") {
                $("#div_rd_mtvDslg, #div_txt_cargo").show()
                $("#div_rd_eftv").hide()
            } else {
                $("#div_rd_mtvDslg, #div_rd_eftv").show()
                $("#div_txt_cargo").hide()
            }
        })
        $("input[name$='rd_mtvDslg']").click(function (e) {
            var rd_Estg = $("input[name$='rd_Estg']:checked").val()
            var rd_mtvDslg = $("input[name$='rd_mtvDslg']:checked").val()
            switch (true) {
                case (rd_mtvDslg == rd_mtvDslg1 && rd_Estg == "Não"):
                case (rd_mtvDslg == rd_mtvDslg2 && rd_Estg == "Não"):
                case (rd_mtvDslg == rd_mtvDslg3 && rd_Estg == "Não"):
                case (rd_mtvDslg == rd_mtvDslg6 && rd_Estg == "Não"):
                    $("#div_rd_tpAvs").show()
                    $("#div_anx_demissao").hide()
                    break;
                case (rd_mtvDslg == "Pedido de desligamento pelo colaborador"):
                    $("#div_anx_demissao").show()
                    $("#div_rd_tpAvs").hide()
                    break;
                default:
                    $("#div_anx_demissao,#div_rd_tpAvs").hide()
                    break;
            }
        })
        // Controla slt_adm_fluig
        $("input[name$='rd_adm_fluig']").click(function (e) {
            if ($(this).val() == "Não") {
                $("#txt_nm_clb").attr("readonly", false)
                $("#txt_nm_clb").val("")
            }
        })
        // Pi'que
        show_on_click("rd_clbCargo", "Obra (Canteiro e Produção)", null, "div_rd_clbLocS")
        show_on_click("rd_clbCargo", "Obra (Canteiro e Produção)", null, "div_dp_obra")
        show_on_click("rd_clbCargo", "Escritório (BackOffice e Administrativo De Obra)", null, "sistemas_utilizados")
        show_on_click("rd_clbLoc", "Sim", null, "div_rd_clbLocAnx")
        show_on_click("rd_premio", "Sim", null, "premioApv")
        show_on_click("rd_acrdPts", "Sim", null, "div_txt_acrdPts")
        show_on_click("rd_devEqp_slt", "Sim, farei a devolução dos equipamentos para T.I Infra", "Sim, porém os equipamentos serão realocados no setor", "div_patr_eqp")
        show_on_click("rd_entrev_rh", "Sim", null, "rh_fdbk")
        show_on_click("rd_entrev_rh", "Não", null, "txt_altr_rh")
        show_on_click("rd_rh_fdb", "Sim", null, "div_txt_rh_fdb")
        show_on_click("rd_rh_ans", "Não, será transferido", null, "msg_transf")
        show_on_click("rd_adm_aso", "Sim", null, "aso_obrigatorio")
        show_on_click("rd_adm_fluig", "Sim", null, "div_adm_fluig_1")
        show_on_click("rd_ans_plnSaude", "Sim", null, "anexo_plano_saude")
        show_on_click("rd_ans_plnOdonto", "Sim", null, "anexo_plano_odonto")
        // Esconde
        hide_on_load("rd_clbCargo", "Obra (Canteiro e Produção)", null, "div_rd_clbLocS")
        hide_on_load("rd_clbCargo", "Obra (Canteiro e Produção)", null, "div_dp_obra")
        hide_on_load("rd_clbCargo", "Escritório (BackOffice e Administrativo De Obra)", null, "sistemas_utilizados")
        hide_on_load("rd_clbLoc", "Sim", null, "div_rd_clbLocAnx")
        hide_on_load("rd_premio", "Sim", null, "premioApv")
        hide_on_load("rd_acrdPts", "Sim", null, "div_txt_acrdPts")
        hide_on_load("rd_devEqp_slt", "Sim, farei a devolução dos equipamentos para T.I Infra", "Sim, porém os equipamentos serão realocados no setor", "div_patr_eqp")
        hide_on_load("rd_entrev_rh", "Sim", null, "rh_fdbk")
        hide_on_load("rd_entrev_rh", "Não", null, "txt_altr_rh")
        hide_on_load("rd_rh_fdb", "Sim", null, "div_txt_rh_fdb")
        hide_on_load("rd_rh_ans", "Não, será transferido", null, "msg_transf")
        hide_on_load("rd_adm_aso", "Sim", null, "aso_obrigatorio")
        hide_on_load("rd_adm_fluig", "Sim", null, "div_adm_fluig_1")
        hide_on_load("rd_ans_plnSaude", "Sim", null, "anexo_plano_saude")
        hide_on_load("rd_ans_plnOdonto", "Sim", null, "anexo_plano_odonto")
        // CONTROLA EXIBICAO DOS INPUTS DPS DE CLICADOS
        if ($("input[name$='rd_Estg']:checked").val() == "Sim") {
            $("#div_rd_eftv,#div_rd_mtvDslg").show()
            $("#div_txt_cargo,#div_rd_tpAvs").hide()
        } else if ($("input[name$='rd_Estg']:checked").val() == "Não") {
            $("#div_rd_mtvDslg,#div_txt_cargo").show()
            $("#div_rd_eftv").hide()
        }
        if ($("input[name$='rd_mtvDslg']:checked").val() == rd_mtvDslg1 ||
            $("input[name$='rd_mtvDslg']:checked").val() == rd_mtvDslg2 ||
            $("input[name$='rd_mtvDslg']:checked").val() == rd_mtvDslg3 ||
            $("input[name$='rd_mtvDslg']:checked").val() == rd_mtvDslg6
            && $("input[name$='rd_Estg']:checked").val() == "Não") {
            $("#div_rd_tpAvs").show()
            $("#div_anx_demissao").hide()
        }
        if ($("input[name$='rd_mtvDslg']:checked").val() == "Pedido de demissão pelo colaborador") {
            $("#div_rd_tpAvs").hide()
            $("#div_anx_demissao").show()
        }
    }
})
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
        substrRegex = new RegExp(q, "i");
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
// IDENTIFICA CARGOS QUE DEVEM PASSAR PELO RH LOGO APOS O PROCESSO INICIAR
function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "txt_cargo" || selectedItem.inputId == "txt_setor") {
        var cargo = $("#txt_cargo").val()
        var setor = $("#txt_setor").val()
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
    }
}
// function setSelectedZoomItem(selectedItem) {
//     if (selectedItem.inputId == "slt_adm_fluig") {
//         $("#txt_nm_clb").val(selectedItem["Colaborador"])
//         $("#txt_nm_clb").attr("readonly", true)
//     }
// }