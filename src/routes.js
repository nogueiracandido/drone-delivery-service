import { Router } from 'express';
import multer from 'multer';
import { DroneDeliveryController } from './controllers/DroneDeliveryController.js';

const routes = Router();
const storage = multer.diskStorage({
    destination: 'src/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

routes.post('/upload', upload.single('file'), DroneDeliveryController.execute);

export { routes };
