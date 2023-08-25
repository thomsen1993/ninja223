
export default class Person {
  constructor() {

    this._data = {
      name: 'Lakrids',
      age: 12,
    };

    this._name = 'Lakrids';
    this._age = 12;
  }

  get name() {
    return this._name;
  }

  get data() {
    return this._data;
  }

  get age() {
      console.log('ready get');
    return this._age;
  }

  set age(newAge) {
    console.log('set triggered!')
    this._age = newAge;
    
   
  }


}
