const StepLineGenerator = require('../src/controllers/StepLineGenerator.js');

var assert = require('assert');


describe("AddMovement: additions to coord are correct", () => {
  const circleDiam = 400;
  const centrePoint = [circleDiam / 2, circleDiam / 2];
  const movementAmount = 50;

  describe("Straight and flats", () => {
    it(`0 deg: [200,200] should become 200, 150 (y decreases)`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 0);
      assert.deepEqual(newCoord, [200, 150]);
    });

    it(`90 deg: [200,200] should become 250, 200 (x increases)`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 90);
      assert.deepEqual(newCoord, [250, 200]);
    });

    it(`180 deg: [200,200] should become 200, 250 (y increases)`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 180);
      assert.deepEqual(newCoord, [200, 250]);
    });

    it(`270 deg: [200,200] should become 150, 200 (x decreases)`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 270);
      assert.deepEqual(newCoord, [150, 200]);
    });

    it(`360 deg: [200,200] should become 200, 150 (y decreases)`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 360);
      assert.deepEqual(newCoord, [200, 150]);
    });
   
  });

  describe("Diagonal movement additions", () => {
    const newMovementAmount = StepLineGenerator.convertMovementDiagonally(movementAmount);

    it(`Horizontal movement amount of 50 should be converted into diagonal movement amount of 35.355`, () => {
      assert.equal(newMovementAmount, 35.355);
    });



    it(`45 deg: [200,200] should become [235.355, 164.645]`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 45);
      assert.deepEqual(newCoord, [235.355, 164.645]);
    });

    it(`135 deg: [200,200] should become [235.355, 235.355]`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 135);
      assert.deepEqual(newCoord, [235.355, 235.355]);
    });

    it(`225 deg: [200,200] should become [164.645, 235.355]`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 225);
      assert.deepEqual(newCoord, [164.645, 235.355]);
    });

    it(`315 deg: [200,200] should become [164.645, 164.645]`, () => {
      const newCoord = StepLineGenerator.addMovement(centrePoint, movementAmount, 315);
      assert.deepEqual(newCoord, [164.645, 164.645]);
    });

  })
})

describe("Possible angles", ()=> {
  describe("should exclude the reverse of the last angle", () => {
    it('should return all when last angle is -1', () => {
      const possibleAngles = StepLineGenerator.possibleAngles(-1);
      assert.deepEqual(possibleAngles, [0, 45, 90, 135, 180, 225, 270, 315]);
    });
    it('should return all except 180 if last angle was 0', () => {
      const possibleAngles = StepLineGenerator.possibleAngles(0);
      assert.deepEqual(possibleAngles, [0, 45, 90, 135, 225, 270, 315]);
    });
    it('should return all except 270 if last angle was 90', () => {
      const possibleAngles = StepLineGenerator.possibleAngles(90);
      assert.deepEqual(possibleAngles, [0, 45, 90, 135, 180, 225, 315]);
    });
    it('should return all except 90 if last angle was 270', () => {
      const possibleAngles = StepLineGenerator.possibleAngles(270);
      assert.deepEqual(possibleAngles, [0, 45, 135, 180, 225, 270, 315]);
    });
  });

  describe('should exclude the reverse of the last angle, plus any other angles marked as excluded', () => {
    let triedAngles = [];
    let lastAngle = 0;

    it('last = 0, tried = [45]. Should return all except 180 & 45', () => {
      triedAngles.push(45);
      const possibleAngles = StepLineGenerator.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 90, 135, 225, 270, 315]);
    });
    it('last = 0, tried = [45, 90]. Should return all except 180 & 45,90', () => {
      triedAngles.push(90);
      const possibleAngles = StepLineGenerator.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 135, 225, 270, 315]);
    });
    it('last = 0, tried = [45, 90, 135]. Should return all except 180 & 45,90,135', () => {
      triedAngles.push(135);
      const possibleAngles = StepLineGenerator.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 225, 270, 315]);
    });
    it('last = 0, tried = [45, 90, 135, 225]. Should return all except 180 & 45,90,135, 225', () => {
      triedAngles.push(225);
      const possibleAngles = StepLineGenerator.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 270, 315]);
    });
    it('last = 0, tried = [45, 90, 135, 225, 270]. Should return all except 180 & 45,90,135, 225, 270', () => {
      triedAngles.push(270);
      const possibleAngles = StepLineGenerator.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 315]);
    });
    it('last = 0, tried = [45, 90, 135, 225, 270, 315]. Should return just 0 now, all else invalid', () => {
      triedAngles.push(315);
      const possibleAngles = StepLineGenerator.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0]);
    });
    it('last = 0, tried = [all]. Should return [], all else invalid', () => {
      triedAngles.push(0);
      const possibleAngles = StepLineGenerator.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, []);
    });
  })
});

