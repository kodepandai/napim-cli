`\`const { v4 as uuidv4 } = require('uuid')
const { Model, JSONSchema } = require('objection')
const BaseModel  = require('./BaseModel')


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
                    format: 'uuid'
                }
            },
            required: []
        }
    }
}
module.exports =  \${model_name}
\``