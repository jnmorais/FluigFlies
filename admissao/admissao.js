$(document).ready(function () {
    // loadDatasetCargos("Adm", "#txt_cargo")

    $(".select2").select2();
    $("[data-toggle='tooltip']").tooltip()
    // ATV 0|1|4
    if (ATV == 0 || ATV == 1) {
        var sistemas = ["Nenhum sistema será necessário", "Mega", "Expert", "Approvo", "Adobe/Doc Sign", "Construtor de vendas", "Fluig", "HCM", "INC Academy"];
        /* Instantiated new autocomplete */
        var myAutocomplete = FLUIGC.autocomplete("#slt_sistemas", { source: substringMatcher(sistemas), name: "sistemas", displayKey: "sistema", tagClass: "tag-gray", type: "tagAutocomplete", highlight: true, hint: "true", autoLoading: "false" });
        var myTag = FLUIGC.autocomplete('#slt_softwares');
    }
    if (ATV == 0 || ATV == 1 || ATV == 4 || ATV == 9 || ATV == 37 || ATV == null) {
        show_on_click("rd_mtvCntr", "Substituição de colaborador", "Promoção (Efetivação de Estagiário pós desligamento)", "txt_prSb");
        show_on_click("rd_mtvCntr", "Substituição de colaborador", null, "vlr_Sb");
        show_on_click("rd_idioma", "Sim", null, "txt_idioma");
        show_on_click("rd_loc", "Obra", null, "documentacao_funcionario");
        show_on_click("rd_loc", "Obra", null, "slt_spe");
        show_on_click("rd_hrtb", "Outros", null, "txt_hrtb");
        show_on_click("rd_crl", "Sim", null, "div_anx_crl");
        show_on_click("rd_na", "Sim", null, "rd_etp_na");
        show_on_click("rd_crtComb", "Sim", null, "vl_crtComb");
        show_on_click("rd_pc", "Sim, já tem computador", null, "rd_patrm");
        show_on_click("rd_pc", "Não, mas será necessário alugar um computador", null, "entrg_Rossi");
        show_on_click("rd_pc", "Não, mas será necessário alugar um computador", null, "softwares");
        show_on_click("rd_acsRd", "Sim", null, "pastasRede");
        show_on_click("rd_eqpRossi", "Sim", null, "entrg_RossiEqp");
        show_on_click("rd_cntr", "Estágio", null, "estagio");
        show_on_click('rd_mtvCntr_subst', 'Sim', null, 'div_mtvCntr_subst_1');
        show_on_click('rd_mtvCntr_subst', 'Não', null, 'div_mtvCntr_subst_2');
        // SELECIONAR CARGOS
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
                    renderContent: ['Cargo','vrf'],
                    header: [{ 'title': 'Cargo', 'size': 'col-sm-8' },{ 'title': 'Processo', 'size': 'col-sm-4' }],
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
                    if (selected.vrf == "Obra") {
                        FLUIGC.toast({
                            title: 'Atenção: ',
                            message: 'Este cargo não é destinado a este processo!',
                            type: 'warning'
                        });
                    } else {
                        $("#txt_cargo").val(selected.Cargo);
                        $("#rd_escol").val(selected.Escolaridade)
                        $("#cargoResp blockquote").text(selected.Autoridade)
                        thisModal.remove();
                    }
                });
            });
            $(".modal-body").css("max-height", window.innerHeight / 2 + 'px');
        });
        // CONTROLA O INPUT COMPETENCIAS
        $("input[type='range']").on("input", function () {
            var comportamento = $(this).attr("compData").split("vs");
            $(this).trigger("change");
            if ($(this).val() > 50) {
                var x = ($(this).val() - 100) * -1;
                $(this).next("output").text(x + "% " + comportamento[0] + " e " + $(this).val() + "% " + comportamento[1]);
                $(this).next("output").next("input").val(x + "% " + comportamento[0] + " e " + $(this).val() + "% " + comportamento[1]);
                $(this).next("output").addClass("output")
                $(this).next("output").show()
            } else if ($(this).val() < 50) {
                var y = (-$(this).val() + 100);
                $(this).next("output").text(y + "% " + comportamento[0] + " e " + $(this).val() + "% " + comportamento[1]);
                $(this).next("output").next("input").val(y + "% " + comportamento[0] + " e " + $(this).val() + "% " + comportamento[1]);
                $(this).next("output").addClass("output")
                $(this).next("output").show()
            } else if ($(this).val() == 50) {
                var x = 0;
                $(this).next("output").text(comportamento[0] + " e " + comportamento[1]);
                $(this).next("output").next("input").val(comportamento[0] + " e " + comportamento[1]);
                $(this).next("output").hide()
            }
        });
    }
    // ATV 9
    if (ATV == 9 || ATV == null) {
        show_on_click("rd_avl_rh", "Aprovada", "Aprovada c/ Urgência", "txt_obs_rh");
        show_on_click("rd_avl_rh", "Alteração/Inclusão de informações", null, "txt_alt_rh");
        show_on_click("rd_avl_rh", "Reprovada", null, "txt_rpv_rh");
        FLUIGC.toast({ title: "Recursos Humanos: ", message: "A edição do formulário está liberada!", type: "info" });
    }
    // ATV 37
    //Add Efetivção
    if (ATV == 37 || ATV == null) {
        show_on_click_custom("rd_selecao_rh", "Sim, candidato selecionado pelo G&G", "Sim, candidato selecionado por Recrutamento Interno", "Sim, efetivação de Jovem Aprendiz", "Sim, admissão com promoção de estagiário", "cdd_slc");
        FM == "MOD" ? FLUIGC.toast({ title: "Recursos Humanos: ", message: "A edição do formulário está liberada!", type: "info" }) : false
    }
    // ATV 51
    if (ATV == 51 || ATV == null) {
        show_on_click("rd_dst_dp", "Não", null, "dt_cntr_clb");
        show_on_click("rd_dst_dp", "Alteração/Inclusão de informações ao Gente & Gestão", null, "txt_dp_alter");
    }
    // ATV 63
    if (ATV == 63 || ATV == null) {
        show_on_click("rd_int_rh", "Sim", null, "dt_int_rh");
    }
    // ATV 150
    if (ATV == 150 || ATV == null) {
        show_on_click("rd_etg_infra_acs", "Sim", null, "show_clb_mail");
    }
    // // ATV 348 - (SISTEMAS) - Mega, Expert, Approvo
    // if (ATV == 348 || ATV == null) {
    //     show_on_click("rd_etg_si_1", "Sim", null, "show_acessos_1")
    // }
    // // ATV 350 - (SISTEMAS) - CV e Adobe
    // if (ATV == 350 || ATV == null) {
    //     show_on_click("rd_etg_si_2", "Sim", null, "show_acessos_2")
    // }
    // // ATV 352 - (SISTEMAS) - FLUIG;
    // if (ATV == 352 || ATV == null) {
    //     show_on_click("rd_etg_si_3", "Sim", null, "show_acessos_3")
    // }
    // // ATV 390 - (SISTEMAS) - HCM;
    // if (ATV == 390 || ATV == null) {
    //     show_on_click("rd_etg_si_4", "Sim", null, "show_acessos_4")
    // }
    if (ATV || FM) {
        if ($("#rd_escol").val() == "Ensino Médio Completo (Técnico na área)" || $("#rd_escol").val() == "Ensino Médio Incompleto" || $("#rd_escol").val() == "Ensino Superior Incompleto (cursando)" || $("#rd_escol").val() == "Ensino Superior Completo" || $("#rd_escol").val() == "Ensino Fundamental Incompleto (cursando)") {
            $("#cargoResp,#cargoAut").show()
            $("[name$='txt_supDsj]").text() != "" ? $("#txt_supDsj").show() : $("#txt_supDsj").hide()
            switch ($("[name$='txt_cargo']").val()) {
                case "Engenheiro Civil":
                    $("#cargoResp blockquote").text("Elaborar projetos de engenharia civil, gerenciar obras, controlar a qualidade dos empreendimentos Coordenar a operação e manutenção dos empreendimentos Podem prestar consultoria, assistência e assessoria e elaborar pesquisas tecnológicas")
                    $("#cargoAut blockquote").text("Possui autoridade técnica e para tomadas de decisões que impactam diretamente nos resultados e na execução da obra")
                    break;
                case "Engenheiro Elétrico":
                    $("#cargoResp blockquote").text("Elaborar projetos elétricos, inspecionar instalações, observar operações garantindo o cumprimento do projeto, bem como as especificações no que se refere a equipamentos e normas de segurança Coordenar profissionais da área Dar assistência e assessoria técnica")
                    $("#cargoAut blockquote").text("Possui autoridade técnica e para tomadas de decisões que impactam diretamente nos resultados e na execução dos projetos elétricos")
                    break;
                case "Arquiteto":
                    $("#cargoResp blockquote").text("Elaborar projetos arquitetônicos; definindo materiais, acabamentos, técnicas, metodologias; analisar dados e informações; prestar assistência a outros profissionais envolvidos")
                    $("#cargoAut blockquote").text("Realizar ações que garantam a qualidade e execução das atividades, supervisionar equipe de projetos arquitetônicos")
                    break;
                case "Assistentes Técnico, Técnicos de obras civis e similares (Suporte Técnico na Obra)":
                    $("#cargoResp blockquote").text("Dar suporte aos gestores em suas respectivas áreas (qualidade, ST, AT, Eng Civil, elétrica, etc), realizar levantamentos, atuar na execução de atividades sob supervisão de um gestor de obra, realizar o controle de materiais, etc")
                    $("#cargoAut blockquote").text("Apoiar profissionais da base sobre adequação das atividades, visando um melhor resultado")
                    break;
                case "Auxiliares Técnicos - Engenharia e similares (Suporte Técnico na Obra)":
                    $("#cargoResp blockquote").text("Auxiliar na execução de atividades como acompanhamento de obras, medições, controle de materiais, levantamento de dados para auxiliar na elaboração de relatórios")
                    $("#cargoAut blockquote").text("Realizar atividades com supervisão do Engenheiro ou gestor da área de atuação")
                    break;
                case "Estagiários (Suporte Técnico na Obra)":
                    $("#cargoResp blockquote").text("Acompanhar e auxiliar o gestor em suas atividades observando os parâmetros da qualidade, segurança e outros estabelecidos, conforme área de atuação")
                    $("#cargoAut blockquote").text("")
                    break;
                case "Auxiliares, Assistentes, Analistas Técnicos e similares (Suporte Técnico no Escritório)":
                    $("#cargoResp blockquote").text("Realizar atividades nas áreas administrativas em geral, de acordo com as exigências do cargo, diretrizes da empresa e do setor de atuação (Projetos, Engenharia, DP, Assistência Técnica, RH, Suprimentos etc)")
                    $("#cargoAut blockquote").text("Auxiliar, executar, analisar conforme a função e as orientações do gestor e necessidades da área")
                    break;
                case "Técnico em Segurança do Trabalho":
                    $("#cargoResp blockquote").text("Orientar quanto aos riscos inerentes da atividade, monitorar metas, promover a realização de atividades de orientação, informação e conscientização dos trabalhadores para a prevenção de acidentes e doenças relacionadas ao trabalho")
                    $("#cargoAut blockquote").text("Implantar a prevenção dos riscos ocupacionais, fiscalizar e fazer cumprir as diretrizes da segurança")
                    break;
                case "Supervisor em Segurança do Trabalho":
                    $("#cargoResp blockquote").text("Responsável por supervisionar as equipes de segurança do trabalho nas demandas de prevenção e atendimentos aos requisitos legais, monitorando por meio de indicadores os resultados e metas")
                    $("#cargoAut blockquote").text("Ações que garantam resultados com acompanhamento de metas e implantação de processos, compilando informações das equipes de segurança para implantação de medidas pertinentes aos resultados obtidos")
                    break;
                case "Engenheiro em Segurança do Trabalho":
                    $("#cargoResp blockquote").text("Responsável por elaborar plano de trabalho, definir metas, acompanhar, auditar processos de trabalho na prevenção de acidentes e monitorar plano de ação dos pontos levantados")
                    $("#cargoAut blockquote").text("Orientar a engenharia sobre os requisitos legais, definindo de forma conjunta os processos necessários para atendimentos aos requisitos legais e prevenção de acidentes")
                    break;
                case "Médico do trabalho":
                    $("#cargoResp blockquote").text("Implementar ações para a Promoção (Efetivação de Estagiário pós desligamento) da saúde ocupacional; coordenar programas e serviços em saúde; adotar medidas de precaução de biossegurança")
                    $("#cargoAut blockquote").text("Orientação, Atuação médica")
                    break;
                case "Administrativo em Obra - Auxiliar Administrativo, Assistente Administrativo, Analista Administrativo e similares":
                    $("#cargoResp blockquote").text("Verificar a entrada e saída de correspondências; receber e enviar documentos; atender chamadas telefônicas; recepcionar o público em geral; atividades relacionadas a notas fiscais; fazer o arquivamento de documentos; manter atualizados os contatos da empresa")
                    $("#cargoAut blockquote").text("Realizar atividades com supervisão do Engenheiro")
                    break;
                case "Responsável pelos materiais da obra - Almoxarife, Armazenista e similares":
                    $("#cargoResp blockquote").text("Responsável pelo controle de entrada e saída de materiais do estoque, fazendo os registros; conferência de mercadorias e manutenção da organização do estoque")
                    $("#cargoAut blockquote").text("Ações que garantam a quantidade e qualidade adequadas dos materiais entregues; controle da liberação de materiais de acordo com as normas da empresa")
                    break;
                case "Responsável pelos materiais da obra - Auxiliar de Almoxarifado, Armazenista e similares":
                    $("#cargoResp blockquote").text("Auxiliar o almoxarife na organização e liberação dos materiais de acordo com as normas da empresa")
                    $("#cargoAut blockquote").text("")
                    break;
                case "Produção em Canteiro de Obra - Mestres e similares":
                    $("#cargoResp blockquote").text("Supervisionar equipes de trabalhadores que atuam em canteiros de obras civis; controlar recursos produtivos da obra (arranjos físicos, equipamentos, materiais, insumos e equipes de trabalho); controlar padrões produtivos da obra, tais como, inspeção da qualidade dos materiais e insumos utilizados, fluxo e movimentação dos materiais e medidas de segurança dos locais e equipamentos da obra")
                    $("#cargoAut blockquote").text("Orientar, fiscalizar e coordenar os trabalhos dos profissionais do canteiro de obra")
                    break;
                case "Produção em Canteiro de Obra - Encarregados e similares":
                    $("#cargoResp blockquote").text("Distribuir tarefas; inspecionar a execução dos trabalhos; controlar os recursos produtivos da obra; orientar sobre a guarda, manutenção, conservação e limpeza das ferramentas de trabalho")
                    $("#cargoAut blockquote").text("Cobrar o cumprimento de normas e execução correta das atividades; supervisionar os trabalhos dos profissionais do canteiro de obra")
                    break;
                case "Produção em Canteiro de Obra - Oficiais, Profissionais e similares":
                    $("#cargoResp blockquote").text("Atuar no canteiro de obras seguindo as orientações do Engenheiro, Encarregado e Mestre de obras, executando atividades pertinentes à função exercida: Pedreiro, Carpinteiro, Gesseiro, etc")
                    $("#cargoAut blockquote").text("Realizar atividades com supervisão")
                    break;
                case "Produção em Canteiro de Obra - Serventes e similares":
                    $("#cargoResp blockquote").text("Auxiliar os profissionais do canteiro de obras, preparar massa de concreto, organizar o local de trabalho, etc")
                    $("#cargoAut blockquote").text("")
                    break;
                case "Operadores de Máquinas em Canteiro de Obra":
                    $("#cargoResp blockquote").text("Executar atividades conforme orientações e prioridades apontadas por seu superior imediato, seguindo os procedimentos de sua área; verificar as condições gerais do equipamento antes de colocá-lo em funcionamento")
                    $("#cargoAut blockquote").text("Interromper o funcionamento da máquina ou equipamento, caso identifique alguma irregularidade e comunicar ao superior imediato")
                    break;
                case "Cargos de Gestão - Gerentes e similares":
                    $("#cargoResp blockquote").text("Gerenciar recursos humanos, financeiros, tecnológicos dentre outros Garantir o cumprimento de normas, procedimentos e demais atribuições do cargo")
                    $("#cargoAut blockquote").text("Tomar decisões assertivas; definir objetivos para a equipe; coordenar ações que contribuam para um melhor resultado")
                    break;
                case "Cargos de Gestão - Coordenadores e similares":
                    $("#cargoResp blockquote").text("Gerenciar equipe; realizar auditorias internas em busca das melhores práticas, conforme as diretrizes e regulamentos aplicáveis")
                    $("#cargoAut blockquote").text("Realizar auditorias internas ")
                    break;
                case "Cargos de Gestão - Supervisores e similares":
                    $("#cargoResp blockquote").text("Coordenar equipes e projetos; elaborar relatórios; zelar pelo cumprimento de normas, procedimentos e demais atribuições do cargo")
                    $("#cargoAut blockquote").text("Coordenar a equipe de acordo com as diretrizes da empresa, visando o alcance dos objetivos específicos daquele setor")
                    break;
                case "Gerente da Qualidade":
                    $("#cargoResp blockquote").text("Gerenciar equipe; realizar auditorias internas em busca das melhores práticas, conforme as diretrizes e regulamentos aplicáveis.")
                    $("#cargoAut blockquote").text("Realizar auditorias internas.")
                    break;
                case "Estagiários de Escritório":
                    $("#cargoResp blockquote").text("Acompanhar e prestar auxílio em atividades de atendimento, elaboração de planilhas; organização de documentos; conferência de relatórios e preparar informações para atualização de banco de dados")
                    $("#cargoAut blockquote").text("")
                    break;
                case "Auditor interno":
                    $("#cargoResp blockquote").text("Realizar auditorias internas de processos visando a eficácia das operações; confiabilidade e conformidade com todas as diretrizes e regulamentos aplicáveis")
                    $("#cargoAut blockquote").text("Realizar auditorias internas")
                    break;
            }
        }
        // ATV 0/4
        hide_on_load("rd_mtvCntr", "Substituição de colaborador", "Promoção (Efetivação de Estagiário pós desligamento)", "txt_prSb");
        // hide_on_load("rd_mtvCntr","Substituição de colaborador","Promoção (Efetivação de Estagiário pós desligamento)",null,"txt_prSb");
        hide_on_load("rd_mtvCntr", "Substituição de colaborador", null, "vlr_Sb");
        hide_on_load("rd_idioma", "Sim", null, "txt_idioma");
        hide_on_load("rd_loc", "Obra", null, "documentacao_funcionario");
        hide_on_load("rd_loc", "Obra", null, "slt_spe");
        hide_on_load("rd_hrtb", "Outros", null, "txt_hrtb");
        hide_on_load("rd_crl", "Sim", null, "div_anx_crl");
        hide_on_load("rd_na", "Sim", null, "rd_etp_na");
        hide_on_load("rd_crtComb", "Sim", null, "vl_crtComb");
        hide_on_load("rd_pc", "Sim, já tem computador", null, "rd_patrm");
        hide_on_load("rd_pc", "Não, mas será necessário alugar um computador", null, "entrg_Rossi");
        hide_on_load("rd_pc", "Não, mas será necessário alugar um computador", null, "softwares");
        hide_on_load("rd_acsRd", "Sim", null, "pastasRede");
        hide_on_load("rd_eqpRossi", "Sim", null, "entrg_RossiEqp");
        hide_on_load("rd_cntr", "Estágio", null, "estagio");
        hide_on_load('rd_mtvCntr_subst', 'Sim', null, 'div_mtvCntr_subst_1');
        hide_on_load('rd_mtvCntr_subst', 'Não', null, 'div_mtvCntr_subst_2');
        // ATV 9
        hide_on_load("rd_avl_rh", "Aprovada", "Aprovada c/ Urgência", "txt_obs_rh");
        hide_on_load("rd_avl_rh", "Alteração/Inclusão de informações", null, "txt_alt_rh");
        hide_on_load("rd_avl_rh", "Reprovada", null, "txt_rpv_rh");
        // ATV 37
        //Add Efetivção
        hide_on_load_custom("rd_selecao_rh", "Sim, candidato selecionado pelo G&G", "Sim, candidato selecionado por Recrutamento Interno", "Sim, efetivação de Jovem Aprendiz", "Sim, admissão com promoção de estagiário", "cdd_slc");
        // ATV 51
        hide_on_load("rd_dst_dp", "Não", null, "dt_cntr_clb");
        hide_on_load("rd_dst_dp", "Alteração/Inclusão de informações ao Gente & Gestão", null, "txt_dp_alter");
        // ATV 63
        hide_on_load("rd_int_rh", "Sim", null, "dt_int_rh");
        // ATV 150
        hide_on_load("rd_etg_infra_acs", "Sim", null, "show_clb_mail");
        // ATV 348 - (SISTEMAS) - Mega, Expert, Approvo
        // hide_on_load("rd_etg_si_1", "Sim", null, "show_acessos_1")
        // // ATV 350 - (SISTEMAS) - CV e Adobe
        // hide_on_load("rd_etg_si_2", "Sim", null, "show_acessos_2")
        // // ATV 352 - (SISTEMAS) - FLUIG;
        // hide_on_load("rd_etg_si_3", "Sim", null, "show_acessos_3")
        // // ATV 390 - (SISTEMAS) - HCM;
        // hide_on_load("rd_etg_si_4", "Sim", null, "show_acessos_4")
        // EXIBIR CARGO SELECIONADO
        $("#novo_cargo").val() != "" ? $("#div_novo_cargo").show() : $("#div_novo_cargo").hide()
        // Carrega valor dos input range
        for (var i = 1; i <= 24; i++) {
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
})
// Controlador dos clicks (nome do input,valor pra verificar, ..., id da div pra exibir) - simples
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
function show_on_click_custom(campo, valor1, valor2, valor3, valor4, show) {
    $("[name$='" + campo + "']").click(function () {
        if ($(this).val() == valor1 || $(this).val() == valor2 || $(this).val() == valor3 || $(this).val() == valor4) {
            $("#" + show).show();
        } else {
            $("#" + show).hide();
        }
    });
}
function hide_on_load_custom(campo, valor1, valor2, valor3, valor4, show) {
    if ($("[name$='" + campo + "']:checked").val() == valor1 || $("[name$='" + campo + "']:checked").val() == valor2 || $("[name$='" + campo + "']:checked").val() == valor3 || $("[name$='" + campo + "']:checked").val() == valor4) {
        $("#" + show).show();
    } else {
        $("#" + show).hide();
    }
}
// Controla a exibição dos campos ocultos simples
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
    if (selectedItem.inputId == "txt_cargo_att") {
        selectedItem["Cargo"] == "Novo cargo" || selectedItem["Cargo"] == "" ? $("#div_novo_cargo").show() : $("#div_novo_cargo").hide()
    }
}
function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, "i");
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    sistema: str
                });
            }
        });
        cb(matches);
    };
}
function cargosDetalhes() {
    // $("[name='txt_supDsj'],#cargoResp blockquote,#cargoAut blockquote").text("")
    $("#rd_escol").val("");
    $("#txt_supDsj,#cargoResp,#cargoAut").hide()
    switch ($(this).val()) {
        case "Advogado":
            $("#rd_escol").val("Ensino Superior Completo")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("[name='txt_supDsj']").text("Ensino superior em Direito")
            break;
        case "Engenheiro Civil":
            $("#rd_escol").val("Ensino Superior Completo")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Superior completo")
            $("#cargoResp blockquote").text("Elaborar projetos de engenharia civil, gerenciar obras, controlar a qualidade dos empreendimentos Coordenar a operação e manutenção dos empreendimentos Podem prestar consultoria, assistência e assessoria e elaborar pesquisas tecnológicas")
            $("#cargoAut blockquote").text("Possui autoridade técnica e para tomadas de decisões que impactam diretamente nos resultados e na execução da obra")
            break;
        case "Engenheiro Elétrico":
            $("#rd_escol").val("Ensino Superior Completo")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Superior completo")
            $("#cargoResp blockquote").text("Elaborar projetos elétricos, inspecionar instalações, observar operações garantindo o cumprimento do projeto, bem como as especificações no que se refere a equipamentos e normas de segurança Coordenar profissionais da área Dar assistência e assessoria técnica")
            $("#cargoAut blockquote").text("Possui autoridade técnica e para tomadas de decisões que impactam diretamente nos resultados e na execução dos projetos elétricos")
            break;
        case "Arquiteto":
            $("#rd_escol").val("Ensino Superior Completo")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Superior completo")
            $("#cargoResp blockquote").text("Elaborar projetos arquitetônicos; definindo materiais, acabamentos, técnicas, metodologias; analisar dados e informações; prestar assistência a outros profissionais envolvidos")
            $("#cargoAut blockquote").text("Realizar ações que garantam a qualidade e execução das atividades, supervisionar equipe de projetos arquitetônicos")
            break;
        case "Assistentes Técnico, Técnicos de obras civis e similares (Suporte Técnico na Obra)":
            $("#rd_escol").val("Ensino Superior Incompleto (cursando)")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Cursando ensino superior em Engenharia ou Arquitetura")
            $("#cargoResp blockquote").text("Dar suporte aos gestores em suas respectivas áreas (qualidade, ST, AT, Eng Civil, elétrica, etc), realizar levantamentos, atuar na execução de atividades sob supervisão de um gestor de obra, realizar o controle de materiais, etc")
            $("#cargoAut blockquote").text("Apoiar profissionais da base sobre adequação das atividades, visando um melhor resultado")
            break;
        case "Auxiliares Técnicos - Engenharia e similares (Suporte Técnico na Obra)":
            $("#rd_escol").val("Ensino Superior Incompleto (cursando)")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Cursando ensino superior em Engenharia ou Arquitetura")
            $("#cargoResp blockquote").text("Auxiliar na execução de atividades como acompanhamento de obras, medições, controle de materiais, levantamento de dados para auxiliar na elaboração de relatórios")
            $("#cargoAut blockquote").text("Realizar atividades com supervisão do Engenheiro ou gestor da área de atuação")
            break;
        case "Estagiários (Suporte Técnico na Obra)":
            $("#rd_escol").val("Ensino Superior Incompleto (cursando)")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Cursando ensino superior em Engenharia ou Arquitetura")
            $("#cargoResp blockquote").text("Acompanhar e auxiliar o gestor em suas atividades observando os parâmetros da qualidade, segurança e outros estabelecidos, conforme área de atuação")
            $("#cargoAut blockquote").text("")
            break;
        case "Auxiliares, Assistentes, Analistas Técnicos e similares (Suporte Técnico no Escritório)":
            $("#rd_escol").val("Ensino Médio Completo (Técnico na área)")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Realizar atividades nas áreas administrativas em geral, de acordo com as exigências do cargo, diretrizes da empresa e do setor de atuação (Projetos, Engenharia, DP, Assistência Técnica, RH, Suprimentos etc)")
            $("#cargoAut blockquote").text("Auxiliar, executar, analisar conforme a função e as orientações do gestor e necessidades da área")
            break;
        case "Técnico em Segurança do Trabalho":
            $("#rd_escol").val("Ensino Médio Completo (Técnico na área)")
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Técnico em segurança do trabalho")
            $("#cargoResp blockquote").text("Orientar quanto aos riscos inerentes da atividade, monitorar metas, promover a realização de atividades de orientação, informação e conscientização dos trabalhadores para a prevenção de acidentes e doenças relacionadas ao trabalho")
            $("#cargoAut blockquote").text("Implantar a prevenção dos riscos ocupacionais, fiscalizar e fazer cumprir as diretrizes da segurança")
            break;
        case "Supervisor em Segurança do Trabalho":
            $("#rd_escol").val("Ensino Médio Completo (Técnico na área)")
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Técnico em segurança do trabalho")
            $("#cargoResp blockquote").text("Responsável por supervisionar as equipes de segurança do trabalho nas demandas de prevenção e atendimentos aos requisitos legais, monitorando por meio de indicadores os resultados e metas")
            $("#cargoAut blockquote").text("Ações que garantam resultados com acompanhamento de metas e implantação de processos, compilando informações das equipes de segurança para implantação de medidas pertinentes aos resultados obtidos")
            break;
        case "Engenheiro em Segurança do Trabalho":
            $("#rd_escol").val("Ensino Superior Completo")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Ensino Superior e pós-graduado em Segurança do Trabalho")
            $("#cargoResp blockquote").text("Responsável por elaborar plano de trabalho, definir metas, acompanhar, auditar processos de trabalho na prevenção de acidentes e monitorar plano de ação dos pontos levantados")
            $("#cargoAut blockquote").text("Orientar a engenharia sobre os requisitos legais, definindo de forma conjunta os processos necessários para atendimentos aos requisitos legais e prevenção de acidentes")
            break;
        case "Médico do trabalho":
            $("#rd_escol").val("Ensino Superior Completo")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Superior completo")
            $("#cargoResp blockquote").text("Implementar ações para a Promoção (Efetivação de Estagiário pós desligamento) da saúde ocupacional; coordenar programas e serviços em saúde; adotar medidas de precaução de biossegurança")
            $("#cargoAut blockquote").text("Orientação, Atuação médica")
            break;
        case "Administrativo em Obra - Auxiliar Administrativo, Assistente Administrativo, Analista Administrativo e similares":
            $("#rd_escol").val("Ensino Médio Incompleto")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Verificar a entrada e saída de correspondências; receber e enviar documentos; atender chamadas telefônicas; recepcionar o público em geral; atividades relacionadas a notas fiscais; fazer o arquivamento de documentos; manter atualizados os contatos da empresa")
            $("#cargoAut blockquote").text("Realizar atividades com supervisão do Engenheiro")
            break;
        case "Responsável pelos materiais da obra - Almoxarife, Armazenista e similares":
            $("#rd_escol").val("Ensino Fundamental Incompleto (cursando)")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Responsável pelo controle de entrada e saída de materiais do estoque, fazendo os registros; conferência de mercadorias e manutenção da organização do estoque")
            $("#cargoAut blockquote").text("Ações que garantam a quantidade e qualidade adequadas dos materiais entregues; controle da liberação de materiais de acordo com as normas da empresa")
            break;
        case "Responsável pelos materiais da obra - Auxiliar de Almoxarifado, Armazenista e similares":
            $("#rd_escol").val("Ensino Fundamental Incompleto (cursando)")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Auxiliar o almoxarife na organização e liberação dos materiais de acordo com as normas da empresa")
            $("#cargoAut blockquote").text("")
            break;
        case "Produção em Canteiro de Obra - Mestres e similares":
            $("#rd_escol").val("Leitura e escrita")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Supervisionar equipes de trabalhadores que atuam em canteiros de obras civis; controlar recursos produtivos da obra (arranjos físicos, equipamentos, materiais, insumos e equipes de trabalho); controlar padrões produtivos da obra, tais como, inspeção da qualidade dos materiais e insumos utilizados, fluxo e movimentação dos materiais e medidas de segurança dos locais e equipamentos da obra")
            $("#cargoAut blockquote").text("Orientar, fiscalizar e coordenar os trabalhos dos profissionais do canteiro de obra")
            break;
        case "Produção em Canteiro de Obra - Encarregados e similares":
            $("#rd_escol").val("Leitura e escrita")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Distribuir tarefas; inspecionar a execução dos trabalhos; controlar os recursos produtivos da obra; orientar sobre a guarda, manutenção, conservação e limpeza das ferramentas de trabalho")
            $("#cargoAut blockquote").text("Cobrar o cumprimento de normas e execução correta das atividades; supervisionar os trabalhos dos profissionais do canteiro de obra")
            break;
        case "Produção em Canteiro de Obra - Oficiais, Profissionais e similares":
            $("#rd_escol").val("Leitura e escrita")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Atuar no canteiro de obras seguindo as orientações do Engenheiro, Encarregado e Mestre de obras, executando atividades pertinentes à função exercida: Pedreiro, Carpinteiro, Gesseiro, etc")
            $("#cargoAut blockquote").text("Realizar atividades com supervisão")
            break;
        case "Produção em Canteiro de Obra - Serventes e similares":
            $("#rd_escol").val("Leitura e escrita")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Auxiliar os profissionais do canteiro de obras, preparar massa de concreto, organizar o local de trabalho, etc")
            $("#cargoAut blockquote").text("")
            break;
        case "Operadores de Máquinas em Canteiro de Obra":
            $("#rd_escol").val("Leitura e escrita")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Executar atividades conforme orientações e prioridades apontadas por seu superior imediato, seguindo os procedimentos de sua área; verificar as condições gerais do equipamento antes de colocá-lo em funcionamento")
            $("#cargoAut blockquote").text("Interromper o funcionamento da máquina ou equipamento, caso identifique alguma irregularidade e comunicar ao superior imediato")
            break;
        case "Cargos de Gestão - Gerentes e similares":
            $("#rd_escol").val("Ensino Médio Completo (Técnico na área)")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Gerenciar recursos humanos, financeiros, tecnológicos dentre outros Garantir o cumprimento de normas, procedimentos e demais atribuições do cargo")
            $("#cargoAut blockquote").text("Tomar decisões assertivas; definir objetivos para a equipe; coordenar ações que contribuam para um melhor resultado")
            break;
        case "Cargos de Gestão - Coordenadores e similares":
            $("#rd_escol").val("Ensino Médio Completo (Técnico na área)")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Gerenciar equipe; realizar auditorias internas em busca das melhores práticas, conforme as diretrizes e regulamentos aplicáveis")
            $("#cargoAut blockquote").text("Realizar auditorias internas ")
            break;
        case "Cargos de Gestão - Supervisores e similares":
            $("#rd_escol").val("Ensino Médio Completo (Técnico na área)")
            $("#cargoResp,#cargoAut").show()
            $("#cargoResp blockquote").text("Coordenar equipes e projetos; elaborar relatórios; zelar pelo cumprimento de normas, procedimentos e demais atribuições do cargo")
            $("#cargoAut blockquote").text("Coordenar a equipe de acordo com as diretrizes da empresa, visando o alcance dos objetivos específicos daquele setor")
            break;
        case "Gerente da Qualidade":
            $("#rd_escol").val("Ensino Superior Completo")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Superior completo")
            $("#cargoResp blockquote").text("Gerenciar equipe; realizar auditorias internas em busca das melhores práticas, conforme as diretrizes e regulamentos aplicáveis.")
            $("#cargoAut blockquote").text("Realizar auditorias internas.")
            break;
        case "Estagiários de Escritório":
            $("#rd_escol").val("Ensino Superior Incompleto (cursando)")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Cursando superior em áreas afins à atividade exercida")
            $("#cargoResp blockquote").text("Acompanhar e prestar auxílio em atividades de atendimento, elaboração de planilhas; organização de documentos; conferência de relatórios e preparar informações para atualização de banco de dados")
            $("#cargoAut blockquote").text("")
            break;
        case "Auditor interno":
            $("#rd_escol").val("Ensino Superior Incompleto (cursando)")
            $("#txt_supDsj").is(":hidden") ? $("#txt_supDsj").show() : false
            $("#cargoResp,#cargoAut").show()
            $("[name='txt_supDsj']").text("Cursando superior em áreas afins à atividade exercida")
            $("#cargoResp blockquote").text("Realizar auditorias internas de processos visando a eficácia das operações; confiabilidade e conformidade com todas as diretrizes e regulamentos aplicáveis")
            $("#cargoAut blockquote").text("Realizar auditorias internas")
            break;
        default:
            $("[name='txt_supDsj']").text("")
            $("#cargoResp blockquote").text("")
            $("#cargoAut blockquote").text("")
            $("#txt_supDsj").is(":visible") ? $("#txt_supDsj").hide() : false
            break;
    }
}
