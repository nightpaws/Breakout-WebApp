/*jslint node: true, browser: true */
"use strict";


function Model(controller) {

    var gameHeader = document.getElementById("pauseButton");
    var gameArea = document.getElementById("game");
    var gameWidth;
    var gameHeight;
    var paddle = {};
    var ball = {};
    var bricks = new Array();
    var start = true;

    function brick(x, y, width, color) {
        /*contains the structure of bricks.
        If this were java I'd be using more classes
        for this.*/

        // console.log("Model: brick called!");
        var x = x;
        var y = y;
        var width = width;
        var height = width;
        var color = color;
        var visible = true; //whether brick can be seen

        this.getX = function() {
            // console.log("Model: getX called!");  
            return x;
        };

        this.getY = function() {
            // console.log("Model: getY called!");
            return y;
        };

        this.getWidth = function() {
            // console.log("Model: getWidth called!");
            return width;
        };

        this.getHeight = function() {
            // console.log("Model: getHeight called!");
            return height;
        };

        this.getColor = function() {
            // console.log("Model: getColor called!");
            return color;
        };

        this.getVisible = function() {
            // console.log("Model: visible called!");
            return visible;
        };

        this.remove = function() {
            // console.log("Model: remove called!");
            visible = false;
        };
    }

    this.getVars = function() {
        // console.log("Model: getVars called!");
        gameHeight = gameArea.clientHeight;
        gameWidth = gameArea.clientWidth;

        paddle.width = gameWidth * 0.2;
        paddle.height = 15;
        paddle.x = (gameWidth / 2) - (paddle.width / 2);
        paddle.y = gameHeight - 40;
        paddle.speed = 0;

        ball.width = 10;
        ball.height = ball.width;
        ball.xstart = (gameWidth / 2) - (ball.width / 2);
        ball.ystart = gameHeight - 60;
        ball.x = ball.xstart;
        ball.y = ball.ystart;
        ball.vx = 0;
        ball.vxstart = ball.vx;
        ball.vy = -170;
        ball.vystart = ball.vy;

        var brickColumns = 10,
            brickRows = 4,
            brickWidth = gameWidth / brickColumns,
            colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"];

        for (var x = 0; x < brickColumns; x++) {
            bricks[x] = new Array();
            for (var y = 0; y < brickRows; y++) {
                bricks[x][y] = new brick(x * brickWidth, y * brickWidth, brickWidth, colors[y]);
            }
        }
    };

    this.getBricks = function() {
        // console.log("Model: getBricks called!");
        return bricks;
    };

    this.getPaddleData = function() {
        // console.log("Model: getPaddleData called!");
        return paddle;
    };

    this.getBallData = function() {
        // console.log("Model: getBallData called!");
        return ball;
    };

    this.update = function(gamma) {
        // console.log("Model: update called!");
        if (start) {
            this.getVars();
            var d = new Date();
            start = false;
        }

        this.movePaddle(gamma);
        this.moveBall();
    };

    this.ballCollision = function(x, y, rect) {
        // console.log("Model: ballCollision called!");
        rect.w = rect.x2 - rect.x;
        rect.h = rect.y2 - rect.y;

        var distanceX = Math.abs(x - rect.x - rect.w / 2);
        var distY = Math.abs(y - rect.y - rect.h / 2);

        if (distanceX > (rect.w / 2 + ball.width / 2)) {
            return false;
        }
        if (distY > (rect.h / 2 + ball.width / 2)) {
            return false;
        }

        if (distanceX <= (rect.w / 2)) {
            return true;
        }
        if (distY <= (rect.h / 2)) {
            return true;
        }

        var dx = distanceX - rect.w / 2;
        var dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= ((ball.width / 2) * (ball.width / 2)));
    };

    this.moveBall = function() {
        // console.log("Model: moveBall called!");
        var x = ball.x + ball.vx * (controller.getUpdateRate() / 1000);
        var y = ball.y + ball.vy * (controller.getUpdateRate() / 1000);

        var rect = {};
        rect.x = 0;
        rect.y = 0;
        rect.x2 = gameWidth;
        rect.y2 = gameHeight;


        /*Check to see if hit a wall */
        if (x - ball.width / 2 < 0.0) { // left wall
            x = 0 + ball.width / 2;
            ball.vx *= -1;
        }

        if (x + ball.width / 2 > gameWidth) { //right wall
            x = gameWidth - ball.width / 2;
            ball.vx *= -1;
        }

        if (y - ball.width / 2 < 0.0) { //top wall
            y = 0 + (ball.width / 2);
            ball.vy *= -1;
        }

        if (y + ball.width / 2 > gameHeight) { // bottom wall
            alert("Game Over!");
            window.location.reload(false); //don't repull from server
            controller.pause(); //stops the game anyway
        }

       //Checking for paddle collisions now
        var rect = {};
        rect.x = paddle.x;
        rect.y = paddle.y;
        rect.x2 = paddle.x + paddle.width;
        rect.y2 = paddle.y + paddle.height;



        if (this.ballCollision(x, y, rect)) {

            //Collision has happened panic stations as I break out the maths textbook.
            //Going by BODMAS and hoping for the best here.
            //http://www.mathsisfun.com/operation-order-bodmas.html

            if (ball.y + (ball.height / 2) < paddle.y ||  paddle.y + paddle.height < ball.y - (ball.height / 2)) {
                //Hit paddle
                y = paddle.y - (ball.height / 2);
                ball.vy = ball.vy * -1;
                ball.vx = ball.vx + (paddle.speed * 0.2);

            } else { //Must've hit the sides

                if (ball.x + (ball.width / 2) < paddle.x && x - (ball.width / 2) < paddle.x + (paddle.width / 2)) {
                //If was left side of paddle
                    x = paddle.x - (ball.width / 2);
                    ball.vx = (ball.vx * -1) + paddle.speed;

                } else if (ball.x > paddle.x + paddle.width) {
                    //Now we're checking the right hand side of the paddle
                    x = paddle.x + paddle.width + (ball.width / 2);
                    ball.vx = (ball.vx * -1) + paddle.speed;
                }
            }
        } //Finished checking the paddle *phew* round 2!

        //Check for collisions against bricks        
        for (var xCoordinate = 0; xCoordinate < bricks.length; xCoordinate++) {
            for (var yCoordinate = 0; yCoordinate < bricks[xCoordinate].length; yCoordinate++) {

                var brick = bricks[xCoordinate][yCoordinate]; //store brick

                //if brick is visible i.e. not already hit
                if (brick.getVisible()) {

                    rect.x = brick.getX();
                    rect.y = brick.getY();

                    rect.x2 = brick.getX() + brick.getWidth();
                    rect.y2 = brick.getY() + brick.getHeight();

                    //If a collision occurs then hide the brick
                    if (this.ballCollision(x, y, rect)) {
                        brick.remove();

                        /*Adjust ball to account for position with some slightly fiddly maths
                          I found in an old textbook Hopefully it's more accurate than my higher
                         maths. (Miserable fail)*/
                        if (ball.y > brick.getY() + brick.getHeight() - (ball.height / 2) && ball.x < (ball.y / 1.61) + brick.getX() + brick.getWidth() && ball.x > brick.getX() - (ball.y / 1.61)) {

                            if (y < brick.getY() + brick.getHeight() + (ball.height / 2)) {

                                y = brick.getY() + brick.getHeight() + ball.height;
                                ball.vy = ball.vy * -1;
                            }
                        } else if (ball.y < brick.getY() && ball.x < (y / 1.61) + brick.getX() + brick.getWidth() && ball.x > brick.getX() - (y / 1.61)) {

                            if (y < brick.getY() - (ball.height / 2)) {
                                y = brick.getY() - ball.height;
                                ball.vy = ball.vy * -1;
                            }

                        } else if (ball.x < brick.getX() && x < brick.getX() + (brick.getWidth() / 2)) {
                            x = brick.getX() - ball.width;
                                ball.vy = ball.vy * -1;
                        } else if (ball.x > brick.getX() + brick.getWidth() && x > brick.getX() - (brick.getWidth() / 2)) {
                            //right
                            x = brick.getX() + brick.getWidth() + brick.getWidth();
                                ball.vy = ball.vy * -1;
                        }
                        //Done playing with balls.
                    } 
                    //Done playing with bricks.
                }
            }
        }
        //final assignments
        ball.x = x;
        ball.y = y;
    }; //Horrible maths section 2, done. Normal serice shall now resume.

    this.movePaddle = function(gamma) {
        // console.log("Model: movePaddle called!");

        /*Adjust position of paddle using the gamma metric from device
        sensor. Apparently works on some MacBook Pro's... Who knew?*/
        var multiplier = 1;
        if (gamma < 0) {
            multiplier = -1; //stop drifting right
            gamma = gamma * -1; //allow moving left
        }

        //Allow the paddle to move
        var speed = Math.pow(gamma, 1.35) / 5 * multiplier * 2;

        paddle.speed = speed * controller.getUpdateRate();
        paddle.x = paddle.x + speed;

        if (paddle.x <= 0) {
            paddle.x = 0;
        } else if (paddle.x + paddle.width >= gameWidth) {
            paddle.x = gameWidth - paddle.width;
        }
    };

    this.gameReset = function() {
        // console.log("Model: resetModel called!");
        start = true;
    };
}