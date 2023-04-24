$(document).ready(function () {
    if (ATV) {
        // Serviço especializado
        show_on_click("rd_tp_servico", "Serviço especializado", null, "div_tblServEspczld")
        hide_on_load("rd_tp_servico", "Serviço especializado", null, "div_tblServEspczld")
        // Empreitada
        show_on_click("rd_tp_servico", "Empreitada", null, "div_Empreitada")
        hide_on_load("rd_tp_servico", "Empreitada", null, "div_Empreitada")
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