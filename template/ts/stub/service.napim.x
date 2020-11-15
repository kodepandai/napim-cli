`\`import { IService } from 'napim'

const \${service_name}: IService = {
    method: \${method},
    transaction: false,
    middleware: [],
    prepare: async (input, trx) => {
        return input
    },
    process: async (input, originalInput, trx) => {
        return input
    },
    rules: {},

}

export default \${service_name}
\``