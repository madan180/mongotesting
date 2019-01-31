const VendorModel = require('./vendors.entity');

const addNewVendor = function(newVendor, done) {
  let vendor = new VendorModel();
  vendor.name = newVendor.name;
  vendor.code = newVendor.code;  
  vendor.email = newVendor.email;
  vendor.rank = newVendor.rank;

  vendor.save(function(err, savedDoc) {
    if (err) {
      console.error("Error in adding new product, ERROR::", err);
      done(err);
    } else {
      done(null, savedDoc);
      return
    }
  });
}

const getVendors = function(done) {
  let query = {};
  let fieldOptions = null;
  let page = 1;
  let limit = 10;

  VendorModel
    .find(query)
    .sort({ "addedOn": -1 })
    .select(fieldOptions)
    .skip((page > 0) ? limit * (page - 1) : 0)
    .limit(limit)
    .exec((err, colln) => {
      if (err) {
        console.error('Error in finding products, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, colln);
    });
}

const findVendorByCode = function(product, done) {
  // @TODO
  let query = { code: product.vendor };
  VendorModel.findOne(query).exec((err, vendor) => {
    if (err) {
      console.error('Error in finding product for vendorCode %s', vendorCode, ' and Error : ', err,' and query : ', query);
      return done(err);
    }
    done(null, { product, vendor });
  });
}



module.exports = {
  addNewVendor,
  getVendors,
  findVendorByCode
}