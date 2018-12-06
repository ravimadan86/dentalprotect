const multer = require('multer');
const path = require('path');

//multer posts  config
const storageMultiple = multer.diskStorage({
    destination: './public/images/posts/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
//multer staff config
const storage = multer.diskStorage({
  destination: './public/images/staff/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
  // file type validation
  function checkFileType(file, cb) {
    // allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const ext = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    // check mimetype
    const mime = filetypes.test(file.mimetype);
    if (ext && mime) {
      return cb(null, true);
    } else {
      return cb();
    }
  }

module.exports.uploadMultiple = multer({
    storage: storageMultiple,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).fields([{
    name: 'image',
    maxCount: 1
  }, {
    name: 'images',
    maxCount: 20
  }]);

  module.exports.uploadSingle = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).single("image");