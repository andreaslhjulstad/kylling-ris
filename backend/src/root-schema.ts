import { personTypeDef } from "./person/person.js";

export const rootTypeDef = `#graphql
    type Query {
        people: [Person]
    }
`;

export const typeDefs = [rootTypeDef, personTypeDef];

const people = [
    { id: "1", name: "Ole" },
    { id: "2", name: "Li" },
    { id: "3", name: "Rune" },
    { id: "4", name: "Andreas" }
];

export const resolvers = {
    Query: {
        people: () => people
    }
};
