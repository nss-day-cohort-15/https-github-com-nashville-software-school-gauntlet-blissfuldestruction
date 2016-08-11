var Gauntlet = (function(gauntlet){
  var warrior = new gauntlet.Combatants.Human();
  warrior.setWeapon(gauntlet.getWeapon("WarAxe"));
  warrior.generateClass();  // This will be used for "Surprise me" option
  console.log(warrior.toString());

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

    $('.paths').click(function (e) {
      console.dir();
      player.class = $(e.currentTarget).find('.btn__text').text()
    });

    /*
      When the back button clicked, move back a view
     */
    $(".card__back").click(function(e) {
      var previousCard = $(this).attr("previous");
      $(".card").hide();
      $("." + previousCard).show();
    });

  });

  return gauntlet;
})(Gauntlet || {});
