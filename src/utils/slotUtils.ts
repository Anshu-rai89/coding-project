import { Slot, OverlapSlot } from "../types/slot";
import { timeStringToMinutes, minutesToTimeString } from ".";

export const generateSlots = (startTime: string, endTime: string, slotDuration: number) => {
    const slots = [];
    let currentTime = parseTime(startTime);
    const endTimeParsed = parseTime(endTime);

    while (currentTime < endTimeParsed) {
        const nextTime = addMinutes(currentTime, slotDuration);
        if (nextTime <= endTimeParsed) {
            slots.push({
                startTime: formatTime(currentTime),
                endTime: formatTime(nextTime),
            });
        }
        currentTime = nextTime;
    }

    return slots;
};

const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes);
};

const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
};

const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};


// Helper function to find overlap between two time slots
export function findSlotOverlap(slot1: Slot, slot2: Slot): OverlapSlot | null {
    const start1 = timeStringToMinutes(slot1.startTime);
    const end1 = timeStringToMinutes(slot1.endTime);
    const start2 = timeStringToMinutes(slot2.startTime);
    const end2 = timeStringToMinutes(slot2.endTime);

    const overlapStart = Math.max(start1, start2);
    const overlapEnd = Math.min(end1, end2);

    if (overlapStart < overlapEnd) {
        return {
            startTime: minutesToTimeString(overlapStart),
            endTime: minutesToTimeString(overlapEnd),
        };
    }

    return null;
}