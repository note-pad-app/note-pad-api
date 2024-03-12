import vine from '@vinejs/vine'

let schema = {
    categoryId: vine.number().optional(),
    todo: vine.string(),
    remarks: vine.string().optional(),
    is_important: vine.boolean().optional(),
    reminder: vine.string().optional()
}

export const storeValidator = vine.compile(
    vine.object(schema)
)

export const updateValidator = vine.compile(
    vine.object({ ...schema, todo: vine.string().optional() })
)

export const completedValidator = vine.compile(
    vine.object({
        is_complete: vine.boolean()
    })
)