//ADICIONA LINHAS A TABELAS
function addNewRow(event) {
    try {
        const tablename = $(event).attr("data-table")
        const id_anexo = generator(5)
        const indice = wdkAddChild(tablename)
        $("#" + tablename + `_Codigo___${indice}`).val(id_anexo).prop("readonly", true)
        const idHidden = $("#" + tablename + `_vl___${indice}`).attr('data-info')
        $("#" + tablename + `_vl___${indice}`).val(`${idHidden}_${id_anexo}`)
        tableLineCount(tablename)
    } catch (e) {
        console.error("Houve um erro inesperado na função addNewRow")
        console.error(e)
    }
}
//REMOVE LINHAS DA TABELAS
function destroyRow(event) {
    try {
        const tabela = $(event).closest('table')[0]
        const tablename = tabela.getAttribute("tablename")
        // const tablename = $(event).attr("data-table")
        const indice = getIndice($(event).closest('tr').find("input")[0].id)
        const codigo = $("#" + tablename + `_Codigo___${indice}`).val() || "Código em branco"
        const inputFileName = $(event).closest('tr').find(".inputAnexo").val()
        const inputFileDesc = $(event).closest('tr').find(".descAnexo").val()
        FLUIGC.message.confirm({
            message: `Deseja remover o Anexo de código <b>${codigo}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                fnWdkRemoveChild(event)
                if (inputFileName && inputFileDesc) {
                    removeFile(inputFileDesc)
                }
                tableLineCount(tablename)
            }
        })
    } catch (e) {
        console.error("Houve um erro inesperado na função destroyRow")
        console.error(e)
    }
}
function getIndice(id) {
    return id.split('___').pop();
}
function tableLineCount(tablename) {
    try {
        let atributo = "[tablename]";
        if (tablename) {
            atributo = `[tablename='${tablename}']`
        }
        $.each($(atributo), function (index) {
            const tabelaRow = $(this).find('tbody tr').not(':first');
            tabelaRow.each(function (i) {
                tabelaRow.eq(i).find('td.count').html(`<span>${i + 1}</span>`);
            });
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função tableLineCount")
        console.error(e)
    }
}
function generator(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}