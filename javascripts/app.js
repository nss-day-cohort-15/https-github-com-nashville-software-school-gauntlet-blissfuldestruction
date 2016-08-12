var Gauntlet = (function(gauntlet){

  // Enemy creation with random class
  var orc = new gauntlet.Combatants.Orc();
  orc.img = "https://www.gravatar.com/avatar/33a9070c9273cf516db78c125a980941?s=200"
  orc.playerName = "Scott H"
  orc.generateClass();
  orc.setWeapon(gauntlet.getWeapon("BroadSword"));

  // Used to store the player object
  var player = null;

  $(document).ready(function() {

    /*
      Show the initial view that accepts player name
     */
    $("#player-setup").show();

    let playerOptions = [
      {
        "Name": "Jammy Laird",
        "hash": "5dfdaab8a84c8abc6193c2b43d62ba83"
      },
      {
        "Name": "Matt Hamil",
        "hash": "035cdc66a3fa529e8a4901dffb8b7900"
      },
      {
        "Name": "Lauren Knight",
        "hash": "cd20e61cdafaef6298dbddfdd5899b2d"
      },
      {
        "Name": "Matt Kraatz",
        "hash": "a1fdd5f0c5f7c86318c23aacd6da6031"
      }
    ]

    playerOptions.forEach(function(i){
      $('#player-selection').append(`
        <option>${i.Name}</option>
      `)
    })

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
        player = new gauntlet.Combatants.Human();
        player.playerName = $('#player-selection').val();
        for (var i = 0; i < playerOptions.length; i++) {
          if (playerOptions[i].Name === player.playerName) {
            player.img = `https://www.gravatar.com/avatar/${playerOptions[i].hash}?s=200`;
          }
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

      // Add event listener to Attack button
      $('#attack-button').click(function() {
        doBattle(player, orc);
        if (orc.health <= 0) {
          gameOver(orc,player);
        }
        else {
          doBattle(orc, player);
        }
      });
    });

    function finalizeStats() {
      player.intelligence += player.class.intelligenceBonus;
      player.strength += player.class.strengthBonus;
      player.health += player.class.healthBonus;
      orc.intelligence += orc.class.intelligenceBonus;
      orc.strength += orc.class.strengthBonus;
      orc.health += orc.class.healthBonus;

      // Used in the Health bars
      player.startingHp = player.health;
      orc.startingHp = orc.health;
    }

    function buildBattlefield() {
      $('#battleground').html(`
        <div class = "container">
          <div class="row">
            <div class = "battledome col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <h2>Hero</h2>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 100%;" id="player-healthbar">
                  ${player.health}
                </div>
              </div>
              <img src="${player.img}">
              <p>Name: ${player.playerName}</p>
              <p>Species: ${player.species}</p>
              <p>Class: ${player.class.name}</p>
              <p>Weapon: ${player.weapon.name}</p>
            </div>
            <div class = "battledome col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <h2>Monster</h2>
              <div class="progress">
                <div class="progress-bar progress-bar-danger" role="progressbar" style="width: 100%;" id="enemy-healthbar">
                  ${orc.health}
                </div>
              </div>
              <img src="${orc.img}">
              <p>Name: ${orc.playerName}</p>
              <p>Species: ${orc.species}</p>
              <p>Class: ${orc.class.name}</p>
              <p>Weapon: ${orc.weapon.name}</p>
            </div>
          </div>
          <div class="card__button" id="attack-button">
            <a class="card__link btn btn--big btn--orange"
             href="#">
              <span class="btn__prompt">></span>
              <span class="btn__text">attack</span>
            </a>
          </div>
          <div id="battle-results"></div>
        </div>
      `);



      $('#attack-button').click(function() {
        doBattle(player, orc);
        if (orc.health <= 0) {
          gameOver(orc,player);
        }
        else {
          doBattle(orc, player);
        }
      });
      var audio = new Audio();

//Adds sounds when attack button is clicked for classes
        $('#attack-button').click(function() {
          if (player.class.baseClass === "fighter") {
            audio = new Audio('https://raw.githubusercontent.com/nss-day-cohort-15/https-github-com-nashville-software-school-gauntlet-blissfuldestruction/master/sounds/275159__bird-man__sword-clash.wav');
            audio.play();
        }
          else if (player.class.baseClass === "mage") {
            audio = new Audio('https://raw.githubusercontent.com/nss-day-cohort-15/https-github-com-nashville-software-school-gauntlet-blissfuldestruction/master/sounds/334240__liamg-sfx__laser-shot-1.wav');
            audio.play();
      }
          else if (player.class.baseClass === "stealth") {
            audio = new Audio('https://raw.githubusercontent.com/nss-day-cohort-15/https-github-com-nashville-software-school-gauntlet-blissfuldestruction/master/sounds/160756__cosmicembers__fast-swing-air-woosh.wav');
            audio.play();
          }
      })
      };


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
        updateHealthBars();
        gameOver(receiver, attacker);
      }
      else {
        receiver.health -= calculateAttack(attacker);
        updateHealthBars();
      }
    }

    function gameOver(loser, winner) {
      $('#attack-button').html(`GAME OVER`);
      $('#attack-button').off('click');
      $('#battle-results').html(`
        <h1>${winner.playerName} is victorious!</h1>
        <h2>Better luck next time, ${loser.playerName}!</h2>
      `);
    }

    function updateHealthBars() {
      $('#player-healthbar').html(`${player.health}`);
      $('#player-healthbar').css('width', () => {
        return `${parseInt(player.health/player.startingHp * 100)}%`;
      });

      $('#enemy-healthbar').html(`${orc.health}`);
      $('#enemy-healthbar').css('width', () => {
        return `${parseInt(orc.health/orc.startingHp * 100)}%`;
      });
    }
  });

  gauntlet.getPlayer = function() {
    return player;
  };

  return gauntlet;
})(Gauntlet || {});
