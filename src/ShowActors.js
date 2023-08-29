import { gsap } from "gsap"
import ChangeContent from "./ChangeContent"
import MainMenu from "./MainMenu"

class ShowActor {

    constructor(data) {

        const CC = new ChangeContent()

        //menu

        const menuContainer = document.createElement("nav")
        menuContainer.id = "menuContainer"
        document.body.appendChild(menuContainer)

        const menuItemContainer = document.createElement("ul")
        menuItemContainer.id = "menuItemContainer"
        menuContainer.appendChild(menuItemContainer)

        data.forEach((el, index) => {
            
            const menuItem = document.createElement("li")
            menuItem.setAttribute("data-index", `${index}`)
            menuItem.className = "menuItem"
            menuItem.textContent = el.name
            menuItemContainer.appendChild(menuItem)

            menuItem.addEventListener("click", (e)=> CC.getData(e, el))

        });

        //END menu

        //card

        const cardContainer = document.createElement("section")
        cardContainer.id = "cardContainer"
        document.body.appendChild(cardContainer)

        const card = document.createElement("div")
        card.id = "card"
        cardContainer.appendChild(card)

        card.addEventListener("click", ()=> {

            if (CC.currentIndex > -1){
                
                document.querySelector("#info").style.display = "block"

                gsap.to("#info", {
                    duration: 0.05,
                    rotate: 10,
                    scale: 1.3,
                    repeat: 3,
                    transformOrigin: "center",
                    yoyo: true
                });

                let addInfo = data[CC.currentIndex].information
                
                let mStrength = document.querySelector("#strength")
                mStrength.textContent = addInfo.strength

                let mLives = document.querySelector("#lives")
                mLives.textContent = addInfo.lives

            }
        })

        const childCardArray = ["headline", "imgcon", "content", "info"]

        childCardArray.forEach((elem, index)=> {

            const cardChild = document.createElement ("div")
            cardChild.id = elem
            card.appendChild(cardChild)

        })

        const showImg = document.createElement("img")
        showImg.id = "showImg"
        showImg.src = "../assets/images/ninja.png"
        document.querySelector("#imgcon").appendChild(showImg)

        const infoChild = document.createElement("div")
        infoChild.id = "infoChild"
        document.querySelector("#info").appendChild(infoChild)
        
        infoChild.id = "infochild";
        document.querySelector("#info").appendChild(infoChild);

        const strength = document.createElement("div");
        strength.id = "strength";

        document.querySelector("#infochild").appendChild(strength);
        const lives = document.createElement("div");
        lives.id = "lives";
        document.querySelector("#infochild").appendChild(lives);


        //END card

        //new MainMenu

        //footer

        const footer = document.createElement("footer")
        footer.id = "footer"
        document.body.appendChild(footer)

        //END footer

    }

}

export default ShowActor