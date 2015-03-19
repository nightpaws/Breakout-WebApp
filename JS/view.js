/*jslint node: true, browser: true */
"use strict";

/* Without other stuff I need the model or MVC won't work) JavaScript is crap*/
function View(model) {

    var gamediv = document.getElementById("game"); //surrounding game div
    var gameCanvas = document.getElementById("gameCanvas"); //link html canvas
    var firstUpdate = true; //To allow 'constructor' like call on first run


    /*This function will be used to update the positioning in the view, like in GizmoBall*/
    this.update = function() {
        console.log("Model: update called!")

    };


    /*Functions for drawing each type of object */
    /*this.draw = function() {
    //Not yet implemented - May not be needed.
    }*/

    this.paddleDraw = function() {
        console.log("Model: paddleDraw called!");

    };

    this.ballDraw = function() {
        console.log("Model: ballDraw called!");

    };

    this.brickDraw = function() {
        console.log("Model: brickDraw called!");

    };

    /*Bin everything */
    this.clear = function() {
        console.log("Model: clear called!");

    };


}