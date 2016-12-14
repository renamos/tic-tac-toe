$(function () {
    //Declarations
    var xIconBig = '<i class="fa fa-times fa-5x" aria-hidden="true"></i>';
    var xIconSmall = '<i class="fa fa-times" aria-hidden="true"></i>';

    var oIconBig = '<i class="fa fa-circle-o fa-5x" aria-hidden="true"></i>';
    var oIconSmall = '<i class="fa fa-circle-o" aria-hidden="true"></i>';

    var count = 0;
    var getRandom = function () {
        return count = Math.round(Math.random());
    };

    getRandom();

    console.log(count)

    var clickedCellX = [];
    var clickedCellO = [];

    var winningCombos = ['123', '456', '789', '147', '258', '369', '159', '357'];


    var showTurn = function () {
        if (count == 0 || count % 2 == 0) {
            $('#turn').html(xIconSmall + ' - it\'s your turn!')
        } else {
            $('#turn').html(oIconSmall + ' - it\'s your turn!')
        }
    };

    var newGame = function () {
        clickedCellX = [];
        clickedCellO = [];
        getRandom();
        console.log(count);
        $('td').empty();
        $('td').removeClass('clicked');
        showTurn();

    };

    function sortNumber(a, b) {
        return a - b;
    }

    var winningCombos = ['123', '456', '789', '147', '258', '369', '159', '357'];
    //Player numbers 9 8 7
    //winning combo 789
    //comboLength 3
    var winner = function (playerNumbers, winningCombos) {
        var combLength = 0;

        if (playerNumbers.length < 3) {
            return false
        }
        for (var j = 0; j < winningCombos.length; j++) {
            for (var i = 0; i < playerNumbers.length; i++) {
                if (winningCombos[j].indexOf(playerNumbers[i]) == -1) {
                    continue
                } else {
                    combLength++;
                }
            }
            if (combLength == 3) {
                return true
            } else {
                combLength = 0;
            }
        }

    }

    var checkWinner = function () {
        if ($("#board td.clicked").length == $("#board td").length) {
            swal({
                title: "Nobody wins!",
                text: "Start a new game!",
                type: "error",
                confirmButtonText: "New Game"
            });
            newGame();
        } else if (winner(clickedCellO, winningCombos)) {
            alert('O wins!')
        } else if (winner(clickedCellX, winningCombos)) {
            alert('x wins!')

        }

    };

    //End Declarations

    //Game inialized
    showTurn();

    $("td").on("click", function (event) {
        var clickedCell = parseInt(event.target.id, 10);

        if ($(this).hasClass('clicked')) {
            swal({
                title: "Hey! You can't do that!",
                text: "Please choose another square.",
                type: "error",
                confirmButtonText: "Okay!",
                allowEscapeKey: true
            });
        } else {

            if (count == 0 || count % 2 == 0) {
                $(this).append(xIconBig);
                clickedCellX.push(clickedCell);
            } else {
                $(this).append(oIconBig);
                clickedCellO.push(clickedCell);
            }
            $(this).addClass('clicked');
            count++;
            console.log(count)
            console.log(clickedCellO)
            console.log(clickedCellX)
            setTimeout(checkWinner(), 2000);
            showTurn();
        }
    });

});