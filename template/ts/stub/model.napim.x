`\`import { v4 as uuidv4 } from 'uuid'
import { Model, JSONSchema } from 'objection'

class \${model_name} extends Model {
    uid!: string

    static get tableName() {
        return ''
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                uid: {
                    type: 'string',
                    format: 'uuid',
                    default: uuidv4()
                }
            },
            required: []
        } as JSONSchema
    }
}
export default \${model_name}
\``