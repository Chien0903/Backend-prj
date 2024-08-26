const express = require("express");
const multer = require("multer");
const router = express.Router();
// const storaMulter = require("../../helpers/storageMulter");
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
// const storageMulter = require("../../helpers/storageMulter");
const route = express.Router();
const upload = multer();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cloudinary
cloudinary.config({ 
    cloud_name: 'dzojcrdto', 
    api_key: '686734241961229', 
    api_secret: '_O6tJEECfth3YJGWCZDLWibU5O8', // Click 'View API Keys' above to copy your API secret
});
// End Cloudinary

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post("/create", upload.single("thumbnail"), controller.createPost);
router.post(
    "/create",
    upload.single("thumbnail"),
    function (req, res, next) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
        }
    
        upload(req);
    },
    validate.createPost,
    controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id", 
    upload.single("thumbnail"),
    validate.createPost,
    controller.editPatch
);
router.get("/detail/:id", controller.detail);
module.exports = router;
