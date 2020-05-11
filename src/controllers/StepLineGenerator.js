// I want a system where you can click a button and only one step is taken at a time.
// if the step fails (can't generate a coord, coord was invalid etc.) show me what happened.



const generateStartingCoord = (circleDiam) => {
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

const getValidNewPoint = () => {

}

const addPointToList = () => {
    
}

const generateListOfCoords = () => {

}

exports.addMovement = addMovement;
exports.convertMovementDiagonally = convertMovementDiagonally;
exports.possibleAngles = possibleAngles;
exports.checkInsideCircle = checkInsideCircle;
exports.generateStartingCoord = generateStartingCoord;