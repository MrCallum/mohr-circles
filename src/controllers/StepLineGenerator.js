// I want a system where you can click a button and only one step is taken at a time.
// if the step fails (can't generate a coord, coord was invalid etc.) show me what happened.

const generateStartingCoord = (circleDiam, startInCentre = false) => {
    if(startInCentre){
        return [circleDiam/2, circleDiam/2];
    }
    let isInsideRadius = false;
    let xCoord, yCoord;

    while(!isInsideRadius){
        xCoord = +(Math.random() * circleDiam).toFixed(2);
        yCoord = +(Math.random() * circleDiam).toFixed(2);

        isInsideRadius = checkInsideCircle(circleDiam, [xCoord, yCoord]);
    }

    return [xCoord, yCoord];
}

const possibleAngles = (lastAngle, triedAngles = []) => {
    if(lastAngle === -1){
        return [0, 45, 90, 135, 180, 225, 270, 315];
    }

    let noGoAngle = lastAngle + 180;
    if (noGoAngle >= 360){ 
        noGoAngle -= 360;
    }
    triedAngles.push(noGoAngle);
    
    return [0, 45, 90, 135, 180, 225, 270, 315].filter(el => !triedAngles.includes(el));
}

const convertMovementDiagonally = flatMoveAmount => {
    return Number(Math.sqrt((flatMoveAmount ** 2) / 2).toFixed(3));
}

const addMovement = (startCoord, moveAmount, angle) => {

    let newCoord = [...startCoord];
    if(angle % 90 === 0){
        // vert and horizontal angles

        if(angle === 90){
            newCoord[0] += moveAmount;
        }
        if(angle === 180){
            newCoord[1] += moveAmount;
        }
        if(angle === 270){
            newCoord[0] -= moveAmount;
        }
        if(angle === 360 || angle === 0){
            newCoord[1] -= moveAmount; // ie y needs to get closer to 0
        }
    } else {
        const adjustedRanDist = convertMovementDiagonally(moveAmount);

        if(angle === 45){
            newCoord[0] += adjustedRanDist;
            newCoord[1] -= adjustedRanDist;
        }
        if(angle === 135){
            newCoord[0] += adjustedRanDist;
            newCoord[1] += adjustedRanDist;
        }
        if(angle === 225){
            newCoord[0] -= adjustedRanDist;
            newCoord[1] += adjustedRanDist;
        }
        if(angle === 315){
            newCoord[0] -= adjustedRanDist;
            newCoord[1] -= adjustedRanDist;
        }

    }

    return newCoord;
}

const checkInsideCircle = (circleDiam, pointToCheck) => {
    // equation of a circle: (x - h)^2 + (y - k)^2 = r^2
    // where h,k is the center of the circle (h = x displacement, k = y displacement)
  
    return ((pointToCheck[0] - circleDiam/2)**2 + (pointToCheck[1] - circleDiam/2)**2) <= (circleDiam/2)**2;
}

const calculateLastAngle = (lastCoord, secondLastCoord) => {
    const xDif = lastCoord[0] - secondLastCoord[0]; // positive means moving east
    const yDif = lastCoord[1] - secondLastCoord[1]; // positive means moving south

    let angle = null;

    if(xDif === 0){
        angle = yDif < 0 ? 0 : 180;
    } else if (yDif === 0){ // YDIF now
        angle = xDif < 0 ? 270 : 90
    } else if (xDif > 0){
        angle = yDif < 0 ? 45 : 135;
    } else {
        angle = yDif < 0 ? 315 : 225;
    }

    return angle;
}

const newPointBasedOnLast = (lastPoint, lastAngle, circleDiam, moveAmount) => {
    // this function gives you back a coord when you feed it the previous coord (+some info)
    if(!lastAngle || !circleDiam || !moveAmount){
        console.log(`Did not supply either move amount ${moveAmount}, circle diam ${circleDiam}, or lastAngle${lastAngle}`)
    }
    
    if(moveAmount >= circleDiam / 2){
        console.log("Warning, move amount is too high, line won't work");
        return null;
    }

    let triedAngles = [];
    let validCoord = false;

    while(!validCoord){
        let possAnglesArray = possibleAngles(lastAngle, triedAngles);

        if(possAnglesArray.length === 0){
            // tried all angles, none are suitable for some reason
            // logError(TODO)
            return null;
        }

        let angleToTry = possAnglesArray[Math.floor(Math.random() * possAnglesArray.length)];

        let possCoord = addMovement(lastPoint, moveAmount, angleToTry);

        if(checkInsideCircle(circleDiam, possCoord)){
            return possCoord;
        } else {
            triedAngles.push(angleToTry);
        }
    }

    return null; // shouldn't get here, but just in case
}

const addPointToList = (currentCoordList, circleConfig) => {
    // this function takes a list of coords (+some config info) and gives you back the same list with one new coord added on.
    // I hate passing this "last angle" stuff, so last angle is calculated instead from the coord list.
    // circleConfig = { startInCentre, circleDiam, moveAmount }

    if(circleConfig.moveAmount >= circleConfig.circleDiam / 2){
        console.log("Move amount is >= radius. Not allowed.");
        return null;
    }

    if(currentCoordList.length === 0){
        // simply return a starting point
        return [generateStartingCoord(circleConfig.circleDiam, circleConfig.startInCentre)];
    } else if (currentCoordList.length === 1){
        let newPoint = newPointBasedOnLast(currentCoordList[0], -1, circleConfig.circleDiam, circleConfig.moveAmount);
        return [...currentCoordList, newPoint];
    }

    const lastCoord = currentCoordList[currentCoordList.length - 1];
    const lastAngle = calculateLastAngle(lastCoord, currentCoordList[currentCoordList.length - 2]);

    let newPoint = newPointBasedOnLast(lastCoord, lastAngle, circleConfig.circleDiam, circleConfig.moveAmount);
    return [...currentCoordList, newPoint];
}

const generateListOfCoords = (noOfPoints, circleConfig) => {
    // this function takes in just noOfPoints + circleConfig info and returns a lst of valid coords
    if(circleConfig.moveAmount >= circleConfig.circleDiam / 2){
        console.log("Move amount is >= radius. Not allowed.");
        return null;
    }

    if(noOfPoints <=1) console.log(`Only asked [generateListOfCoords] for ${noOfPoints}.`);
    
    let coordList = [];

    for(let i = 0; i < noOfPoints; i++){
        coordList = addPointToList(coordList, circleConfig);
    }

    return coordList;
}

exports.addMovement = addMovement;
exports.convertMovementDiagonally = convertMovementDiagonally;
exports.possibleAngles = possibleAngles;
exports.checkInsideCircle = checkInsideCircle;
exports.generateStartingCoord = generateStartingCoord;
exports.addPointToList = addPointToList;
exports.newPointBasedOnLast = newPointBasedOnLast;
exports.calculateLastAngle = calculateLastAngle;
exports.generateListOfCoords = generateListOfCoords;