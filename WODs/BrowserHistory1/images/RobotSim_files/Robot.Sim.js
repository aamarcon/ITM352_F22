var model = {
    currentRobot: null,
    init: {
        x: 0,
        y: 0,
        f: "north"
    }
};

var controller = {
    init: function () {
        model.currentRobot = model.init;

        inputView.init();

        reportView.init();

        canvasView.init();
    },
    getCurrentRobot: function () {
        return model.currentRobot;
    },
    setCurrentRobot: function (robot) {
        model.currentRobot = robot;
    },
    resetContents: function () {
        reportView.clear();
    },
    /* --------------------------------------------------- */
    /*         the following are command functions
     /* --------------------------------------------------- */
    block: function (cmd) {
        var newPos = cmd.split(","); // get x y f from the command
        if (newPos.length < 2) {
            this.printErrors("incorrect location");
        } else {
            var newBlockX = parseInt(newPos[0].trim()),
                newBlockY = parseInt(newPos[1].trim());

            if (canvasView.validateBound(newBlockX, "maxX")
                && canvasView.validateBound(newBlockY, "maxY")
                && !(newBlockX == model.currentRobot.x && newBlockY == model.currentRobot.y)
            ) {
                canvasView.placeBlock(newBlockX, newBlockY);
            }  else {
                this.printErrors("incorrect location for block");
            }
        }
    },
    place: function (cmd) {
        var newPos = cmd.split(","); // get x y f from the command
        if (newPos.length < 3) {
            this.printErrors("incorrect position / direction");
        } else {
            var newX = parseInt(newPos[0].trim()),
                newY = parseInt(newPos[1].trim()),
                newF = newPos[2].trim().toLowerCase();

            if (canvasView.validateBound(newX, "maxX")
                && canvasView.validateBound(newY, "maxY")
                && canvasView.validateFacing(newF)
                && canvasView.validateBlocked(newX, newY)
            ) {

                this.clearOriginalRobot(); // clear the original robot first

                this.setCurrentRobot({
                    x: newX,
                    y: newY,
                    f: newF
                });
                canvasView.renderRobot();
            }
        }
    },
    move: function () {
        var currentRobot = this.getCurrentRobot(),
            newRobot = {
                x: currentRobot.x,
                y: currentRobot.y,
                f: currentRobot.f
            };
        var success = false;

        switch (currentRobot.f) {
            case "north":
                newY = currentRobot.y + 1;
                if (success = (canvasView.validateBound(newY, "maxY") && canvasView.validateBlocked(currentRobot.x, newY))) {
                    this.clearOriginalRobot();

                    newRobot.y = newY;
                    this.setCurrentRobot(newRobot);
                    canvasView.renderRobot();
                }
                break;
            case "south":
                newY = currentRobot.y - 1;
                if (success = (canvasView.validateBound(newY, "maxY") && canvasView.validateBlocked(currentRobot.x, newY))) {
                    this.clearOriginalRobot();
                    newRobot.y = newY;
                    this.setCurrentRobot(newRobot);
                    canvasView.renderRobot();
                }
                break;
            case "east":
                newX = currentRobot.x + 1;
                if (success = (canvasView.validateBound(newX, "maxX") && canvasView.validateBlocked(newX, currentRobot.y))) {
                    this.clearOriginalRobot();
                    newRobot.x = newX;
                    this.setCurrentRobot(newRobot);
                    canvasView.renderRobot();
                }
                break;
            case "west":
                newX = currentRobot.x - 1;
                if (success = (canvasView.validateBound(newX, "maxX") && canvasView.validateBlocked(newX, currentRobot.y))) {
                    this.clearOriginalRobot();
                    newRobot.x = newX;
                    this.setCurrentRobot(newRobot);
                    canvasView.renderRobot();
                }
                break;
            default:
                break;
        }
        return success;
    },
    left: function () {
        this.rotate(false); // get the next from this.robotFacing array in anti-clockwise direction
    },
    right: function () {
        this.rotate(true); // get the next from this.robotFacing array in clockwise direction
    },
    report: function () {
        reportView.renderReport();
    },
    rotate: function (clockwise = true) {
        this.clearOriginalRobot();

        var currentRobot = this.getCurrentRobot(),
            originalFacing = currentRobot.f,
            originalFacingIndex = canvasView.robotFacing.indexOf(originalFacing),
            newFacingIndex,
            totalFacing = canvasView.robotFacing.length,
            newRobot = {
                x: currentRobot.x,
                y: currentRobot.y,
                f: currentRobot.f
            };

        if (clockwise) {
            if (originalFacingIndex === (totalFacing - 1)) {
                newFacingIndex = 0;
            } else {
                newFacingIndex = originalFacingIndex + 1;
            }
        } else {
            if (originalFacingIndex === 0) {
                newFacingIndex = totalFacing - 1;
            } else {
                newFacingIndex = originalFacingIndex - 1;
            }
        }

        newRobot.f = canvasView.robotFacing[newFacingIndex];
        this.setCurrentRobot(newRobot);
        canvasView.renderRobot();
    },
    clearOriginalRobot: function () {
        var origRobot = this.getCurrentRobot();
        canvasView.clearOriginalRobot(origRobot.x, origRobot.y); // clear the original robot first
    },
    /* --------------------------------------------------- */
    /*         end of command functions
     /* --------------------------------------------------- */
    printErrors: function (msg) {
        reportView.renderErrors(msg);
    },
    reset: function () {
        this.clearOriginalRobot();
        this.setCurrentRobot(model.init);
        canvasView.renderRobot();
        canvasView.placeBlock(0, Math.ceil(Math.random() * 4) );
        inputView.reset();
    }
};

