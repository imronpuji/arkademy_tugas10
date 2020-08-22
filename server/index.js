  const express = require('express');
  const bodyParser = require('body-parser');
  const mysql = require('mysql');
  const app = express();
  const cors = require('cors')
  app.use(bodyParser.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arkademy'
  });
 
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

  app.get('/',(req, res) => {
      let sql = "SELECT * FROM produk";
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results)
      });
  });

  app.post('/',(req, res) => {
    let produk = {nama_produk:req.body.nama_produk, harga : req.body.harga, keterangan: req.body.keterangan, jumlah : req.body.jumlah}
    let sql = "INSERT INTO produk SET ?";
    let query = conn.query(sql, produk, (err, results) => {
      if(err) throw err;
      res.send(results)
    });
  });

  app.delete('/:id',(req, res) => {
    let sql = "DELETE FROM produk WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send('Berhasil')
    });
  });

  app.put('/',(req, res) => {
    let sql = "UPDATE produk SET nama_produk='"+req.body.nama_produk+"', harga='"+req.body.harga+"', keterangan='"+req.body.keterangan+"', jumlah='"+req.body.jumlah+"' WHERE id="+req.body.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results)
    });
  });

  app.listen(8000, () => {
    console.log('Server is running at port 8000');
  });