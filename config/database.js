const mysql= require('mysql2');

const db= mysql.createConnection({
    host:'public-intern-educase.l.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_Sed_RnAFNS32dGndxDq',
    database: 'defaultdb',
    port: '27797'
});

db.connect((err) =>{
    if(err) throw err;
    console.log("Mysql connected succesfully")
    
});

module.exports = db;