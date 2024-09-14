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
/**
 * Check if slot1 is a subset of slot2.
 * @param slot1 - First slot to check
 * @param slot2 - Second slot to compare with
 * @returns boolean - True if slot1 is a subset of slot2
 */
export function isSubset(slot1: Slot, slot2: Slot): boolean {
    return (
        slot1.startTime >= slot2.startTime &&
        slot1.endTime <= slot2.endTime
    );
}