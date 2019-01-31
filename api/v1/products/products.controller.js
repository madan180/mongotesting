const productService = require('./products.service');
const async = require('async');
const vendorCtrl  =require('../vendors/vendors.controller')

const addNewProduct = function(newProduct, done) {
  productService.addNewProduct(newProduct, done);
}

const submitReview = function(productCode, reviewObj, done) {
	productService.submitNewReview(productCode, reviewObj, done);
}

const getProducts = function(done) {
  productService.getProducts(done);
}

const findProductByCode = function(productCode, done) {
	// @TODO
	async.waterfall([
		productService.findProductByCode.bind(null, productCode),
		vendorCtrl.findVendorByCode,
		productService.aggregateVendortoProduct
	], (err, result) => {
		if(err) return done(err);
		return done(null, result)
	});
}
/*const findProductByCode = function(productCode, done) {
	productService.findProductByCode(productCode, done);
}*/


module.exports = {
  addNewProduct,
  getProducts,
  submitReview,
  findProductByCode
}