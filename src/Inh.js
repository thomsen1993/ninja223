import Person from "./Person"

export default class Inh extends Person {

  constructor() {
     super();

   
     console.log(this._name);//variable from Person
     console.log(this.age);//getter from Person
      console.log(this.age = 13); //setter from Person

    console.log(this.tastes());
  }

  tastes() {
    return `${this.name} smager skøøøøønt!`;
}

}
