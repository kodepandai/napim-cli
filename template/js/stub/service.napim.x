`\`const \${service_name} = {
    method: \${method},
    transaction: false,
    prepare: async (input, trx) => {
        return input
    },
    process: async (input, originalInput, trx) => {
        return input
    },
    rules: {},

}

module.exports = \${service_name}
\``