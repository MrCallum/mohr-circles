const generateRandomPoint = circleDiameter => {
    const radius = circleDiameter / 2;
    
    let isInsideRadius = false;
    let xCoord;
    let yCoord;

    let maxDistance = radius / 2;


    while(!isInsideRadius){

        xCoord = +(Math.random() * circleDiameter).toFixed(2);
        yCoord = +(Math.random() * circleDiameter).toFixed(2);

        // example. Circle is 200 width
        // if x = 10: means 10 from left (90 from center)
        // if x = 190: means 190 from left (90 from center)

        let testingXCood = xCoord < radius ? radius - xCoord : xCoord - radius;
        let testingYCood = yCoord < radius ? radius - yCoord : yCoord - radius;

        let length = testingXCood**2 + testingYCood**2;
        isInsideRadius = length <= maxDistance**2;
    }

    return [xCoord, yCoord];
}

const checkIfPointIsInCircle = (circleDiam, pointToCheck) => {
    // equation of a circle:
    // (x - h)^2 + (y - k)^2 = r^2
    // where h,k is the center of the circle (h = x displacement, k = y displacement)

    // const hVar = circleDiam/2, kVar = circleDiam/2, radius = circleDiam/2; // have to use the word "var" because h is already used by JS.

    // return (pointToCheck[0] - hVar)**2 + (pointToCheck[1])**2 < radius**2;
    return true;
}

const generateSemiRandomPoint= (circleDiameter, prevCoord) => {
    // this function returns one new point based on the previous point

    // old system was to just generate a random series of points.
    // mohr circles are not like this, each point is at a fixed angle to the old point.
    // always 45 degree increment

    let angle = Math.floor(Math.random() * 8) * 45; 
    // let randomDistanceToAdd = (Math.random() * (circleDiameter * 0.9)).toFixed(2);
    let randomDistanceToAdd = 50

    // diagonal angles vs vert/horizontal angles will require different coordIsOk checks
    let diagonal = angle % 90 !== 0;

    let newCoord = [...prevCoord];
    if(!diagonal){
        if(angle === 0){
            newCoord[1] = newCoord[1] + randomDistanceToAdd;
        } else if(angle === 90) {
            newCoord[0] = newCoord[0] + randomDistanceToAdd;
        } else if(angle === 180) {
            newCoord[1] = newCoord[1] - randomDistanceToAdd;
        } else {
            newCoord[0] = newCoord[0] - randomDistanceToAdd;
        }
    }

    if(diagonal){
        let adjustedRanDist = Math.sqrt((randomDistanceToAdd ** 2) / 2);

        if(angle === 45 || angle === 135){
            newCoord[0] = newCoord[0] + adjustedRanDist;
        } else {
            newCoord[0] = newCoord[0] - adjustedRanDist;
        }

        if(angle === 45 || angle === 225){
            newCoord[1] = newCoord[1] + adjustedRanDist;
        } else {
            newCoord[1] = newCoord[1] - adjustedRanDist;
        }

    }




    // console.log(`Angle: ${angle}, distance:${randomDistanceToAdd}`);
    // console.log(`Old coord: ${prevCoord}, new coord:${newCoord}`);

    return newCoord;
}


export const generateSemiRandomSeries = (circleWidth, noOfPointsRequired) => {
    console.log("You called inner line coord gen: Semi random");

    let listOfCoords = [[circleWidth / 2, circleWidth / 2]];

    while(listOfCoords.length < noOfPointsRequired){
        let newPotentialPoint = generateSemiRandomPoint(circleWidth, listOfCoords[listOfCoords.length -1]);
        if(checkIfPointIsInCircle(circleWidth, newPotentialPoint)){
            listOfCoords.push(newPotentialPoint);
        } else {
            console.log("Couldn't use that point");
        }

    }

    return listOfCoords;
}

export const lineCoordGenerator = (circleWidth, noOfPointsRequired) => {
    console.log("You called inner line coord gen: Random");

    let listOfCoords = [];

    while(listOfCoords.length < noOfPointsRequired){
        listOfCoords.push(generateRandomPoint(circleWidth));
    }

    return listOfCoords;
}