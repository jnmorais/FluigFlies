$(document).ready(function () {
  $("div[id^='avlPG_']").hide()
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
    let pos = element.split("_")[1]
    let id = parseInt(element.split("_")[2])
    let nextId = id + 1
    let atual_radio = $("input[name$='" + element + "']:checked").val()
    if (atual_radio != undefined) {
        if (nextId <= limit) {
            $("#" + element).removeClass("atentionEff")
            let nextElement = name + "_" + pos + "_" + nextId
            $("#tarefa_" + div).text("Item: " + nextId + "/" + limit)
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
    let pos = element.split("_")[1]
    let id = parseInt(element.split("_")[2])
    let prevId = id - 1
    let hidden = $("#" + div).find(":hidden")
    if (prevId > 0) {
        $(".nav-" + div).find(":hidden").show()
        let prevElement = name + "_" + pos + "_" + prevId
        $("#tarefa_" + div).text("Item: " + prevId + "/" + limit)
        $("#" + element).removeClass("active").addClass("desative")
        $("#" + prevElement + " .desative") ? $("#" + prevElement).removeClass("desative").addClass("active") : false
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
// Controlar navegacao de gestores
$(".av_pnl").click(function () {
  let div = $(this).attr("attr-id")
  let element = $("." + div + ".active").attr("id")
  let id = parseInt(element.split("_")[2].split("g")[1])
  let nextId = id + 1
  let name = "avl_pnl_g"
  let limit = 11
  if (nextId <= limit) {
    let nextElement = name + nextId
    $("#tarefa_" + div).text("Item: " + nextId + "/" + limit)
    $("#" + element).removeClass("active").addClass("desative")
    $("#" + nextElement + " .desative") ? $("#" + nextElement).removeClass("desative").addClass("active") : false
  }
});
// Controlar navegacao de gestores
$(".vlt_pnl").click(function () {
  let div = $(this).attr("attr-id")
  let element = $("." + div + ".active").attr("id")
  let id = parseInt(element.split("_")[2].split("g")[1])
  let prevId = id - 1
  let name = "avl_pnl_g"
  let limit = 11
  if (prevId > 0) {
    let prevElement = name + prevId
    $("#tarefa_" + div).text("Item: " + prevId + "/" + limit)
    $("#" + element).removeClass("active").addClass("desative")
    $("#" + prevElement + " .desative") ? $("#" + prevElement).removeClass("desative").addClass("active") : false
  }
});