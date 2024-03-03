import fs from 'node:fs/promises';

const DroneDeliveryService = {

    removeBrackets(data) {
        return data.slice(1, -1)
    },

    extractDroneInformation(dronesData) {
        const droneEntries = dronesData.split(', ');

        const drones = [];
        let maxWeightMax = 0;
        let maxCapacityIndex = 0;

        for (let i = 0; i < droneEntries.length; i += 2) {
            const [droneName, weightData] = droneEntries.slice(i, i + 2);
            const droneMaxWeight = parseInt(weightData.split('[')[1].replace('\r', ''), 10);

            maxWeightMax = droneMaxWeight > maxWeightMax ? droneMaxWeight : maxWeightMax;
            maxCapacityIndex = droneMaxWeight > maxWeightMax ? i / 2 : maxCapacityIndex;

            drones.push({ name: this.removeBrackets(droneName), maximumWeight: droneMaxWeight, trips: [] });
        }

        return { maxCapacityIndex, drones };
    },

    extractPackageInformation(packagesData) {
        const packages = [];

        for (let i = 0; i < packagesData.length; i += 1) {
            const packageLine = packagesData[i];

            if (packageLine.trim().length === 0) {
                continue;
            }

            const [key, value] = packageLine.split(', ');

            if (key.includes('[') && value.includes('[')) {
                const packageName = key.split('[')[1].replace(']', '');
                const packageWeight = Number(value.split('[')[1].replace(']', '').replace('\r', ''));

                if (!isNaN(packageWeight) && packageName !== undefined) {
                    const packageTrip = { name: packageName, weight: packageWeight };
                    packages.push(packageTrip);
                }
            }
        }

        return packages;
    },

    async extractInputData(filePath) {
        const input = await fs.readFile(filePath, { encoding: 'utf-8' });
        const [dronesData, ...packagesData] = input.split('\n');
        const droneInfo = this.extractDroneInformation(dronesData);
        const packageInfo = this.extractPackageInformation(packagesData);

        return { drones: droneInfo.drones, maxCapacityIndex: droneInfo.maxCapacityIndex, packages: packageInfo };
    },

    distributePackages(drones, maxCapacityIndex, packages) {
        const sortedDrones = [...drones].sort((a, b) => b.maximumWeight - a.maximumWeight);

        let nextDroneToTripIndex = maxCapacityIndex;

        while (packages.length) {
            const { maximumWeight, trips } = sortedDrones[nextDroneToTripIndex];

            let tripWeight = 0;
            const trip = [];

            const sortedPackages = [...packages].sort((a, b) => a.weight - b.weight);

            for (const packageTrips of sortedPackages) {
                if (tripWeight + packageTrips.weight <= maximumWeight) {
                    tripWeight += packageTrips.weight;
                    trip.push(packageTrips.name);
                }

                if (tripWeight === maximumWeight) break;
            }

            trips.push(trip);

            trip.forEach((packageName) => {
                const index = packages.findIndex(({ name }) => name === packageName);
                packages.splice(index, 1);
            });

            nextDroneToTripIndex = (nextDroneToTripIndex + 1) % sortedDrones.length;
        }
    },

    generateOutputContent(drones) {
        return drones.reduce((output, drone, index, array) => {
            output += `[${drone.name}]\n`;
    
            const tripsOutput = drone.trips
                .filter(trip => trip.length > 0)
                .map((trip, index) => `[Trip #${index + 1}]\n[${trip.join('], [')}]\n`)
                .join('');
    
            output += tripsOutput + (index !== array.length - 1 ? '\n' : '');
    
            return output;
        }, "");
    },
};

export { DroneDeliveryService };