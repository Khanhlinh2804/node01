const express = require('express');
const app = express()
const bodyParser = require('body-parser');
app.set('view engine','ejs');


app.use(bodyParser.urlencoded({extended:true}));
//  cấu hình kết nối csdl mysql
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "btn",
    charset: "utf8_unicode_ci",
});

// mowr keets noois 
conn.connect((err)=>{
    if(err) throw err.stack;
    console.log('connected as id' + conn.threadId );
});

app.get('/',(req,res)=>{
    // truy vaan laays danh sachs 
    res.render('index')
});
app.get('/add',(req,res)=>{
    res.render('add-author');
});
app.post('/add',(req,res)=>{
    conn.query(`INSERT INTO author(name,status) VALUES ('${req.body.name}'),'${req.body.status}`,(err,author)=>{
        if(err){
            res.send(err);
        }else{
            // chuyeens duwx lieeuj sang view hieenr thij 
            res.redirect('/index-author');
        }
    })
});
app.get('/index-author',(req,res)=>{
    conn.query("SELECT * FROM author", (err, author) => {
        if (err) {
            res.send(err);
        } else {
            // chuyeenr duwx lieeuj sang view hieenr thij
            res.render("author/index-author", { author });
        }
    });
})

app.listen(3000,()=>{
    console.log('loading');
});
