import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "@/plugins/firebase";
import firebase from "firebase/compat";
import User from "@/modules/features/user/types/User";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export default class UserServiceApi {
  static async userLogin(
    email: string,
    password: string
  ): Promise<string | void> {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        const user = credentials.user.uid;
        console.log("credential user: ", user);
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  static async getUserAccount(userId: string): Promise<User | void> {
    const q = query(collection(db, "users"), where("id", "==", userId));

    const userDoc = await getDocs(q);

    let fireUser: User = User.createEmtptyUser();
    if (userDoc.empty) {
      console.log("leer");
    } else {
      userDoc.forEach((doc) => {
        const data = doc.data();
        fireUser = fireUser
          .withEmail(data.email)
          .withId(userId)
          .withUserName(data.userName)
          .withFirstName(data.firstName)
          .withLastName(data.lastName)
          .withLastLogin(data.lastLogin);
      });
    }
    return fireUser;
  }
}
