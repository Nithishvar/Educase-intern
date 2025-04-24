const mysql= require('mysql2');

const db= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'nithish1320',
    database: 'school_db'
});

db.connect((err) =>{
    if(err) throw err;
    console.log("Mysql connected succesfully")
    
});

module.exports = db;