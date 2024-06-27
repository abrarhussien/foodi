import { IIngredient } from "./ingredient.model";
import { IMenuCategory } from "./menuCategory.model";

export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  icon: string;
  restaurantId: string;
  menuCategoryId: IMenuCategory;
  ingredientsIds: IIngredient[];
}
