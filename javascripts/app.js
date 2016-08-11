var Gauntlet = (function(gauntlet){
  // var warrior = new gauntlet.Combatants.Human();
  // warrior.setWeapon(gauntlet.getWeapon("WarAxe"));
  // warrior.generateClass();  // This will be used for "Surprise me" option
  // console.log(warrior.toString());

  var orc = new gauntlet.Combatants.Orc();
  orc.img = "https://www.gravatar.com/avatar/33a9070c9273cf516db78c125a980941?s=200"
  orc.playerName = "Scott H"
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
      // Check for input
      if (!$('#player-name').val()) {
        alert('Error: No player name entered!');
      } else {
        player = new gauntlet.Combatants.Human();
        player.playerName = $('#player-name').val();
      }
    });

    // Click event to assign class to player object
    $('.paths').click(function(e) {
      var path = $(e.currentTarget).find('.btn__text').text();
      if (path !== 'surprise me') {
        player.class = new gauntlet.GuildHall[path]();
      } else {
        player.generateClass();
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

      // If class is magical, show spells
      if (player.class.magical) {
        $('#spell-select').show();
        $('#weapon-select').hide();
        $('#stealth-select').hide();
      }
      // If class is not magical, show weapons
      else if (player.class.sneaky) {
        $('#stealth-select').show();
        $('#spell-select').hide();
        $('#weapon-select').hide();
      }
      //If class is not magical, show stealth weapons
      else {
        $('#weapon-select').show();
        $('#spell-select').hide();
        $('#stealth-select').hide();
      }
    });

    // Click event to assign weapon to player object
    $('.weapon').click(function(e) {
      var weapon = $(e.currentTarget).find('.btn__text').text();
      weapon = weapon.replace(/\s/g, '');
      player.weapon = gauntlet.getWeapon(weapon);
      });

    // Click event to assign spell to player object
    $('.spell').click(function(e) {
      var spell = $(e.currentTarget).find('.btn__text').text();
      spell = spell.replace(/\s/g, '');
      player.weapon = new gauntlet.SpellBook[spell]();
      });

    //Click event to assign stealth weapon to player object
    $('.stealth').click(function(e) {
      var stealthWeapon = $(e.currentTarget).find('.btn__text').text();
      player.weapon = gauntlet.getStealthWeapon(stealthWeapon);
      });

    // Dynamically display Battlefield HTML
    $('.goToBattle').click(function() {
      $('#spell-select').hide();
      $('#weapon-select').hide();
      $('#stealth-select').hide();
      $('#battleground').show();
      finalizeStats();
      buildBattlefield();
    });

    function finalizeStats() {
      player.intelligence += player.class.intelligenceBonus;
      player.strength += player.class.strengthBonus;
      player.health += player.class.healthBonus;
      orc.intelligence += orc.class.intelligenceBonus;
      orc.strength += orc.class.strengthBonus;
      orc.health += orc.class.healthBonus;
    }

    function buildBattlefield() {
      $('#battleground').html(`
        <div class = "container">
          <div class = "battledome col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <h2>Hero</h2>
            <p>Name: ${player.playerName}</p>
            <p>Species: ${player.species}</p>
            <p>Class: ${player.class.name}</p>
            <p>Weapon: ${player.weapon.name}</p>
            <p>Health: ${player.health}</p>
          </div>
          <div class = "battledome col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <h2>Monster</h2>
            <img src="${orc.img}">
            <p>Name: ${orc.playerName}</p>
            <p>Species: ${orc.species}</p>
            <p>Class: ${orc.class.name}</p>
            <p>Weapon: ${orc.weapon.name}</p>
            <p>Health: ${orc.health}</p>
          </div>
          <div class="card__button" id="attack-button">
            <a class="card__link btn btn--big btn--orange"
             href="#">
              <span class="btn__prompt">></span>
              <span class="btn__text">attack</span>
            </a>
          </div>
        </div>
      `);

      $('#attack-button').click(function() {
        doBattle(player, orc);
        if (orc.health <= 0) {
          gameOver();
        }
        else {
          doBattle(orc, player);
        }
      });
    }

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
    }


    function doBattle(attacker, receiver) {
      if (receiver.health - calculateAttack(attacker) <= 0) {
        receiver.health = 0;
        buildBattlefield();
        gameOver(receiver, attacker);
      }
      else {
        receiver.health -= calculateAttack(attacker);
        buildBattlefield();
      }
    }

    function gameOver(loser, winner) {
      $('#attack-button').html(`GAME OVER`);
      $('#attack-button').off('click');
      $('#battleground').append(`
        <h1>${winner.playerName} is victorious!</h1>
        <h2>Better luck next time, ${loser.playerName}!</h2>
      `);
    }

  });

  gauntlet.getPlayer = function() {
    return player;
  };

  return gauntlet;
})(Gauntlet || {});
