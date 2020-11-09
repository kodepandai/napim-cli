`\/*
import { v4 } from 'uuid'
import { Model } from 'objection'

class BaseModel extends Model {
    uid!: string
    created_at!: Date
    updated_at!: Date
    deleted_at!: Date | null

    static get idColumn() {
        return 'uid'
    }

    $beforeInsert() {
        this.uid = v4()
        this.created_at = new Date()
        this.updated_at = new Date()
    }
    $beforeUpdate() {
        this.updated_at = new Date()
    }
}
export default BaseModel
*\/`
