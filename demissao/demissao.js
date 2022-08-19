$(document).ready(function () {
    var rd_mtvDslg1 = "Antecipação do término de contrato de experiência"
    var rd_mtvDslg2 = "Término do contrato de experiência"
    var rd_mtvDslg3 = "Desligamento Empregador (Empresa)"
    $("#div_anx_demissao,#div_txt_acrdPts,#div_patr_eqp,#div_rd_eftv,#div_rd_mtvDslg,#div_txt_cargo,#div_rd_tpAvs,#txt_altr_rh").hide()
    if (FM == "ADD" || FM == "MOD") {
        $(".select2").select2()
        // Carregar SPE
        $.ajax({
            type: "GET",
            url: "https://experterp.com.br/inter/apiFluig/getSPE.php",
            dataType: "json",
            success: function (response) {
                $.each(response.data, function (index, value) {
                    $("<option></option>", {
                        value: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME,
                        text: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME
                    }).appendTo("#slt_spe")
                })
            },
            error: function () {
                $.each(response.data, function (index, value) {
                    $("<option></option>", {
                        value: "Erro ao carregar SPEs",
                        text: "Erro ao carregar SPEs"
                    }).appendTo("#slt_spe")
                })
            }
        })
    }
    if (ATV == 0 || ATV == 1 || ATV == 4 || ATV == 9 || ATV == 13 || ATV == 29 || ATV == 58 || ATV == 27 || ATV == 15 || ATV == 19 || ATV == 21 || ATV == 23 || ATV == 25 || ATV == 36 || ATV == 127 || ATV == null) {
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
                    $("#div_rd_tpAvs").show()
                    $("#div_anx_demissao").hide()
                break;
                case (rd_mtvDslg == "Pedido de demissão pelo colaborador"):
                    $("#div_anx_demissao").show()
                    $("#div_rd_tpAvs").hide()
                break;
                default:
                    $("#div_anx_demissao,#div_rd_tpAvs").hide()
                    break;
            }
        })
        $("input[name$='rd_acrdPts']").click(function (e) {
            if ($(this).val() == "Sim") {
                $("#div_txt_acrdPts").show()
            } else if ($(this).val() == "Não") {
                $("#div_txt_acrdPts").hide()
            }
        })
        $("input[name$='rd_devEqp_slt']").click(function (e) {
            if ($(this).val() != "Não utilizava equipamentos de T.I.") {
                $("#div_patr_eqp").show()
            }
        })
        $("input[name$='rd_entrev_rh']").click(function (e) {
            if ($(this).val() == "Sim") {
                $("#txt_altr_rh").hide()
            } else if ($(this).val() == "Não") {
                $("#txt_altr_rh").show()
            }
        })
    }
    if (ATV >= 4 || ATV == null) {
        // CONTROLA EXIBICAO DOS INPUTS DPS DE CLICADOS
        if ($("input[name$='rd_Estg']:checked").val() == "Sim") {
            $("#div_rd_eftv,#div_rd_mtvDslg").show()
            $("#div_txt_cargo,#div_rd_tpAvs").hide()
        } else {
            $("#div_rd_mtvDslg,#div_txt_cargo").show()
            $("#div_rd_eftv").hide()
        }
        // ALTERAÇÕES RH
        if ($("input[name$='rd_entrev_rh']:checked").val() == "Não") {
            $("#txt_altr_rh").show()
        } else {
            $("#txt_altr_rh").hide()
        }
        if ($("input[name$='rd_mtvDslg']:checked").val() == rd_mtvDslg1 || 
            $("input[name$='rd_mtvDslg']:checked").val() == rd_mtvDslg2 || 
            $("input[name$='rd_mtvDslg']:checked").val() == rd_mtvDslg3
            && $("input[name$='rd_Estg']:checked").val() == "Não") {
            $("#div_rd_tpAvs").show()
            $("#div_anx_demissao").hide()
        }
        if ($("input[name$='rd_mtvDslg']:checked").val() == "Pedido de demissão pelo colaborador") {
            $("#div_rd_tpAvs").hide()
            $("#div_anx_demissao").show()
        }
        if ($("input[name$='rd_acrdPts']:checked").val() == "Não") {
            $("#div_txt_acrdPts").hide()
        } else if ($("input[name$='rd_acrdPts']:checked").val() == "Sim") {
            $("#div_txt_acrdPts").show()
        }
        if ($("input[name$='rd_devEqp_slt']:checked").val() != "Não utilizava equipamentos de T.I.") {
            $("#div_patr_eqp").show()
        }
    }
})