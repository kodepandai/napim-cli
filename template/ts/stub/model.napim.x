`\`import { Model } from 'objection'

class \${model_name} extends Model {
    id!: number

    static get tableName() {
        return ''
    }
}
export default \${model_name}
\``