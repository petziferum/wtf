import Recipe, {
  recipeConverter,
} from "@/modules/features/rezeptbuch/types/Recipe";
import { db, getCollection } from "@/plugins/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export default class RecipeServiceApi {
  public static fetchRecipes(): Recipe[] {
    const data: Recipe[] = [];
    getCollection().then((res) => {
      res.forEach((doc) => {
        data.push(doc.data() as Recipe);
      });
    });
    return data as Recipe[];
  }

  public static async getRecipes(): Promise<Array<Recipe>> {
    const c = await getDocs(
      collection(db, "recipes").withConverter(recipeConverter)
    );
    const a: Recipe[] = [];
    c.forEach((el) => a.push(el.data()));
    return a;
  }

  public static async saveNewRecipe(recipe: Recipe): Promise<string> {
    //const recipeDbObject = recipeConverter.toFirestore(recipe);
    try {
      const ref = doc(collection(db, "test")).withConverter(recipeConverter);
      console.log("ref = ", ref.id);
      return await setDoc(ref, recipe).then(() => {
        return ref.id;
      });
    } catch (e) {
      console.error("error: ", e);
      return "error";
    }
  }

  public static async createNewEditRecipe(recipe: Recipe): Promise<string> {
    try {
      const ref = doc(collection(db, "test")).withConverter(recipeConverter);
      console.log("ref = ", ref.id);
      return await setDoc(ref, recipe).then(() => {
        return ref.id;
      });
    } catch (e) {
      console.error("error: ", e);
      return "error";
    }
  }
}
