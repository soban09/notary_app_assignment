const mysql = require('mysql2')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    debug: false
});

const userSchema = 'create table IF NOT EXISTS user (id int, name varchar(255), PRIMARY KEY(id));'

const candidateSchema = 'create table IF NOT EXISTS candidate (id int, uid int, candidateName varchar(255), PRIMARY KEY(id), FOREIGN KEY(uid) REFERENCES user(id));'

const candidateStatusSchema = 'create table IF NOT EXISTS candidatestatus (id int, cid int, status varchar(255), statusUpdatedAt DATE, FOREIGN KEY(cid) REFERENCES candidate(id));'

pool.query(userSchema,(error,result)=>{
    if (error) {
        console.log(error)
    }
});

pool.query(candidateSchema,(error,result)=>{
    if (error) {
        console.log(error)
    }
})

pool.query(candidateStatusSchema, function(err, result){
    if(err) {
        console.log(err);
    }
});
module.exports = pool;
