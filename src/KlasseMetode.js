export default class KlasseMetode {

  constructor () {
    console.log ('constructor');
    this.name = "Lakrids";
  }

  myFunction () {
    console.log ('myFunction fra KlasseMetode');
  }

  myReturnFunction(){

    return this.name;
  }

}
