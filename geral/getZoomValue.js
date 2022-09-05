function setSelectedZoomItem(item) {
    if (item.inputId == "cod_terreno") {
        $.ajax({
            type: "GET",
            // url: "https://interconstrutora136608.fluig.cloudtotvs.com.br/process-management/api/v2/requests/"+item.id,
            url: "https://interconstrutora136393.fluig.cloudtotvs.com.br/api/public/2.0/workflows/findActiveTasks/"+item.id,
            success: function (response) {
                let terreno = ""
                response.content.formValues.nmcl_terreno == "" ? terreno = response.content.formValues.nn_terreno : terreno = response.content.formValues.nmcl_terreno
                $("#nm_terreno").text(terreno)
                $("#end_terreno").text(response.content.formValues.nn_endereco)
            },error: function (request, status, error) {
                $("#nm_terreno, #end_terreno").text('')
                FLUIGC.toast({title: 'Erro ao obter terreno',message: 'Não foi possível obter os dados do terreno selecionado!',type: 'danger'});
            }
        });
    }
}