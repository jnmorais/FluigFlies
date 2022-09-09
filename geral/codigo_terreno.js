$(document).ready(function () {
    let url_prod = "https://interconstrutora136393.fluig.cloudtotvs.com.br/api/public/ecm/dataset/search?datasetId=005"
    let url_homg = "https://interconstrutora136608.fluig.cloudtotvs.com.br/api/public/ecm/dataset/search?datasetId=ds_consultaprospeccao"
    let url_base = window.location.href
    let url_dataset = ""

    if (url_base.match("136393")) {
        url_dataset = url_prod
    } else {
        url_dataset = url_homg
    }
    if (ATV == 0 || ATV == 1) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url_dataset,
            success: function (response) {
                // let val = response.content.find(o => o.solicitacao === solicitacao)
                $.each(response.content, function (index, value) {
                    if (response.content[index].status == 1 || response.content[index].status == 2) {
                        $("<option></option>", {
                            value: response.content[index].solicitacao,
                            text: "Terreno referente a solicitação Nº: " + response.content[index].solicitacao
                        }).appendTo("#slt_terreno");
                    }
                });
            }
        });
    }
    $("#slt_terreno").click(function (e) {
        let solicitacao = $(this).val()
        e.preventDefault();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url_dataset,
            success: function (response) {
                let val = response.content.find(o => o.solicitacao == solicitacao)
                if (val) {
                    $("#nm_terreno").text(val.nmcl_terreno)
                    $("#nm_terreno").val(val.nmcl_terreno)
                    $("#end_terreno").text(val.nn_endereco)
                    $("#end_terreno").val(val.nn_endereco)
                } else {
                    FLUIGC.toast({ title: 'Erro ao obter terreno', message: 'Não foi possível obter os dados do terreno selecionado!', type: 'danger' });
                }
            }
        });
    });
});