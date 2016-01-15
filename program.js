let fs = require('fs');
let readfile = require('./readfile').readfile;

class Starship {
  constructor(name, captain, maxWarp=9) {
    this.name = name;
    this.captain = captain;
    this.maxWarp = maxWarp;
    this.currentWarp = 0;
    this.captainslog = `./${this.name}-log.json`;
  }
  goToWarp(warpFactor) {
    if (warpFactor === this.currentWarp) {
      return console.log(`We\'re already at warp factor ${warpFactor}.`);
    } else if (warpFactor < this.maxWarp) {
      this.currentWarp = warpFactor;
      return console.log(`Going to warp factor ${warpFactor}.`);
    } else {
      return console.log(`We can only go up to warp factor ${this.maxWarp}!`);
    }
  }
  getLog() {
    readfile(this.captainslog).then((data) => {
      let log = data.toString();
      if (!log) return console.log('Nothing in log.');
      return console.log(log);
    }).catch((err) => {
      return console.log(`Error: ${err}`);
    });
  }
}

class AttackShip extends Starship {
  constructor(name, captain, maxWarp, weaponsPower, shieldPower, allegiance) {
    super(name, captain, maxWarp);
    this.weaponsPower = weaponsPower;
    this.shieldPower = shieldPower;
    this.allegiance = allegiance;
  }
  *chargeShields() {
    this.shieldPower += 5;
    console.log(`Shield strength at ${this.shields}`);
    yield;
    this.shieldPower += 2;
    console.log(`Shield strength at ${this.shields}`);
  }
  fireWeapons(intensity, target) {
    if (this.weaponsPower >= intensity) {
      if (target.allegiance !== this.allegiance) {
        if (target.shieldPower <= intensity) {
          target.shieldPower = 0;
          target.maxWarp = 0;
          return console.log(`That shot disabled ${target.name}! Captain ${target.captain} is hailing to discuss terms for surrender.`);
        } else {
          target.shieldPower -= intensity;
          this.weaponsPower -= (intensity * 0.75);
          return console.log(`Direct hit on ${target.name}. Their shields have weakened.`);
        }
        console.log()
      } else {
        return console.log('Friendly fire is a bad idea.');
      }
    } else {
      return console.log(`We only have ${this.weaponsPower} weapons power remaining!`);
    }
  }
}

class GalaxyClass extends AttackShip {
  constructor(name, captain, maxWarp=9.9, weaponsPower, shieldPower, allegiance) {
    super(name, captain, maxWarp, weaponsPower=100, shieldPower=100, allegiance='federation');
  }
}

class KlingonBirdOfPrey extends AttackShip {
  constructor(name, captain, maxWarp=9.5, weaponsPower, shieldPower, allegiance) {
    super(name, captain, maxWarp, weaponsPower=150, shieldPower=75, allegiance='klingons');
  }
}

let enterprise = new GalaxyClass('Enterprise', 'Picard');
let rotarran = new KlingonBirdOfPrey('Rotarran', 'Martok', 8.5);
