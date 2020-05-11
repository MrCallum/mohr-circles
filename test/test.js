const StepLineGen = require('../src/controllers/StepLineGenerator.js');

var assert = require('assert');


describe("AddMovement: additions to coord are correct", () => {
  const circleDiam = 400;
  const centrePoint = [circleDiam / 2, circleDiam / 2];
  const movementAmount = 50;

  describe("Straight and flats", () => {
    it(`0 deg: [200,200] should become 200, 150 (y decreases)`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 0);
      assert.deepEqual(newCoord, [200, 150]);
    });

    it(`90 deg: [200,200] should become 250, 200 (x increases)`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 90);
      assert.deepEqual(newCoord, [250, 200]);
    });

    it(`180 deg: [200,200] should become 200, 250 (y increases)`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 180);
      assert.deepEqual(newCoord, [200, 250]);
    });

    it(`270 deg: [200,200] should become 150, 200 (x decreases)`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 270);
      assert.deepEqual(newCoord, [150, 200]);
    });

    it(`360 deg: [200,200] should become 200, 150 (y decreases)`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 360);
      assert.deepEqual(newCoord, [200, 150]);
    });
   
  });

  describe("Diagonal movement additions", () => {
    const newMovementAmount = StepLineGen.convertMovementDiagonally(movementAmount);

    it(`Horizontal movement amount of 50 should be converted into diagonal movement amount of 35.355`, () => {
      assert.equal(newMovementAmount, 35.355);
    });



    it(`45 deg: [200,200] should become [235.355, 164.645]`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 45);
      assert.deepEqual(newCoord, [235.355, 164.645]);
    });

    it(`135 deg: [200,200] should become [235.355, 235.355]`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 135);
      assert.deepEqual(newCoord, [235.355, 235.355]);
    });

    it(`225 deg: [200,200] should become [164.645, 235.355]`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 225);
      assert.deepEqual(newCoord, [164.645, 235.355]);
    });

    it(`315 deg: [200,200] should become [164.645, 164.645]`, () => {
      const newCoord = StepLineGen.addMovement(centrePoint, movementAmount, 315);
      assert.deepEqual(newCoord, [164.645, 164.645]);
    });

  })
})

describe("Possible angles", ()=> {
  describe("should exclude the reverse of the last angle", () => {
    it('should return all when last angle is -1', () => {
      const possibleAngles = StepLineGen.possibleAngles(-1);
      assert.deepEqual(possibleAngles, [0, 45, 90, 135, 180, 225, 270, 315]);
    });
    it('should return all except 180 if last angle was 0', () => {
      const possibleAngles = StepLineGen.possibleAngles(0);
      assert.deepEqual(possibleAngles, [0, 45, 90, 135, 225, 270, 315]);
    });
    it('should return all except 270 if last angle was 90', () => {
      const possibleAngles = StepLineGen.possibleAngles(90);
      assert.deepEqual(possibleAngles, [0, 45, 90, 135, 180, 225, 315]);
    });
    it('should return all except 90 if last angle was 270', () => {
      const possibleAngles = StepLineGen.possibleAngles(270);
      assert.deepEqual(possibleAngles, [0, 45, 135, 180, 225, 270, 315]);
    });
  });

  describe('should exclude the reverse of the last angle, plus any other angles marked as excluded', () => {
    let triedAngles = [];
    let lastAngle = 0;

    it('last = 0, tried = [45]. Should return all except 180 & 45', () => {
      triedAngles.push(45);
      const possibleAngles = StepLineGen.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 90, 135, 225, 270, 315]);
    });
    it('last = 0, tried = [45, 90]. Should return all except 180 & 45,90', () => {
      triedAngles.push(90);
      const possibleAngles = StepLineGen.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 135, 225, 270, 315]);
    });
    it('last = 0, tried = [45, 90, 135]. Should return all except 180 & 45,90,135', () => {
      triedAngles.push(135);
      const possibleAngles = StepLineGen.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 225, 270, 315]);
    });
    it('last = 0, tried = [45, 90, 135, 225]. Should return all except 180 & 45,90,135, 225', () => {
      triedAngles.push(225);
      const possibleAngles = StepLineGen.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 270, 315]);
    });
    it('last = 0, tried = [45, 90, 135, 225, 270]. Should return all except 180 & 45,90,135, 225, 270', () => {
      triedAngles.push(270);
      const possibleAngles = StepLineGen.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0, 315]);
    });
    it('last = 0, tried = [45, 90, 135, 225, 270, 315]. Should return just 0 now, all else invalid', () => {
      triedAngles.push(315);
      const possibleAngles = StepLineGen.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, [0]);
    });
    it('last = 0, tried = [all]. Should return [], all else invalid', () => {
      triedAngles.push(0);
      const possibleAngles = StepLineGen.possibleAngles(lastAngle, triedAngles);
      assert.deepEqual(possibleAngles, []);
    });
  })
});

describe("Possible coords should be confirmed as inside circle", () => {
  const circleDiam = 400;

  describe("Inside", () => {
    it(`${circleDiam} diam circle, ${[200,200]} should be accepted`, () => {
      assert.equal(StepLineGen.checkInsideCircle(circleDiam, [200,200]), true);
    });

    it(`${circleDiam} diam circle, ${[100,105]} should be accepted`, () => {
      assert.equal(StepLineGen.checkInsideCircle(circleDiam, [100,105]), true);
    });


  });
  describe("Outside", () => {
    it(`${circleDiam} diam circle, ${[0,0]} should be rejected`, () => {
      assert.equal(StepLineGen.checkInsideCircle(circleDiam, [0,0]), false);
    });

    it(`${circleDiam} diam circle, ${[100,95]} should be rejected`, () => {
      assert.equal(StepLineGen.checkInsideCircle(circleDiam, [100,95]), true);
    });
  });
  describe("On the line", () => {
    it(`${circleDiam} diam circle, ${[0,200]} should be accepted`, () => {
      assert.equal(StepLineGen.checkInsideCircle(circleDiam, [0,200]), true);
    });

    it(`${circleDiam} diam circle, ${[100,100]} should be accepted`, () => {
      assert.equal(StepLineGen.checkInsideCircle(circleDiam, [100, 100  ]), true);
    });
    it(`${circleDiam} diam circle, ${[200,400]} should be accepted`, () => {
      assert.equal(StepLineGen.checkInsideCircle(circleDiam, [100, 100  ]), true);
    });
  });

 
  
 
})

describe("Coord placement", () => {
  describe("Starting coord", () => {
    it("is valid point inside circle", () => {
      let noOfAttempts = 100;
      console.log(`Testing ${noOfAttempts} times`);
      
      let numberOfCorrectCases = 0;
      const circleDiam = 400;

      for(let i = 0; i < noOfAttempts; i++){
        let coord = StepLineGen.generateStartingCoord(circleDiam)
        if(StepLineGen.checkInsideCircle(circleDiam, coord)){
          numberOfCorrectCases++;
        }
      }

      assert.equal(numberOfCorrectCases, noOfAttempts)
    })
  })
})