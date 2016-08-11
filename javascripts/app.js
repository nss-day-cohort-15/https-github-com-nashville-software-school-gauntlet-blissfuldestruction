var Gauntlet = (function(gauntlet){
  // var warrior = new gauntlet.Combatants.Human();
  // warrior.setWeapon(gauntlet.getWeapon("WarAxe"));
  // warrior.generateClass();  // This will be used for "Surprise me" option
  // console.log(warrior.toString());

  var orc = new gauntlet.Combatants.Orc();
  orc.generateClass();
  orc.setWeapon(gauntlet.getWeapon("BroadSword"));
  console.log(orc.toString());

  /*
    Test code to generate a spell
   */
  var spell = new gauntlet.SpellBook.Sphere();
  console.log("spell: ", spell.toString());


  // Used to store the player object
  var player = null;

  $(document).ready(function() {


    /*
      Show the initial view that accepts player name
     */
    $("#player-setup").show();

    /*
      When any button with card__link class is clicked,
      move on to the next view.
     */
    $(".card__link").click(function(e) {
      var nextCard = $(this).attr("next");
      var moveAlong = false;

      switch (nextCard) {
        case "card--class":
          moveAlong = ($("#player-name").val() !== "");
          break;
        case "card--weapon":
          moveAlong = ($("#player-name").val() !== "");
          break;
      }

      if (moveAlong) {
        $(".card").hide();
        $("." + nextCard).show();
      }
    });

    // Click event to create player object
    $('#create-player').click(function (e) {
      console.log(`Clicked ${e.target}`);
      // Check for input
      if (!$('#player-name').val()) {
        alert('Error: No player name entered!');
      } else {
        player = new gauntlet.Combatants.Human();
        player.playerName = $('#player-name').val();

        console.log(`New human created with name ${$('#player-name').val()}!`);
        console.log(player);
      }
    });

    // Click event to assign class to player object
    $('.paths').click(function(e) {
      var path = $(e.currentTarget).find('.btn__text').text();
      if (path !== 'surprise me') {
        player.class = new gauntlet.GuildHall[path]();
        console.log(player);
      } else {
        try {player.generateClass();} catch(e) {console.log("Fuck you error",e)}
        console.log(player);
      }
    });

    $('#fighting-style').click(function(e) {
      // If no class is selected
      if (!player.class) {
        alert('You must select a class, adventurer!');
        var previousCard = $(this).attr("previous");
        $(".card").hide();
        $("." + previousCard).show();
      }

      // When a player selects a class
      else {
        // If class is magical, show spells
        if (player.class.magical) {
          $('#spell-select').show();
          $('#weapon-select').hide();
        }
        // If class is not magical, show weapons
        else {
          $('#weapon-select').show();
          $('#spell-select').hide();
        }
      }
    });

    // Click event to assign weapon to player object
    $('.weapon').click(function(e) {
      var weapon = $(e.currentTarget).find('.btn__text').text();
      weapon = weapon.replace(/\s/g, '');
      player.weapon = gauntlet.getWeapon(weapon);
      console.log(player)
      })

    // Click event to assign spell to player object
    $('.spell').click(function(e) {
      var spell = $(e.currentTarget).find('.btn__text').text();
      spell = spell.replace(/\s/g, '');
      player.weapon = new gauntlet.SpellBook[spell]();
      console.log(player)
      })

    // Dynamically display Battlefield HTML


    /*
      When the back button clicked, move back a view
     */
    $(".card__back").click(function(e) {
      var previousCard = $(this).attr("previous");
      $(".card").hide();
      $("." + previousCard).show();
    });

    // Attack function
    function calculateAttack(attacker) {
      // If the attacker is magical
      if (attacker.magical) {
        return parseInt((attacker.intelligence/10) + attacker.weapon.damage);
      }

      // If the attacker is not magical
      else {
        return parseInt((attacker.strength/10) + attacker.weapon.damage);
      }
    };

  });

  gauntlet.getPlayer = function() {
    return player;
  }

  return gauntlet;
})(Gauntlet || {});
