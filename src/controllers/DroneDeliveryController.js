import { DroneDeliveryService } from "../services/DroneDeliveryService.js";

const DroneDeliveryController = {
    async execute(req, res) {
        try {
            const filePath = req.file.path;
            const { drones, maxCapacityIndex, packages } = await DroneDeliveryService.extractInputData(filePath);
            DroneDeliveryService.distributePackages(drones, maxCapacityIndex, packages);
            const result = DroneDeliveryService.generateOutputContent(drones);
            res.status(200).send(result);
            
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    },
};

export { DroneDeliveryController };