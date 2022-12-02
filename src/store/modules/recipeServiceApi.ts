import Recipe, {
  recipeConverter,
} from "@/modules/features/rezeptbuch/types/Recipe";
import { db, getCollection } from "@/plugins/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

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

  public static async updateEditRecipe(recipe: Recipe): Promise<void> {
    const ref = doc(db, "test", recipe.id as string);
    await updateDoc(ref, {
      timestamp: serverTimestamp(),
    }).then((res) => {
      console.log("update fertig", res);
    });
  }

  public static async overwriteRecipe(recipe: Recipe): Promise<Recipe> {
    const ref= doc(collection(db, "test"));
    const set = await setDoc(doc(ref, recipe.id as string), recipe).then(()=> recipe);
    return set;
  }
}
