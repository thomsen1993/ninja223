import "@babel/polyfill";
import "../css/style.scss";

export default class StepOne {

  constructor() {
   

  this.weather = {
        author: "The Weathermann",
        month: ["januar", "februar", "marts", "april", "maj", "juni" , "juli"],
        averageTemperature: [-10, -10, -10, 12, 15, 20, 25],
        iconType: ["cold", "cold", "cold", "notThatCold", "nice", "hot"]
    }

    
    this.container = document.createElement('div');
    this.container.id = "container";
    this.container.className = "container";
    document.body.appendChild(this.container);

    this.container.innerHTML = '' + this.weather.month.map((item, index) => {
         return `
              <div class = '${"maps" + index}' id='block'>${item}</div>
             `
     }).join('') + '';


  
  } // END constructor


}
