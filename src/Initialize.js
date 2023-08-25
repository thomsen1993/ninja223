import "@babel/polyfill";
//import 'bootstrap/dist/css/bootstrap.min.css'
import "../css/style.scss";
import { gsap } from "gsap";
import data from "./temperature.json";
import mSun from "../assets/images/sun-big-white.png";
import Caulculate from "./Calculate";

import svg from "../assets/images/close.svg";
import closeSVG from "./closeSVG";

export default class Initialize {
  constructor() {

    this.counter = -1;
    this.mInterval;
    this.dailyWeatherLoopEnd = false;
    this.getCurrentTargetIndex =0;

    console.log(data.month);

     this.mclose=closeSVG();

    this.weather = {
      author: "The Weatherman",
      month: ["januar", "februar", "marts", "april", "maj", "juni", "juli"],
      dayesInMonth: [31, 28, 31, 30, 31, 30, 31],
      dailyDegrees: [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1],
      temperature: [
        {
          year: "2018",
          averageTemperature: [3, 4, 5, 11, 14, 21, 23],
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

    //different types of loops
    /*

                    this.weather.month.forEach(item => {
            
                        console.log(item);
                    })
            
                    for(let i =0; i< this.weather.month.length; i++){
            
                      console.log(this.weather.month[i]);
            
                    }

                 */

    this.sun = document.createElement("div");
    this.sun.id = "sun";
    this.sun.className = "sun";
    document.body.appendChild(this.sun);
    this.sun.innerHTML = `<img src  = ${mSun} />`;

    /*
  let cubeRotating = [
      {transform: 'rotate(0deg)'},
      {transform: 'rotate(360deg)'}
     
    ]

    let cubeTiming = {
      duration: 30000,
      iterations: Infinity
    }

    document.querySelector('#sun').animate(
      cubeRotating, 
      cubeTiming
  )
*/

/*
    gsap.fromTo(
      "#sun",
      {
        rotation: 0,
      },
      {
        transformOrigin: "center",
        rotation: 360,
        duration: 30,
        repeat: -1,
      },
      0
    );

    */


    gsap.to("#sun", {
      duration:30,
       rotation: 359,
       transformOrigin: "center",
       repeat:-1
    });
  
    

    //const tl = gsap.timeline();

   //tl.set("#sun", {transformOrigin: "50% 50%"})
    // gsap.fromTo("#sun", {scaleY: 1, rotation:0}, {scaleY: 1.5,rotation:360, duration: 100, repeat: -1, ease: "linear"})

    this.container = document.createElement("div");
    this.container.id = "container";
    this.container.className = "container";
    document.body.appendChild(this.container);

    this.yearContainer = document.createElement("div");
    this.yearContainer.id = "yearContainer";
    this.yearContainer.className = "yearContainer";
    document.body.appendChild(this.yearContainer);
    //this.yearContainer.innerHTML = "2018";

    this.temeperatureLength = this.weather.temperature.length;

    this.yearContainer.innerHTML = "" +
      this.weather.temperature.map((item, index) => {

          return `
  <div class = '${"year" + index}' id='year' data-index=${index} >${this.weather.temperature[index].year}</div>
   
          `; //END return
        })
        .join("") + "";

    this.getchildYearCon = document.querySelectorAll("#yearContainer > #year");

    this.getchildYearCon.forEach((item) => {
      item.addEventListener("click", (event) => {

        for (let i = 0; i < this.getchildYearCon.length; i++) {
          
          let item = this.getchildYearCon[i];
       
          item.style.backgroundColor = "#36aad8"

        }

        //this.calculate(this.weather.temperature[event.currentTarget.dataset.index].averageTemperature);

        this.cal = new Caulculate( this.weather.temperature[event.currentTarget.dataset.index].averageTemperature );

       

        console.log(event.currentTarget.dataset.index);

        this.getCurrentTargetIndex = event.currentTarget.dataset.index;
        this.getAverageTemp(this.getCurrentTargetIndex);

        event.currentTarget.style.backgroundColor = "#04658c";
      


      });
    });

    this.modalContainer = document.createElement("div");
    this.modalContainer.id = "modalContainer";
    this.modalContainer.className = "modalContainer";
    document.body.appendChild(this.modalContainer);

    this.closeModal = document.createElement("div");
    this.closeModal.id = "closeModal";
    this.closeModal.className = "closeModal";
    document.body.appendChild(this.closeModal);
    //this.closeModal.innerHTML = `<img src = '${svg}' />`;
    //this.closeModal.innerHTML = this.mclose;
    this.closeModal.innerHTML = `<svg id="Lag_2" data-name="Lag 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.53 67.53"><defs><style>.cls-1{fill:#fff;}</style></defs><rect class="cls-1" x="40.31" y="7.94" width="20.52" height="86.33" rx="10" transform="translate(-38 33.26) rotate(-45)"/><rect class="cls-1" x="40.05" y="8.2" width="20.52" height="86.33" rx="10" transform="translate(34.38 -38) rotate(45)"/></svg>`;

    this.dailyWeatherContainer = document.createElement("div");
    this.dailyWeatherContainer.id = "dailyWeatherContainer";
    this.dailyWeatherContainer.className = "dailyWeatherContainer";
    document.body.appendChild(this.dailyWeatherContainer);

    const close = document.querySelector("#closeModal");

    close.addEventListener("click", (event) => {
      this.e = event.currentTarget;

      gsap.to([this.e, this.modalContainer], {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          this.e.style.display = "none";
          this.modalContainer.style.display = "none";
        },
      });
      //*** resetting *** 
      this.modalDailyWeather.remove();
      this.modalDailyWeatherDegrees.remove();
      clearInterval(this.mInterval);
      this.counter = -1;
      this.dailyWeatherLoopEnd = false;
      clearInterval(this.mInterval);
    });

    this.container.innerHTML = "" +
      this.weather.month.map((item, index) => {

          return `

            <div id="childCon">
                 <div class = '${"maps" + index}' id='block' data-index=${index} ></div>
                 <div class = '${"temp" + index}' id="temperature" ></div>
                 <div class="month">${this.weather.month[index]}</div>
             </div>
                
                `; //END return
        })
        .join("") + "";

              this.getAverageTemp(this.getCurrentTargetIndex);

    let getchildConChild = document.querySelectorAll("#childCon > #block");

    getchildConChild.forEach((item) => {
      item.addEventListener("click", (event) => {

      let getTargetClassName = parseInt(event.target.className.substr(4, 4));

        document.querySelector("#modalContainer").style.display = "block";
        document.querySelector("#dailyWeatherContainer").style.display =  "block";

        gsap.to("#modalContainer", {
          duration: 1,
          opacity: 0.8,
          onComplete: () => {
            document.querySelector("#closeModal").style.display = "block";
            gsap.to("#closeModal", { duration: 1, opacity: 1 });
          },
        });

        this.modalDailyWeather = document.createElement("div");
        this.modalDailyWeather.id = "modalDailyWeather";
        this.modalDailyWeather.className = "modalDailyWeather";
        document.querySelector("#dailyWeatherContainer").appendChild(this.modalDailyWeather);

        this.modalDailyWeatherDegrees = document.createElement("div");
        this.modalDailyWeatherDegrees.id = "modalDailyWeatherDegrees";
        this.modalDailyWeatherDegrees.className = "modalDailyWeatherDegrees";
        document.querySelector("#dailyWeatherContainer").appendChild(this.modalDailyWeatherDegrees);

        //console.log(this.weather.dayesInMonth[getTargetClassName]);

        for (let ii = 0;ii < this.weather.dayesInMonth[getTargetClassName];ii++) {

          this.modalDailyWeather.innerHTML += 
          `
          <div class = '${"daily" + ii}' style="width:25px;background-color:#fff"></div>
          
          `;

          this.modalDailyWeatherDegrees.innerHTML += 
          `
          <div class = '${"daily" + ii}' style="width:25px;background-color:#36aad8;margin-top:10px" >${this.weather.dailyDegrees[ii]
            }</div>

          `;

          if (ii == this.weather.dayesInMonth[getTargetClassName] - 1) {
            console.log("im done");

            this.dailyWeatherLoopEnd = true;
          }
        }

        if (this.dailyWeatherLoopEnd) {
          this.mInterval = setInterval(() => {
            this.counter++;

            gsap.to(
              document.querySelectorAll(
                "#modalDailyWeather > .daily" + this.counter
              ),
              {
                duration: 1,
                scaleY: this.weather.dailyDegrees[this.counter],
                alpha: 1,
                transformOrigin: "bottom",
                ease: "elastic.out",
              }
            );


            if (this.counter ==this.weather.dayesInMonth[getTargetClassName] - 1) {
              clearInterval(this.mInterval);
              this.counter = -1;
              this.dailyWeatherLoopEnd = false;
            }
          }, 50); //END interval
        } //END if

        
      }); //END ClickEvent
    }); //END forEach

    //this.calculate(this.weather.temperature[0].averageTemperature);
    this.cal = new Caulculate( this.weather.temperature[0].averageTemperature );

    console.log(this.getDaysInMonth(1, 2018));

  } // END constructor

  calculate(averagetemp) {

    let averagetempLength = averagetemp.length;

    for (let i = 0; i < averagetempLength; i++) {

      let obj = document.querySelector(".maps" + i);

      gsap.to(obj, {
        duration: 1,
        scaleY: (averagetemp[i] / 10).toFixed(2),
        transformOrigin: "bottom",
        ease: "elastic.out(1, 0.3)",
      });

      if (averagetemp[i] > 10 && averagetemp[i] < 20) {
       obj.style.backgroundColor ="#F2A922";
      } else if (averagetemp[i] > 20) {
       obj.style.backgroundColor ="#F27F1B";
      }else{
        obj.style.backgroundColor ="#b4e0eb";

      }
    }
  }

  getAverageTemp(mTemp){

    let getchildTempCon = document.querySelectorAll("#childCon > #temperature");

   for(let i=0;i<getchildTempCon.length;i++){
     
    document.querySelector(".temp" + i).innerHTML=this.weather.temperature[mTemp].averageTemperature[i];

     }
   
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 0.5) + min);
  }

  getDaysInMonth (month,year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
   return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
  };

}
