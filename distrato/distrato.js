// Controla exibição na atividade 1
$(document).ready(function () {
    // Controla os cliques nos campos
    if (FM == "MOD" || FM == "ADD") {
        $("input[name$='rd_terreno']").click(function () {
            if ($(this).val() == "Sim") {
                $("#div_slt_terreno,#div_txt_solicitacao").show()
                $("#txt_readonly input").attr("readonly", true)
                $("#txt_readonly input").val("")
                $("#txt_readonly input").text("")
                $("[attr-class='mudarClasse']").removeClass("col-md-4 form-group").addClass("col-md-3 form-group");
            } else {
                $("#div_slt_terreno,#div_txt_solicitacao").hide()
                $("#txt_readonly input").attr("readonly", false)
                $("#txt_readonly input").val("")
                $("#txt_readonly input").text("")
                $("[attr-class='mudarClasse']").removeClass("col-md-3 form-group").addClass("col-md-4 form-group");
            }
        });
        // INICIO
        // (Direção) Análise do Distrato
        controlaClick("rd_distrato", "Não", "slt_att_infos")
        // Elaboração do Distrato
        controlaClick("rd_nvsInfos", "Sim", "nvsInfos_elb_dst")
        controlaClick("rd_nvsInfos", "Não", "anx_elb_dst")
        // (Direção) Validação do Distrato
        controlaClick("rd_dst_dir_apv", "Não", "mtv_dst_dir_rpv")
        //Validação Prospector 
        controlaClick("rd_dst_prp_apv", "Não", "mtv_dst_prp_rpv")
        //Aditivo 
        controlaClick("rd_ass_dst", "Iniciar aditivo", "aditivo")

    }
    // Controla os campos que já foram clicados anteriormente
    if (FM == "MOD" || FM == "VIEW" || ATV == "null") {
        // INICIO
        // (Direção) Análise do Distrato
        controlaExb("rd_distrato", "Não", "slt_att_infos")
        // Elaboração do Distrato
        controlaExb("rd_nvsInfos", "Sim", "nvsInfos_elb_dst")
        controlaExb("rd_nvsInfos", "Não", "anx_elb_dst")
        // (Direção) Validação do Distrato
        controlaExb("rd_dst_dir_apv", "Não", "mtv_dst_dir_rpv")
        // Assinatura do distrato
        controlaExb("rd_ass_dst", "Não", "mtv_ass_dst")
        controlaExb("rd_ass_dst", "Sim", "anx_ctt_ass")
        //Validação Prospector
        controlaExb("rd_dst_prp_apv", "Não", "mtv_dst_prp_rpv")

    }
    // Pega o valor das textareas das atvs att info e novas infos
    if (ATV == 58 || ATV == 63) {

    }
    // Controla os botoes de anexo // Caso estejam em modo leitura, vincula um click para a aba anexos e altera o texto para visualizr anexos
    var anexos = ["anx_distrato", "anx_att_infos", "anx_elb_dst", "anx_nvs_infos", "anx_dst_rpv", "anx_ctt_ass", "anx_ntf_extj"]
    for (var pos = 0; pos < anexos.length; pos++) {
        if ($("input[name*='" + anexos[pos] + "'").attr('readonly') == "readonly") {
            $("input[name*='" + anexos[pos] + "'").attr('onclick', '').unbind('click');
            $("input[name*='" + anexos[pos] + "'").css('pointer-events', 'all');
            $("input[name*='" + anexos[pos] + "'").val('Visualizar anexos');
            $("input[name*='" + anexos[pos] + "'").on('click', function () {
                $(window).scrollTop(0);
                window.parent.document.querySelector("#tab-attachments > div > div.col-xs-8").click()
            });
        }
    }
    // Controla exibição dos titulos da tabela de pagamentos
    $("[thc='tpg']").hide()
    $(".tpgBtn").click(function (e) { e.preventDefault(); $("[thc='tpg']").show() })
    if (ATV != 34) $("[thc='tpg']").show()
});
function controlaExb(campo, v_campo, id_show) {
    if ($("input[name$='" + campo + "']:checked").val() == v_campo) {
        $("#" + id_show).show()
    } else {
        $("#" + id_show).hide()
    }
}
function controlaClick(campo, v_campo, id_show) {
    $("input[name$='" + campo + "']").click(function () {
        if ($(this).val() == v_campo) {
            $("#" + id_show).show()
        } else {
            $("#" + id_show).hide()
        }
    });
}
