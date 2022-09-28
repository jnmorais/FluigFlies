$(document).ready(function () {
    // Controla os cliques nos campos
    if (ATV == "null" || FM == "VIEW" || FM == "MOD" || FM == "ADD") {
        $(".select2").select2()
        $("#rd_etp_na, #vl_crtComb, #rd_tpPc,#entrg_RossiEqp, #pf_obs, #pf_justv, #pastasRede").hide()
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
        if ($("input[name$='rd_na']:checked").val() == "Sim") { $("#rd_etp_na").show() }
        else { $("#rd_etp_na").hide() }
        // $("#slt_cidade,#slt_spe,#slt_cc").select2();
        //NA
        $("input[name$='rd_na']").click(function () {
            // alert()
            if ($(this).val() == "Sim") {
                $("#rd_etp_na").show()
            } else {
                $("#rd_etp_na").hide()
            }
        });
        $("input[name$='rd_crtComb']").click(function () {
            if ($(this).val() == "Sim") {
                $("#vl_crtComb").show()
            } else {
                $("#vl_crtComb").hide()
            }
        });
        //TI INFRA
        $("input[name$='rd_pc']").click(function () {
            if ($(this).val() == "Sim") {
                $("#rd_tpPc").show()
            } else {
                $("#rd_tpPc").hide()
            }
        });
        $("input[name$='rd_eqpRossi']").click(function () {
            if ($(this).val() == "Sim") {
                $("#entrg_RossiEqp").show()
            } else {
                $("#entrg_RossiEqp").hide()
            }
        });
        $("input[name$='rd_acsRd']").click(function () {
            if ($(this).val() == "Sim") {
                $("#pastasRede").show()
            } else {
                $("#pastasRede").hide()
            }
        });
        //TI - SISTEMA 
        // CHECKBOX SISTEMAS
        $(".cbx_si").change(function () {
            $("#" + $(this).attr('id_div')).toggle();
        });
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
        if ($("input[name$='pf_analise']").val() == "Sim") {
            $("#pf_obs").show()
            $("#pf_justv").hide()
        } else {
            $("#pf_obs").hide()
            $("#pf_justv").show()
        }
        if ($("input[name$='juridico_analise']").val() == "Sim") {
            $("#juridico_obs").show()
        } else {
            $("#juridico_obs").hide()
        }
        // EXIBE OS SISTEMAS CLICADOS
        $($('#sistemas').find("input[type='checkbox']:checked")).each(function () {
            $("#" + $(this).attr('id_div')).show()
        });
    }
    if (ATV == 63) {
        $("input[name$='pf_analise']").click(function () {
            if ($(this).val() == "Sim") {
                $("#pf_obs").show()
                $("#pf_justv").hide()
            } else {
                $("#pf_obs").hide()
                $("#pf_justv").show()
            }
        });
    }
});