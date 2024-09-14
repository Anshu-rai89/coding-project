export interface Slot {
    userId: number,
    date: string,
    isAvailable: boolean,
    startTime: string,
    endTime: string,
    slotDuration: number
}

export interface OverlapSlot {
    startTime: string;
    endTime: string;
}