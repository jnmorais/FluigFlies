$(document).ready(function () {
    $("#txt_servico, #vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps, #txt_servico").hide()
    $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt4,#txt_nt5,#txt_nt6,#txt_nt7,#txt_nt8,#txt_nt9,#txt_nt10,#txt_nt11,#txt_nt12").hide()

    if (ATV == 0 || ATV == 1 || ATV == 5) {
        $(".inputNota").change(function (e) {
            e.preventDefault();
            let inputMax = parseInt($(this).attr("max"))
            let inputMin = parseInt($(this).attr("min"))
            let inputVal = parseInt($(this).val())
            inputVal > inputMax ? $(this).val(inputMax) : inputVal < inputMin ? $(this).val(inputMin) : $(this).val(inputVal)
        });
    }
    //FORMULÁRIO INICIAL:
    $("input[name$='rd_tipofornecedor']").click(function () {
        $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt4,#txt_nt5,#txt_nt6,#txt_nt7,#txt_nt8,#txt_nt9,#txt_nt10,#txt_nt11,#txt_nt12,#txt_servico").hide()
        if ($(this).val() == "Material") {
            $("#vl_anx_cnpj, #vl_anx_matqua, #vl_anx_ficha, #vl_anx_cs, #vl_anx_cbj").is(":hidden") ? $("#vl_anx_cnpj, #vl_anx_matqua, #vl_anx_ficha, #vl_anx_cs, #vl_anx_cbj").show() : false
            $("#txt_nt1,#txt_nt5,#txt_nt2,#txt_nt3").is(":hidden") ? $("#txt_nt1,#txt_nt5,#txt_nt2,#txt_nt3").show() : false
            $("#vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").is(":visible") ? $("#vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").hide() : false
        }
        else if ($(this).val() == "Serviço Especializado ou Empreitada") {
            $("#txt_servico, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_dps, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_nf, #vl_anx_ima,#txt_servico").is(":hidden") ? $("#txt_servico, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_dps, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_nf, #vl_anx_ima,#txt_servico").show() : false
            $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt4,#txt_nt6,#txt_nt7,#txt_nt8,#txt_nt9,#txt_nt5").is(":hidden") ? $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt4,#txt_nt6,#txt_nt7,#txt_nt8,#txt_nt9,#txt_nt5").show() : false
            $("#vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_nf, #vl_anx_dps").is("visible") ? $("#vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_nf, #vl_anx_dps").hide() : false
        }
        else if ($(this).val() == "Projetos") {
            $("#vl_anx_projetos,#txt_servico").is(":hidden") ? $("#vl_anx_projetos,#txt_servico").show() : false
            $("#txt_nt12").is(":hidden") ? $("#txt_nt12").show() : false
            $("#vl_anx_corretor, #vl_anx_matqua, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").is(":visible") ? $("#vl_anx_corretor, #vl_anx_matqua, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").hide() : false
        }
        else if ($(this).val() == "Corretor") {
            $("#vl_anx_corretor, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj").is(":hidden") ? $("#vl_anx_corretor, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj").show() : false
            $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt11").is(":hidden") ? $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt11").show() : false
            $("#vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").is(":visible") ? $("#vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").hide() : false
        }
    });
    if ($("[name$='rd_tipofornecedor']:checked").val() != "") {
        if ($("[name$='rd_tipofornecedor']:checked").val() == "Material") {
            $("#vl_anx_cnpj, #vl_anx_ficha, #vl_anx_cs, #vl_anx_cbj").is(":hidden") ? $("#vl_anx_cnpj, #vl_anx_ficha, #vl_anx_cs, #vl_anx_cbj").show() : false
            $("#txt_nt1,#txt_nt5,#txt_nt2,#txt_nt3").is(":hidden") ? $("#txt_nt1,#txt_nt5,#txt_nt2,#txt_nt3").show() : false
            $("#vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").is(":visible") ? $("#vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").hide() : false
        }
        else if ($("[name$='rd_tipofornecedor']:checked").val() == "Serviço Especializado ou Empreitada") {
            $("#txt_servico, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_dps, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_nf, #vl_anx_ima,#txt_servico").is(":hidden") ? $("#txt_servico, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_dps, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_nf, #vl_anx_ima,#txt_servico").show() : false
            $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt4,#txt_nt6,#txt_nt7,#txt_nt8,#txt_nt9,#txt_nt5").is(":hidden") ? $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt4,#txt_nt6,#txt_nt7,#txt_nt8,#txt_nt9,#txt_nt5").show() : false
            $("#vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_nf, #vl_anx_dps").is("visible") ? $("#vl_anx_corretor, #vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_nf, #vl_anx_dps").hide() : false
        }
        else if ($("[name$='rd_tipofornecedor']:checked").val() == "Projetos") {
            $("#vl_anx_projetos,#txt_servico").is(":hidden") ? $("#vl_anx_projetos,#txt_servico").show() : false
            $("#txt_nt12").is(":hidden") ? $("#txt_nt12").show() : false
            $("#vl_anx_corretor, #vl_anx_matqua, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").is(":visible") ? $("#vl_anx_corretor, #vl_anx_matqua, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").hide() : false
        }
        else if ($("[name$='rd_tipofornecedor']:checked").val() == "Corretor") {
            $("#vl_anx_corretor, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj").is(":hidden") ? $("#vl_anx_corretor, #vl_anx_cnpj, #vl_anx_cs, #vl_anx_cbj").show() : false
            $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt11").is(":hidden") ? $("#txt_nt1,#txt_nt2,#txt_nt3,#txt_nt11").show() : false
            $("#vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").is(":visible") ? $("#vl_anx_projetos, #vl_anx_matqua, #vl_anx_rg, #vl_anx_ficha, #vl_anx_compestadual, #vl_anx_ima, #vl_anx_nf, #vl_anx_dps").hide() : false
        }
    }
});
