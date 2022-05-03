//Business Logic for Game

function Game(player1, player2) {
  this.dice = 0;
  this.activeTurn = 0;
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer = 1;
}

Game.prototype.roll = function () {
  const randomRoll = Math.floor(Math.random() * 6) + 1; // get a random number between 1 - 6
  if (randomRoll === 1) { //check if number is === 1
    this.dice = randomRoll; //show what dice roll is. 
    this.activeTurn = 0; //change turn score to 0  
    this.hold(); 
  } else if (randomRoll !== 1) {
    this.dice = randomRoll; //show what dice roll is.
    this.activeTurn += randomRoll; //add roll to active turn total
  }
}

//Business Logic for Players
function Player(playerName) {
  this.playerName = playerName;
  this.totalPoints = 0;
  this.turnScore = 0;
  this.activePlayer;
}

Game.prototype.hold = function (player1, player2) {
  console.log(this.player1, this.player2);
  if (this.currentPlayer === 1){
    this.player1.totalPoints += this.activeTurn; //add active turn points to total points
    this.currentPlayer = 2; //switch current player
    this.roll(); //player two roll
    console.log(this.currentPlayer); 
  } else if (this.currentPlayer === 2) {
    this.player2.totalPoints += this.activeTurn; //add active turn points to total points
    this.currentPlayer = 1; //switch current player
    this.roll(); //player 1 roll
    console.log(this.currentPlayer); 
  }

}
//UI

$(document).ready(function() { 
  $("#new-game").submit(function(event) {
    event.preventDefault();  
    $(".newGame").hide(); 
    let player1 = new Player($("input#player1").val()); 
    let player2 = new Player($("input#player2").val());
    let newGame = new Game(player1, player2); 
    console.log(newGame); 
    $(".playerOneName").text(player1.playerName); 
    $(".playerTwoName").text(player2.playerName); 
    $("#roll-dice").click(function() {
      newGame.roll();
      if (newGame.activePlayer === 1) { 
      $(".currentRoll").text(newGame.dice); 
      $(".p1-total").text(newGame.activeTurn); 
      } else if (newGame.activePlayer === 2) {
        $(".currentRoll").text(newGame.dice); 
        $(".p2-total").text(newGame.activeTurn);
      }
    })
    $("#hold").click(function() {
      newGame.hold(); 
      $(".p1-totalScore").text(player1.totalPoints);
      $(".p2-totalScore").text(player2.totalPoints);
    })
  })
})

