/*jslint node: true, browser: true */
"use strict";

function View(model) {

    var gameCanvas = document.getElementById("gameCanvas");
    var gameDiv = document.getElementById("game");
    var firstRun = true; //To allow 'constructor' like call on first run
    var canvas = gameCanvas.getContext("2d");


    /*This function will be used to update the positioning in the view, like in GizmoBall*/
    this.update = function() {
        // console.log("View: update called!");

        /*Set canvas dimensions*/
        if (firstRun) {
            gameCanvas.style.height = gameDiv.clientHeight + "px";
            gameCanvas.style.width = gameDiv.clientWidth + "px";
            canvas.canvas.height = gameDiv.clientHeight;
            canvas.canvas.width = gameDiv.clientWidth;
            firstRun = false;
        }
        //Clear before we start
        this.clearCanvas();

        //Draw the objects on the canvas
        this.drawPaddle();
        this.drawBricks();
        this.drawBall();
    };

    this.clearCanvas = function() {
        // console.log("View: clearCanvas called!");

        canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    };


    this.drawPaddle = function() {
        // console.log("View: drawPaddle called!");

        var paddle = model.getPaddleData(); //retrieve model data
        canvas.fillStyle = "#FFA500";
        canvas.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    };

    this.drawBricks = function() {
        // console.log("View: drawBricks called!");

        var bricks = model.getBricks(); //retrieve model data

        for (var x = 0; x < bricks.length; x++) {
            for (var y = 0; y < bricks[x].length; y++) {

                var brick = bricks[x][y];

                if (brick.getVisible()) {
                    var color = brick.getColor();
                    canvas.fillStyle = color;
                    canvas.fillRect(brick.getX(), brick.getY(),
                        brick.getWidth(), brick.getHeight());
                }
            }
        }
    };

    this.drawBall = function() {
        // console.log("View: drawBall called!");

        var ball = model.getBallData(); //retrieve model data
        //base of ball
        canvas.fillStyle = "#00FF00"; //set colour
        canvas.beginPath();
        canvas.lineWidth = 0;
        canvas.arc(ball.x, ball.y, ball.width / 2, 0, 2 * Math.PI);
        canvas.fill();

    };


}