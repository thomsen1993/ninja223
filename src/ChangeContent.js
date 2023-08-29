import { gsap } from "gsap"

class ChangeContent {

    constructor() {

        this.currentDataIndex = -1
        
        
    }
    
    getData (e, el) {

        this.currentDataIndex = e.currentTarget.dataset.index

        document.querySelector("#info").style.display = "none"
        
        let mHeadline = document.querySelector("#headline")
        mHeadline.textContent = el.name
    
        const imgSrc = el.img
        const img = "../assets/images/" + imgSrc
        let mImg = document.querySelector("#showImg")
        mImg.src = img
    
        let mContent = document.querySelector("#content")
        mContent.textContent = el.text
    
        /* gsap.to("#cardContainer", {

            duration: .2,
            scaleX: -1,
            repeat: 1,
            yoyo: true
            
        }) */
    
        gsap.from("#cardContainer", {
    
            duration: .1,
            scale: 1.2,
            repeat: 2,
            yoyo: true
            
        })
        
        gsap.to("#cardContainer", {
            
            duration: .1,
            scale: 1,
            yoyo: true
            
        })

    }

    get currentIndex() {

        return this.currentDataIndex
    }

}

export default ChangeContent