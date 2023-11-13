import { RootState } from "../../store";

export const categoriesSelector = (state: RootState) => state.loadCategories.categories;
export const productsSelector = (state: RootState) => state.productsApi