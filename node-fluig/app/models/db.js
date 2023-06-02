const mysql = require('mysql');
// LOCALHOST
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'checklist'
});
// PRODUCAO
// const connection = mysql.createConnection({
//     host: 'expert.cdlckmebblo9.sa-east-1.rds.amazonaws.com',
//     user: 'interaws_dev',
//     password: 'D&v_159357',
//     database: 'expert_inter_d'
// });

module.exports = connection
// ctzrW7TSrW4N9Rf6sKaA
// ATBBewnnUPFzZf3X3aqAdShcRwWpA35B572E