import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
    vine.object({
        category_id: vine.number().optional(),
        note: vine.string(),
    })
)

export const updateValidator = vine.compile(
    vine.object({
        category_id: vine.number().optional(),
        note: vine.string().optional(),
    })
)

export const favoriteValidator = vine.compile(
    vine.object({
        favorite: vine.boolean(),
    })
)