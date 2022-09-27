$(document).ready(function () {
    // Controla página inicial Avaliação
    // $(".fluig-style-guide").hide()
    $("#avaliacao_iniciar").show('1000')
    $('[data-toggle="tooltip"]').tooltip()
    $(".select2").select2()
    $("#title").text($("#titulo").val())
    $("#year").text(new Date().toLocaleDateString().split("/")[2])
    ATV == 0 || ATV == 1 || ATV == 2 ? $("#toasts").hide() : false
    ATV == "null" || FM == "VIEW" ? $("#buttons").hide() : false
    ATV == "null" && FM == "VIEW" && $("#vrf_gestor").val() == "gestor" ? $("#avaliacao_geral,#avl_colab").hide() : false
    $("#toast_AA_Btn").click(function (e) {
        e.preventDefault();
        const toast = new bootstrap.Toast($("#toastAA"))
        $(".toastAA").css("z-index", "999")
        toast.show()
    });
    $("#toast_G_Btn").click(function (e) {
        e.preventDefault();
        const toast = new bootstrap.Toast($("#toastG"))
        $(".toastG").css("z-index", "999")
        toast.show()
    });
    $("#toast_RH_Btn").click(function (e) {
        e.preventDefault();
        const toast = new bootstrap.Toast($("#toastRH"))
        $(".toastRH").css("z-index", "999")
        toast.show()
    });
    $("#toast_Nota").click(function (e) {
        e.preventDefault();
        const toast = new bootstrap.Toast($("#toastNota"))
        $(".toastNota").css("z-index", "999")
        toast.show()
    });
    if (ATV <= 39 || ATV == "null") {
        var radioHide = ["avlP_comp_1", "avlP_comp_2", "avlP_comp_3", "avlP_comp_4", "avlP_comp_5", "avlP_comp_6", "avlP_comp_7", "avlP_comp_8", "avlP_comp_9", "avlP_comp_10", "avlP_comp_11", "avlP_comp_12", "avlP_comp_13", "avlP_comp_14", "avlP_comp_15", "avlP_prepQlf_1", "avlP_prepQlf_2", "avlP_prepQlf_3", "avlP_prepQlf_4", "avlP_prepQlf_5", "avlP_prepQlf_6", "avlP_prepQlf_7", "avlP_result_1", "avlP_result_2", "avlP_result_3", "avlPG_compG_1", "avlPG_compG_2", "avlPG_compG_3", "avlPG_compG_4", "avlPG_compG_5", "avlPG_compG_6", "avlPG_compG_7", "avlPG_compG_8", "avlPG_compG_9", "avlPG_compG_10", "avlPG_compG_11", "avlPG_compG_12", "avlPG_compG_13", "avlPG_compG_14", "avlPG_compG_15", "avlPG_prepQlfG_1", "avlPG_prepQlfG_2", "avlPG_prepQlfG_3", "avlPG_prepQlfG_4", "avlPG_prepQlfG_5", "avlPG_prepQlfG_6", "avlPG_prepQlfG_7", "avlPG_resultG_1", "avlPG_resultG_2", "avlPG_resultG_3", "avlPG_lider_1", "avlPG_lider_2", "avlPG_lider_3", "avlPG_lider_4", "avlPG_lider_5", "avlPG_lider_6", "avlPG_lider_7", "avlPG_lider_8", "avlPG_lider_9"]
        for (var xxx = 0; xxx < radioHide.length; xxx++) {
            $("#" + radioHide[xxx]).hide()
        }
    }
    if (ATV == 0 || ATV == 1 || ATV == 2) {
        let counter = 0;
        setInterval(() => {
            counter++;
            $("#tempoGestor").val(counter)
            counter < 60 ? $("#showTime2 strong").text(" " + counter + "s") : false
            counter % 60 == 0 ? $("#showTime2 strong").text(" " + Number((counter / 60).toFixed(1)) + " min") : false
        }, 1000);
        $("#showTime").show()
    }
    if (ATV >= 59 || ATV == "null") {
        if ($("#tempoColab").val()) {
            if ($("#tempoColab").val() > 60) {
                var tempo = parseFloat($("#tempoColab").val()) / 60
                $("#showTime2 strong").text(Number((tempo).toFixed(1)) + " minutos")
            } else {
                $("#showTime2 strong").text($("#tempoColab").val() + " segundos")
            }
            $("#showTime").show()
        } else if ($("#tempoGestor").val()) {
            if ($("#tempoGestor").val() > 60) {
                var tempo = parseFloat($("#tempoGestor").val()) / 60
                $("#showTime2 strong").text(Number((tempo).toFixed(1)) + " minutos")
            } else {
                $("#showTime2 strong").text($("#tempoGestor").val() + " segundos")
            }
            $("#showTime").show()
        }
    }
    $('.collapsed').collapse()
    // CONTROLA EXB SELECTED
    for (var x = 1; x <= 15; x++) {
        $("#slt_compR_" + x + " option:selected").val() == "Péssimo" ? $("#slt_compR_" + x).css({ "background": "#EB1D36", "color": "#fff" }) : false
        $("#slt_compR_" + x + " option:selected").val() == "Ruim" ? $("#slt_compR_" + x).css({ "background": "#ED7D3A", "color": "#fff" }) : false
        $("#slt_compR_" + x + " option:selected").val() == "Regular" ? $("#slt_compR_" + x).css("background", "#EBD671") : false
        $("#slt_compR_" + x + " option:selected").val() == "Bom" ? $("#slt_compR_" + x).css({ "background": "#6FB2D2", "color": "#fff" }) : false
        $("#slt_compR_" + x + " option:selected").val() == "Ótimo" ? $("#slt_compR_" + x).css({ "background": "#85C88A", "color": "#fff" }) : false
    }
    for (var x = 1; x <= 6; x++) {
        $("#slt_prepQlfR_" + x + " option:selected").val() == "Péssimo" ? $("#slt_prepQlfR_" + x).css({ "background": "#EB1D36", "color": "#fff" }) : false
        $("#slt_prepQlfR_" + x + " option:selected").val() == "Ruim" ? $("#slt_prepQlfR_" + x).css({ "background": "#ED7D3A", "color": "#fff" }) : false
        $("#slt_prepQlfR_" + x + " option:selected").val() == "Regular" ? $("#slt_prepQlfR_" + x).css("background", "#EBD671") : false
        $("#slt_prepQlfR_" + x + " option:selected").val() == "Bom" ? $("#slt_prepQlfR_" + x).css({ "background": "#6FB2D2", "color": "#fff" }) : false
        $("#slt_prepQlfR_" + x + " option:selected").val() == "Ótimo" ? $("#slt_prepQlfR_" + x).css({ "background": "#85C88A", "color": "#fff" }) : false
    }
    for (var x = 1; x <= 3; x++) {
        $("#slt_resultR_" + x + " option:selected").val() == "Péssimo" ? $("#slt_resultR_" + x).css({ "background": "#EB1D36", "color": "#fff" }) : false
        $("#slt_resultR_" + x + " option:selected").val() == "Ruim" ? $("#slt_resultR_" + x).css({ "background": "#ED7D3A", "color": "#fff" }) : false
        $("#slt_resultR_" + x + " option:selected").val() == "Regular" ? $("#slt_resultR_" + x).css("background", "#EBD671") : false
        $("#slt_resultR_" + x + " option:selected").val() == "Bom" ? $("#slt_resultR_" + x).css({ "background": "#6FB2D2", "color": "#fff" }) : false
        $("#slt_resultR_" + x + " option:selected").val() == "Ótimo" ? $("#slt_resultR_" + x).css({ "background": "#85C88A", "color": "#fff" }) : false
    }

    if (ATV == 83 || ATV == 59 || ATV == 67) {
        $("#avaliacao_iniciar").show('1000')
    } else {
        $("#avaliacao_iniciar").show('1000')
        // Oculta a barra do Fluig
        // setInterval(() => {
        //     window.parent.$("#workflowview-header").hide()
        //     window.parent.$("#breadcrumb").hide()
        //     window.parent.$("#breadcrumb").prop("style", "z-index:-1")
        //     $("body").css("padding-top", "0px")
        // }, 1);
    }
});