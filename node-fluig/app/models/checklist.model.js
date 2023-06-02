const sql = require("./db.js");
// constructor
const Checklist = function (checklist) {
    this.chk_nome = checklist.chk_nome;
    this.chk_descricao = checklist.chk_descricao;
};
// CONSTRUCTOR CONFIGS
const Config = function (config) {
    this.empreendimento = config.empreendimento
    this.cep = config.cep
    this.estado = config.estado
    this.cidade = config.cidade
    this.endereco = config.endereco
    this.numero = config.numero
    this.complemento = config.complemento
};
// Construtor unidade
const Unidade = function (unidade) {
    this.id_empreendimento = unidade.id_empreendimento
    this.unidade = unidade.unidade
}
// Construtor assoc unidade-checklist
const AssocChk = function (assocChk) {
    this.id_unidade = assocChk.id_unidade
    this.id_checklist = assocChk.id_checklist
}
// Operações do checklist
Checklist.create = (newChecklist, result) => {
    sql.query("INSERT INTO checklist SET  ?", newChecklist, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created checklist: ", { id: res.insertId, ...newChecklist });
        result(null, { id: res.insertId, ...newChecklist });
    });
    return;
};
Checklist.findById = (id, result) => {
    sql.query(`SELECT * FROM checklist chk JOIN checklist_item chkI ON chkI.id_checklist = chk.id WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found checklist: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Checklist with the id
        result({ kind: "not_found" }, null);
    });
    return;
};
Checklist.getAll = (req, result) => {
    let query = "SELECT * FROM checklist";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("checklist: ", res);
        result(null, res);
    });
    return;
};
Checklist.getChecklists = (req, result) => {
    let query = "SELECT * FROM checklist chk LEFT JOIN checklist_item chkI ON chk.id = chkI.id_checklist";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("checklist: ", res);
        result(null, res);
    });
    return;
};
Checklist.updateById = (id, checklist, result) => {
    sql.query(
        "UPDATE checklist SET chk_nome = ?, chk_descricao = ? WHERE id = ?",
        [checklist.chk_nome, checklist.chk_descricao, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Checklist with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated checklist: ", { id: id, ...checklist });
            result(null, { id: id, ...checklist });
        });
    return;
};
Checklist.remove = (id, result) => {
    sql.query("DELETE FROM checklist WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Checklist with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted checklist with id: ", id);
        result(null, res);
    });
    return;
};
// CONFIGURACOES
Checklist.createConfig = (newConfig, result) => {
    sql.query("INSERT INTO checklist_empreendimentos SET  ?", newConfig, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created unidade: ", { id: res.insertId, ...newConfig });
        result(null, { id: res.insertId, ...newConfig });
    });
    return;
};
Checklist.createUnidade = (newUnidade, result) => {
    sql.query("INSERT INTO checklist_unidades SET  ?", newUnidade, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created unidade: ", { id: res.insertId, ...newUnidade });
        result(null, { id: res.insertId, ...newUnidade });
    });
    return;
};
// Unidades
Checklist.getAllUnidades = (req, result) => {
    let query = "SELECT id, unidade FROM checklist_unidades";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("checklist: ", res);
        result(null, res);
    });
    return;
};
Checklist.getUnidadesByEmp = (id_empreendimento, result) => {
    sql.query("SELECT id,unidade FROM checklist_unidades WHERE id_empreendimento = ?", id_empreendimento, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("checklist: ", res);
        result(null, res);
    });
    return;
};
// Associa unidade ao checklist
Checklist.createAsscChk = (newAssocChk, result) => {
    sql.query("INSERT INTO assc_chk_unidade SET  ?", newAssocChk, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created unidade: ", { id: res.insertId, ...newAssocChk });
        result(null, { id: res.insertId, ...newAssocChk });
    });
    return;
};
// Busca associacao checklist unidade
Checklist.getAsscChk = (id_unidade, result) => {
    sql.query(`SELECT chk.id, chk.chk_nome FROM checklist.assc_chk_unidade asscChkUnd JOIN checklist chk ON chk.id = asscChkUnd.id_checklist WHERE ID_UNIDADE = ${id_unidade}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("checklist: ", res);
        result(null, res);
    });
    return;
};
// Busca Empreendimentos
Checklist.getAllEmpreendimetos = (req, result) => {
    let query = "SELECT id, empreendimento FROM checklist_empreendimentos";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("checklist: ", res);
        result(null, res);
    });
    return;
};
module.exports = { Checklist, Config, Unidade, AssocChk };