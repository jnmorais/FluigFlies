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
		parent.document.querySelector("#optionList > li:nth-child(2) > a").click();
	}
}
function setLimit(campo) {
	$("input[name$='qnt_dev']").attr("max", $(campo).val());
	$("input[name$='qnt_vgt']").attr("max", $(campo).val());
}
$(document).ready(function () {
	$("thead").hide()
	$(".btnEqps,.btnContato,.btnFrncd,.btnDevEqps").click(function (e) {
		e.preventDefault();
		var lastClass = $(this).attr('class').split(' ').pop();
		$("[thc='" + lastClass + "']").show()
	});
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
});