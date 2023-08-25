import '@babel/polyfill';
import '../css/style.scss';
import {gsap} from 'gsap';
import data from './temperature.json';
import mSun from '../assets/images/sun-big-white.png';
import  Menu from "./menu";
import Calculate from "./Calculate"

export default class StepSix {

  constructor() {

    this.data = data;
    
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

    } // END constructor

  } // END class



