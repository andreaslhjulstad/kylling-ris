export const userTypeDef = `#graphql
    type User
    @query(read: false, aggregate: false)
    @mutation(operations: [])
    {
        name: String
        email: String
        password: String
    }
`;
