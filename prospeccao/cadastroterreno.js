$(document).ready(function () {
    $("#show_fNTorna,#show_fNFisc,#show_fNFinc").hide()
    if (ATV) {
        $(".select2").select2();
        // CONTROLA CLICKS
        $("select[name$='slt_fmrNeg']").change(function () {
            var click = $(this).val();
            switch (click) {
                case "Compra e Venda":
                    $("#show_fNTorna,#show_fNFisc,#show_fNFinc").hide();
                    break;
                case "Permuta Física":
                    $("#show_fNFisc").show();
                    $("#show_fNFinc,#show_fNTorna").hide();
                    break;
                case "Permuta Financeira":
                    $("#show_fNFinc").show();
                    $("#show_fNFisc,#show_fNTorna").hide();
                    break;
                case "Permuta Física e Financeira":
                    $("#show_fNFisc,#show_fNFinc").show();
                    $("#show_fNTorna").hide();
                    break;
                case "Permuta Física e Torna":
                    $("#show_fNFisc,#show_fNTorna").show();
                    $("#show_fNFinc").hide();
                    break;
                case "Permuta Financeira e Torna":
                    $("#show_fNFinc,#show_fNTorna").show();
                    $("#show_fNFisc").hide();
                    break;
                case "Permuta Física, Financeira e Torna":
                    $("#show_fNTorna, #show_fNFisc, #show_fNFinc").show();
                    break;
                default:
                    $("#show_fNTorna, #show_fNFisc, #show_fNFinc").hide();
                    break;
            }
        });
        selectShow("slt_fmrNeg")
        // NEG CORRETOR?
        show_on_click("rd_trr_corretor", "Sim", null, "div_prc_crr")
        hide_on_load("rd_trr_corretor", "Não", null, "div_prc_crr")
        //Quando o campo cep perde o foco.
        $("#txt_cep").blur(function () {
            var cep = $(this).val().replace(/\D/g, '');
            if (cep != "") {
                var validacep = /^[0-9]{8}$/;
                if (validacep.test(cep)) {
                    //Preenche os campos com "..." enquanto consulta webservice.
                    $("#txt_logradouro").val("...");
                    $("#txt_bairro").val("...");
                    $("#txt_cidade").val("...");
                    $("#txt_uf").val("...");
                    //Consulta o webservice viacep.com.br/
                    $.getJSON("https://viacep.com.br/ws/" + cep + "/json/", function (dados) {
                        if (!("erro" in dados)) {
                            buscarUsuarios(dados.localidade)
                            //Atualiza os campos com os valores da consulta.
                            $("#txt_logradouro").val(dados.logradouro);
                            $("#txt_bairro").val(dados.bairro);
                            $("#txt_cidade").val(dados.localidade);
                            $("#txt_uf").val(dados.uf);
                        } //end if.
                        else {
                            //CEP pesquisado não foi encontrado.
                            limpa_formulário_cep();
                            alert("CEP não encontrado.");
                        }
                    });
                } //end if.
                else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    alert("Formato de CEP inválido.");
                }
            } //end if.
            else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        });
        $("[name$='rd_iniciar_estudo']").click(function () {
            if ($(this).val() == "Sim") {
                $("#rd_pss_estudo").val("Não")
            } else {
                $("#rd_pss_estudo").val("Sim")
            }
        })
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
function limpa_formulário_cep() {
    $("#txt_logradouro").val("");
    $("#txt_bairro").val("");
    $("#txt_cidade").val("");
    $("#txt_uf").val("");
}
function selectShow(selectName) {
    let sltName = $("select[name$='" + selectName + "']").val()
    switch (sltName) {
        case "Compra e Venda":
            $("#show_fNTorna,#show_fNFisc,#show_fNFinc").hide();
            break;
        case "Permuta Física":
            $("#show_fNFisc").show();
            $("#show_fNFinc,#show_fNTorna").hide();
            break;
        case "Permuta Financeira":
            $("#show_fNFinc").show();
            $("#show_fNFisc,#show_fNTorna").hide();
            break;
        case "Permuta Física e Financeira":
            $("#show_fNFisc,#show_fNFinc").show();
            $("#show_fNTorna").hide();
            break;
        case "Permuta Física e Torna":
            $("#show_fNFisc,#show_fNTorna").show();
            $("#show_fNFinc").hide();
            break;
        case "Permuta Financeira e Torna":
            $("#show_fNFinc,#show_fNTorna").show();
            $("#show_fNFisc").hide();
            break;
        case "Permuta Física, Financeira e Torna":
            $("#show_fNTorna, #show_fNFisc, #show_fNFinc").show();
            break;
        default:
            $("#show_fNTorna, #show_fNFisc, #show_fNFinc").hide();
            break;
    }
}
function buscarUsuarios(cidade) {
    $("#grupoCoord,#destinatarios").val()
    switch (cidade) {
        case "Juiz de Fora":
            $("#grupoCoord").val("Pool:Role:coord_jf")
            $("#destinatarios").val(destinatarios("coord_jf"))
            break;
        case "São José dos Campos":
        case "Campinas":
        case "Jacareí":
        case "Guarulhos":
        case "Caraguatatuba":
            $("#grupoCoord").val("Pool:Role:coord_sjc")
            $("#destinatarios").val(destinatarios("coord_sjc"))
            break;
        case "Uberaba":
            $("#grupoCoord").val("Pool:Role:coord_ubrb")
            $("#destinatarios").val(destinatarios("coord_ubrb"))
            break;
        case "Uberlândia":
            $("#grupoCoord").val("Pool:Role:coord_ubrl")
            $("#destinatarios").val(destinatarios("coord_ubrl"))
            break;
        case "São José do Rio Preto":
            $("#grupoCoord").val("Pool:Role:coord_sjrp")
            $("#destinatarios").val(destinatarios("coord_sjrp"))
            break;
    }
}
function destinatarios(grupoCoord) {
    var filter = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", grupoCoord, grupoCoord, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("workflowColleagueRole", null, [filter], null);
    var destinatarios = []
    for (var i = 0; i < dataset.values.length; i++) {
        var constraintUsuarios = DatasetFactory.createConstraint(
            "colleaguePK.colleagueId",
            dataset.values[i]["workflowColleagueRolePK.colleagueId"].toString(),
            dataset.values[i]["workflowColleagueRolePK.colleagueId"].toString(),
            ConstraintType.MUST
        );
        var datasetUsuarios = DatasetFactory.getDataset("colleague", null, [constraintUsuarios], null);
        for (var j = 0; j < datasetUsuarios.values.length; j++) {
            destinatarios.push(datasetUsuarios.values[j]["mail"])
        }
    }
    return destinatarios
}
