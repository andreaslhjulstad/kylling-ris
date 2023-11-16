import { foodInfoTypeDef } from "./food-info/food-info.js";
import { mutationTypeDef } from "./mutation/mutation.js";
import { queryTypeDef } from "./query/query.js";
import { userTypeDef } from "./user/user.js";

export const typeDefs = [
    queryTypeDef,
    mutationTypeDef,
    foodInfoTypeDef,
    userTypeDef
];
