import vine from '@vinejs/vine'

export const noteValidator = vine.compile(
    vine.object({
        category_id: vine.number().optional(),
        todo: vine.string(),
        remarks: vine.string().optional(),
        is_important: vine.boolean().optional(),
        reminder: vine.date().optional()
    })
)