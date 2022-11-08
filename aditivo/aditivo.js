// Controla exibição na atividade 1
$(document).ready(function() {
    // Controla os cliques nos campos
    if(FM == "MOD" || FM == "ADD"){
        // INICIO
        $("input[name$='rd_terreno']").click(function() {
            if ($(this).val() == "Sim") {
                $("#div_slt_terreno").show()
            } else{
                $("#div_slt_terreno,#div_txt_solicitacao").hide()
                $("#txt_readonly input").attr("readonly", false)
            }
        });  
        // ATUALIZAÇÃO DA ESTIMATIVA DO ORÇAMENTO
        $("input[name$='nvInf_estOrc']").click(function() {
            if ($(this).val() == "Sim") {
                $("#attestOrc").hide()
                $("#infoNec_estOrc").show()
            } else{
                $("#attestOrc").show()
                $("#infoNec_estOrc").hide()
            }
        });   
        // ATUALIZAÇÃO DA ESTIMATIVA DA VIABILIDADE
        $("input[name$='nvInf_estViab']").click(function() {
            if ($(this).val() == "Sim") {
                $("#att_estViab").show()
            } else{
                $("#att_estViab").hide()
            }
        });   
        // Validação das Informações e Negociação com o Terrenista
        $("input[name$='nvInf_vldNegTer']").click(function() {
            if ($(this).val() == "Sim") {
                $("#nvInf_vldNegTer_s").show()
                $("#nvInf_vldNegTer_n").hide()
            } else{
                $("#nvInf_vldNegTer_s").hide()
                $("#nvInf_vldNegTer_n").show()
            }
        });  
        // VALIDAÇÃO DA SOLICITAÇÃO (DIREÇÃO)
        $("input[name$='nvInf_vldSolct']").click(function() {
            if ($(this).val() == "Sim") {
                $("#nvInf_vldSolct_s").show()
                $("#nvInf_vldSolct_n").hide()
            } else{
                $("#nvInf_vldSolct_s").hide()
                $("#nvInf_vldSolct_n").show()
            }
        }); 
        // nvInf_vldSolct_n
        $("select[name$='nvInf_vldSolct_n']").click(function() {
            if ($(this).val() == "Distrato") {
                $("#mtv_distrato_txt").show()
            }else{
                $("#mtv_distrato_txt").hide()
            }
        });  
        // Informações Jurídicas
        $("input[name$='nvInf_elbAdtv']").click(function() {
            if ($(this).val() == "Sim") {
                $("#nvInf_elbAdtv").show()
                $("#anx_elbAdtv").hide()
            } else{
                $("#anx_elbAdtv").show()
                $("#nvInf_elbAdtv").hide()
            }
        });
        // Validação das Informações
        $("input[name$='nvInf_vldInfos']").click(function() {
            if ($(this).val() == "Não") {
                $("#nvInf_vldInfos").show()
            } else{
                $("#nvInf_vldInfos").hide()
            }
        });
        // Análise do Aditivo x Viabilidade
        $("input[name$='nvInf_ansAdtViab']").click(function() {
            if ($(this).val() == "Não") {
                $("#info_ansAdtViab").show()
            } else{
                $("#info_ansAdtViab").hide()
            }
        });
        // Validação da alta direção
        $("input[name$='nvInf_vldAltaDir']").click(function() {
            if ($(this).val() == "Não") {
                $("#reprov_vldAltaDir, #nvInf_vldAltaDir_n").show()
            } else{
                $("#reprov_vldAltaDir, #nvInf_vldAltaDir_n").hide()
            }
        });
        // Lançamento do contrato de aditivo
        $("input[name$='nvInf_crntAdtv']").click(function() {
            if ($(this).val() == "Sim") {
                $("#anx_crntAdtv, #dtCmpTerr").show()
                $("#att_crntAdtv").hide()
            } else{
                $("#anx_crntAdtv, #dtCmpTerr").hide()
                $("#att_crntAdtv").show()
            }
        });
        // ANÁLISE DOS PAGAMENTOS PARA LANÇAMENTO
        $("input[name$='nvInf_crntAdtv']").click(function() {
            if ($(this).val() == "Sim") {
                $("#anx_crntAdtv, #dtCmpTerr").show()
                $("#att_crntAdtv").hide()
            } else{
                $("#anx_crntAdtv, #dtCmpTerr").hide()
                $("#att_crntAdtv").show()
            }
        });
    }
    // Controla os campos que já foram clicados anteriormente
    if(FM == "MOD" || FM == "VIEW" || ATV == "null"){
        // INICIO
        if($("input[name$='rd_terreno']:checked").val() == "Sim") {
            $("#div_slt_terreno").show()
        }else if($("input[name$='rd_terreno']:checked").val() == "Não"){
            $("#div_slt_terreno").hide()
        }
        // ATUALIZAÇÃO DA ESTIMATIVA DO ORÇAMENTO
        if($("input[name$='nvInf_estOrc']:checked").val() == "Sim") {
            $("#infoNec_estOrc").show()
            $("#attestOrc").hide()
        }else if($("input[name$='nvInf_estOrc']:checked").val() == "Não"){
            $("#attestOrc").show()
            $("#infoNec_estOrc").hide()
        }
        // ATUALIZAÇÃO DA ESTIMATIVA DA VIABILIDADE
        if($("input[name$='nvInf_estViab']:checked").val() == "Sim") {
            $("#att_estViab").show()
        }else if($("input[name$='nvInf_estViab']:checked").val() == "Não"){
            $("#att_estViab").hide()
        }
        // Validação das Informações e Negociação com o Terrenista
        if($("input[name$='nvInf_vldNegTer']:checked").val() == "Sim") {
            $("#nvInf_vldNegTer_s").show()
            $("#nvInf_vldNegTer_n").hide()
        }else if($("input[name$='nvInf_vldNegTer']:checked").val() == "Não"){
            $("#nvInf_vldNegTer_s").hide()
            $("#nvInf_vldNegTer_n").show()
        }
        // VALIDAÇÃO DA SOLICITAÇÃO (DIREÇÃO)
        if($("input[name$='nvInf_vldSolct']:checked").val() == "Sim") {
            $("#nvInf_vldSolct_s").show()
            $("#nvInf_vldSolct_n").hide()
        }else if($("input[name$='nvInf_vldSolct']:checked").val() == "Não"){
            $("#nvInf_vldSolct_s").hide()
            $("#nvInf_vldSolct_n").show()
        }
        // Informações Jurídicas
        if($("input[name$='nvInf_elbAdtv']:checked").val() == "Sim") {
            $("#infos_elbAdtv").show()
            $("#anx_elbAdtv").hide()
        }else if($("input[name$='nvInf_elbAdtv']:checked").val() == "Não"){
            $("#anx_elbAdtv").show()
            $("#infos_elbAdtv").hide()
        }
        // Validação das Informações
        if($("input[name$='nvInf_vldInfos']:checked").val() == "Sim") {
            $("#nvInf_vldInfos").hide()
        }else if($("input[name$='nvInf_vldInfos']:checked").val() == "Não"){
            $("#nvInf_vldInfos").show()
        }
        // Análise do Aditivo x Viabilidade
        if($("input[name$='nvInf_ansAdtViab']:checked").val() == "Sim") {
            $("#info_ansAdtViab").hide()
        }else if($("input[name$='nvInf_ansAdtViab']:checked").val() == "Não"){
            $("#info_ansAdtViab").show()
        }
        // Validação da alta direção
        if($("input[name$='nvInf_vldAltaDir']:checked").val() == "Sim") {
            $("#reprov_vldAltaDir, #nvInf_vldAltaDir_n").hide()
        }else if($("input[name$='nvInf_vldAltaDir']:checked").val() == "Não"){
            $("#reprov_vldAltaDir, #nvInf_vldAltaDir_n").show()
        }
        // Lançamento do contrato de aditivo
        if($("input[name$='nvInf_crntAdtv']:checked").val() == "Sim") {
            $("#anx_crntAdtv, #dtCmpTerr").show()
            $("#att_crntAdtv").hide()
        }else if($("input[name$='nvInf_crntAdtv']:checked").val() == "Não"){
            $("#anx_crntAdtv, #dtCmpTerr").hide()
            $("#att_crntAdtv").show()
        }
        // ANÁLISE DOS PAGAMENTOS PARA LANÇAMENTO
        if($("input[name$='nvInf_crntAdtv']:checked").val() == "Sim") {
            $("#anx_crntAdtv, #dtCmpTerr").show()
            $("#att_crntAdtv").hide()
        }else if($("input[name$='nvInf_crntAdtv']:checked").val() == "Não"){
            $("#anx_crntAdtv, #dtCmpTerr").hide()
            $("#att_crntAdtv").show()
        }
    }
    // Controla os botoes de anexo // Caso estejam em modo leitura, vincula um click para a aba anexos e altera o texto para visualizr anexos
    var anexos = ['anx_infosTerreno','att_estudoMassa','anx_attestOrc','anx_flhRosto','anx_NovasInfo','anx_attViab','anx_vldNegTer','anx_vldSolct','anx_elbAdtv','anx_crntAdtv']
    for (var pos = 0; pos < anexos.length; pos++) {
        if($("input[name*='"+anexos[pos]+"'").attr('readonly') == "readonly"){
            $("input[name*='"+anexos[pos]+"'").attr('onclick','').unbind('click');
            $("input[name*='"+anexos[pos]+"'").css('pointer-events','all');
            $("input[name*='"+anexos[pos]+"'").val('Visualizar anexos');
            $("input[name*='"+anexos[pos]+"'").on('click', function () {
                $(window).scrollTop(0);
                window.parent.document.querySelector("#tab-attachments > div > div.col-xs-8").click()
            });
        }
    }
    // Controla exibição dos titulos da tabela de pagamentos
    $("[thc='tpg']").hide()
    $(".tpgBtn").click(function (e) {  e.preventDefault(); $("[thc='tpg']").show() })
    if(ATV != 71)  $("[thc='tpg']").show()
});