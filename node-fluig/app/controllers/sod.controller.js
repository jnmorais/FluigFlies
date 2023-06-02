const Sod = require("../models/sod.model.js");
// Create and Save a new Sod
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // // Create a Sod
    var arrPermissoes = []
    req.body.inserir ? arrPermissoes.push(req.body.inserir) : false
    req.body.consultar ? arrPermissoes.push(req.body.consultar) : false
    req.body.editar ? arrPermissoes.push(req.body.editar) : false
    req.body.deletar ? arrPermissoes.push(req.body.deletar) : false
    const sod = new Sod({
        modulo: req.body.modulo,
        categoria: req.body.categoria,
        menu: req.body.menu,
        submenu_1: req.body.submenu_1,
        submenu_2: req.body.submenu_2,
        colaborador: req.body.colaborador,
        cargo: req.body.cargo,
        perfil: req.body.perfil,
        usuario_mega: req.body.usuario_mega,
        permissoes: arrPermissoes.toString()
    })
    // // Save Sod in the database/
    Sod.create(sod, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Sod." });
        }
        else res.send(data);
    });
};