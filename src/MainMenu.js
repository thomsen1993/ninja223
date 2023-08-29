import data from "../assets/json/data.json"

class MainMenu {

    constructor() {

        const title = document.createElement("h1")
        document.body.appendChild(title)
        title.innerHTML = "Welcome to Ninja card"

        title.addEventListener("click", ()=> {

            console.log (data.content)
            

        })

    }

}

export default MainMenu