import { foodInfoTypeDef, foodInfos } from "./food-info/food-info.js";

export const rootTypeDef = `#graphql
    type Query {
        foodInfos(
            offset: Int,
            limit: Int,
            sort: String,
            allergens: [String!],
            searchQuery: String
        ): [FoodInfo!]!
    }
`;

export const typeDefs = [rootTypeDef, foodInfoTypeDef];

export const resolvers = {
    Query: {
        foodInfos
    }
};
