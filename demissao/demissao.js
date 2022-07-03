$(document).ready(function() {
    $("#div_rd_mtvDslg,#div_anx_demissao,#div_rd_tpAvs,#div_txt_acrdPts,#div_rd_eftv,#recisao_colab").hide()
    if (FM == "VIEW" || FM == "MOD") {
        $("span.form-control").removeAttr("style")
    }
    if (FM == "ADD" || FM == "MOD") {
        // $(".select2").select2()
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
    if (ATV >= 0 || ATV == "null") {
        var rd_Estg_clc
        $("input[name$='rd_Estg']").click(function (e) {
            $("input[name$='rd_mtvDslg']").removeAttr('checked')
            $("input[name$='rd_tpAvs']").removeAttr('checked')
            if($("#div_anx_demissao").is(":visible")) $("#div_anx_demissao").hide()
            
            rd_Estg_clc = $(this).val()
            $("#div_rd_mtvDslg").show()
            if(rd_Estg_clc == "Não"){ 
                $("#div_txt_cargo").show()
                $("#div_rd_eftv").hide()
            }else{
                $("#div_rd_eftv").show()
                $("#div_txt_cargo,#div_rd_tpAvs").hide()
            }
        })
        $("input[name$='rd_mtvDslg']").click(function (e) { 
            var val1 = "Antecipação do término de contrato de experiência"
            var val2 = "Término do contrato de experiência"
            var val3 = "Desligamento Empregador (Empresa)"
            if(($(this).val() == val1 || $(this).val() == val2 || $(this).val() == val3) && rd_Estg_clc == "Não"){
                $("#div_rd_tpAvs").show()
                $("#div_anx_demissao").hide()
            }else if($(this).val() == "Pedido de demissão pelo colaborador"){
                $("#div_rd_tpAvs").hide()
                $("#div_anx_demissao").show()
            }else{
                $("#div_anx_demissao, #div_rd_tpAvs").hide()
            }
        })
        $("input[name$='rd_acrdPts']").click(function (e) {
            if($(this).val() == "Sim"){
                $("#div_txt_acrdPts").show()
            }else if($(this).val() == "Não"){
                $("#div_txt_acrdPts").hide()
            }
        })
        $("input[name$='rd_anx_dp_ok']").click(function (e) {
            if($(this).val() == "Sim"){
                $("#recisao_colab").show()
            }else if($(this).val() == "Não"){
                $("#recisao_colab").hide()
            }
        })
    }
})
