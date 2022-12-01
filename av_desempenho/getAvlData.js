$(document).ready(function () {
    let notaComp = 0, notaGComp = 0;
    let notaPrepQlf = 0, notaGPrepQlf = 0;
    let notaResult = 0, notaGResult = 0;
    let sltComp = [], sltPrepQlf = [], sltResult = [];
    let arrGComp = [], arrGPrepQlf = [], arrGResult = [];
    let notaGestorComp = 0, notaGestorPrepQlf = 0, notaGestorResult = 0, notaGestorLider = 0
    if ($("#vrf_gestor").val() != "gestor") {
        // AUTO AVALIACAO
        $("#comptcomp input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlP_comp_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el0 = $("<span/>").addClass("control_01").text($(this).val());
                    $(el0).append(icon)
                    $("#th_comp_" + index).append(el0)
                    $("#avlP_comp_" + index).show()
                    notaComp += 0;
                    break;
                case "Ruim":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlP_comp_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el1 = $("<span/>").addClass("control_02").text($(this).val())
                    $(el1).append(icon)
                    $("#th_comp_" + index).append(el1)
                    $("#avlP_comp_" + index).show()
                    notaComp += 0.6;
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val())
                    $("#th_comp_" + index).append(el2)
                    $("#avlP_comp_" + index).hide()
                    notaComp += 2.6;
                    break;
                case "Bom":
                    let el3 = $("<span/>").addClass("control_04").text($(this).val());
                    $("#th_comp_" + index).append(el3)
                    $("#avlP_comp_" + index).hide()
                    notaComp += 4.6;
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val())
                    $("#th_comp_" + index).append(el4)
                    $("#avlP_comp_" + index).hide()
                    notaComp += 6.6;
                    break;
            }
        });
        $("#prepQlf input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlP_prepQlf_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el0 = $("<span/>").addClass("control_01").text($(this).val())
                    $(el0).append(icon)
                    $("#th_prepQlf_" + index).append(el0)
                    $("#avlP_prepQlf_" + index).show()
                    notaPrepQlf += 0;
                    break;
                case "Ruim":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlP_prepQlf_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el1 = $("<span/>").addClass("control_02").text($(this).val())
                    $(el1).append(icon)
                    $("#th_prepQlf_" + index).append(el1)
                    $("#avlP_prepQlf_" + index).show()
                    notaPrepQlf += 2.2;
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val())
                    $("#th_prepQlf_" + index).append(el2)
                    $("#avlP_prepQlf_" + index).hide()
                    notaPrepQlf += 6.2;
                    break;
                case "Bom":
                    let el3 = $("<span/>").addClass("control_04").text($(this).val())
                    $("#th_prepQlf_" + index).append(el3)
                    $("#avlP_prepQlf_" + index).hide()
                    notaPrepQlf += 10.4;
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val());
                    $("#th_prepQlf_" + index).append(el4)
                    $("#avlP_prepQlf_" + index).hide()
                    notaPrepQlf += 16.6;
                    break;
            }
        });
        $("#result input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlP_result_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el0 = $("<span/>").addClass("control_01").text($(this).val())
                    $(el0).append(icon)
                    $("#th_result_" + index).append(el0)
                    $("#avlP_result_" + index).show()
                    notaResult += 0;
                    break;
                case "Ruim":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlP_result_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el1 = $("<span/>").addClass("control_02").text($(this).val())
                    $(el1).append(icon)
                    $("#th_result_" + index).append(el1)
                    $("#avlP_result_" + index).show()
                    notaResult += 5;
                    // notaResult += 3.3;
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val())
                    $("#th_result_" + index).append(el2)
                    $("#avlP_result_" + index).hide()
                    notaResult += 20;
                    // notaResult += 13.3;
                    break;
                case "Bom":
                    const e3 = $("<span/>").addClass("control_04").text($(this).val())
                    $("#th_result_" + index).append(e3)
                    $("#avlP_result_" + index).hide()
                    notaResult += 35;
                    // notaResult += 23.3;
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val());
                    $("#th_result_" + index).append(el4)
                    $("#avlP_result_" + index).hide()
                    notaResult += 50;
                    // notaResult += 33.3;
                    break;
            }
        });
        // GESTOR
        $("#compGtcompG input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlPG_compG_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el0 = $("<span/>").addClass("control_01").text($(this).val())
                    $(el0).append(icon)
                    $("#th_compG_" + index).append(el0)
                    $("#avlPG_compG_" + index).show()
                    notaGComp += 0;
                    arrGComp[index] = 0;
                    break;
                case "Ruim":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlPG_compG_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el1 = $("<span/>").addClass("control_02").text($(this).val())
                    $(el1).append(icon)
                    $("#th_compG_" + index).append(el1)
                    $("#avlPG_compG_" + index).show()
                    notaGComp += 0.6;
                    arrGComp[index] = 0.6;
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val())
                    $("#th_compG_" + index).append(el2)
                    $("#avlPG_compG_" + index).hide()
                    notaGComp += 2.6;
                    arrGComp[index] = 2.6;
                    break;
                case "Bom":
                    let el3 = $("<span/>").addClass("control_04").text($(this).val())
                    $("#th_compG_" + index).append(el3)
                    $("#avlPG_compG_" + index).hide()
                    notaGComp += 4.6;
                    arrGComp[index] = 4.6;
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val())
                    $("#th_compG_" + index).append(el4)
                    $("#avlPG_compG_" + index).hide()
                    notaGComp += 6.6;
                    arrGComp[index] = 6.6;
                    break;
            }
        });
        $("#prepQlfG input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlPG_prepQlfG_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el0 = $("<span/>").addClass("control_01").text($(this).val());
                    $(el0).append(icon)
                    $("#th_prepQlfG_" + index).append(el0)
                    $("#avlPG_prepQlfG_" + index).show()
                    notaGPrepQlf += 0;
                    arrGPrepQlf[index] = 0;
                    break;
                case "Ruim":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlPG_prepQlfG_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el1 = $("<span/>").addClass("control_02").text($(this).val());
                    $(el1).append(icon)
                    $("#th_prepQlfG_" + index).append(el1)
                    $("#avlPG_prepQlfG_" + index).show()
                    notaGPrepQlf += 2.2;
                    arrGPrepQlf[index] = 2.2;
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val());
                    $("#th_prepQlfG_" + index).append(el2)
                    $("#avlPG_prepQlfG_" + index).hide()
                    notaGPrepQlf += 6.2;
                    arrGPrepQlf[index] = 6.2;
                    break;
                case "Bom":
                    let el3 = $("<span/>").addClass("control_04").text($(this).val());
                    $("#th_prepQlfG_" + index).append(el3)
                    $("#avlPG_prepQlfG_" + index).hide()
                    notaGPrepQlf += 10.4;
                    arrGPrepQlf[index] = 10.4;
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val());
                    $("#th_prepQlfG_" + index).append(el4)
                    $("#avlPG_prepQlfG_" + index).hide()
                    notaGPrepQlf += 16.6;
                    arrGPrepQlf[index] = 16.6;
                    break;
            }
        });
        $("#resultG input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlPG_resultG_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el0 = $("<span/>").addClass("control_01").text($(this).val())
                    $(el0).append(icon)
                    $("#th_resultG_" + index).append(el0)
                    $("#avlPG_resultG_" + index).show()
                    notaGResult += 0;
                    arrGResult[index] = 0;
                    break;
                case "Ruim":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlPG_resultG_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el1 = $("<span/>").addClass("control_02").text($(this).val())
                    $(el1).append(icon)
                    $("#th_resultG_" + index).append(el1)
                    $("#avlPG_resultG_" + index).show()
                    notaGResult += 3.3;
                    arrGResult[index] = 3.3;
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val())
                    $("#th_resultG_" + index).append(el2)
                    $("#avlPG_resultG_" + index).hide()
                    notaGResult += 13.3;
                    arrGResult[index] = 13.3;
                    break;
                case "Bom":
                    let el3 = $("<span/>").addClass("control_04").text($(this).val())
                    $("#th_resultG_" + index).append(el3)
                    $("#avlPG_resultG_" + index).hide()
                    notaGResult += 23.3;
                    arrGResult[index] = 23.3;
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val())
                    $("#th_resultG_" + index).append(el4)
                    $("#avlPG_resultG_" + index).hide()
                    notaGResult += 33.3;
                    arrGResult[index] = 33.3;
                    break;
            }
        });
        // BUSCA VALORES JÁ SALVOS
        $(".select_rh").each(function (index, element) {
            index += 1;
            let select = $(this).attr("class").split("select_rh ")[1]
            switch (select) {
                case "slt_comp":
                    let click_comp = $(this).attr("id").split("slt_compR_")[1]
                    switch ($(this).val()) {
                        case "Péssimo":
                            sltComp[click_comp] = 0;
                            $(this).css({ "background": "#EB1D36", "color": "#fff" })
                            break;
                        case "Ruim":
                            sltComp[click_comp] = 0.6;
                            $(this).css({ "background": "#ED7D3A", "color": "#fff" })
                            break;
                        case "Regular":
                            sltComp[click_comp] = 2.6;
                            $(this).css("background", "#EBD671")
                            break;
                        case "Bom":
                            sltComp[click_comp] = 4.6;
                            $(this).css({ "background": "#6FB2D2", "color": "#fff" })
                            break;
                        case "Ótimo":
                            sltComp[click_comp] = 6.6;
                            $(this).css({ "background": "#85C88A", "color": "#fff" })
                            break;
                    }
                    break;
                case "slt_prepQlf":
                    let click_prep = $(this).attr("id").split("slt_prepQlfR_")[1]
                    switch ($(this).val()) {
                        case "Péssimo":
                            sltPrepQlf[click_prep] = 0;
                            $(this).css({ "background": "#EB1D36", "color": "#fff" })
                            break;
                        case "Ruim":
                            sltPrepQlf[click_prep] = 2.2;
                            $(this).css({ "background": "#ED7D3A", "color": "#fff" })
                            break;
                        case "Regular":
                            sltPrepQlf[click_prep] = 6.2;
                            $(this).css("background", "#EBD671")
                            break;
                        case "Bom":
                            sltPrepQlf[click_prep] = 10.4;
                            $(this).css({ "background": "#6FB2D2", "color": "#fff" })
                            break;
                        case "Ótimo":
                            sltPrepQlf[click_prep] = 16.6;
                            $(this).css({ "background": "#85C88A", "color": "#fff" })
                            break;
                    }
                    break;
                case "slt_result":
                    let click_result = $(this).attr("id").split("slt_resultR_")[1]
                    switch ($(this).val()) {
                        case "Péssimo":
                            sltResult[click_result] = 0;
                            $(this).css({ "background": "#EB1D36", "color": "#fff" })
                            break;
                        case "Ruim":
                            sltResult[click_result] = 3.3;
                            $(this).css({ "background": "#ED7D3A", "color": "#fff" })
                            break;
                        case "Regular":
                            sltResult[click_result] = 13.3;
                            $(this).css("background", "#EBD671")
                            break;
                        case "Bom":
                            sltResult[click_result] = 23.3;
                            $(this).css({ "background": "#6FB2D2", "color": "#fff" })
                            break;
                        case "Ótimo":
                            sltResult[click_result] = 33.3;
                            $(this).css({ "background": "#85C88A", "color": "#fff" })
                            break;
                    }
                    break;
            }
            let comptNota = Number((sltComp.reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(1))
            let prepNota = Number((sltPrepQlf.reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(1))
            let resultNota = Number((sltResult.reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(1))
            $("#notaRHComp strong").text(comptNota)
            $("#notaRHPrep strong").text(prepNota)
            $("#notaRHResult strong").text(resultNota)
        });
        // RH - AO CLICAR ALTERA VALORES
        $(".select_rh").change(function (e) {
            e.preventDefault();
            let select = $(this).attr("class").split("select_rh ")[1]
            switch (select) {
                case "slt_comp":
                    let click_comp = $(this).attr("id").split("slt_compR_")[1]
                    switch ($(this).val()) {
                        case "Péssimo":
                            sltComp[click_comp] = 0;
                            $(this).css({ "background": "#EB1D36", "color": "#fff" })
                            break;
                        case "Ruim":
                            sltComp[click_comp] = 0.6;
                            $(this).css({ "background": "#ED7D3A", "color": "#fff" })
                            break;
                        case "Regular":
                            sltComp[click_comp] = 2.6;
                            $(this).css("background", "#EBD671")
                            break;
                        case "Bom":
                            sltComp[click_comp] = 4.6;
                            $(this).css({ "background": "#6FB2D2", "color": "#fff" })
                            break;
                        case "Ótimo":
                            sltComp[click_comp] = 6.6;
                            $(this).css({ "background": "#85C88A", "color": "#fff" })
                            break;
                    }
                    break;
                case "slt_prepQlf":
                    let click_prep = $(this).attr("id").split("slt_prepQlfR_")[1]
                    switch ($(this).val()) {
                        case "Péssimo":
                            sltPrepQlf[click_prep] = 0;
                            $(this).css({ "background": "#EB1D36", "color": "#fff" })
                            break;
                        case "Ruim":
                            sltPrepQlf[click_prep] = 2.2;
                            $(this).css({ "background": "#ED7D3A", "color": "#fff" })
                            break;
                        case "Regular":
                            sltPrepQlf[click_prep] = 6.2;
                            $(this).css("background", "#EBD671")
                            break;
                        case "Bom":
                            sltPrepQlf[click_prep] = 10.4;
                            $(this).css({ "background": "#6FB2D2", "color": "#fff" })
                            break;
                        case "Ótimo":
                            sltPrepQlf[click_prep] = 16.6;
                            $(this).css({ "background": "#85C88A", "color": "#fff" })
                            break;
                    }
                    break;
                case "slt_result":
                    let click_result = $(this).attr("id").split("slt_resultR_")[1]
                    switch ($(this).val()) {
                        case "Péssimo":
                            sltResult[click_result] = 0;
                            $(this).css({ "background": "#EB1D36", "color": "#fff" })
                            break;
                        case "Ruim":
                            sltResult[click_result] = 3.3;
                            $(this).css({ "background": "#ED7D3A", "color": "#fff" })
                            break;
                        case "Regular":
                            sltResult[click_result] = 13.3;
                            $(this).css("background", "#EBD671")
                            break;
                        case "Bom":
                            sltResult[click_result] = 23.3;
                            $(this).css({ "background": "#6FB2D2", "color": "#fff" })
                            break;
                        case "Ótimo":
                            sltResult[click_result] = 33.3;
                            $(this).css({ "background": "#85C88A", "color": "#fff" })
                            break;
                    }
                    break;
            }
            $("#notaRHComp strong").text(Number((sltComp.reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(1)))
            $("#notaRHPrep strong").text(Number((sltPrepQlf.reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(1)))
            $("#notaRHResult strong").text(Number((sltResult.reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(1)))
        });
        // CALCULO NOTA GERAL 
        // let notaGeralAA = notaComp + notaPrepQlf + notaResult;
        let notaAlinhamentoComp = 0, notaAlinhamentoPrepQlf = 0, notaAlinhamentoResult = 0;
        for (let comp = 1; comp < arrGComp.length; comp++) {
            if (sltComp[comp] != undefined && sltComp[comp] != "") {
                notaAlinhamentoComp += sltComp[comp]
            } else {
                notaAlinhamentoComp += arrGComp[comp]
            }
        }
        for (let prepQ = 1; prepQ < arrGPrepQlf.length; prepQ++) {
            if (sltPrepQlf[prepQ] != undefined && sltPrepQlf[prepQ] != "") {
                notaAlinhamentoPrepQlf += sltPrepQlf[prepQ]
            } else {
                notaAlinhamentoPrepQlf += arrGPrepQlf[prepQ]
            }
        }
        for (let result = 1; result < arrGResult.length; result++) {
            if (sltResult[result] != undefined && sltResult[result] != "") {
                notaAlinhamentoResult += sltResult[result]
            } else {
                notaAlinhamentoResult += arrGResult[result]
            }
        }
        let notaAlinhamento = notaAlinhamentoComp + notaAlinhamentoPrepQlf + notaAlinhamentoResult
        let notaFinal = Number((notaAlinhamento / 300) * 100).toFixed(1)
        $("#notaGeral").text("Nota Final: " + notaFinal + "%")
        // EXIBIR NOTAS
        $("#notas").show()
        $("#notaComp strong").text(Number((notaComp).toFixed(1)))
        $("#notaPrep strong").text(Number((notaPrepQlf).toFixed(1)))
        $("#notaResult strong").text(Number((notaResult).toFixed(1)))
        $("#notaGComp strong").text(Number((notaGComp).toFixed(1)))
        $("#notaGPrep strong").text(Number((notaGPrepQlf).toFixed(1)))
        $("#notaGResult strong").text(Number((notaGResult).toFixed(1)))
        $("#notaLideranca").hide()
        $('[data-toggle="tooltip"]').tooltip()
    } else {
        $("#compGtcompG input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlP_comp_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el0 = $("<span/>").addClass("control_01").text($(this).val())
                    $(el0).append(icon)
                    $("#th_compG_" + index).append(el0)
                    $("#avlPG_compG_" + index).show()
                    notaGestorComp += 0;
                    break;
                case "Ruim":
                    var icon = $("<a data-toggle='tooltip' data-placement='right' title='" + $("#avlP_comp_" + index + "_txt").val() + "'> <i class='bi bi-patch-question'></i></a>")
                    let el1 = $("<span/>").addClass("control_02").text($(this).val())
                    $(el1).append(icon)
                    $("#th_compG_" + index).append(el1)
                    $("#avlPG_compG_" + index).show()
                    notaGestorComp += 0.6;
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val())
                    $("#th_compG_" + index).append(el2)
                    $("#avlPG_compG_" + index).hide()
                    notaGestorComp += 2.6;
                    break;
                case "Bom":
                    let el3 = $("<span/>").addClass("control_04").text($(this).val())
                    $("#th_compG_" + index).append(el3)
                    $("#avlPG_compG_" + index).hide()
                    notaGestorComp += 4.6;
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val())
                    $("#th_compG_" + index).append(el4)
                    $("#avlPG_compG_" + index).hide()
                    notaGestorComp += 6.6;
                    break;
            }
        });
        $("#prepQlfG input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    let el0 = $("<span/>").addClass("control_01").text($(this).val())
                    notaGestorPrepQlf += 0;
                    $("#th_prepQlfG_" + index).append(el0)
                    $("#avlPG_prepQlfG_" + index).show()
                    break;
                case "Ruim":
                    let el1 = $("<span/>").addClass("control_02").text($(this).val())
                    notaGestorPrepQlf += 2.2;
                    $("#th_prepQlfG_" + index).append(el1)
                    $("#avlPG_prepQlfG_" + index).show()
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val())
                    notaGestorPrepQlf += 6.2;
                    $("#th_prepQlfG_" + index).append(el2)
                    $("#avlPG_prepQlfG_" + index).hide()
                    break;
                case "Bom":
                    let el3 = $("<span/>").addClass("control_04").text($(this).val())
                    notaGestorPrepQlf += 10.4;
                    $("#th_prepQlfG_" + index).append(el3)
                    $("#avlPG_prepQlfG_" + index).hide()
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val())
                    notaGestorPrepQlf += 16.6;
                    $("#th_prepQlfG_" + index).append(el4)
                    $("#avlPG_prepQlfG_" + index).hide()
                    break;
            }
        });
        $("#resultG input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    let el0 = $("<span/>").addClass("control_01").text($(this).val())
                    $("#avlPG_resultG_" + index).show()
                    $("#th_resultG_" + index).append(el0)
                    $("#avlPG_resultG_" + index).hide()
                    notaGestorResult += 0;
                    break;
                case "Ruim":
                    let el1 = $("<span/>").addClass("control_02").text($(this).val())
                    $("#avlPG_resultG_" + index).show()
                    $("#th_resultG_" + index).append(el1)
                    $("#avlPG_resultG_" + index).hide()
                    notaGestorResult += 3.3;
                    break;
                case "Regular":
                    let el2 = $("<span/>").addClass("control_03").text($(this).val())
                    $("#avlPG_resultG_" + index).hide()
                    $("#th_resultG_" + index).append(el2)
                    $("#avlPG_resultG_" + index).hide()
                    notaGestorResult += 13.3;
                    break;
                case "Bom":
                    let el3 = $("<span/>").addClass("control_04").text($(this).val())
                    $("#avlPG_resultG_" + index).hide()
                    $("#th_resultG_" + index).append(el3)
                    $("#avlPG_resultG_" + index).hide()
                    notaGestorResult += 23.3;
                    break;
                case "Ótimo":
                    let el4 = $("<span/>").addClass("control_05").text($(this).val())
                    $("#avlPG_resultG_" + index).hide()
                    $("#th_resultG_" + index).append(el4)
                    $("#avlPG_resultG_" + index).hide()
                    notaGestorResult += 33.3;
                    break;
            }
        });
        $("#lider input:checked").each(function (index) {
            index += 1
            switch ($(this).val()) {
                case "Péssimo":
                    $("#avlPG_lider_" + index).show()
                    notaGestorLider += 0;
                    break;
                case "Ruim":
                    $("#avlPG_lider_" + index).show()
                    notaGestorLider += 0.1;
                    break;
                case "Regular":
                    $("#avlPG_lider_" + index).hide()
                    notaGestorLider += 4.1;
                    break;
                case "Bom":
                    $("#avlPG_lider_" + index).hide()
                    notaGestorLider += 8.1;
                    break;
                case "Ótimo":
                    $("#avlPG_lider_" + index).hide()
                    notaGestorLider += 11.1;
                    break;
            }
        });
        $("#notas").show()
        $("#notaComp strong").text(Number(notaGestorComp.toFixed(1)))
        $("#notaPrep strong").text(Number(notaGestorPrepQlf.toFixed(1)))
        $("#notaResult strong").text(Number(notaGestorResult.toFixed(1)))
        $("#notaLideranca strong").text(Number(notaGestorLider.toFixed(1)))
    }
});