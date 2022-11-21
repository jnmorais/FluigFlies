// Controla o click do botao enviar
$(".btnAction").click(function () {
    // e.preventDefault();
    var comptCalc_colab = [];
    var prepQlfCalc_colab = [];
    var resultCalc_colab = [];
    var cont = 0;
    // $("input[name$='dataSolicitacao']").val() == "" || $("input[name$='dataSolicitacao']").val() == undefined ? $("input[name$='dataSolicitacao']").css("border"," solid #f00") : cont++;
    // $("#gestorColabCod").find(":selected").val() == "" || $("#gestorColabCod").find(":selected").val() == undefined ? $("select[name$='gestorColabCod']").css("border"," solid #f00") : cont++;
    // $("input[name$='nomeColab']").val() == "" || $("input[name$='nomeColab']").val() == undefined ? $("input[name$='nomeColab']").css("border"," solid #f00") : cont++;
    // $("input[name$='emailColab']").val() == "" || $("input[name$='emailColab']").val() == undefined ? $("input[name$='emailColab']").css("border"," solid #f00") : cont++;
    // $("input[name$='cargoColab']").val() == "" || $("input[name$='cargoColab']").val() == undefined ? $("input[name$='cargoColab']").css("border"," solid #f00") : cont++;
    for (let x = 1; x <= 15; x++) {
        comptCalc_colab[x] = $("input[name$='compG_" + x + "']:checked").val();
        comptCalc_colab[x] == "" || comptCalc_colab[x] == undefined ? $("#compG_" + x).addClass("atentionEff") : cont++;
    }
    for (let y = 1; y <= 6; y++) {
        prepQlfCalc_colab[y] = $("input[name$='prepQlfG_" + y + "']:checked").val()
        prepQlfCalc_colab[y] == "" || prepQlfCalc_colab[y] == undefined ? $("#prepQlfG_" + y).addClass("atentionEff") : cont++;
    }
    for (let z = 1; z <= 3; z++) {
        resultCalc_colab[z] = $("input[name$='resultG_" + z + "']:checked").val()
        resultCalc_colab[z] == "" || resultCalc_colab[z] == undefined ? $("#resultG_" + z).addClass("atentionEff") : cont++;
    }
    if (cont == 24) {
        $(this).attr("id") == "enviar" ? parent.document.querySelector("#workflow-detail-card > div > div > button:nth-child(1)").click()
            : parent.document.querySelector("#optionList > li:nth-child(2) > a").click()
    } else {
        alert("Existem campos não preenchidos!")
    }
});
$("input").on('change', function () {
    let div_id = $(this).attr('name')
    $("#" + div_id).hasClass("atentionEff") ? $("#" + div_id).removeClass("atentionEff") : false
    $("#" + div_id).hasClass("atentionBrd") ? $("#" + div_id).removeClass("atentionBrd") : false
});
// Controla o click do botão avançar item
$(".av").click(function () {
    let div = $(this).attr("attr-id")
    let limit = document.getElementById(div).childElementCount;
    let element = $("#" + div + " .active").attr("id")
    let name = element.split("_")[0]
    let id = parseInt(element.split("_")[1]) + 1
    let atual_radio = $("input[name$='" + element + "']:checked").val()
    if (atual_radio != undefined) {
        if (id <= limit) {
            $("#" + element).removeClass("atentionEff")
            let nextElement = name + "_" + id
            $("#tarefa_" + div).text("Item: " + id + "/" + limit)
            $("#" + element).removeClass("active").addClass("desative")
            $("#" + nextElement + " .desative") ? $("#" + nextElement).removeClass("desative").addClass("active") : false
        }
        if (id == limit) {
            $(this).hide()
        }
    } else {
        setTimeout(function () {
            $("#" + element).addClass("atentionEff")
        }, 100);
    }
});
// Controla o click do botão voltar item
$(".vlt").click(function () {
    let div = $(this).attr("attr-id")
    let limit = document.getElementById(div).childElementCount
    let element = $("#" + div + " .active").attr("id")
    let name = element.split("_")[0]
    let id = parseInt(element.split("_")[1]) - 1
    let hidden = $("#" + div).find(":hidden")
    if (id > 0) {
        $(".nav-" + div).find(":hidden").show()
        let nextElement = name + "_" + id
        $("#tarefa_" + div).text("Item: " + id + "/" + limit)
        $("#" + element).removeClass("active").addClass("desative")
        $("#" + nextElement + " .desative") ? $("#" + nextElement).removeClass("desative").addClass("active") : false
    }
});
// AVALIACAO PESSIMO\RUIM
$($("input:radio")).click(function () {
    if ($(this).hasClass("control_01") || $(this).hasClass("control_02")) {
        $("#avlPG_" + $(this).attr("name")).is(":hidden") ? $("#avlPG_" + $(this).attr("name")).show() : false
    } else {
        if ($("#avlPG_" + $(this).attr("name")).is(":visible")) {
            $("#avlPG_" + $(this).attr("name")).hide()
            $("#avlPG_" + $(this).attr("name") + " textarea").text('')
            $("#avlPG_" + $(this).attr("name") + " textarea").val('')
        }
    }
});