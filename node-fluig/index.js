const express = require("express");
const path = require('path');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const { Checklist, Config, Unidade } = require("./app/models/checklist.model.js");
const connection = require("./app/models/db.js")
// const Checklist_item = require("./app/models/checklist_item.model.js");
const app = express();
// API FLUIG
const api = require('./app/configs/config');
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
//Set View Engine
app.set('view engine', 'ejs')
app.set('viewes', './views')
app.engine('ejs', require('ejs').__express);
app.use(express.static(path.join(__dirname, '/public')))
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
// Carrega as rotas de checklists
require("./app/routes/checklist.routes.js")(app);
require("./app/routes/checklist_item.routes.js")(app);
require("./app/routes/sod.routes.js")(app);
// set port, listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SERVER LISTEN ON PORT ${port}`)
    connection.connect(function (err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        console.log('Connected to database.');
    });
})
// Rota inicial
app.get("/", (req, res) => {
    Checklist.getAllUnidades(null, (err, unidades) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Erro ao recuperar checklists." });
            return;
        }
        res.render("home");
    })
});
app.get("/checklists", (req, res) => {
    Checklist.getAllUnidades(null, (err, unidades) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Erro ao recuperar checklists." });
            return;
        }
        res.render("checklist", { msg: "", status: 0, unidades });
    })
});
app.get("/configuracao", async (req, res) => {
    res.render("configuracao", { msg: "", status: 0 })
});
// Buscar todos os checklists
app.get("/getChecklists", (req, res) => {
    Checklist.getChecklists(null, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Erro ao recuperar checklists." });
            return;
        }
        const result = results.reduce((acc, row) => {
            let { id, chk_nome, chk_descricao, id_checklist, item_nome, item_descricao, item_dica, item_tipo, item_formato, item_obrigatorio, item_tipo_avaliacao, item_peso, arrItensAvaliacao, item_complemento, area_nome } = row;
            const existing = acc.find((item) => item.id_checklist === id_checklist);
            var arrAvaliacao = []
            var arrComplementos = []
            arrAvaliacao.push(JSON.parse(arrItensAvaliacao));
            arrComplementos.push(JSON.parse(item_complemento));
            arrComplementos = Array.from(new Set(Object.values(arrComplementos).flat()))
            if (existing) {
                existing.campos.push({
                    id,
                    id_checklist,
                    item_nome,
                    item_descricao,
                    item_dica,
                    item_tipo,
                    item_formato,
                    item_obrigatorio,
                    item_tipo_avaliacao,
                    item_peso,
                    arrAvaliacao,
                    arrComplementos,
                    area_nome
                });
                existing.campos.sort((a, b) => a.id - b.id);
            } else {
                acc.push({
                    id_checklist: id_checklist,
                    chk_nome,
                    chk_descricao,
                    campos: [{
                        id,
                        id_checklist,
                        item_nome,
                        item_descricao,
                        item_dica,
                        item_tipo,
                        item_formato,
                        item_obrigatorio,
                        item_tipo_avaliacao,
                        item_peso,
                        arrAvaliacao,
                        arrComplementos,
                        area_nome
                    }],
                });
            }
            return acc;
        }, []);
        res.json(result);
    });
});
// Buscar todos os empreendimentos
app.get("/getEmpreendimentos", (req, res) => {
    Checklist.getAllEmpreendimetos(null, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Erro ao recuperar checklists." });
            return;
        }
        res.json(results);
    });
});
// Buscar todas as unidades por empreendimento
app.get("/getUnidadesByEmp", (req, res) => {
    let id_empreendimento = req.query.id_empreendimento
    Checklist.getUnidadesByEmp(id_empreendimento, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Erro ao recuperar checklists." });
            return;
        }
        res.json(results);
    });
});
// Busca os checklists disponiveis pela unidade
app.get("/getChecklistByUnd", (req, res) => {
    let id_unidade = req.query.id_unidade
    Checklist.getAsscChk(id_unidade, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Erro ao recuperar checklists." });
            return;
        }
        res.json(results);
    });
});
// Busca dados do CV
app.get("/cv", (req, res) => {
    const options = {
        method: "GET",
        headers: {
            email: "expert.cv@interconstrutora.com.br",
            token: "8d68b83badeebb3fd75a9ea8ad077a5b995a905d"
        }
    }
    switch (req.query.rota) {
        case "precadastros":
            fetch(`https://meuinc.cvcrm.com.br/api/v1/cvdw/precadastros?registros_por_pagina=500`, options)
                .then(response => response.json())
                .then(response => {
                    res.json(response)
                })
                .catch(err => console.error(err))
            break;
        case "leads":
            fetch(`https://meuinc.cvcrm.com.br/api/v1/cvdw/leads?registros_por_pagina=500`, options)
                .then(response => response.json())
                .then(response => {
                    res.json(response)
                })
                .catch(err => console.error(err))
            break;
        default:
            res.json("Rota não encontrada!")
            break;
    }
});
// Busca desligamento FLUIG
app.get("/desligamentos", async (req, res) => {
    const ds_desligamentos = "https://meuinc136393.fluig.cloudtotvs.com.br/api/public/ecm/dataset/search?datasetId=004"
    const infosDesligamento = await api(ds_desligamentos, "GET")
    let arrColabs = []
    for (const colab of infosDesligamento.content) {
        var expert, mega, approvo, cv, hcm, fluig = false
        if (colab.sistemas != "" &&
            colab.sistemas != null &&
            colab.sistemas != "NENHUM" &&
            colab.sistemas != "NENHUM SISTEMA ERA UTILIZADO" &&
            colab.sistemas != "Nenhum sistema era utilizado" &&
            colab.sistemas != "NENHUM SISTEMA ERA UTILIZADO ") {
            if (colab.sistemas.search("Mega") >= 0) {
                mega = true
            }
            if (colab.sistemas.search("Expert") >= 0) {
                expert = true
            }
            if (colab.sistemas.search("Approvo") >= 0) {
                approvo = true
            }
            if (colab.sistemas.search("Construtor de Vendas") >= 0) {
                cv = true
            }
            if (colab.sistemas.search("HCM") >= 0) {
                hcm = true
            }
            if (colab.sistemas.search("Fluig") >= 0) {
                fluig = true
            }
        }
        arrColabs.push({
            "colaborador": colab.colaborador,
            "dtdslg": colab.dtdslg,
            "mega": mega,
            "approvo": approvo,
            "expert": expert,
            "cv": cv,
            "hcm": hcm,
            "fluig": fluig,
            "email": colab.email
        })
    }
    res.json(arrColabs)
})
// Testes
app.get("/testes", async (req, res) => {
    res.render("testes")
})
// ctzrW7TSrW4N9Rf6sKaA
// ATBBewnnUPFzZf3X3aqAdShcRwWpA35B572E