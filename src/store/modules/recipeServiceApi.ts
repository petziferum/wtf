import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import { getCollection } from "@/plugins/firebase";

export default class {
  public static fetchRecipes(): Recipe[] {
    const data: Recipe[] = [];
    getCollection().then((res) => {
      res.forEach((doc) => {
        data.push(doc.data() as Recipe);
      });
    });
    return data as Recipe[];
  }
}
