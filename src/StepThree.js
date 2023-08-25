import "@babel/polyfill";
//import 'bootstrap/dist/css/bootstrap.min.css'
import "../css/style.scss";
import { gsap } from "gsap";
import data from "./temperature.json";
import mSun from "../assets/images/sun-big-white.png";

//import { TweenMax, TimelineMax } from "gsap";
export default class StepThree {

  constructor() {

this.counter=-1;
this.mInterval;

    this.weather = {
      author: "The Weatherman",
      month: ["januar", "februar", "marts", "april", "maj", "juni", "juli"],
      dayesInMonth: [31, 28, 31, 30, 31, 30, 31],
      dailyDegrees:[1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1],
      temperature: [
        {
          year: "2018",
          averageTemperature: [3, 4, 5, 11, 14, 21, 23]
        },

        {
          year: "2019",
          averageTemperature: [2, 5, 5, 12, 13, 22, 24]
        },

        {
          year: "2020",
          averageTemperature: [12, 8, 2, 14, 17, 29, 22]
        },
      ],
      iconType: ["cold", "cold", "cold", "notThatCold", "nice", "hot", "hot"]
    };


    this.sun = document.createElement("div");
    this.sun.id = "sun";
    this.sun.className = "sun";
    document.body.appendChild(this.sun);
    this.sun.innerHTML = `<img src  = ${mSun} />`;


    gsap.to("#sun", {
      duration:30,
       rotation: 360,
       transformOrigin: "center",
repeat:-1
    });
   
 
    this.container = document.createElement("div");
    this.container.id = "container";
    this.container.className = "container";
    document.body.appendChild(this.container);


    this.container.innerHTML = "" +
      this.weather.month.map((item, index) => {

          return `

            <div id="childCon">
                 <div class = '${"maps" + index}' id='block' data-index=${index} ></div>
                 <div class = '${"temp" + index}' id="temperature" >${this.weather.temperature[0].averageTemperature[index]}</div>
                 <div class="month">${this.weather.month[index]}</div>
             </div>
                
                `; //END return
        })
        .join("") +
      "";


    this.calculate(this.weather.temperature[0].averageTemperature);
    
  } // END constructor


  calculate(averagetemp) {
    let averagetempLength = averagetemp.length;

    for (let i = 0; i < averagetempLength; i++) {
      gsap.to(document.querySelectorAll("#childCon > .maps" + i), {
        duration: 1,
        scaleY: (averagetemp[i] / 10).toFixed(2),
        transformOrigin: "bottom",
        ease: "elastic.out(1, 0.3)",
      });
 
      if(averagetemp[i] > 10 && averagetemp[i] < 20){
        document.querySelector("#childCon > .maps" + i).style.backgroundColor="#F2A922";

      }else if(averagetemp[i] > 20){
        document.querySelector("#childCon > .maps" + i).style.backgroundColor="#F27F1B";

      }

    }

    
  }

randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 0.5) + min);
  }


}
