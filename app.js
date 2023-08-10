const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const pool = require('./db/database');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send('Hello')
})

app.get('/count/:id', async (req, res) => {
    const id = req.params.id
        
    const query1 = 'SELECT COUNT(*) as TotalCandidates FROM candidate a INNER JOIN candidatestatus b on a.id=b.cid WHERE a.uid = ?;'

    const responseFromQuery1 = new Promise((resolve, reject) => {
        pool.query(query1, [id], (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })

    const result1 = await responseFromQuery1       
    
    const query2 = 'SELECT COUNT(*) as count FROM candidate a INNER JOIN candidatestatus b on a.id=b.cid WHERE a.uid = ? GROUP BY b.status;'

    const responseFromQuery2 = new Promise((resolve, reject) => {
        pool.query(query2, [id], (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })

    const result2 = await responseFromQuery2    

    res.status(200).json({
        "Uid": id,
        "TotalCandidates": result1.length>0 ? result1[0].TotalCandidates : 0,
        "Joined": result2.length>0 ? result2[0].count : 0,
        "Interview": result2.length>0 ? result2[1].count : 0
    })
})

const PORT = 3000
app.listen(PORT, function(){
    console.log('Server has started');
});