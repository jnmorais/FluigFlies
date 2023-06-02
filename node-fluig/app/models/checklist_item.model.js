const sql = require("./db.js");
// constructor
const Checklist_item = function (checklist) {
    this.id_checklist = checklist.id_checklist;
    this.item_nome = checklist.item_nome;
    this.item_descricao = checklist.item_descricao;
    this.item_dica = checklist.item_dica;
    this.item_tipo = checklist.item_tipo;
    this.item_formato = checklist.item_formato;
    this.item_obrigatorio = checklist.item_obrigatorio;
    this.item_tipo_avaliacao = checklist.item_tipo_avaliacao;
    this.arrItensAvaliacao = checklist.arrItensAvaliacao;
    this.item_complemento = checklist.item_complemento;
    this.item_peso = checklist.item_peso;
    this.area_nome = checklist.area_nome;
};
// Adiciona os itens
Checklist_item.create = (newChecklist_item, result) => {
    sql.query("INSERT INTO checklist_item SET  ?", newChecklist_item, (err, res) => {
        if (err) {
            // result(err, null);
            return;
        }
        // result(null, { id: res.insertId, ...newChecklist_item });
    });
    return;
};
// Remove o item pelo id
Checklist_item.remove = (id, result) => {
    sql.query("DELETE FROM checklist_item WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            // result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Checklist with the id
            // result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted checklist with id: ", id);
        // result(null, res);
    });
    return;
    // .end();
};
// Busca todos os itens pelo Id do checklist pai
Checklist_item.findById = (id, result) => {
    sql.query(`SELECT * FROM checklist_item WHERE id_checklist = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            // result(err, null);
            return;
        }
        if (res.length) {
            console.log("found checklist: ", res[0]);
            // result(null, res);
            return;
        }
        // not found Checklist with the id
        // result({ kind: "not_found" }, null);
    });
    return;
    // .end();
};
// Atualiza itens do checklist
Checklist_item.updateById = (id, checklist, result) => {
    sql.query(
        "UPDATE checklist_item SET item_nome = ?, item_descricao = ?, item_dica = ?, item_tipo = ?, item_formato = ? WHERE id = ?",
        [checklist.item_nome, checklist.item_descricao, checklist.item_dica, checklist.item_tipo, checklist.item_formato, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                // result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Checklist with the id
                // result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated checklist: ", { id: id, ...checklist });
            // result(null, { id: id, ...checklist });
        });
    return;
};
module.exports = Checklist_item;