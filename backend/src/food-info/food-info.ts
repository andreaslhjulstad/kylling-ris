import mockFoodInfos from "./mock-food-infos.json" assert { type: "json" };

export const foodInfoTypeDef = `#graphql
    type FoodInfo {
        id: ID!   
        name: String!
        brand: String!
        defaultWeight: Float!
        weightUnit: String!
        allergens: [String!]!
        relativeCalories: Float!
        relativeProtein: Float!
    }
`;

interface FoodInfo {
    id: string;
    name: string;
    brand: string;
    defaultWeight: number;
    weightUnit: string;
    allergens: string[];
    // per 100units
    relativeCalories: number;
    relativeProtein: number;
}

export const foodInfos = (
    _: object,
    {
        offset,
        limit,
        searchQuery,
        allergens,
        sort
    }: {
        offset?: number;
        limit?: number;
        searchQuery?: string;
        allergens?: string[];
        sort?: string;
    }
) =>
    mockFoodInfos
        .filter((food) => queryIsSimilarTo(searchQuery ?? "", food.name))
        .filter(
            (food) =>
                !(allergens ?? []).some((allergen) =>
                    food.allergens.includes(allergen)
                )
        )
        .sort(sortComparison[sort ?? ""] ?? sortComparison["name-ascending"])
        .slice(offset ?? 0, (offset ?? 0) + (limit ?? 10));

const sortComparison: {
    [sortName: string]: (a: FoodInfo, b: FoodInfo) => number;
} = {
    "name-ascending": (a, b) => a.name.localeCompare(b.name),
    "name-descending": (a, b) => b.name.localeCompare(a.name),
    "protein-ascending": (a, b) => a.relativeProtein - b.relativeProtein,
    "protein-descending": (a, b) => b.relativeProtein - a.relativeProtein,
    "kcal-ascending": (a, b) => a.relativeCalories - b.relativeCalories,
    "kcal-descending": (a, b) => b.relativeCalories - a.relativeCalories
};

// Temporary. Should be done with a better algorithm.
// Query is similar, here, if the term starts with the query (case insensitive).
// "kyl" is similar to "Kyllingfilet" - "xkyl" is not.
const queryIsSimilarTo = (rawQuery: string, rawTerm: string): boolean => {
    const query = rawQuery.toLowerCase();
    const term = rawTerm.toLowerCase();
    for (let i = 0; i < query.length; i++) {
        if (term.charAt(i) !== query.charAt(i)) {
            return false;
        }
    }
    return true;
};
