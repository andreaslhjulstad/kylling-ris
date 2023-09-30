export default interface Food {
  id: number;
  name: string;
  brand: string;
  vendor: string;
  ean: string;
  url: string;
  image: string;
  category: Category[];
  description: string;
  ingredients: string;
  current_price: number;
  current_unit_price: number;
  weight: number;
  weight_unit: string;
  store: Store;
  price_history: PriceHistory[];
  allergens: Allergen[];
  nutrition: Nutrition[];
  labels: Label[];
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  depth: number;
  name: string;
}

interface Store {
  name: string;
  code: string;
  url: string;
  logo: string;
}

interface PriceHistory {
  price: number;
  date: string;
}

interface Allergen {
  code: string;
  display_name: string;
  contains: string;
}

interface Nutrition {
  code: string;
  display_name: string;
  amount: number;
  unit: string;
}

interface Label {
  name: string;
  display_name: string;
  description?: string;
  organization?: string;
  alternative_names: string;
  type?: string;
  year_established?: number;
  about?: string;
  note: string;
  icon: Icon;
}

interface Icon {
  svg: string;
  png: string;
}
