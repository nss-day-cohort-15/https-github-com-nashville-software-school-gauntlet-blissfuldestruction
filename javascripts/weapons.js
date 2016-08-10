var Gauntlet = (function(gauntlet){
  var Weapon = function() {
    this.name = "bare hands";
    this.damage = 1;
    this.hands = 2;

    this.toString = function() {
      return this.name;
    }
  };

  var Dagger = function() {
    this.name = "dagger";
    this.damage = 4;
    this.hands = 1;
  };
  Dagger.prototype = new Weapon();

  var BroadSword = function() {
    this.name = "broad sword";
    this.damage = 14;
    this.hands = 2;
  };
  BroadSword.prototype = new Weapon();

  var WarAxe = function() {
    this.name = "war axe";
    this.damage = 18;
    this.hands = 2;
  };
  WarAxe.prototype = new Weapon();

  gauntlet.getWeapon = function(weaponName) {
    switch (weaponName) {
      case "Dagger": return new Dagger(); break;
      case "BroadSword": return new BroadSword(); break;
      case "WarAxe": return new WarAxe(); break;
      default: throw new Error('That ain\'t no weapon yo')
    }
  }
  return gauntlet;
})(Gauntlet || {});
