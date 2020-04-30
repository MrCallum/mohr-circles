const generateRandomPoint = circleWidth => {
    const radius = circleWidth / 2;
    
    let isInsideRadius = false;
    let xCoord;
    let yCoord;

    let maxDistance = radius / 2;


    while(!isInsideRadius){

        xCoord = +(Math.random() * circleWidth).toFixed(2);
        yCoord = +(Math.random() * circleWidth).toFixed(2);

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

export const lineCoordGenerator = (circleWidth, noOfPointsRequired) => {
    console.log("You called inner line coord gen");

    let listOfCoords = [];

    while(listOfCoords.length < noOfPointsRequired){
        listOfCoords.push(generateRandomPoint(circleWidth));
    }

    return listOfCoords;
}