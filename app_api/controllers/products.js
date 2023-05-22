const formidable = require("formidable");
const ProductModel = require("../models/product");
const fs = require("fs");

const sendJSONResponse = (res, status, content) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(status).json(content);
};

module.exports.getList = async function (req, res) {
  console.log("asdasdasdas");
  // const searchObj = {};
  const searchObj = { category: req.params.category } || {};
  // console.log("req.params.category");
  // console.log(req.params.category);

  // console.log("searchObj");
  // console.log(searchObj);

  // ProductModel.find(searchObj).exec(function (err, products) {
  //   if (err)
  //     return sendJSONResponse(res, 500, {
  //       success: false,
  //       err: { msg: "Fetch faild!" },
  //     });

  //   sendJSONResponse(res, 200, { success: true, data: products });

  //   // console.log(products);
  // });
  // console.log(searchObj);
  console.log("searchObj");
  console.log(searchObj);
  try {
    const products = await ProductModel.find(searchObj).exec();

    if (!products.length) {
      return sendJSONResponse(res, 500, { success: false });
    } else {
      sendJSONResponse(res, 200, { success: true, data: products });
    }
  } catch (err) {
    return sendJSONResponse(res, 500, {
      success: false,
      err: { msg: "Fetch failed!" },
    });
  }
};

module.exports.add = function (req, res, next) {
  let num = 0;
  let product;

  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // const separatedDescription = fields.description.split(" ");
    product = new ProductModel({
      name: fields.name,
      article: fields.article,
      answer: parseFloat(fields.answer),
      availability: fields.availability,
      discountPrice: parseInt(fields.discountPrice),
      price: parseInt(fields.price),
      description: fields.description,
      photo: {
        data: fs.readFileSync(files.photo.filepath),
        contentType: files.photo.mimetype,
      },
      category: fields.category,
      manufacturer: fields.manufacturer,
    });
  });
  form.on("end", function (d) {
    console.log("3333333333");
    num++;

    // if () {

    // }
    // try {
    //Помилка модуля (викликається двічі)
    if (num == 1) {
      //Збереження моделі і відключення від бази даних
      // function (err, savedProduct)
      // product.save()
      // .then(function (err, savedProduct)) {
      //   if (err) {
      //     sendJSONResponse(res, 500, {
      //       success: false,
      //       err: { msg: "Saving faild!" },
      //     });
      //     return;
      //   }
      //   sendJSONResponse(res, 201, { success: true, data: savedProduct });
      // product
      //   .save()
      //   .then(function (models) {
      //     console.log(models);
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
      // // })
    }

    product.save((err, savedProduct) => {
      if (err) {
        sendJSONResponse(res, 500, {
          success: false,
          err: { msg: "Saving faild!" },
        });
        return;
      }
      sendJSONResponse(res, 201, { success: true, data: savedProduct });
    });

    // } catch (error) {
    //   console.log("errrrrror");

    // }
  });
};

module.exports.update = function (req, res, next) {
  let num = 0;
  let product;
  console.log("req.body");
  console.log(req.body);
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    console.log("111111");
    if (err) {
      next(err);
      return;
    }
    //Створення об’єкта моделі
    product = {
      name: fields.name,
      article: fields.article,
      answer: parseFloat(fields.answer),
      availability: fields.availability,
      discountPrice: parseInt(fields.discountPrice),
      price: parseInt(fields.price),
      description: fields.description,
      category: fields.category,
      manufacturer: fields.manufacturer,
    };
    req.body.id = fields._id;
    req.body.product = product;
    if (files.photo.originalFilename) {
      //Якщо надіслано нове фото, то змінюємо поле фото
      product.photo = {
        data: fs.readFileSync(files.photo.filepath),
        contentType: files.photo.mimetype,
      };
    }
  });
  form.on("end", function (d) {
    num++;
    //Помилка модуля (викликається двічі)
    if (num == 1) {
      //Збереження моделі і відключення від бази даних
      ProductModel.findByIdAndUpdate(
        req.body.id,
        req.body.product,
        { new: true }, //у колбек передається оновлений документ
        function (err) {
          // mongoose.disconnect()
          if (err) {
            sendJSONResponse(res, 500, {
              success: false,
              err: { msg: "Update faild!" },
            });
            return;
          }

          sendJSONResponse(res, 200, { success: true });
        }
      );
    }
  });
};

// module.exports.add = function (req, res, next) {
//   let product = new ProductModel({
//     title: req.body.title,
//     price: parseFloat(req.body.price),
//     photo: req.body.photo,
//     owner: req.body.owner,
//   });
//   product.save(function (err, savedProduct) {
//     if (err) {
//       sendJSONResponse(res, 500, {
//         success: false,
//         err: { msg: "Saving faild!" },
//       });
//       return;
//     }
//     sendJSONResponse(res, 201, { success: true, data: savedProduct });
//   });
// };

module.exports.delete = function (req, res) {
  console.log("---------req.body");
  console.log(req.body);
  ProductModel.findByIdAndDelete(req.body.id, function (err) {
    if (err) {
      console.log("---------err");
      console.log(err);
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Delete faild!" },
      });
      return;
    }
    sendJSONResponse(res, 200, { success: true });
  });
};

// module.exports.getById = function (req, res) {
//   //Пошук об"єкта-книги за id
//   ProductModel.findById(req.params.id)
//     .populate("owner")
//     .exec(function (err, searchProduct) {
//       if (err) {
//         sendJSONResponse(res, 500, {
//           success: false,
//           err: { msg: "Find product faild!" },
//         });
//         return;
//       }
//       sendJSONResponse(res, 200, { success: true, data: searchProduct });
//     });
// };

module.exports.getById = function (req, res) {
  console.log(req.params.id);
  ProductModel.findById(req.params.id, function (err, searchProduct) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Find product faild!" },
      });
      return;
    }
    sendJSONResponse(res, 200, { success: true, data: searchProduct });
  });
};
