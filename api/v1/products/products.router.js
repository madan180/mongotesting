const router = require('express').Router();
const productCtrl = require('./products.controller');

/**
 * Effective URL is POST /products/
 *
 * This API adds a new product to the catalog
 */
router.post('/', function(req, res) {
  try {
    let newProduct = req.body;
    productCtrl.addNewProduct(newProduct, function(err, result) {
      if (err) {
        console.error('Error in adding new product, ERROR::', err);
        // res.status(400).send(err);
        res.status(400).send({ error: 'Something went wrong, please check and tray again..!' });
        return;
      }
      res.status(201).send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in adding new product, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

/**
 * Effective URL is GET /products/
 *
 * This API finds product(s) in the catalog
 */
router.get('/', function(req, res) {
  try {
    productCtrl.getProducts(function(err, result) {
      if (err) {
        console.error('Error in GET of products, ERROR::', err);
        res.status(400).send({error: 'Something went wrong, please try later..!'});
        return;
      }
      res.send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in GET of products, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

/**
 *
 *
 */
router.get('/:productCode', function(req, res) {
  try {
    console.log('Request :: ', req.params);
    let productCode = req.params.productCode;
    productCtrl.findProductByCode(productCode, function(err, result) {
      if (err) {
        console.error('Error in fetching the product for productCode %s ', productCode,'ERROR:: ', err);
        // res.status(400).send(err);
        res.status(400).send({ error: 'Something went wrong, please check and try again..!' });
        return;
      }
      //console.log('Response :: ', res);
      //res.send(result);
      res.status(201).send(JSON.stringify(result, null, "\t"));
      //console.log('Response :: ', res)
      return;
    });
  } catch (err) {
    console.error("Fetch per product code failed coz : ", err);
    res.status(500).send({ error : 'Unexpected internal error, please try later ..!'});
    return;
  }
})

router.post('/:productCode/reviews', function(req, res) {
  try {
    let reviewObj = req.body;
    productCtrl.submitReview(req.params.productCode, reviewObj, function(err, result) {
      if (err) {
        console.error('Error in submitting review of product, ERROR::', err);
        res.status(400).send({error: 'Something went wrong, please try later..!'});
        return;
      }
      res.send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in submitting review of product, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

module.exports = router;