module.exports = app => {
    const checklist = require("../controllers/checklist.controller");
    // Definir rota para obter todos os checklist
    app.get("/checklist", checklist.findAll);
    // Definir rota para obter um checklist pelo ID
    app.get("/checklist/:id", checklist.findOne);
    // Definir rota para criar um novo checklist
    app.post("/checklist", checklist.create);
    // Definir rota para atualizar um checklist pelo ID
    app.put("/checklist/:id", checklist.update);
    // Definir rota para remover um checklist pelo ID
    app.delete("/checklist/:id", checklist.delete);
    // Definir rota para criar uma nova unidade
    app.post("/configuracao", checklist.createConfig);
    // Definir rota para buscar unidades
    app.get("/unidades", checklist.getAllUnidades);
    // Buscar os empreendimentos cadastrados
    app.get("/empreendimentos", checklist.getAllEmpreendimentos);
};