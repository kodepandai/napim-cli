`\`import { v4 as uuidv4 } from 'uuid'
import {JSONSchema } from 'objection'
import BaseModel from './BaseModel'

class \${model_name} extends BaseModel {
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
                    format: 'uuid'
                }
            },
            required: []
        } as JSONSchema
    }
}
export default \${model_name}
\``