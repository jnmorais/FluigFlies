function inserirMascaraContato(campo) {
	let indice = campo.id.split("___")[1];
	$("#vlr_contatoF___" + indice).val("");
	if (campo.value === "Celular") {
		$("#vlr_contatoF___" + indice).mask("(00) 90000-0000");
	} else if (campo.value === "Comercial") {
		$("#vlr_contatoF___" + indice).mask("(00) 0000-0000");
	} else {
		$("#vlr_contatoF___" + indice).unmask();
	}
}
function actionSolc(opt) {
	if (opt == 'Enviar') {
		parent.document.querySelector("#workflow-detail-card > div > div > button:nth-child(1)").click()
	} else if (opt == 'Salvar') {
		parent.document.querySelector("#optionList > li:nth-child(2) > a").click()
	}
}
// let vlr_ocioso = 0;
// function getOcioso(campo){
// 	var clicked = $(campo).find("input:checked").val()
// 	var vlr_und = $("input[name$='vlr_und']").val()
// 	var control_qntd = $("input[name$='control_qntd']").val()
// 	if(clicked == "Ocioso"){
// 		vlr_ocioso +=  parseFloat((((vlr_und/30)*control_qntd) + $("input[name$='calc_ocioso']").val()))
// 		$("input[name$='calc_ocioso']").val(vlr_ocioso.toFixed(2));
// 	}else{
// 		vlr_ocioso -=  parseFloat((((vlr_und/30)*control_qntd) - $("input[name$='calc_ocioso']").val()))
// 		$("input[name$='calc_ocioso']").val(vlr_ocioso.toFixed(2));
// 	}
// }
function setLimit(campo) {
	$("input[name$='qnt_dev']").attr("max", $(campo).val());
	$("input[name$='qnt_vgt']").attr("max", $(campo).val());
}
$(document).ready(function () {
	// FLUIGC.switcher.init('#qnt_forncd');
	// if(FM == "MOD"){
	// 	FLUIGC.richeditor('txt_observacoes_entrd');
	// 	FLUIGC.richeditor('txt_observacoes_dev');
	// }
    console.log("Página Carregada")
	$("thead").hide()
	$(".btnEqps,.btnContato,.btnFrncd,.btnDevEqps").click(function (e) {
		e.preventDefault();
		var lastClass = $(this).attr('class').split(' ').pop();
		$("[thc='" + lastClass + "']").show()
	});
	// FLUIGC.switcher.onChange("#qnt_forncd", function (event, state) {
	// 	if (state == false) {
	// 		$("#mu_frncd").hide(); $("#um_frncd").show();
	// 		$('#mu_frncd').find('input:text, textarea, select').each(function(){$(this).val('')})
	// 	} else {
	// 		$("#mu_frncd").show(); $("#um_frncd").hide();
	// 		$('#um_frncd').find('input:text, textarea, select').each(function(){$(this).val('')})
	// 	}
	// });
	// $("input[name$='qntSolctd'], input[name$='vlr_und']").change(function (e) {
	// 	e.preventDefault();
	// 	var vlr_und = $("input[name$='vlr_und']").val().replace(",",".");
	// 	var qntSolctd = $("input[name$='qntSolctd']").val();
	// 	var total = vlr_und * qntSolctd;
	// 	$("input[name$='vlr_total']").val(total.toFixed(2));
	// });
	if (FM == "VIEW" || FM == "NONE" || FM == "ADD" || FM == "MOD" || ATV > 5) {
		if (!$("input[name$='qnt_forncd']:checked").val()) {
			$("#um_frncd").hide();
			$("#mu_frncd").hide();
		} else if ($("input[name$='qnt_forncd']:checked").val() == "Não") {
			$("#um_frncd").show();
		} else {
			$("#mu_frncd").show();
		}
	}
	if (FM == "MOD" || FM == "ADD") {
		var btns = parent.document.querySelector("#workflow-detail-card > div")
		$(btns).hide()
		$("#speSolctd").select2();
		$.ajax({
			type: "GET",
			url: "https://experterp.com.br/inter/apiFluig/getSPE.php",
			dataType: "json",
			success: function (response) {
				$.each(response.data, function (index, value) {
					$("<option></option>", {
						value: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME,
						text: "(" + response.data[index].CODIGO + ") - " + response.data[index].NOME
					}).appendTo("#speSolctd");
				});
			},
			error: function (response) {
				$.each(response.data, function (index, value) {
					$("<option></option>", {
						value: "Erro ao carregar SPEs",
						text: "Erro ao carregar SPEs"
					}).appendTo("#speSolctd");
				});
			}
		});
	}
});