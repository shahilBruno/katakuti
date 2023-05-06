//=================================== logic of the site ==============================================
//===================================================================================================


let game_state = '_';
var gameOn = false;
const Status = document.getElementById('status');
// tree button state which can only on if the other two are off
let board = [	[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0] ]

function reload(event) {	// for button-'play again'
	location.reload();
}

function click_option(state, button, otherbutton) {	// for other to buttons
	game_state = state;//this state of the game is like wich player is holding the pen & thinking
	gameOn = true;
	
	// changing the other button
	const otherButton = document.getElementById(otherbutton);
	otherButton.style.boxShadow = 'black 2px 5px 4px';
	otherButton.style.color = 'white';
	otherButton.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';

	// changing the clicked button
	const Button = document.getElementById(button);
	Button.style.color = 'black';
	Button.style.backgroundColor = 'rgba(0, 0, 0, 0)';
	Button.style.boxShadow = 'box-shadow: none';
}

function click_box(event) {		// on click on the cells
	const Box = event.target;

	// cell indeices-------------------------------------------------------------
	var y = Number(Box.getAttribute('id'));
	var i = Math.floor(y/3);
	var j = y%3;

	// changing things after clicking on a cell----------------------------------------
	if (board[i][j] === 0 && gameOn) {	// so that player can't over-write the cells
		
		// updating the visualboard------------------------------------------
		Box.innerHTML = game_state;

		// updating the logic board----------------------------------------
		if (game_state === 'X') {
			board[i][j] = 1;
		}
		else if (game_state === 'O') {
			board[i][j] = 2;
		}

		// logging
		console.log(board);
		//console.log(check_win());

		if (check_win()) {
			Status.innerHTML = game_state + " wins !!";
		} else {
			if (game_state === 'X') {
				game_state = 'O';
			}
			else if (game_state === 'O') {
				game_state = 'X';
			}
			Status.innerHTML = 'Now ' + game_state + "'s Turn...";
		}
		
	} else {
		alert('NO CHEATING!!!');
	}
}

function check_win() {
	gameOn = false;
	// horizontals
	if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] != 0) {
		return true;
	} else if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] != 0) {
		return true;
	} else if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] != 0) {
		return true;
	}
	// vertical
	else if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] != 0) {
		return true;
	} else if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] != 0) {
		return true;
	} else if (board[0][2] === board[1][2] && board[1][2] === board[2][0] && board[0][2] != 0) {
		return true;
	}
	// diagonal
	else if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != 0) {
		return true;
	} else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != 0) {
		return true;
	} 
	else {
		gameOn = true;
		return false;
	}
}




