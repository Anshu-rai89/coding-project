export const registerUserSchema = {
    body: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            name: { type: 'string' },
            timeZone: { type: 'string', default: 'UTC' },
            slotDuration: { type: 'integer', enum: [60, 30, 15], default: 60 },
            dayStartTime: { type: 'string', pattern: '^([0-1]\\d|2[0-3]):([0-5]\\d)$', default: '08:00' }, // 24-hour format validation
            dayEndTime: { type: 'string', pattern: '^([0-1]\\d|2[0-3]):([0-5]\\d)$', default: '17:00' }, // 24-hour format validation
        },
    }
}