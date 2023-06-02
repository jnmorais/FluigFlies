const sql = require("./db.js");
// constructor
const Sod = function (sod) {
    this.modulo = sod.modulo;
    this.categoria = sod.categoria;
    this.menu = sod.menu;
    this.submenu_1 = sod.submenu_1;
    this.submenu_2 = sod.submenu_2;
    this.colaborador = sod.colaborador;
    this.cargo = sod.cargo;
    this.perfil = sod.perfil;
    this.usuario_mega = sod.usuario_mega;
    this.permissoes = sod.permissoes;
};
Sod.create = (newSod, result) => {
    sql.query("INSERT INTO matriz_sod SET  ?", newSod, (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(err, null);
            return;
        }
        // console.log("created sod: ", { id: res.insertId, ...newSod });
        result(null, { id: res.insertId, ...newSod });
    });
    return;
    // .end();
};
module.exports = Sod;