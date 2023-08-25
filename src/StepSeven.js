import '@babel/polyfill';
import '../css/style.scss';
import { gsap } from 'gsap';
import data from './temperature.json';
import mSun from '../assets/images/sun-big-white.png';
import Menu from "./menu";
import Calculate from "./Calculate"
import svg from "../assets/images/close.svg";
import closeSVG from "./closeSVG";

export default class StepSeven {

  constructor() {

    this.data = data;

    this.counter = -1;
    this.dailyWeatherLoopEnd = false;
    this.mInterval;

    this.sun = document.createElement('div');
    this.sun.id = 'sun';
    this.sun.className = 'sun';
    document.body.appendChild(this.sun);
    this.sun.innerHTML = `<img src  = ${mSun} />`;

    gsap.to('#sun', {
      duration: 30,
      rotation: 359,
      transformOrigin: 'center',
      repeat: -1,
    });

    this.menu = new Menu(this.data);

    this.container = document.createElement('div');
    this.container.id = 'container';
    this.container.className = 'container';
    document.body.appendChild(this.container);

    this.container.innerHTML = '' +
      this.data.month.map((item, index) => {
        return `
            <div id="childCon">
                 <div class = '${'maps' + index}' id='block' data-index=${index} ></div>

                 <div class='${"temp" + index}' id="temperature" ></div>
                 <div class="month">${this.data.month[index]}</div>
             </div> 
                `; //END return 
      })
        .join('') + '';

    this.cal = new Calculate(this.data.temperature[0].averageTemperature);


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

    const close = document.querySelector("#closeModal");

    close.addEventListener("click", (event) => {

      this.self = event.currentTarget;

      gsap.to([this.self, this.modalContainer], {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          this.self.style.display = "none";
          this.modalContainer.style.display = "none";
        },
      })
   
    //*** resetting *** 
    this.modalDailyWeather.remove();
    this.modalDailyWeatherDegrees.remove();
    clearInterval(this.mInterval);
    this.counter = -1;
    this.dailyWeatherLoopEnd = false;
    clearInterval(this.mInterval);

      
    });

    this.dailyWeatherContainer = document.createElement("div");
    this.dailyWeatherContainer.id = "dailyWeatherContainer";
    this.dailyWeatherContainer.className = "dailyWeatherContainer";
    document.body.appendChild(this.dailyWeatherContainer);


    let getchildConChild = document.querySelectorAll("#childCon > #block");

    getchildConChild.forEach((item) => {
      item.addEventListener("click", (event) => {


        let getTargetClassName = parseInt(event.target.className.substr(4, 4));

        document.querySelector("#modalContainer").style.display = "block";
        document.querySelector("#dailyWeatherContainer").style.display = "block";

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


        for (let ii = 0;ii < this.data.dayesInMonth[getTargetClassName];ii++) {

          this.modalDailyWeather.innerHTML += 
          `
          <div class = '${"daily" + ii}' style="width:25px;background-color:#fff"></div>
          
          `;

          this.modalDailyWeatherDegrees.innerHTML += 
          `
          <div class = '${"daily" + ii}' style="width:25px;background-color:#36aad8;margin-top:10px" >${this.data.dailyDegrees[ii]
            }</div>

          `;

          if (ii == this.data.dayesInMonth[getTargetClassName] - 1) {
            console.log("im done");

            this.dailyWeatherLoopEnd = true;
          }
        }

        if (this.dailyWeatherLoopEnd) {
          this.mInterval = setInterval(() => {

            this.counter++;

            gsap.to(document.querySelectorAll("#modalDailyWeather > .daily" + this.counter),{
                duration: 1,
                scaleY: this.data.dailyDegrees[this.counter],
                alpha: 1,
                transformOrigin: "bottom",
                ease: "elastic.out",
              }
            );


            if (this.counter ==this.data.dayesInMonth[getTargetClassName] - 1) {
              clearInterval(this.mInterval);
              this.counter = -1;
              this.dailyWeatherLoopEnd = false;
            }
          }, 50); //END interval
        } //END if



      })
    })

  } // END constructor

} // END class



