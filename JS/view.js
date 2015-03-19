/*jslint node: true, browser: true */
"use strict";

/* Without other stuff I need the model or MVC won't work) JavaScript is crap*/
function View(model) {

	var gamediv = document.getElementById("game"); //surrounding game div
	var gameCanvas =  document.getElementById("gameCanvas"); //link html canvas
	boolean firstUpdate = true; //To allow 'constructor' like call on first run


/*This function will be used to update the positioning in the view, like in GizmoBall*/
this.update = function() {


};


/*Functions for drawing each type of object */
/*this.draw = function() {
//Not yet implemented - May not be needed.
}*/

this.paddleDraw = function() {

}

this.ballDraw = function() {

}

this.brickDraw = function() {

}

/*Bin everything */
this.clear = function() {

};


}
