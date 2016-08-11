var Gauntlet = (function(gauntlet){
  gauntlet.GuildHall = {};

  /*
    Base function for a player, or enemy, class (profession)
   */
  gauntlet.GuildHall.PlayerClass = function() {
    this.name = "Beggar";
    this.healthBonus = 0;
    this.strengthBonus = 0;
    this.intelligenceBonus = 0;
    this.magical = false;

    this.toString = function() {
      return this.name;
    }
  };

  /*
      FIGHTER CLASSES
        - Warrior
        - Valkyrie
        - Berserker
        - Monk
   */
  gauntlet.GuildHall.Fighter = function() {
    this.healthBonus = 20;
    this.strengthBonus = 10;
  };
  gauntlet.GuildHall.Fighter.prototype = new gauntlet.GuildHall.PlayerClass();


  gauntlet.GuildHall.Warrior = function() {
    this.name = "Warrior";
    this.healthBonus = this.healthBonus + 25;
    this.strengthBonus = this.strengthBonus + 30;
  };
  gauntlet.GuildHall.Warrior.prototype = new gauntlet.GuildHall.Fighter();


  gauntlet.GuildHall.Valkyrie = function() {
    this.name = "Valkyrie";
    this.healthBonus = this.healthBonus + 20;
    this.strengthBonus = this.strengthBonus + 10;
  };
  gauntlet.GuildHall.Valkyrie.prototype = new gauntlet.GuildHall.Fighter();


  gauntlet.GuildHall.Berserker = function() {
    this.name = "Berserker";
    this.healthBonus = this.healthBonus + 35;
    this.strengthBonus = this.strengthBonus + 20;
  };
  gauntlet.GuildHall.Berserker.prototype = new gauntlet.GuildHall.Fighter();


  gauntlet.GuildHall.Monk = function() {
    this.name = "Monk";
    this.healthBonus = this.healthBonus + 10;
    this.strengthBonus = this.strengthBonus + 40;
  };
  gauntlet.GuildHall.Monk.prototype = new gauntlet.GuildHall.Fighter();


  /*
      MAGICAL CLASSES
        - Shaman
        - Wizard
        - Conujurer
        - Sorcerer
   */
  gauntlet.GuildHall.Mage = function() {
    this.name = "Mage";
    this.magical = true;
    this.healthBonus = this.healthBonus - 10;
    this.strengthBonus = this.strengthBonus - 20;
    this.intelligenceBonus = this.intelligenceBonus + 20;
  };
  gauntlet.GuildHall.Mage.prototype = new gauntlet.GuildHall.PlayerClass();


  gauntlet.GuildHall.Shaman = function() {
    this.name = "Shaman";
    this.healthBonus = this.healthBonus + 5;
    this.strengthBonus = this.strengthBonus - 10;
    this.intelligenceBonus = this.intelligenceBonus + 20;
  };
  gauntlet.GuildHall.Shaman.prototype = new gauntlet.GuildHall.Mage();


  gauntlet.GuildHall.Wizard = function() {
    this.name = "Wizard";
    this.healthBonus = this.healthBonus - 15;
    this.strengthBonus = this.strengthBonus - 25;
    this.intelligenceBonus = this.intelligenceBonus + 40;
  };
  gauntlet.GuildHall.Wizard.prototype = new gauntlet.GuildHall.Mage();


  gauntlet.GuildHall.Conjurer = function() {
    this.name = "Conjurer";
    this.strengthBonus = this.strengthBonus - 10;
    this.intelligenceBonus = this.intelligenceBonus + 10;
  };
  gauntlet.GuildHall.Conjurer.prototype = new gauntlet.GuildHall.Mage();


  gauntlet.GuildHall.Sorcerer = function() {
    this.name = "Sorcerer";
    this.healthBonus = this.healthBonus - 5;
    this.strengthBonus = this.strengthBonus - 20;
    this.intelligenceBonus = this.intelligenceBonus + 30;
  };
  gauntlet.GuildHall.Sorcerer.prototype = new gauntlet.GuildHall.Mage();


  /*
      STEALTH CLASSES
        - Thief
        - Ninja
        - Assassin
   */

    gauntlet.GuildHall.Stealth = function() {
    this.name = "Stealth";
    this.magical = true;
    this.healthBonus = this.healthBonus - 10;
    this.strengthBonus = this.strengthBonus - 20;
    this.intelligenceBonus = this.intelligenceBonus + 20;
  };
  gauntlet.GuildHall.Stealth.prototype = new gauntlet.GuildHall.PlayerClass();

   gauntlet.GuildHall.Thief = function() {
    this.name = "Thief";
    this.healthBonus = this.healthBonus - 10;
    this.strengthBonus = this.strengthBonus - 20;
    this.intelligenceBonus = this.intelligenceBonus + 10;
  };
  gauntlet.GuildHall.Thief.prototype = new gauntlet.GuildHall.Stealth();

  gauntlet.GuildHall.Ninja = function() {
    this.name = "Ninja";
    this.healthBonus = this.healthBonus + 15;
    this.strengthBonus = this.strengthBonus - 10;
    this.intelligenceBonus = this.intelligenceBonus + 20;
  };
  gauntlet.GuildHall.Ninja.prototype = new gauntlet.GuildHall.Stealth();

  gauntlet.GuildHall.Assassin = function() {
    this.name = "Assassin";
    this.healthBonus = this.healthBonus + 25;
    this.strengthBonus = this.strengthBonus - 15;
    this.intelligenceBonus = this.intelligenceBonus + 25;
  };
  gauntlet.GuildHall.Assassin.prototype = new gauntlet.GuildHall.Stealth();

   return gauntlet;
})(Gauntlet || {});
