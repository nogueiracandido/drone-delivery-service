import path from 'node:path';
import { describe, it, expect, beforeEach } from "vitest";
import { DroneDeliveryService } from "../DroneDeliveryService.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

describe('Drone Delivery Service', () => {
    let filePath, drones, maxCapacityIndex, packages, result;

    beforeEach(async () => {
        filePath = path.join(__dirname, './InputTest.txt');
        ({ drones, maxCapacityIndex, packages } = await DroneDeliveryService.extractInputData(filePath));
        DroneDeliveryService.distributePackages(drones, maxCapacityIndex, packages);
        result = DroneDeliveryService.generateOutputContent(drones);
    });

    it('should extract drone information', () => {
        expect(drones).toBeInstanceOf(Array);
        expect(typeof maxCapacityIndex).toBe('number');
        expect(packages).toBeInstanceOf(Array);
    });

    it('should distribute packages among drones', () => {
        expect(drones[0].trips.length).toBeGreaterThan(0);
        expect(packages.length).toBe(0);
    });

    it('should generate the correct output content', () => {
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);

        drones.forEach(drone => {
            expect(result.includes(`[${drone.name}]`)).toBe(true);
        });

        packages.forEach(packageTrip => {
            expect(result.includes(`[${packageTrip.name}]`)).toBe(true);
        });
    });
});
