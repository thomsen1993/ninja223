import "@babel/polyfill";
import "../css/style.scss";

export default class stepTwo {
  constructor() {

  
    this.weather = {
      author: "The Weatherman",
      month: ["januar", "februar", "marts", "april", "maj", "juni", "juli"],

      temperature: [
        {
          year: "2018",
          averageTemperature: [5, 4, 3, 11, 14, 21, 23],
        },

        {
          year: "2019",
          averageTemperature: [2, 5, 5, 12, 13, 22, 24],
        },

        {
          year: "2020",
          averageTemperature: [12, 8, 2, 14, 17, 29, 22],
        },
      ],
      iconType: ["cold", "cold", "cold", "notThatCold", "nice", "hot", "hot"],
    };


    this.container = document.createElement("div");
    this.container.id = "container";
    this.container.className = "container";
    document.body.appendChild(this.container);

    this.container.innerHTML =
      "" +
      this.weather.month
        .map((item, index) => {
          return `

            <div id="childCon">
                 <div class = '${"maps" + index}' id='block'></div>
                 <div class = '${"temp" + index}' id="temperature" >${this.weather.temperature[0].averageTemperature[index]
                 }</div>
                 <div class="month">${this.weather.month[index]}</div>
             </div>
                
                `; //END return
        })
        .join("") +
      "";
  } // END constructor
}
