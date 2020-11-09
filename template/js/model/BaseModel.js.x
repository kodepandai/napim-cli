`\/*
const { v4 } = require('uuid')
const { Model } = require('objection')

class BaseModel extends Model {

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
module.exports =  BaseModel
*\/`
