import Recipe from "@/modules/features/rezeptbuch/types/Recipe";

export default class User {
  id;
  firstName;
  lastName;
  userName;
  email;
  lastLogin;
  private recipes?: Recipe[];

  constructor() {
    this.id = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.userName = undefined;
    this.email = undefined;
    this.lastName = undefined;
    this.recipes = [];
  }

  withId(value: string): User {
    this.id = value;
    return this;
  }

  withFirstName(value: string): User {
    this.firstName = value;
    return this;
  }

  withLastName(value: string): User {
    this.lastName = value;
    return this;
  }

  withUserName(value: string): User {
    this.userName = value;
    return this;
  }

  withEmail(value: string): User {
    this.email = value;
    return this;
  }

  withLastLogin(value: string): User {
    this.lastLogin = value;
    return this;
  }

  withRecipes(value: Recipe[]): User {
    this.recipes = value;
    return this;
  }

  addRecipe(value: Recipe): void {
    this.recipes ? this.recipes.push(value) : (this.recipes = [value]);
  }

  public static createEmtptyUser(): User {
    return new User();
  }
}
