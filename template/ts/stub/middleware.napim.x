`\`import { ApiException, IMiddleware } from 'napim'

const \${middleware_name}: IMiddleware = {
    /**
     * executed before service run
     * you can filter user input or make authorization here
     */
    before: (req, service, input, next) => {
        try {
            //make some logic here
            next(input)
        } catch (err) {
            throw new ApiException("Access denied", {}, 403, { type: "ACCESS_DENIED", detail: "" })
        }
    },
    /**
     * executed after service run
     * there is no next method here, this is final method after service execution
     */
    after: (req, service, input) => {
        //or just do nothing
    }
}

export default \${middleware_name}
\``