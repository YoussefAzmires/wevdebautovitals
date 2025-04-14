export default interface MaintenanceRecords {
    id: number;
    carPart: string;
    lastChanged: string;
    nextChange: string;
    mileage: string;
}