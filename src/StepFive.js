import '@babel/polyfill';
import '../css/style.scss';
import {gsap} from 'gsap';
import data from './temperature.json';
import mSun from '../assets/images/sun-big-white.png';
import Caulculate from './Calculate';

export default class StepFive {

  constructor() {

    this.mInterval;
    this.data = data;
    this.getCurrentTargetIndex = 0;

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

    this.container = document.createElement('div');
    this.container.id = 'container';
    this.container.className = 'container';
    document.body.appendChild(this.container);

    //** START: Setting up menu */

    this.yearContainer = document.createElement('div');
    this.yearContainer.id = 'yearContainer';
    this.yearContainer.className = 'yearContainer';
    document.body.appendChild(this.yearContainer);

    this.yearContainer.innerHTML ='' +
      this.data.temperature.map((item, index) => {
          return `
  <div class = '${'year' + index}' id='year' data-index=${index}  >${this.data.temperature[index].year}</div>
   
          `; //END return
        })
        .join('') +'';

    this.getchildYearCon = document.querySelectorAll('#yearContainer > #year');

    this.getchildYearCon.forEach((item) => {
      item.addEventListener('click', (event) => {

        this.getCurrentTargetIndex = event.currentTarget.dataset.index;
       
        for (let i = 0; i < this.getchildYearCon.length; i++) {
          this.getchildYearCon[i].style.backgroundColor = '#36aad8';
        }
      
        let getDataFromIndex = this.data.temperature[this.getCurrentTargetIndex].averageTemperature;

        this.cal = new Caulculate(getDataFromIndex);
        this.getAverageTemp(this.getCurrentTargetIndex);

        event.currentTarget.style.backgroundColor = '#04658c';

      });
    });

    //** END: Setting up menu */

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

    this.cal = new Caulculate(this.data.temperature[0].averageTemperature);
    this.getAverageTemp(this.getCurrentTargetIndex);


  } // END constructor

  getAverageTemp(currentMenuItemIndex){

    let getchildTempCon = document.querySelectorAll("#childCon > #temperature");

            for(let i=0;i<getchildTempCon.length;i++){
     
               document.querySelector(".temp" + i).innerHTML=this.data.temperature[currentMenuItemIndex].averageTemperature[i];

             }
   
  }


  


  }



