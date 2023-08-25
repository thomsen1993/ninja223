import {gsap} from 'gsap';

export default class Calculate {

  constructor(averagetemp) {

    let averagetempLength = averagetemp.length;

    for (let i = 0; i < averagetempLength; i++) {

      let obj = document.querySelector('.maps' + i);

      gsap.to(obj, {
        duration: 1,
        scaleY: (averagetemp[i] / 15).toFixed(2),
        transformOrigin: 'bottom',
        ease: 'elastic.out(1, 0.3)',
      });

      if (averagetemp[i] > 10 && averagetemp[i] < 20) {
        obj.style.backgroundColor = '#F2A922';
      } else if (averagetemp[i] > 20) {
        obj.style.backgroundColor = '#F27F1B';
      } else {
        obj.style.backgroundColor = '#b4e0eb';
      }

      

    } //END loop
  }// END constructor
} // End class
