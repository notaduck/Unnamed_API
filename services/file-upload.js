// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');

// aws.config.update({
// 	accessKeyId: process.env.S3_ACCESS_KEY_ID,
// 	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// 	region: process.env.S3_REGION
// });

// const s3 = new aws.S3({ /* ... */ });

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
// 		console.log(cb(null, true));
// 	} else cb(new Error('Invalid Mime Type, only PNG and JPEG is allowed'), false);
// };

// const upload = multer({
// 	fileFilter: fileFilter,
// 	storage: multerS3({
// 		s3: s3,
// 		bucket: process.env.S3_BUCKET,
// 		acl: 'public-read',
// 		metadata: function (req, file, cb) {
// 			cb(null, { fieldName: 'TEST DATA' });
// 		},
// 		key: function (req, file, cb) {
// 			cb(null, Date.now().toString());
// 		}
// 	})
// });

// module.exports = upload;