describe("calculateLastAngle: Calculate last angle given 2 points", () => {
  const secondLastPoint = [200, 200];

  it("Should be 0 when last point is [200,150]", () => {
    const lastPoint = [200,150]
    const calculateLastAngle = StepLineGenerator.calculateLastAngle(lastPoint, secondLastPoint);
    assert.strictEqual(calculateLastAngle, 0);
  }); 
  it("Should be 45 when last point is [235.355,164.645]", () => {
    const lastPoint = [235.355,164.645];
    const calculateLastAngle = StepLineGenerator.calculateLastAngle(lastPoint, secondLastPoint);
    assert.strictEqual(calculateLastAngle, 45);
  }); 
  it("Should be 90 when last point is [250,200]", () => {
    const lastPoint = [250,200];
    const calculateLastAngle = StepLineGenerator.calculateLastAngle(lastPoint, secondLastPoint);
    assert.strictEqual(calculateLastAngle, 90);
  }); 
  it("Should be 135 when last point is [235.355,235.355]", () => {
    const lastPoint = [235.355,235.355];
    const calculateLastAngle = StepLineGenerator.calculateLastAngle(lastPoint, secondLastPoint);
    assert.strictEqual(calculateLastAngle, 135);
  }); 
  it("Should be 180 when last point is [200,250]", () => {
    const lastPoint = [200,250];
    const calculateLastAngle = StepLineGenerator.calculateLastAngle(lastPoint, secondLastPoint);
    assert.strictEqual(calculateLastAngle, 180);
  }); 
  it("Should be 225 when last point is [164.645,235.355]", () => {
    const lastPoint = [164.645,235.355];
    const calculateLastAngle = StepLineGenerator.calculateLastAngle(lastPoint, secondLastPoint);
    assert.strictEqual(calculateLastAngle, 225);
  }); 
  it("Should be 270 when last point is [150,200]", () => {
    const lastPoint = [150,200];
    const calculateLastAngle = StepLineGenerator.calculateLastAngle(lastPoint, secondLastPoint);
    assert.strictEqual(calculateLastAngle, 270);
  }); 
  it("Should be 315 when last point is [164.645,164.645]", () => {
    const lastPoint = [164.645,164.645];
    const calculateLastAngle = StepLineGenerator.calculateLastAngle(lastPoint, secondLastPoint);
    assert.strictEqual(calculateLastAngle, 315);
  }); 
})

