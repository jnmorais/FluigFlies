$(document).ready(function () {
    var rd_Estg_clc
    var rd_mtvDslg1 = "Antecipação do término de contrato de experiência"
    var rd_mtvDslg2 = "Término do contrato de experiência"
    var rd_mtvDslg3 = "Desligamento Empregador (Empresa)"
    $("#div_rd_mtvDslg,#div_anx_demissao,#div_rd_tpAvs,#div_txt_acrdPts,#div_rd_eftv,#div_patr_eqp").hide()
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
    if (ATV == 0 || ATV == 1 || ATV == 4 || ATV == 9 || ATV == 13 || ATV == 29 || ATV == 58 || ATV == 27 || ATV == 15 || ATV == 19 || ATV == 21 || ATV == 23 || ATV == 25 || ATV == 36 || ATV == null) {
        // CONTROLA EXIBICAO DOS INPUTS QUANDO CLICADOS
        $("input[name$='rd_Estg']").click(function (e) {
            $("input[name$='rd_mtvDslg']").removeAttr('checked')
            $("input[name$='rd_tpAvs']").removeAttr('checked')
            if ($("#div_anx_demissao").is(":visible")) $("#div_anx_demissao").hide()
            rd_Estg_clc = $(this).val()
            $("#div_rd_mtvDslg").show()
            if (rd_Estg_clc == "Não") {
                $("#div_txt_cargo").show()
                $("#div_rd_eftv").hide()
            } else {
                $("#div_rd_eftv").show()
                $("#div_txt_cargo,#div_rd_tpAvs").hide()
            }
        })
        $("input[name$='rd_mtvDslg']").click(function (e) {
            if (($(this).val() == rd_mtvDslg1
                || $(this).val() == rd_mtvDslg2
                || $(this).val() == rd_mtvDslg3)
                && rd_Estg_clc == "Não") {
                $("#div_rd_tpAvs").show()
                $("#div_anx_demissao").hide()
            } else if ($(this).val() == "Pedido de demissão pelo colaborador") {
                $("#div_rd_tpAvs").hide()
                $("#div_anx_demissao").show()
            } else {
                $("#div_anx_demissao, #div_rd_tpAvs").hide()
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
            if ($(this).val() == "Sim") {
                $("#div_patr_eqp").hide()
            } else if ($(this).val() == "Não, serão realocados") {
                $("#div_patr_eqp").show()
            }
        })
    }
    if (ATV >=4 || ATV == null) {
        // CONTROLA EXIBICAO DOS INPUTS DPS DE CLICADOS
        if ($("input[name$='rd_Estg']:checked").val() == "Não") {
            $("#div_rd_mtvDslg,#div_txt_cargo").show()
            $("#div_rd_eftv").hide()
        } else if ($("input[name$='rd_Estg']:checked").val() == "Sim") {
            $("#div_rd_eftv").show()
            $("#div_txt_cargo,#div_rd_tpAvs").hide()
        }
        if ($("input[name$='rd_mtvDslg']:checked").val() == rd_mtvDslg1 || rd_mtvDslg2 || rd_mtvDslg3
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
        if ($("input[name$='rd_devEqp_slt']:checked").val() == "Não, serão realocados") {
            $("#div_patr_eqp").show()
        } else if ($("input[name$='rd_devEqp_slt']:checked").val() == "Sim") {
            $("#div_patr_eqp").hide()
        }
    }
})