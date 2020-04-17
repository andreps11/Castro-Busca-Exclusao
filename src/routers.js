const express = require("express")
var router = express.Router()
const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database(
    "./db/programadores.db",
    sqlite3.OPEN_READWRITE,
    err => {
        if(err) {
            console.log(err.message)
            return
        }
        console.log("Sucesso")
    }
)

router.get('/',(req,res,next) => {
    const query = /*sql*/ `
        SELECT id, name, email, telefone, cidade, git, descricao
        FROM programadores;
    `
    db.all(query, (err, programador) => {
        if(err) {
            console.log(err.message);
            return next(err);
        }
        res.render('index', { programador });
    });
    
})

router.get('/busca',(req, res) => {
    const query = /*sql*/ `
        SELECT id, name, email, telefone, cidade, git, descricao
        FROM programadores
        WHERE LIKE (?, LOWER(name || cidade || descricao))
        ORDER BY id DESC;
    `;
    if(req.query.key) {
        db.all(query, [`%${req.query.key}%`], (err, programador) => {
            if(err) {
                console.log(err);
                return next(err);
            }
            
            res.render("busca", {programador, key:req.query.key})
        })
    } else {
        res.render("busca")
    }
})

router.get('/form', (req, res) => res.render("form"))

router.post('/form',(req,res) => {
    const query = /*sql*/ `
        INSERT INTO programadores (name, email, telefone, cidade, git, descricao)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    db.run(query, [req.body.name, req.body.email , req.body.telefone, req.body.cidade, req.body.git, req.body.descricao], err => {
        if(err) {
            console.log(err.message);
            return next(err);
        }
        res.redirect('/');
    })
})

router.get('/delete/:id', (req, res) => {
    db.run(`DELETE FROM programadores WHERE id = ?`, [req.params.id], err => {
        if(err) {
            console.log(err.message);
            return next(err);
        }
        res.redirect('/');
    })
})

module.exports = router