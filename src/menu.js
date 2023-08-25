
import Caulculate from './Calculate';

export default class Menu {

    constructor(data) {

        this.data = data;
        this.getCurrentTargetIndex = 0;


        this.yearContainer = document.createElement('div');
        this.yearContainer.id = 'yearContainer';
        this.yearContainer.className = 'yearContainer';
        document.body.appendChild(this.yearContainer);

        this.yearContainer.innerHTML = '' +
            this.data.temperature.map((item, index) => {
                return `
<div class = '${'year' + index}' id='year' data-index=${index}  >${this.data.temperature[index].year}</div>

      `; //END return
            })
                .join('') + '';

        this.getchildYearCon = document.querySelectorAll('#yearContainer > #year');

        this.getchildYearCon.forEach((item) => {
            item.addEventListener('click', (event) => {

                this.getCurrentTargetIndex = event.currentTarget.dataset.index;

                for (let i = 0; i < this.getchildYearCon.length; i++) {
                    this.getchildYearCon[i].style.backgroundColor = '#36aad8';
                }

                let getDataFromIndex = this.data.temperature[this.getCurrentTargetIndex].averageTemperature;

                this.cal = new Caulculate(getDataFromIndex)
              
                this.getAverageTemp(this.getCurrentTargetIndex);

                event.currentTarget.style.backgroundColor = '#04658c';

            });
        });
        this.getAverageTemp(this.getCurrentTargetIndex);

      
    }

    getAverageTemp(currentMenuItemIndex) {

        let getchildTempCon = document.querySelectorAll("#childCon > #temperature");

        for (let i = 0; i < getchildTempCon.length; i++) {

            document.querySelector(".temp" + i).innerHTML = this.data.temperature[currentMenuItemIndex].averageTemperature[i];

        }

    }


}