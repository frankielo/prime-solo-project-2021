const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
  rejectUnauthorized
} = require('../modules/authentication-middleware');


router.get('/', (req, res) => {
    // GET route code here for guests
  
    const queryText = `SELECT * from categories ORDER BY id ASC`
    pool.query(queryText).then(response=>res.send(response.rows))
    .catch(err=>
        {
            console.log('Getting categories error', err)
            res.send(500)
        }
    )
  });

router.post('/', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
    // POST route code here for guests
    const { title } = req.body
    const queryText = `INSERT INTO "categories" ("cat_title")
    VALUES ($1)`
    
    pool.query(queryText,[title]).then(()=>
        res.sendStatus(201)
    ).catch(err=>{
        console.log("category post router has error", err)
        res.sendStatus(500)
        }
    )
  });

router.put('/:id', rejectUnauthenticated, rejectUnauthorized,(req, res) => {
    // PUT route code here for guests
    
    const { title } = req.body
    const { id } = req.params

    const queryText =  `UPDATE categories
    SET cat_title = $1
    WHERE id = $2;`

    pool.query(queryText,[title,id]).then(()=>res.sendStatus(200))
    .catch(err=>{
        console.log('updating categories error',err)
        res.sendStatus(500)
    })
  
  });

router.delete('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
    // DELETE route code here for guests
    const {id} = req.params
    const queryText = `DELETE FROM categories WHERE id = $1`
    
    pool.query(queryText,[id]).then(()=>{res.sendStatus(200)})
    .catch(err=>{
        console.log("error deleting category",err)
        res.sendStatus(500)
    })
});





module.exports = router;