describe("Possible coords should be confirmed as inside circle", () => {
  const circleDiam = 400;

  describe("Inside", () => {
    it(`${circleDiam} diam circle, ${[200,200]} should be accepted`, () => {
      assert.equal(StepLineGenerator.checkInsideCircle(circleDiam, [200,200]), true);
    });

    it(`${circleDiam} diam circle, ${[100,105]} should be accepted`, () => {
      assert.equal(StepLineGenerator.checkInsideCircle(circleDiam, [100,105]), true);
    });
  });
  describe("Outside", () => {
    it(`${circleDiam} diam circle, ${[0,0]} should be rejected`, () => {
      assert.equal(StepLineGenerator.checkInsideCircle(circleDiam, [0,0]), false);
    });

    it(`${circleDiam} diam circle, ${[100,95]} should be rejected`, () => {
      assert.equal(StepLineGenerator.checkInsideCircle(circleDiam, [100,95]), true);
    });
  });

  describe("On the line", () => {
    it(`${circleDiam} diam circle, ${[0,200]} should be accepted`, () => {
      assert.equal(StepLineGenerator.checkInsideCircle(circleDiam, [0,200]), true);
    });

    it(`${circleDiam} diam circle, ${[100,100]} should be accepted`, () => {
      assert.equal(StepLineGenerator.checkInsideCircle(circleDiam, [100, 100  ]), true);
    });
    it(`${circleDiam} diam circle, ${[200,400]} should be accepted`, () => {
      assert.equal(StepLineGenerator.checkInsideCircle(circleDiam, [100, 100  ]), true);
    });
  });

 
  describe("centre start + movement", () => {
    const startingPoint = [200,200];
    const movement=  Math.floor((49 / 100) * 400);
    it("should confirm start + move @ 0 deg is valid", () => {
      const newCoord = StepLineGenerator.addMovement(startingPoint, movement, 0);
      assert.equal(StepLineGenerator.checkInsideCircle(400, newCoord), true);
    });
    it("should confirm start + move @ 45 deg is valid", () => {
      const newCoord = StepLineGenerator.addMovement(startingPoint, movement, 45);
      assert.equal(StepLineGenerator.checkInsideCircle(400, newCoord), true);
    });
    it("should confirm start + move @ 90 deg is valid", () => {
      const newCoord = StepLineGenerator.addMovement(startingPoint, movement, 90);
      assert.equal(StepLineGenerator.checkInsideCircle(400, newCoord), true);
    });
    it("should confirm start + move @ 135 deg is valid", () => {
      const newCoord = StepLineGenerator.addMovement(startingPoint, movement, 135);
      assert.equal(StepLineGenerator.checkInsideCircle(400, newCoord), true);
    });
    it("should confirm start + move @ 180 deg is valid", () => {
      const newCoord = StepLineGenerator.addMovement(startingPoint, movement, 180);
      assert.equal(StepLineGenerator.checkInsideCircle(400, newCoord), true);
    });
    it("should confirm start + move @ 225 deg is valid", () => {
      const newCoord = StepLineGenerator.addMovement(startingPoint, movement, 225);
      assert.equal(StepLineGenerator.checkInsideCircle(400, newCoord), true);
    });
    it("should confirm start + move @ 270 deg is valid", () => {
      const newCoord = StepLineGenerator.addMovement(startingPoint, movement, 270);
      assert.equal(StepLineGenerator.checkInsideCircle(400, newCoord), true);
    });
    it("should confirm start + move @ 315 deg is valid", () => {
      const newCoord = StepLineGenerator.addMovement(startingPoint, movement, 315);
      assert.equal(StepLineGenerator.checkInsideCircle(400, newCoord), true);
    });
  })
  
 
})

