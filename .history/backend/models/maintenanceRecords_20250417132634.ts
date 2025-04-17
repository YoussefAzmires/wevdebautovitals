export default interface MaintenanceRecord {
    id: number;
    carPart: string;
    lastChanged: string;
    nextChange: string;
    mileage: string;
}