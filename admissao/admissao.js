$(document).ready(function () {
    var rich = FLUIGC.richeditor('ti_message', {
        extraPlugins: 'liststyle,image',
        resize_enabled: true,
        width: "auto",
        height: "auto",
        allowedContent: true
    });
    // Controla os botoes de anexo // Caso estejam em modo leitura, vincula um click para a aba anexos e altera o texto para visualizr anexos
    var anexos = ['anx_aprDir', 'anx_crl']
    for (var pos = 0; pos < anexos.length; pos++) {
        if ($("input[name*='" + anexos[pos] + "'").css('pointer-events') == "none") {
            $("input[name*='" + anexos[pos] + "'").attr('onclick', '').unbind('click');
            $("input[name*='" + anexos[pos] + "'").css('pointer-events', 'all');
            $("input[name*='" + anexos[pos] + "'").val('Visualizar anexos');
            $("input[name*='" + anexos[pos] + "'").on('click', function () {
                $(window).scrollTop(0);
                window.parent.document.querySelector("#tab-attachments > div > div.col-xs-8").click()
            });
        }
    }
    // Carregar centros de custos, cidade e SPE
    if (FM == "ADD" || FM == "MOD") {
        $(".select2").select2();
        // $("#slt_cidade,#selectIdiomas,#slt_spe,#slt_cc").select2();
        $.ajax({
            type: "GET",
            url: "https://experterp.com.br/inter/apiFluig/getCentroCusto.php",
            dataType: "json",
            success: function (response) {
                $.each(response.data, function (index, value) {
                    $("<option></option>", {
                        value: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME,
                        text: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME
                    }).appendTo("#slt_cc");
                });
            },
            error: function () {
                $.each(response.data, function (index, value) {
                    $("<option></option>", {
                        value: "Erro ao carregar centros de custo",
                        text: "Erro ao carregar centros de custo"
                    }).appendTo("#slt_cc");
                });
            }
        });
        $.ajax({
            type: "GET",
            url: "https://experterp.com.br/inter/apiFluig/getSPE.php",
            dataType: "json",
            success: function (response) {
                $.each(response.data, function (index, value) {
                    $("<option></option>", {
                        value: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME,
                        text: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME
                    }).appendTo("#slt_spe");
                });
            },
            error: function () {
                $.each(response.data, function (index, value) {
                    $("<option></option>", {
                        value: "Erro ao carregar SPEs",
                        text: "Erro ao carregar SPEs"
                    }).appendTo("#slt_spe");
                });
            }
        });
        $.ajax({
            type: "GET",
            url: "https://rawcdn.githack.com/marllonsousa/FluigFiles/c9dcc197a7c44a346af03969e13e2953e98f5cfa/geral/cidades.json",
            dataType: "json",
            success: function (response) {
                for (var index = 0; index < response.cidades.length - 1; index++) {
                    $("<option></option>", {
                        value: response.cidades[index],
                        text: response.cidades[index]
                    }
                    ).appendTo("#slt_cidade");
                }
            },
            error: function () {
                $.each(response.data, function (index, value) {
                    $("<option></option>", {
                        value: "Erro ao carregar cidades",
                        text: "Erro ao carregar cidades"
                    }).appendTo("#slt_cidade");
                });
            }
        });
    }
    // Controla o click nos inputs que escondem campos
    if (ATV == 0 || ATV == 1 || ATV == 4 || ATV == null || ATV == 9 || ATV == 37 || ATV == 98) {
        // CHECKBOX SISTEMAS
        $(".cbx_si").change(function () {
            $("#" + $(this).attr('id_div')).toggle();
        });
        show_on_click('rd_mtvCntr', 'Substituição de colaborador', 'Promoção', 'txt_prSb')
        show_on_click('rd_mtvCntr', 'Substituição de colaborador', null, 'vlr_Sb')
        show_on_click('rd_escol', 'Ensino Superior Incompleto', 'Ensino Superior Completo', 'txt_supDsj')
        show_on_click('rd_idioma', 'Sim', null, 'txt_idioma')
        show_on_click('rd_hrtb', 'Outros', null, 'txt_hrtb')
        show_on_click('rd_crl', 'Sim', null, 'anx_crl')
        show_on_click('rd_na', 'Sim', null, 'rd_etp_na')
        show_on_click('rd_crtComb', 'Sim', null, 'vl_crtComb')
        show_on_click('rd_pc', 'Sim', null, 'rd_tpPc')
        show_on_click('rd_pc', 'Sim', null, 'cb_eqp1')
        show_on_click('rd_pc', 'Sim', null, 'rd_mntAd')
        show_on_click('rd_pc', 'Sim', null, 'entrg_Rossi')
        show_on_click('rd_pc', 'Sim', null, 'softwares')
        show_on_click('rd_acsRd', 'Sim', null, 'pastasRede')
        show_on_click('rd_eqpRossi', 'Sim', null, 'entrg_RossiEqp')
        show_on_click('rd_cntr', 'Estágio', null, 'estagio')
        // Desmarca todos os sistemas ao marcar o cbx_nhm
        var divs = ['mega', 'expert', 'approvo', 'adobe', 'cv', 'hcm', 'microtik', 'uc2b'];
        $("#cbx_nhm").click(function () {
            $('.cbx_si').removeAttr('checked');
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
        // Caso de subst e promoção oculta campos NA e Infra
        $("input[name$='rd_mtvCntr']").click(function () {
            switch ($(this).val()) {
                case "Substituição de colaborador":
                case "Promoção":
                case "Alteração de contrato PJ para CLT":
                    $("#rd_pc,#rd_etp_na").hide()
                    $("input[name=rd_na][value='Não'").attr('checked', 'checked');
                    $("input[name=rd_pc][value='Não'").attr('checked', 'checked');
                    break;
                case "Aumento de quadro":
                    $("#rd_pc").show()
                    $("input[name=rd_na][value='Não'").attr('checked', false);
                    $("input[name=rd_pc][value='Não'").attr('checked', false);
                    break;
            }
        });
    }
    // Ação ao arrastar o input de competencias
    if (ATV == 0 || ATV == 1 || ATV == 4) {
        // EXIBIR VALOR DO RANGE NO OUTPUT
        $("input[type='range']").on("input", function () {
            var comportamento = $(this).attr("compData").split("vs");
            $(this).trigger("change");
            if ($(this).val() > 50) {
                var x = ($(this).val() - 100) * -1;
                $(this).next("output").text(x + "% " + comportamento[0] + " e " + $(this).val() + "% " + comportamento[1]);
                $(this).next("output").next("input").val(x + "% " + comportamento[0] + " e " + $(this).val() + "% " + comportamento[1]);
            } else if ($(this).val() < 50) {
                var y = (-$(this).val() + 100);
                $(this).next("output").text(y + "% " + comportamento[0] + " e " + $(this).val() + "% " + comportamento[1]);
                $(this).next("output").next("input").val(y + "% " + comportamento[0] + " e " + $(this).val() + "% " + comportamento[1]);
            } else if ($(this).val() == 50) {
                var x = 0;
                $(this).next("output").text(comportamento[0] + " e " + comportamento[1]);
                $(this).next("output").next("input").val(comportamento[0] + " e " + comportamento[1]);
            }
            // $(this).next("output").show();
        });
    }
    // Controla a exibicao dos inputs clicados
    if (ATV >= 4 || ATV == null) {
        // EXIBE OS SISTEMAS CLICADOS
        $($('#sistemas').find("input[type='checkbox']:checked")).each(function () {
            $("#" + $(this).attr('id_div')).show()
        });
        // Controla a exibicao dos inputs clicados ao retornar pro inicio
        hide_on_load('rd_mtvCntr', 'Substituição de colaborador', 'Promoção', 'txt_prSb')
        hide_on_load('rd_mtvCntr', 'Substituição de colaborador', null, 'vlr_Sb')
        hide_on_load('rd_mtvCntr', 'Substituição de colaborador', null, 'rd_pc')
        hide_on_load('rd_mtvCntr', 'Substituição de colaborador', null, 'rd_etp_na')
        hide_on_load('rd_mtvCntr', 'Promoção', null, 'rd_pc')
        hide_on_load('rd_mtvCntr', 'Promoção', null, 'rd_etp_na')
        hide_on_load('rd_mtvCntr', 'Alteração de contrato PJ para CLT', null, 'rd_pc')
        hide_on_load('rd_mtvCntr', 'Alteração de contrato PJ para CLT', null, 'rd_etp_na')
        hide_on_load('rd_mtvCntr', 'Aumento de quadro', null, 'rd_pc')
        hide_on_load('rd_mtvCntr', 'Aumento de quadro', null, 'rd_etp_na')
        hide_on_load('rd_cntr', 'Estágio', null, 'estagio')
        hide_on_load('rd_escol', 'Ensino Superior Incompleto', 'Ensino Superior Completo', 'txt_supDsj')
        hide_on_load('rd_idioma', 'Sim', null, 'txt_idioma')
        hide_on_load('rd_hrtb', 'Outros', null, 'txt_hrtb')
        hide_on_load('rd_crl', 'Sim', '', 'anx_crl')
        hide_on_load('rd_na', 'Sim', '', 'rd_etp_na')
        hide_on_load('rd_crtComb', 'Sim', null, 'vl_crtComb')
        hide_on_load('rd_pc', 'Sim', null, 'rd_tpPc')
        hide_on_load('rd_pc', 'Sim', null, 'cb_eqp1')
        hide_on_load('rd_pc', 'Sim', null, 'rd_mntAd')
        hide_on_load('rd_pc', 'Sim', null, 'entrg_Rossi')
        hide_on_load('rd_pc', 'Sim', null, 'softwares')
        hide_on_load('rd_acsRd', 'Sim', null, 'pastasRede')
        hide_on_load('rd_eqpRossi', 'Sim', null, 'entrg_RossiEqp')
        hide_on_load('rd_avl_rh', 'Aprovada', 'Aprovada c/ Urgência', 'txt_obs_rh')
        hide_on_load('rd_avl_rh', 'Alteração/Inclusão de informações', null, 'txt_alt_rh')
        hide_on_load('rd_mail', 'Sim', null, 'clb_mail')
        hide_on_load('rd_dst_rh', 'Não', null, 'cdd_slc')
        hide_on_load('rd_dst_dp', 'Não', null, 'dt_cntr_clb')
        hide_on_load('rd_dst_dp', 'Solicitar alterações ao RH', null, 'txt_dp_alter')
        hide_on_load('rd_int_rh', 'Sim', null, 'dt_int_rh')
        if (ATV == 9) {
            $('input[type=range]').prop('disabled', false);
            $('input[type=range]').css('pointer-events', 'none');
            $('input[type=range]').on('keydown', function () { return false; });
        }
        // Carrega valor dos input range
        for (var i = 1; i <= 24; i++) {
            // $(".output_" + i).hide()
            // console.log($("#output_" + i).attr("compData")+"\n"+$(".output_" + i).text()+"\n")
            if ($(".output_" + i).val() > 50) {
                var input_data = $("#output_" + i).attr("compData");
                var comportamento = input_data.split("vs");
                var x = ($(".output_" + i).val() - 100) * -1;
                $("#output_" + i).text(x + "% " + comportamento[0] + " e " + $(".output_" + i).val() + "% " + comportamento[1]);
            } else if ($(".output_" + i).val() < 50) {
                var input_data = $("#output_" + i).attr("compData");
                var comportamento = input_data.split("vs");
                var y = (-$(".output_" + i).val() + 100)
                $("#output_" + i).text(y + "% " + comportamento[0] + " e " + $(".output_" + i).val() + "% " + comportamento[1]);
            } else if ($(".output_" + i).val() == 50) {
                var input_data = $("#output_" + i).attr("compData");
                var comportamento = input_data.split("vs");
                $("#output_" + i).text(comportamento[0] + " e " + comportamento[1]);
            }
        }
    }
    // Controla exb dos campos na avl do rh
    if (ATV == 9 || ATV == null) {
        show_on_click('rd_avl_rh', 'Aprovada', 'Aprovada c/ Urgência', 'txt_obs_rh')
        show_on_click('rd_avl_rh', 'Alteração/Inclusão de informações', null, 'txt_alt_rh')
    }
    // Controla click nas atvs candidato selecionado
    if (ATV == 37 || ATV == 98 || ATV == null) {
        show_on_click('rd_dst_rh', 'Não', null, 'cdd_slc')
    }
    // Controla click nas atvs hcm
    if (ATV == 51 || ATV == 102 || ATV == null) {
        show_on_click('rd_dst_dp', 'Não', null, 'dt_cntr_clb')
        show_on_click('rd_dst_dp', 'Solicitar alterações ao RH', null, 'txt_dp_alter')
    }
    // controla exbc da data da integração
    if (ATV == 63 || ATV == null) {
        show_on_click('rd_int_rh', 'Sim', null, 'dt_int_rh')
    }
})
// Controlador dos clicks (nome do input,valor pra verificar, ..., id da div pra exibir)
function show_on_click(campo, valor1, valor2, show) {
    $("input[name$='" + campo + "']").click(function () {
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
        if ($("input[name$='" + campo + "']:checked").val() == valor1) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    } else {
        if ($("input[name$='" + campo + "']:checked").val() == valor1 || $("input[name$='" + campo + "']:checked").val() == valor2) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    }
}
