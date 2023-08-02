var express = require("express");
var router = express.Router();
const models = require("../models/index");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

router.get("/:user_id", async function (req, res, next) {
  const { user_id } = req.params;
  try {
    const images = await models.Photo.findAll({
      where: {
        external_id: user_id,
      type: "users"}
    })
    res.send(images)
  } catch (error) {
    res.status(500).send({message:error.message})
  }
})

// router.post("/upload/user/:user_id", upload.array("imagefiles", 10), async function (req, res, next) {
//   const imagefiles = req.files;
//   console.log(imagefiles)
//   const { user_id } = req.params;
//   console.log(user_id)
//   try {
//      await imagefiles.map((file) => {
//       let extension = mime.extension(file.mimetype);
//       let filename = uuidv4() + "." + extension;
//       let tmp_path = file.path;
//       let target_path = path.join(__dirname, "../public/images/") + filename;
//       fs.rename(tmp_path, target_path);

//       models.Photo.create({
//         filename,
//         external_id: user_id,
//         type: "user"

//       })
//     })
//     res.send("success")
//   } catch (error) {
//     res.status(500).send({message:error.message})
//   }
// })

router.post("/upload/user/:user_id", upload.single("imagefile"), async function (req, res, next) {
  const { user_id } = req.params;
  const imagefile = req.file;

  const extension = mime.extension(imagefile.mimetype);
  const filename = uuidv4() + "." + extension;
  const tmp_path = imagefile.path;
  const target_path = path.join(__dirname, "../public/images/") + filename;

  try {
    await fs.rename(tmp_path, target_path);

    const photo = await models.Photo.create({
      filename: filename,
      external_id: user_id,
      type: "user"
    })

    res.send(photo)
  } catch (error) {
    res.status(500).send({message:error.message})
  }


})

module.exports = router;