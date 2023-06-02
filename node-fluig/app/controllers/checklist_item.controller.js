const Checklist_item = require("../models/checklist_item.model.js");
// Create and Save a new Checklist_item
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Save Checklist_item in the database
    Checklist_item.create(checklist_item, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Checklist_item." });
        } else {
            // // Insere os campos do checklist_item
            let numCampos = req.body.contadorItens
            let id_checklist = data.id
            for (let pos = 1; pos <= numCampos; pos++) {
                // Junta os itens a serem avaliados
                req.body[`rd_avlTpNota_ruim_${pos}`] ? arrAvlTp.push({ rd_avlTpNota_ruim: req.body[`rd_avlTpNota_ruim_${pos}`] }) : false
                req.body[`rd_avlTpNota_regular_${pos}`] ? arrAvlTp.push({ rd_avlTpNota_regular: req.body[`rd_avlTpNota_regular_${pos}`] }) : false
                req.body[`rd_avlTpNota_bom_${pos}`] ? arrAvlTp.push({ rd_avlTpNota_bom: req.body[`rd_avlTpNota_bom_${pos}`] }) : false
                req.body[`rd_avlTpAvaliativo_n_${pos}`] ? arrAvlTp.push({ rd_avlTpAvaliativo_n: req.body[`rd_avlTpAvaliativo_n_${pos}`] }) : false
                req.body[`rd_avlTpAvaliativo_s_${pos}`] ? arrAvlTp.push({ rd_avlTpAvaliativo_s: req.body[`rd_avlTpAvaliativo_s_${pos}`] }) : false
                req.body[`rd_avlTpAvaliativo_na_${pos}`] ? arrAvlTp.push({ rd_avlTpAvaliativo_na: req.body[`rd_avlTpAvaliativo_na_${pos}`] }) : false
                // 
                req.body[`rd_complemento_comentario_${pos}`] ? arrcomplemento.push({ rd_complemento_comentario_: req.body[`rd_complemento_comentario_${pos}`] }) : false
                req.body[`rd_complemento_plnAcao_${pos}`] ? arrcomplemento.push({ rd_complemento_plnAcao_: req.body[`rd_complemento_plnAcao_${pos}`] }) : false
                req.body[`rd_complemento_anexos_${pos}`] ? arrcomplemento.push({ rd_complemento_anexos_: req.body[`rd_complemento_anexos_${pos}`] }) : false
                req.body[`rd_complemento_ass_${pos}`] ? arrcomplemento.push({ rd_complemento_ass_: req.body[`rd_complemento_ass_${pos}`] }) : false
                req.body[`rd_complemento_aplicavel_${pos}`] ? arrcomplemento.push({ rd_complemento_aplicavel_: req.body[`rd_complemento_aplicavel_${pos}`] }) : false
                // Create a Checklist_item
                const checklist_item = new Checklist_item({
                    id_checklist: id_checklist,
                    item_nome: req.body["item_nome_" + pos],
                    item_descricao: req.body["item_descricao_" + pos],
                    item_dica: req.body["item_dica_" + pos],
                    item_tipo: req.body["item_tipo_" + pos],
                    item_formato: req.body["item_formato_" + pos],
                    item_obrigatorio: req.body["item_obrigatorio_" + pos],
                    item_tipo_avaliacao: req.body["item_tpAvl_" + pos],
                    item_complemento: JSON.stringify(arrcomplemento),
                    arrItensAvaliacao: JSON.stringify(arrAvlTp),
                    item_peso: req.body["item_peso_" + pos],
                    area_nome: req.body["area_nome_desc_" + pos]
                });
                // Save Checklist_item in the database
                Checklist_item.create(checklist_item, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Checklist_item."
                        });
                    else res.status(200).send();
                });
            }
        }
    });
};
// Retrieve all Checklists Itens from the database (with condition).
exports.findAll = (req, res) => {
    Checklist_item.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Checklist_item with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Checklist_item with id " + req.params.id
                });
            }
        } else res.status(200).send();
    });
};
// Delete Itens
exports.delete = (req, res) => {
    Checklist_item.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Checklist_item with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Checklist_item with id " + req.params.id
                });
            }
        } else res.status(200).send();
    });
};
// Update a Checklist_item item identified by the id in the request
exports.update = (req, res) => {
    // // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Checklist_item.updateById(
        req.params.id,
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Checklist_item with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Checklist_item with id " + req.params.id
                    });
                }
            } else res.status(200).send();
        }
    );
};