export interface Slot {
    id: number,
    userId: number,
    date: Date,
    available: boolean,
    startTime: string,
    endTime: string,
    isDeleted: boolean,
    availabilityId: number,
    createdAt: Date,
}

export interface OverlapSlot {
    startTime: string;
    endTime: string;
}