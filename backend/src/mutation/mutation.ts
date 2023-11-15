export const mutationTypeDef = `#graphql
    type Mutation {
        createGuest: ID @cypher(
            statement: """
                CREATE (guest:User {name: 'Guest'})
                RETURN id(guest) AS id
            """,
            columnName: "id"
        )

        signUp(name: String!, email: String!, password: String!): ID @cypher(
            statement: """
                CREATE (user:User {
                    name: $name,
                    email: $email,
                    password: $password
                })
                RETURN id(user) AS id
            """,
            columnName: "id"
        )
    }
`;
