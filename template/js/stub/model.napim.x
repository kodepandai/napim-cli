`\`const { v4 as uuidv4 } = require('uuid')
const { Model, JSONSchema } = require('objection')

class \${model_name} extends Model {

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
        }
    }
}
export default \${model_name}
\``