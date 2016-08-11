var Gauntlet = (function(gauntlet){
  var stealthWeapon = function() {
    this.name = "bare hands";
    this.damage = 1;
    this.hands = 1;

    this.toString = function() {
      return this.name;
    };
  };

  var NinjaStars = function() {
    this.name = "ninja stars";
    this.damage = 7;
    this.hands = 1;
  };
  NinjaStars.prototype = new stealthWeapon();

  var PoisonArrow = function() {
    this.name = "poison arrow";
    this.damage = 17;
    this.hands = 2;
  };
  PoisonArrow.prototype = new stealthWeapon();

  var SniperRifle = function() {
    this.name = "sniper rifle";
    this.damage = 20;
    this.hands = 2;
  };
  SniperRifle.prototype = new stealthWeapon();

  gauntlet.getStealthWeapon = function(weaponName) {
    switch (weaponName) {
      case "Ninja Stars": return new NinjaStars();
      case "Poison Arrow": return new PoisonArrow();
      case "Sniper Rifle": return new SniperRifle();
      default: throw new Error('That ain\'t no weapon yo');
    }
  };
  return gauntlet;
})(Gauntlet || {});
