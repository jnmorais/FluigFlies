$(document).ready(function () {
    // loadDatasetCargos("Obra", "#slt_cargo")
    $(".select2").select2();
    $('[data-toggle="tooltip"]').tooltip()
    $("#div_treinamentos").hide()
    $("#div_novo_cargo").hide()
    // ATV 0|1|4
    if (ATV == 0 || ATV == 1 || ATV == 4 || ATV == null) {
        show_on_click('rd_mtvCntr', 'Substituição de colaborador', null, null, 'txt_prSb');
        show_on_click('rd_mtvCntr_subst', 'Sim', null, null, 'div_mtvCntr_subst_1');
        show_on_click('rd_mtvCntr_subst', 'Não', null, null, 'div_mtvCntr_subst_2');
        show_on_click('rd_hrtb', 'Outros', null, null, 'txt_hrtb');
        show_on_click('rd_colabVaga', 'Sim', null, null, 'txt_nmColab');
        $("[name$='rd_semNivelamento']").click(function (e) {
            if ($(this).val() == "Sim") {
                $("#div_infoCrgSal,#alert_cargoSalario,#div_infoSal").show()
                $("#alert_cargo").hide()
            } else if ($(this).val() == "Não") {
                $("#div_infoCrgSal,#alert_cargo,#div_infoCrg").show()
                $("#div_infoSal,#alert_cargoSalario").hide()
            }
        });
        // SELECT CARGOS
        $('#btZoom').click(function () {
            var param = {
                "datasetId": "ds_cargos", "limit": "0",
                // "filterFields": ["vrf", "Obra"],
                // "searchField": "vrf", "searchValue": "Obra"
            };
            var thisModal = FLUIGC.modal({
                title: 'Selecione uma função (clique duas vezes na opção)',
                content: '<div id="postEmb"></div>',
                id: 'fluig-modal',
                actions: [{
                    'label': 'Fechar',
                    'autoClose': true
                }]
            }, function (err, data) {
                var thisTable = FLUIGC.datatable('#postEmb', {
                    dataRequest: {
                        url: '/api/public/ecm/dataset/search/',
                        options: {
                            contentType: "application/json",
                            dataType: 'json',
                            method: 'POST',
                            data: JSON.stringify(param),
                            crossDomain: true,
                            cache: false
                        },
                        root: 'content'
                    },
                    renderContent: ['Cargo', 'vrf'],
                    header: [{ 'title': 'Cargo', 'size': 'col-sm-8' }, { 'title': 'Processo', 'size': 'col-sm-4' }],
                    multiSelect: false,
                    search: {
                        enabled: true,
                        searchAreaStyle: 'col-md-9',
                        onSearch: function (res) {
                            if (!res) {
                                thisTable.reload();
                            }
                            var dataAll = thisTable.getData();
                            var search = dataAll.filter(function (el) {
                                return el.Cargo.indexOf(res.toUpperCase()) >= 0;
                            });
                            if (search && search.length) {
                                thisTable.reload(search);
                            } else {
                                FLUIGC.toast({
                                    title: 'Atenção: ',
                                    message: 'Cargo informado não encontrado',
                                    type: 'warning'
                                });
                            }
                        }
                    },
                    scroll: {
                        target: '#postEmb',
                        enabled: true
                    },
                    tableStyle: 'table-striped'
                }).on('dblclick', function (ev) {
                    var index = thisTable.selectedRows()[0];
                    var selected = thisTable.getRow(index);
                    if (selected.vrf == "ADMINISTRATIVO") {
                        FLUIGC.toast({
                            title: 'Atenção: ',
                            message: 'Este cargo não é destinado a este processo!',
                            type: 'warning'
                        });
                    } else {
                        verificarCargosRH()
                        $("#slt_cargo").val(selected.Cargo);
                        $("#rd_escol").val(selected.Escolaridade)
                        $("#cargoResp blockquote").text(selected.Autoridade)
                        thisModal.remove();
                    }
                });
            });
            $(".modal-body").css("max-height", window.innerHeight / 2 + 'px');
        });
        // SELECT SETOR
        $("#txt_setor_slt").change(function (e) { 
            e.preventDefault();
            verificarCargosRH() 
        });
    }
    if (ATV == 23 || ATV == null) {
        show_on_click('rd_ans_sst', 'Sim', null, null, 'div_anxAdendo');
    }
    if (ATV == 19) {
        show_on_click('rd_cntr_dp', 'Não', null, null, 'cntr_dp_ok');
    }
    if (ATV == 28) {
        $("#dt_inicio_clb,#anexos").hide()
    }
    if (ATV == 87) {
        verificarCargosRH()
    }
    if (ATV == 98) {
        show_on_click('rd_colab_aloj', 'Sim', null, null, 'div_colab_aloj');
    }
    if (ATV || FM) {
        // ATV 0/4
        hide_on_load('rd_mtvCntr', 'Substituição de colaborador', null, null, 'txt_prSb');
        hide_on_load('rd_mtvCntr_subst', 'Sim', null, null, 'div_mtvCntr_subst_1');
        hide_on_load('rd_mtvCntr_subst', 'Não', null, null, 'div_mtvCntr_subst_2');
        hide_on_load('rd_hrtb', 'Outros', null, null, 'txt_hrtb');
        hide_on_load('rd_colabVaga', 'Sim', null, null, 'txt_nmColab');
        // hide_on_load('rd_semNivelamento', 'Não', null, null, 'div_infoCrgSal');
        hide_on_load('rd_ans_sst', 'Sim', null, null, 'div_anxAdendo');
        hide_on_load('rd_cntr_dp', 'Não', null, null, 'cntr_dp_ok');
        hide_on_load('rd_colab_aloj', 'Sim', null, null, 'div_colab_aloj');
        // CARGOS E TREINAMENTOS/NR
        switch ($("#slt_cargo").val()) {
            case "ELETRICISTA DE INSTALAÇÕES":
            case "AUXILIAR DE ELETRICISTA":
                $("#div_treinamentos").show()
                $("#nr_txt").text("NR 10")
                break;
            case "OPERADOR DE GRUA":
            case "OPERADOR DE MINI PÁ CARREGADEIRA":
            case "OPERADOR DE CREMALHEIRA":
            case "OPERADOR DE BETONEIRA":
            case "OPERADOR DE RETRO ESCAVADEIRA":
                $("#div_treinamentos").show()
                $("#nr_txt").text("NR 12")
                break;
            default:
                $("#div_treinamentos").hide()
                $("#nr_txt").text("")
                break;
        }
    }
})
// VERIFICAR SE CARGO DEVE PASSAR PELO RH
function verificarCargosRH() {
    var cargo = $("#slt_cargo").val()
    var setor = $("#txt_setor_slt").val()
    switch (cargo + "|" + setor) {
        case "PEDREIRO DE ACABAMENTO|Assistência Técnica":
        case "ENCARREGADO ALMOXARIFADO|" + setor:
        case "ENCARREGADO DE CARPINTEIRO|" + setor:
        case "ENCARREGADO DE OBRA|" + setor:
        case "ENCARREGADO DE ACABAMENTO|" + setor:
        case "ENCARREGADO DE ARMADOR|" + setor:
        case "ENCARREGADO DE OBRA|" + setor:
        case "ENCARREGADO DE INSTALAÇÕES|" + setor:
        case "MESTRE DE OBRA|" + setor:
            $("#vlr_cargos_rh").val("Sim")
            break;
        default:
            $("#vlr_cargos_rh").val("Não")
            break;
    }
}
// DETECTA ALTERACOES NO ZOOM
function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "txt_cargo") {
        selectedItem["Cargo"] == "Novo cargo" || selectedItem["Cargo"] == "" ? $("#div_novo_cargo").show() : $("#div_novo_cargo").hide()
    }
}
// Controlador dos clicks (nome do input,valor pra verificar, ..., id da div pra exibir)
function show_on_click(campo, valor1, valor2, valor3, show) {
    $("[name$='" + campo + "']").click(function () {
        if (valor2 == null) {
            if ($(this).val() == valor1) {
                $("#" + show).show();
            } else {
                $("#" + show).hide();
            }
        } else {
            if ($(this).val() == valor1 || $(this).val() == valor2 || $(this).val() == valor3) {
                $("#" + show).show();
            } else {
                $("#" + show).hide();
            }
        }
    });
}
// Controla a exibição dos campos ocultos
function hide_on_load(campo, valor1, valor2, valor3, show) {
    if (valor2 == null) {
        if ($("[name$='" + campo + "']:checked").val() == valor1) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    } else {
        if ($("[name$='" + campo + "']:checked").val() == valor1 || $("[name$='" + campo + "']:checked").val() == valor2 || $("[name$='" + campo + "']:checked").val() == valor3) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    }
}
function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    Cargo: str
                });
            }
        });
        cb(matches);
    };
}
function searchSetores(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    Nome: str
                });
            }
        });
        cb(matches);
    };
}
