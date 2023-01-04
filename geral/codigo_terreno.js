$(document).ready(function () {
    let url_prod = "https://meuinc136393.fluig.cloudtotvs.com.br/api/public/ecm/dataset/search?datasetId=009"
    let url_homg = "https://meuinc136608.fluig.cloudtotvs.com.br/api/public/ecm/dataset/search?datasetId=ds_consultaprospeccao"
    let url_base = window.location.href
    let url_dataset = ""

    if (url_base.match("136393")) {
        url_dataset = url_prod
    } else {
        url_dataset = url_homg
    }
    $("#slt_terreno").change(function (e) {
        let nmclTerreno = $(this + " option").val()
        e.preventDefault();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url_dataset,
            success: function (response) {
                let val = response.content.find(o => o.nmclTerreno == nmclTerreno)
                if (val) {
                    $("#txt_enderecoTrr").val(val.endereco)
                } else {
                    FLUIGC.toast({ title: 'Erro ao obter terreno', message: 'Não foi possível obter os dados do terreno selecionado!', type: 'danger' });
                }
            }
        });
    });
});