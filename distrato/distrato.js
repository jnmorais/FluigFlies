// Controla exibição na atividade 1
$(document).ready(function () {
    // Controla os cliques nos campos
    if (FM == "MOD" || FM == "ADD") {
        // Elaboração do Distrato
        show_on_click("rd_nvsInfos", "Sim", null, "nvsInfos_elb_dst")
        hide_on_load("rd_nvsInfos", "Sim", null, "nvsInfos_elb_dst")
        show_on_click("rd_nvsInfos", "Não", null, "anx_elb_dst")
        hide_on_load("rd_nvsInfos", "Não", null, "anx_elb_dst")
        // (Direção) Validação do Distrato
        show_on_click("rd_dst_dir_apv", "Não", null, "mtv_dst_dir_rpv")
        hide_on_load("rd_dst_dir_apv", "Não", null, "mtv_dst_dir_rpv")
        //Validação Prospector 
        show_on_click("rd_dst_prp_apv", "Não", null, "mtv_dst_prp_rpv")
        hide_on_load("rd_dst_prp_apv", "Não", null, "mtv_dst_prp_rpv")
        //Aditivo 
        show_on_click("rd_ass_dst", "Não", null, "mtv_ass_dst")
        hide_on_load("rd_ass_dst", "Não", null, "mtv_ass_dst")
        show_on_click("rd_ass_dst", "Sim", null, "anx_ctt_ass")
        hide_on_load("rd_ass_dst", "Sim", null, "anx_ctt_ass")
        
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
function setSelectedZoomItem(selectedItem) {
    $(".input_reset").val("")
    if (selectedItem.inputId == "slt_terreno") {
        $("#txt_codigoTrr").val("").val(selectedItem["codigoterreno"])
        $("#txt_codigoContrato").val("").val(selectedItem["Código Contrato"])
        $("#txt_codigoEstudo").val("").val(selectedItem["Código Estudo"])
        $("#txt_nomenclatura").val("").val(selectedItem["Nomenclatura"])
        $("#txt_enderecoTrr").val("").val(selectedItem["Endereço"])
    }
}
// ABRE A SOLICITACAO DO ESTUDO SELECIONADO
function visualizarSolicitacao(campo) {
    let codigo = $("#" + campo).val()
    let serverUrl = window.location.href.split(".fluig")[0] + ".fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="
    if (codigo == "undefined") {
        FLUIGC.toast({
            title: 'Atenção: ',
            message: 'Código do terreno/estudo não encontrado!',
            type: 'warning'
        });
    } else {
        if (codigo) {
            window.open(serverUrl + codigo)
        } else {
            FLUIGC.toast({
                title: 'Atenção: ',
                message: 'Selecione um terreno/estudo para visualizar!',
                type: 'warning'
            });
        }
    }
}