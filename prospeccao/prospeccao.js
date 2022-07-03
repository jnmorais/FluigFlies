$(document).ready(function () {
    // AQUI CONTROLA A EXIBICAO EM QUALQUER MOMENTO DO FORMULARIO DOS BOTOES QUE JA FORAM CLICADOS
    if (ATV == null || FM == "VIEW" || FM == "MOD" || FM == "ADD") {
        $("#nn_motivorepro, #nn_motivo1, #altadirecao_mot, #nn_minutareproprosp, #nn_minutareprodire,#EstMassa_aprv,#viab_Aprov,#orcOk,#ans_OrcViab_appv").hide();
        $("#ass_Contrato_appv,#ass_Contrato_rpv").hide();
        $("#preVBAprovView, #nn_valortorna, #nn_valorpf, #nn_valorpfinan,#nn_negRejtd").show();

        if ($("input[name$='nn_minuta_direcao']:checked").val() == "Não") {
            $("#nn_minutareprodire").show();
        }
        if ($("input[name$='nn_minuta_radio']:checked").val() == "Não") {
            $("#nn_minuta_radio").hide();
            $("#nn_minutareproprosp").hide();
        }
        if ($("input[name$='jur_aprovacao']:checked").val() == "Não") {
            $("#nn_minuta_1").hide();
        }
        if ($("input[name$='negociacao']:checked").val() == "Não" || $("input[name$='negociacao']:checked").val() == undefined) {
            $("#nn_negRejtd").hide();
        }
        if ($("input[name$='voltaestimativa']:checked").val() == "Não") {
            $("#orcOk").show();
        }
        var nn_tiponegociacao = $("#nn_tiponegociacao").find(":selected").text()
        switch (nn_tiponegociacao) {
            case "Compra e Venda":
                $("#nn_valortorna, #nn_valorpf, #nn_valorpfinan").hide();
                break;
            case "Permuta Física":
                $("#nn_valortorna, #nn_valorpfinan").hide();
                break;
            case "Permuta Física e Torna":
                $("#nn_valorpfinan").hide();
                break;
            case "Permuta Financeira":
                $("#nn_valortorna, #nn_valorpf").hide();
                break;
            case "Permuta Financeira e Torna":
                $("#nn_valorpf").hide();
                break;
            case "Permuta Física e Financeira":
                $("#nn_valortorna").hide();
                break;
            case "Permuta Física, Financeira e Torna":
                $("#nn_valortorna, #nn_valorpf, #nn_valorpfinan").show();
                break;
            default:
                $("#nn_valortorna, #nn_valorpf, #nn_valorpfinan").hide();
                break;
        }
        var nn_aprovem = $("#nn_aprovem").find(":selected").text()
        if(nn_aprovem == "Sim"){$("#EstMassa_aprv").show()}else{$("#EstMassa_aprv").hide()}

        $("#nn_minutarepro").hide()
        if ($("input[name$='nn_minuta_radio']:checked").val() == "Não") {
            $("#nn_minutarepro").show();
        }
        var negociacao = $("input[name$='negociacao']:checked").val();
        if (negociacao == "Sim") {
            $("#nn_negRejtd").hide();
        }
        if ($("input[name$='voltaviabilidade']:checked").val() == "Não") {
            $("#viab_Aprov").show();
        }
        if ($("input[name$='nn_aprov1']:checked").val() == "Não") {
            $("#nn_motivorepro, #nn_motivo1").show()
            $("#ans_OrcViab_appv").hide()
        }else if($("input[name$='nn_aprov1']:checked").val() == "Sim"){
            $("#ans_OrcViab_appv").show()
            $("#nn_motivorepro, #nn_motivo1").hide()
        }
        $("#open_preVBAprov").click(function (e) { 
            e.preventDefault();
            var codigoVb = $("input[name$='cod_preVBAprov']").val()
            if(codigoVb == ""){
                FLUIGC.toast({
                    title: 'Atenção! ',
                    message: 'Preencha o campo com o código da Pré Viabilidade aprovada!',
                    type: 'warning'
                });
            }else{
                const fileDescription = "Anexo Pré Viab_"+codigoVb
                try {
                    if (hasFileFluig(fileDescription)) {
                            const anexos = parent.ECM.attachmentTable.getData();
                            for (let i = 0; i < anexos.length; i++) {
                                var descricao = anexos[i].description;
                                if (fileDescription == descricao) {
                                    parent.WKFViewAttachment.openAttachmentView("admin" , anexos[i].documentId);
                                    return
                                }
                            }
                    } else {
                        FLUIGC.toast({
                            title: "Atenção",
                            message: "Anexo não encontrado",
                            type: "warning"
                        });
                    }
                    console.log(anexos)
                } catch (e) {
                    console.error("Houve um erro inesperado na função viewerFile")
                    console.error(e)
                }
            }
        });
        if ($("input[name$='jur_adobe']:checked").val() == "Sim") {
            $("#ass_Contrato_appv").show()
            $("#ass_Contrato_rpv").hide()
        }else if($("input[name$='jur_adobe']:checked").val() == "Não"){
            $("#ass_Contrato_rpv").show()
            $("#ass_Contrato_appv").hide()
        }
    }
    // CADA IF ABAIXO CONTROLA O CLICK ESPECIFICO EM CADA ATIVIDADE
    // Levantamento da Estimativa do Orçamento
    if (ATV == 13) {
        $("input[name$='voltaestimativa']").click(function () {
            var click = $(this).val();
            if (click == "Não") {
                $("#orcOk").show()
            } else {
                $("#orcOk").hide()
            }
        });
    }
    // Pre Viabilidade
    if (ATV == 14) {
        // Exibir campos ocultos para preenchimento na Activity_27
        $("input[name$='voltaviabilidade']").change(function (e) { 
            e.preventDefault();
            var click = $(this).val();
            if (click == "Não") { $("#viab_Aprov").show() }else { $("#viab_Aprov").hide()}
        });
    }
    // ANS Estudo Massa
    if (ATV == 16) {
        // Exibir campos ocultos para preenchimento na Activity_27
        $("select[name$='nn_aprovem']").change(function (e) { 
            e.preventDefault();
            var click = $(this).val();
            if (click == "Sim") { $("#EstMassa_aprv").show() }else { $("#EstMassa_aprv").hide()}
        });
    }
    // ON CLICK
    if (ATV == 22) {
        $("input[name$='negociacao']").click(function () {
            var click = $(this).val();
            if (click == "Não" || click == "Atualizacao") {
                $("#nn_negRejtd").show()
            } else {
                $("#nn_negRejtd").hide()
            }
        });
    }
    if (ATV == 0 || ATV == 1 || ATV == 7) {
        $(".select2").select2();
        $.ajax({
            type: "GET",
            url: "https://rawcdn.githack.com/marllonsousa/FluigFiles/c9dcc197a7c44a346af03969e13e2953e98f5cfa/geral/cidades.json",
            dataType: "json",
            success: function (response) {
                for (var cdd = 0; cdd < response.cidades.length - 1; cdd++) {
                    $("<option></option>", {
                        value: response.cidades[cdd],
                        text: response.cidades[cdd]
                    }
                    ).appendTo("#cidade_slc");
                }
            }
        });
        $("select[name$='nn_tiponegociacao']").change(function () {
            var click = $(this).val();
            switch (click) {
                case "Compra e Venda":
                    $("#nn_valortorna,#nn_valorpf,#nn_valorpfinan").hide();
                    break;
                case "Permuta Física":
                    $("#nn_valorpf").show();
                    $("#nn_valorpfinan,#nn_valortorna").hide();
                    break;
                case "Permuta Financeira":
                    $("#nn_valorpfinan").show();
                    $("#nn_valorpf,#nn_valortorna").hide();
                    break;
                case "Permuta Física e Financeira":
                    $("#nn_valorpf,#nn_valorpfinan").show();
                    $("#nn_valortorna").hide();
                    break;
                case "Permuta Física e Torna":
                    $("#nn_valorpf,#nn_valortorna").show();
                    $("#nn_valorpfinan").hide();
                    break;
                case "Permuta Financeira e Torna":
                    $("#nn_valorpfinan,#nn_valortorna").show();
                    $("#nn_valorpf").hide();
                    break;
                case "Permuta Física, Financeira e Torna":
                    $("#nn_valortorna, #nn_valorpf, #nn_valorpfinan").show();
                    break;
                default:
                    $("#nn_valortorna, #nn_valorpf, #nn_valorpfinan").hide();
                    break;
            }
        });
    }
    if (ATV > 22) {

    }
    if (ATV == 29) {
        $("input[name$='nn_aprov1']").click(function () {
            var click = $(this).val();
            if(click == "Não") {
                $("#nn_motivorepro, #nn_motivo1").show()
                $("#ans_OrcViab_appv").hide()
            }else if(click == "Sim"){
                $("#nn_motivorepro, #nn_motivo1").hide()
                $("#ans_OrcViab_appv").show()
            }else{
                $("#nn_motivorepro, #nn_motivo1,#ans_OrcViab_appv").hide()
            }
        });
    }
    if (ATV == 35) {
        // Exibir campos ocultos para preenchimento na Activity_27
        $("input[name$='altadirecao']").click(function () {
            var click = $(this).val();
            if (click == "Não") { $("#altadirecao_mot, #motivodescarte").show() }
            else {
                $("#altadirecao_mot, #motivodescarte").hide()
            }
        })
    }
    if (ATV == 26) {
        // Exibir campos ocultos para preenchimento na Activity_27
        $("input[name$='nn_minuta_radio']").click(function () {
            var click = $(this).val();
            if (click == "Não") { $("#nn_minutareproprosp").show() }
            else { $("#nn_minutareproprosp").hide() }
        });
    }
    if (ATV == 105 || ATV == 144) {
        $("#nn_minutareprodire").hide()
        $("input[name$='nn_minuta_direcao']").click(function () {
            var click = $(this).val();
            if (click == "Não") {
                $("#nn_minutareprodire").show()
            } else {
                $("#nn_minutareprodire").hide()
            }
        });
    }
    if (ATV == 25) {
        $("#nn_minuta_1").hide()
        $("input[name$='jur_aprovacao']").click(function () {
            var click = $(this).val();
            if (click == "Sim") {
                $("#nn_minuta_1").show()
            } else {
                $("#nn_minuta_1").hide()
            }
        });
    }
    if (ATV == 18 || ATV == 19 || ATV == 23 || ATV == 21 || ATV == 128) {
        $("#alert_fim").append("<div class='alert alert-warning' role='alert'>Processo de prospecção cancelado!</div>");
    }
    if(ATV == 30){
        $("input[name$='jur_adobe']").click(function () {
            var click = $(this).val();
            if (click == "Sim") {
                $("#ass_Contrato_appv").show()
                $("#ass_Contrato_rpv").hide()
            } else {
                $("#ass_Contrato_rpv").show()
                $("#ass_Contrato_appv").hide()
            }
        });
    }
    if(ATV == 33){
        $("#alert_fim").append("<div class='alert alert-success' role='alert'>Processo de prospecção finalizado!</div>");
    }
    // Controla exibição dos titulos da tabela de pagamentos
    $("[thc='tpg']").hide()
    $(".tpgBtn").click(function (e) { e.preventDefault(); $("[thc='tpg']").show() })
    if (ATV != 71) $("[thc='tpg']").show()
});
// Teste