/*jslint node: true, browser: true */
"use strict";

/* Without other stuff I need the model or MVC won't work) JavaScript is crap*/
function View(model) {

    var gamediv = document.getElementById("game"); //surrounding game div
    var gameCanvas = document.getElementById("gameCanvas"); //link html canvas
    var firstRun = true; //To allow 'constructor' like call on first run
    var canvas = canvasElement.getContext("2d");

    /*This function will be used to update the positioning in the view, like in GizmoBall*/
    this.update = function() {
        console.log("Model: update called!")

        if (firstRun) {
            gameCanvas.style.height = gamediv.clientHeight + "px";
            gameCanvas.style.width = gamediv.clientWidth + "px";
            canvas.canvas.height = gamediv.clientHeight;
            canvas.canvas.width = gamediv.clientWidth;

            firstRun = false;
        }

        this.clearGame();
        this.paddleDraw();
        // this.brickDraw();
        // this.ballDraw();


    };


    /*Functions for drawing each type of object */
    /*this.draw = function() {
    //Not yet implemented - May not be needed.
    }*/

    this.paddleDraw = function() {
        console.log("Model: paddleDraw called!");

        var paddle = model.getPaddleData();

        canvas.fillStyle = "#FFFFFF";
        canvas.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    };

    this.ballDraw = function() {
        console.log("Model: ballDraw called!");

    };

    this.brickDraw = function() {
        console.log("Model: brickDraw called!");

    };

    /*Bin everything */
    this.clearGame = function() {
        console.log("Model: clear called!");
        canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

    };


}