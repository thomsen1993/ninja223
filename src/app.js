//import Initialize from "./Initialize";
import ShowActor from "./ShowActors";
import "../css/style.scss";
import data from "../assets/json/data.json"
import MainMenu from "./MainMenu";

// **  IIFE: Immediately Invoked Function Expression  */

(function() {

  new ShowActor(data.content)
  //new MainMenu
  

})();
