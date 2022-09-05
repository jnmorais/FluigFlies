$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType:"json",
        // url: "https://interconstrutora136608.fluig.cloudtotvs.com.br/process-management/api/v2/requests/"+item.id,
        // url: "https://interconstrutora136393.fluig.cloudtotvs.com.br/api/public/2.0/workflows/findActiveTasks/"+item.id,
        url: "https://interconstrutora136393.fluig.cloudtotvs.com.br/api/public/ecm/dataset/search?datasetId=005",
        success: function (response) {
            // let val = response.content.find(o => o.solicitacao === solicitacao)
            $.each(response.content, function (index, value) {
                if(response.content[index].status == 1 || response.content[index].status == 2){
                    $("<option></option>", {
                        value: response.content[index].solicitacao,
                        text: response.content[index].solicitacao
                    }).appendTo("#slt_terreno");
                }
            });
        }
    });
    $("#slt_terreno").change(function (e) {
        let solicitacao = $(this).val()
        e.preventDefault();
        $.ajax({
            type: "GET",
            dataType:"json",
            url: "https://interconstrutora136393.fluig.cloudtotvs.com.br/api/public/ecm/dataset/search?datasetId=005",
            success: function (response) {
                let val = response.content.find(o => o.solicitacao == solicitacao)
                if(val){
                    $("#nm_terreno").text(val.nmcl_terreno)
                    $("#end_terreno").text(val.nn_endereco)
                }else{
                    FLUIGC.toast({title: 'Erro ao obter terreno',message: 'Não foi possível obter os dados do terreno selecionado!',type: 'danger'});
                }
            }
        });
    });
});