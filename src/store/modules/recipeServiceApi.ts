import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import { collection } from "firebase/firestore";
import { getCollection } from "@/plugins/firebase";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;


export default class {

  public static fetchRecipes(): Recipe[] {
    const data: Recipe[] = [];
    getCollection().then(res => {
      res.forEach((doc) => {
        data.push(doc.data() as Recipe)
      });
    });
    return data as Recipe[];
  }
}
