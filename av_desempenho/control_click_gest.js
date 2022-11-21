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