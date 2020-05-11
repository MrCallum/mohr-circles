const generateRandomPoint = circleDiameter => {
    let isInsideRadius = false;
    let xCoord, yCoord;

    while(!isInsideRadius){
        xCoord = +(Math.random() * circleDiameter).toFixed(2);
        yCoord = +(Math.random() * circleDiameter).toFixed(2);

        isInsideRadius = checkIfPointIsInCircle(circleDiameter, [xCoord, yCoord]);
    }

    return [xCoord, yCoord];
}

const checkIfPointIsInCircle = (circleDiam, pointToCheck) => {
    // equation of a circle:
    // (x - h)^2 + (y - k)^2 = r^2
    // where h,k is the center of the circle (h = x displacement, k = y displacement)

    const hVar = circleDiam/2, kVar = circleDiam/2, radius = circleDiam/2; // have to use the word "var" because h is already used by JS.

    return (pointToCheck[0] - hVar)**2 + (pointToCheck[1] - kVar)**2 < radius**2;
}

const generateValidAngle = lastAngle => {

    let noGoAngle = lastAngle + 180;
    if (noGoAngle >= 360){ 
        noGoAngle -= 360;
    }

    
    // we don't want a new point to go back the way the last point came
    let possibleAngles = [0, 45, 90, 135, 180, 225, 270, 315].filter(el => el !== noGoAngle);
    
    const foundIndex = possibleAngles.findIndex(el => el === lastAngle);
    if(foundIndex === -1 && lastAngle !== -1){
        console.log("Angle given was not valid: ", lastAngle);
    }

    return possibleAngles[Math.floor(Math.random() * possibleAngles.length)];
}

const generateSemiRandomPoint= (circleDiameter, prevCoord, lastAngle, distanceToMove) => {
    // this function returns one new point based on the previous point

    // old system was to just generate a random series of points.
    // mohr circles are not like this, each point is at a fixed angle to the old point.
    // always 45 degree increment

    let angle = generateValidAngle(lastAngle); 


    // let randomDistanceToAdd = (Math.random() * (circleDiameter * 0.9)).toFixed(2);
    let distanceToAdd = distanceToMove ? (circleDiameter * (distanceToMove / 100)).toFixed(2) : 50;
    
    let newCoord = [...prevCoord];
    
    // diagonal angles vs vert/horizontal angles will require different coordIsOk checks
    let diagonal = angle % 90 !== 0;

    if(!diagonal){
        if(angle === 0 || angle === 360){
            newCoord[1] -= distanceToAdd;
        } else if(angle === 90) {
            newCoord[0] += distanceToAdd;
            console.log("Went 90 degrees");
        } else if(angle === 180) {
            newCoord[1] += distanceToAdd;
        } else if(angle === 270) {
            newCoord[0] -= distanceToAdd;
            console.log("Went 270 degrees");
        } else {
            console.log("Given weird angle: ", angle);
        }
    }

    if(diagonal){
        let adjustedRanDist = Math.sqrt((distanceToAdd ** 2) / 2);

        if(angle === 45 || angle === 135){
            newCoord[0] = newCoord[0] + adjustedRanDist;
        } else if(angle === 225 || angle === 315){
            newCoord[0] = newCoord[0] - adjustedRanDist;
        } else {
            console.log("Given weird angle: ", angle);
        }

        if(angle === 45 || angle === 315){
            newCoord[1] = newCoord[1] - adjustedRanDist;
        } else if(angle === 135 || angle === 225) {
            newCoord[1] = newCoord[1] + adjustedRanDist;
        } else {
            console.log("Given weird angle: ", angle);
        }

    }


    return {newCoord, angle};
}

const calcNewCoord = (oldCoord, distanceToMove) => {

}


export const generateSemiRandomSeries = (circleDiameter, noOfPointsRequired, startInCentre, distanceToMove) => {

    let startingPoint = startInCentre ? [circleDiameter/2, circleDiameter/2] : generateRandomPoint(circleDiameter);
    

    let listOfCoords = [startingPoint];
    let lastAngle = -1;
    let noofAttempts = 0;
    let stoppingEarly = false;

    let listOfAngles = [];

    while(listOfCoords.length < noOfPointsRequired && !stoppingEarly){
        let newPotentialPoint = generateSemiRandomPoint(circleDiameter, listOfCoords[listOfCoords.length -1], lastAngle, distanceToMove);
      
        
        if(checkIfPointIsInCircle(circleDiameter, newPotentialPoint.newCoord)){
            listOfAngles.push(lastAngle);
            
            
            listOfCoords.push(newPotentialPoint.newCoord);
            lastAngle = newPotentialPoint.angle;

            noofAttempts= 0;
        } else {
            if(noofAttempts > 500){
                let xRounded = listOfCoords[listOfCoords.length-1][0].toFixed(1);
                let yRounded = listOfCoords[listOfCoords.length-1][1].toFixed(1);
                
                listOfAngles.push(newPotentialPoint.angle);
                // console.log(`Stopping early. Final coord: [${xRounded},${yRounded}]`);
                console.log(`Stopping early. Angle history: ${listOfAngles}`);
                // console.log("Tried 100 times, have to use this coord");
                // listOfCoords.push(newPotentialPoint.newCoord);
                // lastAngle = newPotentialPoint.angle;
                // noofAttempts= 0;
                stoppingEarly = true;
            } else {
                noofAttempts++;
            }
        }
    }

    return listOfCoords;
}

