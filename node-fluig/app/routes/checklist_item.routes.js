module.exports = app => {
    const checklist_item = require("../controllers/checklist_item.controller");
    // Definir rota para criar checklist_item
    app.post("/checklist_item", checklist_item.create);
    // Definir rota para remover um checklist_item pelo ID
    app.delete("/checklist_item/:id", checklist_item.delete);
    // Definir rota para obter um checklist pelo ID
    app.get("/checklist_item/:id", checklist_item.findAll);
    // Definir rota para atualizar os itens do checklist pelo ID
    app.put("/checklist_item/:id", checklist_item.update);
};