const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
  rejectUnauthorized
} = require('../modules/authentication-middleware');
const multer  = require('multer')
const {storage,cloudinary} = require('../modules/cloudinary')
const upload = multer({storage})


/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here for guests

  const queryText = `SELECT * FROM posts  WHERE post_status ='published' ORDER BY id DESC;`

  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});

router.get('/user', rejectUnauthenticated , (req, res) => {
  // GET route code here for guests

  const queryText = `
  SELECT posts.id, posts.post_title, posts.post_author, posts.post_date, posts.post_image_url, posts.post_content, posts.post_status, array_agg(categories.id) as categoryIDList , array_agg(categories.cat_title) as categoryList 
  FROM posts JOIN categories_posts ON categories_posts.post_id = posts.id JOIN categories ON categories_posts.category_id = categories.id 
  WHERE posts.post_userid = $1
  GROUP BY posts.id
  ORDER BY posts.id DESC;
  `

  pool.query(queryText,[req.user.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});


router.get('/all', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // GET route code here for admins

  const queryText = `SELECT * FROM posts ORDER BY id DESC;`

  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('Get posts error ', err);
      res.sendStatus(500);
    }); 

});

router.post('/', rejectUnauthenticated , upload.single('image'), async (req, res) => {
  // POST route code here

  const client = await pool.connect()

  const {title, content, catId} = req.body


  const queryText =  `INSERT INTO "posts" ("post_title", "post_author", "post_image_url", "post_image_name", "post_content", "post_userid")
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

  const queryJunctionText = `INSERT INTO "categories_posts" ("post_id", "category_id")
  VALUES ($1, $2)`

  try {

    await client.query('BEGIN')

    const response = await client.query(queryText,[title, req.user.username, req.file.path, req.file.filename,  content, req.user.id])
    const id = response.rows[0].id

    await Promise.all(
    catId.split(",").map((element) => {
        return client.query(queryJunctionText,[id,element])
    }))
     await client.query('COMMIT')

    res.sendStatus(201)
  } catch (error) {

    await client.query('ROLLBACK')

    console.log('Creating posts error ', error);
      res.sendStatus(500);
  }
  finally {
    client.release()
  }



});



router.put('/user/:id', rejectUnauthenticated , async (req, res) => {
  // POST route code here

  const client = await pool.connect()
  const postId = req.params.id
  const {title, content, catId} = req.body

  console.log(req.body)

  const queryText =  `UPDATE posts
  SET post_title = $1, post_content = $2
  WHERE id = $3 AND post_userid = $4;`

  const queryDeleteText = `DELETE FROM categories_posts WHERE post_id = $1`

  const queryJunctionText = `INSERT INTO "categories_posts" ("post_id", "category_id")
  VALUES ($1, $2)`

  try {

    await client.query('BEGIN')

    await client.query(queryText,[title,content, postId, req.user.id])

    await client.query(queryDeleteText,[postId])

    await Promise.all(
    catId.map((element) => {
        return client.query(queryJunctionText,[postId,element])
    }))
     await client.query('COMMIT')

    res.sendStatus(201)
  } catch (error) {

    await client.query('ROLLBACK')

    console.log('Creating posts error ', error);
      res.sendStatus(500);
  }
  finally {
    client.release()
  }

});



router.put('/:id',  rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // PUT route code here
  const {id} = req.params
  const {status} = req.body

  const queryText =  `UPDATE posts
  SET post_status = $1
  WHERE id = $2 ;`


  pool.query(queryText,[status,id])
  .then(() => res.sendStatus(200))
  .catch((err) => {
    console.log('updating posts error ', err);
    res.sendStatus(500);
  }); 

});

router.delete('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // DELETE route code here
  const {id} = req.params
  const queryText =  `DELETE FROM posts WHERE id = $1`
  pool.query(queryText,[id])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Deleting posts error ', err);
      res.sendStatus(500);
    }); 
});


router.delete('/user/:id', rejectUnauthenticated, async (req, res) => {
  // DELETE route code here
  const {id} = req.params
  const queryText =  `DELETE FROM posts WHERE id = $1 AND post_userid = $2 AND status = 'available' 
  RETURNING post_image_name`
  try {
      const response = await pool.query(queryText,[id,req.user.id])
      await cloudinary.uploader.destroy(response.rows[0].post_image_name)
      res.sendStatus(200)
  } catch (error) {
    console.log('Deleting posts error ', err);
    res.sendStatus(500);
  }
  
});

router.put('/image/:id', rejectUnauthenticated , upload.single('image'), async (req, res) => {
  // POST route code here
  const {id} = req.params

  const getImageNameQuery =  `SELECT post_image_name FROM posts WHERE id = $1 AND post_userid = $2;`

  const queryText =  `UPDATE posts
  SET post_image_url = $1, post_image_name = $2
  WHERE id = $3 AND post_userid = $4 RETURNING post_image_url;`


  try {
    const response =  await pool.query(getImageNameQuery,[id,req.user.id])
    const imageUrl = await pool.query(queryText,[req.file.path, req.file.filename, id, req.user.id])

    await cloudinary.uploader.destroy(response.rows[0].post_image_name)

    res.send(imageUrl.rows[0].post_image_url)

  } catch (error) {

    console.log('Creating posts error ', error);
      res.sendStatus(500);
  }

});


module.exports = router;











// router.post('/', rejectUnauthenticated , async (req, res) => {
//   // POST route code here
//   const client = await pool.connect();

//   try {
  
//   const {title, image, content, catId} = req.body

//   const queryText =  `INSERT INTO "posts" ("post_title", "post_author", "post_image", "post_content", "post_userid")
//   VALUES ($1, $2, $3, $4, $5) RETURNING id`

//   const queryJunctionText = `INSERT INTO "categories_posts" ("post_id", "category_id")
//   VALUES ($1, $2)`


//   await client.query('BEGIN')
//     const response = await client.query(queryText,[title, req.user.username, image,  content, req.user.id])
//     const id = response.rows[0].id

//     await Promise.all(catId.map((element) => {
//        return client.query(queryJunctionText,[id,element])
//     }))
//     await client.query('COMMIT')
//     res.sendStatus(201)
//   } catch (error) {
//     await client.query('ROLLBACK')
//     console.log('Creating posts error ', error);
//       res.sendStatus(500);
//   }
//   finally {
//     client.release()
//   }
// });

