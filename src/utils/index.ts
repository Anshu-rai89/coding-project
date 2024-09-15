// Helper to convert "HH:mm" string to minutes since start of the day
export function timeStringToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// Helper to convert minutes since start of the day back to "HH:mm"
export function minutesToTimeString(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes);
};

export const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
};

export const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

export function formatTime2(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}