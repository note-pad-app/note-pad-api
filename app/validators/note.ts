import vine from '@vinejs/vine'

export const noteValidator = vine.compile(
    vine.object({
        category_id: vine.number(),
        note: vine.string(),
    })
)