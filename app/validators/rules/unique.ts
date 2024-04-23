import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'

/**
 * Options accepted by the unique rule
 */
type Options = {
    table: string
    column: string
}

/**
 * Implementation
 */
async function unique(
    value: unknown,
    options: Options,
    field: FieldContext
) {
    /**
     * We do not want to deal with non-string
     * values. The "string" rule will handle the
     * the validation.
     */
    if (typeof value !== 'string') {
        return
    }

    let query = db.from(options.table)

    if (field.data.params.id) {
        query = query
            .whereNot('id', field.data.params.id)
    }

    if (options.table === 'categories') {
        query
            .select(options.column, 'type')
            .where(options.column, value)
            .andWhere('type', field.data.type) 
    } else {
        query
            .select(options.column)
            .where(options.column, value)
    }

    const row = await query.first()

    if (row) {
        field.report(
            'The {{ field }} field is not unique',
            'unique',
            field
        )
    }
}


export const uniqueRule = vine.createRule(unique)