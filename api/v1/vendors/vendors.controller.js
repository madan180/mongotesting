const vendorService = require('./vendors.service');
const async = require('async');

const addNewVendor = function(newVendor, done) {
    vendorService.addNewVendor(newVendor, done);
}

const getVendors = function(done) {
    vendorService.getVendors(done);
}
const findVendorByCode = function(product, done) {
    vendorService.findVendorByCode(product, done);
}


module.exports = {
    addNewVendor,
    getVendors,
    findVendorByCode
}