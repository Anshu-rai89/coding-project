import { Slot, OverlapSlot } from "../types/slot";
import { timeStringToMinutes, minutesToTimeString,formatTime, addMinutes, parseTime } from ".";

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

export function mergeSlots(slots: Slot[]): { startTime: number, endTime: number }[] {
    if (slots.length === 0) return [];

    const sortedSlots = slots.filter(slot => slot.available)
        .map(slot => ({
            startTime: timeStringToMinutes(slot.startTime),
            endTime: timeStringToMinutes(slot.endTime),
        }))
        .sort((a, b) => a.startTime - b.startTime);

    const mergedRanges = [];
    let currentRange = { startTime: sortedSlots[0].startTime, endTime: sortedSlots[0].endTime };

    for (let i = 1; i < sortedSlots.length; i++) {
        const slot = sortedSlots[i];

        // If the current slot overlaps or is adjacent to the current range, merge them
        if (slot.startTime <= currentRange.endTime) {
            currentRange.endTime = Math.max(currentRange.endTime, slot.endTime);
        } else {
            // Push the merged range and convert back to 'HH:mm' format
            mergedRanges.push({
                startTime: currentRange.startTime,
                endTime: currentRange.endTime,
            });

            currentRange = { startTime: slot.startTime, endTime: slot.endTime };
        }
    }

    // Push the last merged range
    mergedRanges.push({
        startTime: currentRange.startTime,
        endTime: currentRange.endTime,
    });

    return mergedRanges;
}

export function calculateRangeOverlap(
    user1Slots: Slot[],
    user2Slots: Slot[]
): OverlapSlot[] {
    // Merge slots for both users to get their continuous availability ranges
    const user1Ranges = mergeSlots(user1Slots);
    const user2Ranges = mergeSlots(user2Slots);

    const overlapRanges = [];

    // Compare ranges for both users to find the overlap
    let i = 0;
    let j = 0;

    while (i < user1Ranges.length && j < user2Ranges.length) {
        const range1 = user1Ranges[i];
        const range2 = user2Ranges[j];

        const startOverlap = Math.max(range1.startTime, range2.startTime);
        const endOverlap = Math.min(range1.endTime, range2.endTime);

        if (startOverlap < endOverlap) {
            overlapRanges.push({
                startTime: minutesToTimeString(startOverlap),
                endTime: minutesToTimeString(endOverlap),
            });
        }

        // Move to the next range depending on which one ends first
        if (range1.endTime < range2.endTime) {
            i++;
        } else {
            j++;
        }
    }

    return overlapRanges;
}
