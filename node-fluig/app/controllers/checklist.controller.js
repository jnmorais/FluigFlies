const { Checklist, Config, Unidade, AssocChk } = require("../models/checklist.model.js");
const Checklist_item = require("../models/checklist_item.model.js");
// Create and Save a new Checklist
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Checklist
    const checklist = new Checklist({
        chk_nome: req.body.chk_nome,
        chk_descricao: req.body.chk_descricao
    });
    // Save Checklist in the database
    Checklist.create(checklist, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Checklist." });
        } else {
            // // Insere os campos do checklist
            let numCampos = req.body.contadorItens
            let numUnidades = req.body.chk_unidades.length
            let id_checklist = data.id
            // Cria os campos do checklist
            for (let pos = 1; pos <= numCampos; pos++) {
                var arrAvlTp = {
                    n_ruim: [],
                    na_regular: [],
                    s_bom: []
                };
                var arrComplemento = []
                // Junta os itens a serem avaliados
                if (req.body[`item_tipo_${pos}`] == "Avaliativo" && req.body[`item_tpAvl_${pos}`] == "Nota (Ruim/Reg/Bom)" ||
                    req.body[`item_tpAvl_${pos}`] == "Nota (Ruim/Bom)") {
                    req.body[`rd_avlTpNota_ruim_${pos}`] ? arrAvlTp.n_ruim.push(req.body[`rd_avlTpNota_ruim_${pos}`]) : false
                    req.body[`rd_avlTpNota_regular_${pos}`] ? arrAvlTp.na_regular.push(req.body[`rd_avlTpNota_regular_${pos}`]) : false
                    req.body[`rd_avlTpNota_bom_${pos}`] ? arrAvlTp.s_bom.push(req.body[`rd_avlTpNota_bom_${pos}`]) : false
                } else if (req.body[`item_tipo_${pos}`] == "Avaliativo" && req.body[`item_tpAvl_${pos}`] == "Opinião (Não/Sim" ||
                    req.body[`item_tpAvl_${pos}`] == "Opinião (Não/Sim/N.A)") {
                    req.body[`rd_avlTpAvaliativo_n_${pos}`] ? arrAvlTp.n_ruim.push(req.body[`rd_avlTpAvaliativo_n_${pos}`]) : false
                    req.body[`rd_avlTpAvaliativo_na_${pos}`] ? arrAvlTp.na_regular.push(req.body[`rd_avlTpAvaliativo_na_${pos}`]) : false
                    req.body[`rd_avlTpAvaliativo_s_${pos}`] ? arrAvlTp.s_bom.push(req.body[`rd_avlTpAvaliativo_s_${pos}`]) : false
                }
                if (req.body[`item_tipo_${pos}`] != "Texto" && req.body[`item_tipo_${pos}`] != "Avaliativo") {
                    req.body[`rd_complemento_comentario_${pos}`] ? arrComplemento.push(req.body[`rd_complemento_comentario_${pos}`]) : false
                    req.body[`rd_complemento_plnAcao_${pos}`] ? arrComplemento.push(req.body[`rd_complemento_plnAcao_${pos}`]) : false
                    req.body[`rd_complemento_anexos_${pos}`] ? arrComplemento.push(req.body[`rd_complemento_anexos_${pos}`]) : false
                    req.body[`rd_complemento_ass_${pos}`] ? arrComplemento.push(req.body[`rd_complemento_ass_${pos}`]) : false
                    req.body[`rd_complemento_aplicavel_${pos}`] ? arrComplemento.push(req.body[`rd_complemento_aplicavel_${pos}`]) : false
                }
                // Create a Checklist
                const checklist = new Checklist_item({
                    id_checklist: id_checklist,
                    item_nome: req.body["item_nome_" + pos],
                    item_descricao: req.body["item_descricao_" + pos],
                    item_dica: req.body["item_dica_" + pos],
                    item_tipo: req.body["item_tipo_" + pos],
                    item_formato: req.body["item_formato_" + pos],
                    item_obrigatorio: req.body["item_obrigatorio_" + pos],
                    item_tipo_avaliacao: req.body["item_tpAvl_" + pos],
                    item_complemento: JSON.stringify(arrComplemento),
                    arrItensAvaliacao: JSON.stringify(arrAvlTp),
                    item_peso: req.body["item_peso_" + pos],
                    area_nome: req.body["area_nome_desc_" + pos]
                });
                // Save Checklist in the database
                Checklist_item.create(checklist, (err, data) => {
                    err ? console.log(err) : false
                    console.log(data)
                });
            }
            // Cria a relação do checklist com a unidade
            for (let index = 0; index < numUnidades; index++) {
                const assocChk = new AssocChk({
                    id_unidade: req.body.chk_unidades[`${index}`],
                    id_checklist: id_checklist
                })
                Checklist.createAsscChk(assocChk, (err, data) => {
                    if (err) {
                        res.status(500).send({ message: err.message || "Some error occurred while creating the Checklist." });
                    } else {
                        console.log(data)
                    }
                })
            }
            res.status(201).send({ message: "Checklist criado com sucesso!" })
        }
    });
};
// Retrieve all Checklists from the database (with condition).
exports.findAll = (req, res) => {
    Checklist.getAll(null, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving checklists."
            });
        // else res.status(200).send();
        else res.json(data)
    });
};
// Retrieve join checklist.
exports.getChecklists = (req, res) => {
    Checklist.getChecklists(null, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving checklists."
            });
        else res.status(200).send();
    });
};
// Find a single Checklist by Id
exports.findOne = (req, res) => {
    Checklist.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Checklist with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Checklist with id " + req.params.id
                });
            }
            // } else res.status(200).send();
        } else res.json(data)
    });
};
// Update a Checklist identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Checklist.updateById(
        req.params.id,
        new Checklist(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Checklist with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Checklist with id " + req.params.id
                    });
                }
            } else res.status(200).send();
        }
    );
};
// Delete a Checklist with the specified id in the request
exports.delete = (req, res) => {
    Checklist_item.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Checklist with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Checklist with id " + req.params.id
                });
            }
        } else {
            Checklist.remove(req.params.id, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found Checklist with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Could not delete Checklist with id " + req.params.id
                        });
                    }
                } else res.send({ message: `Checklist and checklist itens was deleted successfully!` });
            });
        }
    });
};
// COnfiguracoes
exports.createConfig = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var numUnidades = req.body.contadorUnidades
    const config = ({
        empreendimento: req.body.empreendimento,
        cep: req.body.cep,
        estado: req.body.estado,
        cidade: req.body.cidade,
        endereco: req.body.endereco,
        numero: req.body.numero,
        complemento: req.body.complemento
    });
    Checklist.createConfig(config, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Unidade." });
        } else {
            let id_empreendimento = data.id
            for (let pos = 1; pos <= numUnidades; pos++) {
                const unidade = new Unidade({
                    id_empreendimento: id_empreendimento,
                    unidade: req.body[`unidade_${pos}`]
                })
                Checklist.createUnidade(unidade, (err, data) => {
                    err ? console.log(err) : false
                    console.log(data)
                });
            }
        }
        res.status(201).send({ message: "Unidade criado com sucesso!" })
    });
}
// Unidades
exports.getAllUnidades = (req, res) => {
    Checklist.getAllUnidades(null, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving checklists."
            });
        // else res.status(200).send();
        else res.json(data)
    });
};
// Empreendimentos
exports.getAllEmpreendimentos = (req, res) => {
    Checklist.getAllEmpreendimentos(null, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving checklists."
            });
        // else res.status(200).send();
        else res.json(data)
    });
};
// Busca assc checklist e unidade
exports.getAsscChk = (req, res) => {
    Checklist.getAsscChk(null, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving checklists."
            });
        // else res.status(200).send();
        else res.json(data)
    });
}