var inputView = {
    init: function () {
        this.commandBox = document.getElementById('command');

        document.getElementById('program_textarea').disabled = false;
        document.getElementById('program_textarea').readonly = false;

        this.allowedInput = ["block", "place", "move", "left", "right", "report"];

        this.render();
    },
    render: function () {
        this.commandBox.addEventListener('click', function () {
            this.select();
        });
    },
    reset: function () {
        this.commandBox.innerHTML = '';
    },
    processCommand: function (value) {
        //this.commandBox.select(); // auto select all input for easier editing

        controller.resetContents(); // remove previous status and errors

        var self = this,
            sanitizedValue = value.trim().toLocaleLowerCase(),
            sanitizedValueArray = sanitizedValue.split(' '),
            firstWordEntered = sanitizedValueArray.splice(0, 1)[0];

        if (self.allowedInput.indexOf(firstWordEntered) > -1) {
            controller[firstWordEntered](sanitizedValueArray.join()); // call controller functions by name
        } else {
            controller.printErrors("Incorrect command");
        }
    }
};

var canvasView = {
    init: function () {
        this.maxX = 5; // x total
        this.maxY = 5; // y total
        this.squareSize = 100; // all grids are equal width and height
        this.xStart = 50; // axis x starts from 50px
        this.yStart = 50; // axis y starts from 50px
        this.xEnd = this.xStart + this.squareSize * this.maxX; // axis x starts from 50px
        this.yEnd = this.yStart + this.squareSize * this.maxY; // axis y starts from 50px
        this.canvas = document.getElementById("c");
        this.context = this.canvas.getContext("2d");
        this.renderCanvas();

        this.robotFacing = ['north', 'east', 'south', 'west']; // clockwise
        this.robotSize = 50; // is the arrow size actually
        this.renderRobot();

        this.resetButton = document.getElementById('restart');
        this.renderControls();
    },
    renderControls: function () {
        var self = this;

        this.resetButton.addEventListener('click', function () {
            controller.reset();
        });
    },
    renderCanvas: function () {
        for (var x = 0; x < (this.maxX + 1); x++) { // draw 6 lines
            var currentAxisX = this.xStart + x * this.squareSize;
            this.context.moveTo(currentAxisX, this.yStart);
            this.context.lineTo(currentAxisX, this.yEnd);

            this.context.strokeText(x, currentAxisX + 50, this.yEnd + 20); // mark x index
        }

        for (var y = 0; y < (this.maxY + 1); y++) {
            var currentAxisY = this.yStart + y * this.squareSize;
            this.context.moveTo(this.xStart, currentAxisY);
            this.context.lineTo(this.xEnd, currentAxisY);

            this.context.strokeText((this.maxY - 1 - y), this.xStart - 20, currentAxisY + 50); // mark y index
        }

        this.context.strokeStyle = "#000";
        this.context.stroke();
    },
    placeBlock: function(newBlockX, newBlockY) {
        // clear old block first
        this.context.strokeStyle = "#000";
        this.context.clearRect(50 + this.squareSize * this.blockX, 50 + this.squareSize * (this.maxY - this.blockY - 1), this.squareSize,this.squareSize);
        this.context.strokeRect(50 + this.squareSize * this.blockX, 50 + this.squareSize * (this.maxY - this.blockY - 1), this.squareSize,this.squareSize);
        // add new block
        this.blockX = newBlockX;
        this.blockY = newBlockY;
        this.context.fillRect(50 + this.squareSize * this.blockX, 50 + this.squareSize * (this.maxY - this.blockY - 1), this.squareSize,this.squareSize);
    },
    validateBound: function (input, toCheckAxis) {
        if (isNaN(input)) {
            controller.printErrors("Please enter a numeric coordinates!");
            return false;
        } else if (input < 0 || input > (this[toCheckAxis] - 1)) {
            controller.printErrors("Coordinates out of range!");
            return false;
        } else {
            return true;
        }
    },
    validateFacing: function (face) {
        if (this.robotFacing.indexOf(face.toLowerCase()) < 0) {
            controller.printErrors("Wrong facing!");
            return false;
        } else {
            return true;
        }
    },
    validateBlocked: function (checkX, checkY) {
        if (checkX == this.blockX && checkY == this.blockY) {
            controller.printErrors("blocked!");
            return false;
        } else {
            return true;
        }
    },
    clearOriginalRobot: function (origX, origY) {
        var axisX = origX * 100 + 51; // left most point of the current grid deduct stroke width
        var axisY = (this.maxY - origY) * 100 - 49; // top most point of the current grid deduct stroke width
        this.context.clearRect(axisX, axisY, 98, 98);
    },
    renderRobot: function () {
        var robot = controller.getCurrentRobot(),
            robotAxisX = (robot.x + 1) * 100, // the center of the destination grid horizontally
            robotAxisY = (this.maxY - robot.y) * 100; // the center of the destination grid vertically

        var path = new Path2D();
        this.context.beginPath();
        switch (robot.f) {
            case "north":
                path.moveTo(robotAxisX, robotAxisY - this.robotSize);
                //path.lineTo(robotAxisX - this.robotSize, robotAxisY);
                // path.lineTo(robotAxisX + this.robotSize, robotAxisY);
                /*
                this.context.fillStyle = "yellow";
                path.arc(robotAxisX, robotAxisY, this.robotSize, 0, 2 * Math.PI, true);
                this.context.closePath();
                this.context.fill();
                */
                img = document.getElementById("robot_north_img");
                this.context.drawImage(img, robotAxisX - this.robotSize / 2, robotAxisY - this.robotSize / 2, this.robotSize, this.robotSize);
                break;
            case "south":
                /*
                path.moveTo(robotAxisX, robotAxisY + this.robotSize);
                path.lineTo(robotAxisX - this.robotSize, robotAxisY);
                path.lineTo(robotAxisX + this.robotSize, robotAxisY);
                */
                img = document.getElementById("robot_south_img");
                this.context.drawImage(img, robotAxisX - this.robotSize / 2, robotAxisY - this.robotSize / 2, this.robotSize, this.robotSize);
                break;
            case "east":
                /*
                path.moveTo(robotAxisX + this.robotSize, robotAxisY);
                path.lineTo(robotAxisX, robotAxisY - this.robotSize);
                path.lineTo(robotAxisX, robotAxisY + this.robotSize);
                */
                img = document.getElementById("robot_east_img");
                this.context.drawImage(img, robotAxisX - this.robotSize / 2, robotAxisY - this.robotSize / 2, this.robotSize, this.robotSize);
                break;
            case "west":
                /*
                path.moveTo(robotAxisX - this.robotSize, robotAxisY);
                path.lineTo(robotAxisX, robotAxisY - this.robotSize);
                path.lineTo(robotAxisX, robotAxisY + this.robotSize);
                */
                img = document.getElementById("robot_west_img");
                this.context.drawImage(img, robotAxisX - this.robotSize / 2, robotAxisY - this.robotSize / 2, this.robotSize, this.robotSize);
                break;
            default:
                break;
        }

        this.context.closePath();
        this.context.fill(path);

        controller.report();
    }
};

var reportView = {
    init: function () {
        //        this.errorMessageEle = document.getElementById("error");
        this.reportMessageEle = document.getElementById("report");
    },
    renderReport: function () {
        var currentRobot = controller.getCurrentRobot();
        this.reportMessageEle.innerHTML = '<span>' + 'Axis X: ' + currentRobot.x + '</span>' +
            '<span>' + 'Axis Y: ' + currentRobot.y + '</span>' +
            '<span>' + 'Facing: ' + currentRobot.f + '</span>';
    },
    renderErrors: function (msg) {
        this.reportMessageEle.innerHTML = '<span id="error">' + msg + '</span>';
    },
    clear: function () {
        this.reportMessageEle.innerHTML = '';
        //        this.errorMessageEle.innerHTML = '';
    }
};

window.onload = function () {
    controller.init();
};