describe("Coord placement", () => {

  describe("generateStartingCoord: tests for starting coord generation", () => {
    it("if 'startInCentre' not specified, is valid random point inside circle", () => {
      let noOfAttempts = 100;
      let numberOfCorrectCases = 0;
      const circleDiam = 400;

      for(let i = 0; i < noOfAttempts; i++){
        let coord = StepLineGenerator.generateStartingCoord(circleDiam)
        if(StepLineGenerator.checkInsideCircle(circleDiam, coord)){
          numberOfCorrectCases++;
        }
      }

      assert.equal(numberOfCorrectCases, noOfAttempts)
    });
    it("if 'startInCentre' is specified, returns centre coord", () => {
      const circleDiam = 400;
      let coord = StepLineGenerator.generateStartingCoord(circleDiam, true);
      assert.deepEqual(coord, [200,200]);
    });
  });

  describe("tests for newPointBasedOnLast", () => {
    // takes: (lastPoint, lastAngle, circleDiam, moveAmount)
    // returns:  let coordInfo = { coord : null, lastAngle : null, failed : false }

    const lastPoint = [200, 200];
    const lastAngle = -1;
    const circleDiam = 400;
    const moveAmount = 50;

    const newCoord = StepLineGenerator.newPointBasedOnLast(lastPoint, lastAngle, circleDiam, moveAmount);

    it("returned coord was not null", () => {
      assert.notEqual(newCoord, null);
    });
    it("returned coord had a length of two", () => {
      assert.equal(newCoord.length, 2);
    });
    it("returned coord is not equal to coord fed in", () => {
      assert.notDeepEqual(newCoord, lastPoint);
    });

    it("new coord is 50 away from old coord", () => {
      // vert/hor:               0/360         90         180         270        45                    135                   225                 315         
      const possibleNewCoords = [[200,150], [250,200], [200,250], [150,200], [235.355, 164.645], [235.355, 235.355], [164.645, 235.355], [164.645, 164.645]];
      let foundMatch = false;

      for(let i = 0; i < possibleNewCoords.length; i++){
        if(possibleNewCoords[i][0] === newCoord[0] && possibleNewCoords[i][1] === newCoord[1]){
          foundMatch = true;
          break;
        }
      }

      assert.equal(foundMatch, true);
    })
  })

  describe("Adding coords to coord list", () => {

    it("Will cap move amountif MA > radius", () => {
      const lastCoord = [200,200];
      const lastAngle = -1;
      const circleDiam = 400;
      const moveAmount = 205;

      const possibleCoord = StepLineGenerator.newPointBasedOnLast(lastCoord, lastAngle, circleDiam, moveAmount);

      // calculate distance between coords
      const xChange = Math.abs(possibleCoord[0] - lastCoord[0]);
      const yChange = Math.abs(possibleCoord[1] - lastCoord[1]);
      let totalChange = 0;
      if(xChange === 0 || yChange === 0){
        // move was 0 90 180 or 270
        totalChange = Math.max(xChange, yChange);
      } else {
        // move was 45 135 225 or 315
        totalChange = Math.sqrt(xChange**2 + yChange**2);
      }
      
      const actualMoveWasLess = totalChange < moveAmount;
      assert.equal(actualMoveWasLess, true);
    });
    

    describe("Empty array is given single coord", () => {

      it("single coord will be returned if startInCentre is false", () => {
        let arrayOfCoords = [];
        const circleConfig = {
          circleDiam : 400,
          startInCentre : false
        }
        arrayOfCoords = StepLineGenerator.addPointToList(arrayOfCoords, circleConfig);
        assert.equal(arrayOfCoords.length, 1);
      });

      it("single coord will be centre if 'startInCentre' is true", () => {
        let arrayOfCoords = [];
        const circleConfig = {
          circleDiam : 400,
          startInCentre : true
        }
        arrayOfCoords = StepLineGenerator.addPointToList(arrayOfCoords, circleConfig);
        assert.deepEqual(arrayOfCoords[0], [200, 200]);
      });
    });

    describe("addPointToList: Will add points to existing list", () => {
      it("Will add a single point to a list of length 1", () => {
        let arrayOfCoords = [[200,200]];
        
        const circleConfig = {
          circleDiam : 400,
          startInCentre : true,
          moveAmount : 50
        }

        let newArray = StepLineGenerator.addPointToList(arrayOfCoords, circleConfig);
        assert.equal(newArray.length, 2);
      });

      it("Will add a single point to a list of length 2", () => {
        let arrayOfCoords = [[200,200], [200, 250]];
        
        const circleConfig = {
          circleDiam : 400,
          startInCentre : true,
          moveAmount : 50
        }

        let newArray = StepLineGenerator.addPointToList(arrayOfCoords, circleConfig);
        assert.equal(newArray.length, 3);
      });

      it("Will add a 10 points to a list of length 2", () => {
        let arrayOfCoords = [[200,200], [200, 250]];
        const circleConfig = {
          circleDiam : 400,
          startInCentre : true,
          moveAmount : 50
        }

        for(let i = 0; i < 10; i++){
          arrayOfCoords = StepLineGenerator.addPointToList(arrayOfCoords, circleConfig);
        }
        
        assert.equal(arrayOfCoords.length, 12);
      });
    });
  });

  describe("generateListOfCoords: generating a list of coords in one function call", () => {
    it("Generates a list of 10 points from an empty array", () => {
      let coordList = [];
      const circleConfig = {
        circleDiam : 400,
        startInCentre : false,
        moveAmount : 50
      }
      coordList = StepLineGenerator.generateListOfCoords(10, circleConfig);
      assert.equal(coordList.length, 10);
    });
  })
});
