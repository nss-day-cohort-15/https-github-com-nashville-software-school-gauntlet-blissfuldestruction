var Gauntlet = (function(gauntlet){

gauntlet.Combatants.Orc = function() {
  this.health = this.health + 20;
  this.species = "Orc";
  this.allowedClasses = ["Warrior", "Berserker", "Shaman"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.floor(Math.random() * (this.allowedClasses.length));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new gauntlet.GuildHall[randomClass]();
    return this.class;
  };
};

gauntlet.Combatants.Orc.prototype = new gauntlet.Combatants.Monster();

return gauntlet;

})(Gauntlet || {});
