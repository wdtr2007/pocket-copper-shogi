//dec-06 added gray
//dec-08 added flip
//dec-08 early work on takeback
//dec-09 takeback seems to be working fairly well
//       flip board messes up after a few flips and moves
//dec-12 added form button on top - flip is close to working


// global vars 

var v_movepart = 0;
var v_boardsize = 13 * 9;
var x,y,z,i = 0;
var mv_bucket = [[,]];
var v_selection_flg = 0;
var v_move_array = [];
var v_move_action = [];
var v_move_ctr_for_pocket = 0;

var SFEN = "2lnsgkgsnl2/c2r5b3/2ppppppppp2/292/292/292/2PPPPPPPPP2/3B5R3/2LNSGKGSNL1C";
var board = []; 
var board_sav = [];
var board_rev = [];
var board_xref = [];
var board_element = [];

// end of global vars


// global functions - always sync




var mousePosition = { xpos: 0, ypos: 0 };

document.addEventListener('mousemove', (e) => {
      mousePosition.xpos = e.clientX;
      mousePosition.ypos = e.clientY;
    }
);

document.addEventListener('keydown', (e) => {
    // Check for the desired key (e.g., 'Enter' key)
    if (e.key === ' ') {
        // Prevent default browser behavior for the keypress
        e.preventDefault(); 
        simulateClickAtCursor();
    }
});

function simulateClickAtCursor() {
    // Get the element at the current mouse coordinates
    const elementToClick = document.elementFromPoint(mousePosition.xpos, mousePosition.ypos);

    if (elementToClick) {
        // Create a new MouseEvent
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientx: mousePosition.xpos,
            clientY: mousePosition.ypos
        });

        // Dispatch the click event on the element
        elementToClick.dispatchEvent(clickEvent);
    }
}




function right(str, num) {  return str.slice(-num); }
function isLowerCase(str) { return str === str.toLowerCase(); }

function sync1() {
    document.addEventListener('DOMContentLoaded', function() { return; } );
    return;
//end sync1    
} 

function substr1(str1,start,len) {
    return str1.substring(start,(start+len));
}

setTimeout(function() { var nop=1;}, 1000);  // 1000 milliseconds = 1 second

function f_delay(time) {
    return new Promise(resolve => setTimeout(resolve,time));
}




// function f_sav_board() {
//     board_sav = [];
//     board_rev = [];
//     var x = 0;
//     for (x=0; x < board.length; x++) {
//         board_sav.push(board[x]);
//     }
    
// }

// function f_flip_board() {
//     console.log(board_sav.length);
//     board = [];
//     for ( x=(board_sav.length - 1); x >= 0;  x--) {
//         board.push(board_sav[x])
//     }
// }

// end of global funs


// begin class

class ShogiGame {
            constructor() {
                //board = Array(9).fill(null).map(  () => Array(13).fill(null)  );

                this.c1PieceFEN = "x";
                this.cmd = "xxxxxxxx";
                this.c2PieceFEN = "x1";
                this.tot_moves = 0;
                this.flg_drop = 0;
                this.WhiteKing = 0;
                this.BlackKing = 0;
                this.flg_flip = 0;
                this.board_xref = null;
                this.divinfo = " "
                this.wpawn_col_list = [0,0,1,1,1,1,1,1,1,1,1,0,0];
                this.bpawn_col_list = [0,0,1,1,1,1,1,1,1,1,1,0,0];

                // new when you hilight you put the saved highlights here
                this.sav_move_list_yel_green_red = [];

                this.currentPlayer = 'black'; // 'black' or 'white'
                this.selectedCell = null;
                this.moveCount = 0;   
                v_selection_flg=0;


                this.ImageXref = {                              
                    "+B" :    "bH.png",                      
                    "+b" :    "wH.png",                      
                    "+C" :    "bO.png",                      
                    "+c" :    "wO.png",                      
                    "+G" :    "bE.png",                      
                    "+g" :    "wE.png",                      
                    "+L" :    "bM.png",                      
                    "+m" :    "wM.png",                      
                    "+N" :   "bpN.png",     
                    "+n" :   "wpN.png",     
                    "+P" :    "bT.png",
                    "+p" :    "wT.png",
                    "+R" :    "bD.png",                      
                    "+r" :    "wD.png",                      
                    "+S" :  "bps.png" ,                    
                    "+s" :   "wps.png",                    
                    "B" :    "bB.png",                      
                    "b" :    "wB.png",                      
                    "C" :    "bC.png",                      
                    "c" :    "wC.png",                      
                    "G" :    "bG.png",                      
                    "g" :    "wG.png",                      
                    "K" :   "bK.png",                       
                    "k" :   "wK.png",                       
                    "L" :    "bL.png",                      
                    "l" :    "wL.png",                      
                    "N" :    "bN.png",
                    "n" :    "wN.png",
                    "P" :    "bP.png",                      
                    "p" :    "wP.png",                      
                    "R" :    "bR.png",                      
                    "r" :    "wR.png",                      
                    "S" :    "bS.png",  
                    "s" :    "wS.png"
                }	


                
            
                // array info below
                // 1 = jumper, 2 = slider, num of elements in array
                // 3 = merge slider moves and jumper moves
                //    example to move 1 square north you subtract 13
                //    from the nID.
        
                this.movesYouCanDo = {
                    "K" :  [ 1,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "G" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],
                    "S" :  [ 1,5,       -12,-13,-14, 12,   14  ],
                    "C" :  [ 1,4,       -12,-13,-14,    13  ],
                    "N" :  [ 1,2, -27 , -25 ],
                    "L" :  [ 2,1, 1],
                    "L1":  [ 1, 8, -13,-26,-39,-52,-65,-78,-91,-104] ,
                    "B" :  [ 2,1,4],
                    "B1":  [ 1,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "B2":  [ 1,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "B3":  [ 1,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "B4":  [ 1,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 

                    "R" :  [ 2,1,4],
                    "R1":  [ 1,8,13,26,39,52,65,78,91,104],
                    "R2":  [ 1,8,-13,-26,-39,-52,-65,-78,-91,-104],
                    "R3":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "R4":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],

                    "P":   [ 1,1,-13 ],
                    "+G" :  [ 1,7,-1, 1, -12,-13,-14, 12,   14  ],
                    "+S" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],
                    "+C" :  [ 1,5,       -12,-13,-14, 12,   14  ],
                    "+N" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],

                    //  bk side mover
                    "+L" :  [ 2, 1, 3],
                    "+L1":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+L2":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+L3":  [ 3, 2, -13,13 ],

                    "+B" :  [ 2,1,5],
                    "+B1":  [ 1,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "+B2":  [ 1,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "+B3":  [ 1,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "+B4":  [ 1,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 
                    "+B5":  [ 3,8,  -1,  1,-12,-13,-14, 12,13,14  ],

                    "+R" :  [ 2,1,5],
                    "+R1":  [ 1,8,13,26,39,52,65,78,91,104],
                    "+R2":  [ 1,8,-13,-26,-39,-52,-65,-78,-91,-104],
                    "+R3":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+R4":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+R5":  [ 3,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "+P":   [ 1,6,-1, 1, -12,-13,-14,    13     ],

                    "k" :  [ 1,8,-1, 1, 12,13,14, -12,-13,-14  ],
                    "g" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "s" :  [ 1,5,        12, 13, 14,-12,  -14  ],
                    "c" :  [ 1,4,        12, 13, 14,   -13  ],
                    "n" :  [ 1,2,  27 ,  25 ],

                    "l" :  [ 2,1, 1],
                    "l1":  [ 1, 8, 13,26,39,52,65,78,91,104] ,


                    "b" :  [ 2,1,4],
                    "b1":  [ 1,8,  14, 28, 42, 56, 70, 84, 98, 112] ,
                    "b2":  [ 1,8,  12, 24, 36, 48, 60, 72, 84, 96],
                    "b3":  [ 1,8, -14,-28,-42,-56,-70,-84,-98,-112],
                    "b4":  [ 1,8, -12,-24,-36,-48,-60,-72,-84,-96 ], 

                    "r" :  [ 2,1,4],
                    "r1":  [ 1,8,13,26,39,52,65,78,91,104],
                    "r2":  [ 1,8,-13,-26,-39,-52,-65,-78,-91,-104],                    
                    "r3":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "r4":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "p":   [ 1,1, 13 ],

                    // elephant
                    "+g" :  [ 1,7,-1, 1,  12, 13, 14,-12,  -14  ],
                    "+s" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "+c" :  [ 1,5,        12, 13, 14,-12,  -14  ],
                    "+n" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "+p":   [ 1,6,-1, 1,  12, 13, 14,   -13     ],

                    // side mover
                    "+l" :  [ 2,1, 3],
                    "+l1":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+l2":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+l3":  [ 3, 2, -13,13 ],

                    "+b" :  [ 2,1,5],
                    "+b1":  [ 1,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "+b2":  [ 1,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "+b3":  [ 1,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "+b4":  [ 1,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 
                    "+b5":  [ 3,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    
                    "+r" :  [ 2,1,5],
                    "+r1":  [ 1,8,13,26,39,52,65,78,91,104],
                    "+r2":  [ 1,8,-13,-26,-39,-52,-65,-78,-91,-104],                    
                    "+r3":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+r4":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+r5":  [ 3,8,-1, 1, -12,-13,-14, 12,13,14  ]

                }

                

                this.movesYouCanDo_flip = {
                    "k" :  [ 1,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "g" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],
                    "s" :  [ 1,5,       -12,-13,-14, 12,   14  ],
                    "c" :  [ 1,4,       -12,-13,-14,    13  ],
                    "n" :  [ 1,2, -27 , -25 ],
                    "l" :  [ 2,1, 1],
                    "l1":  [ 1, 8, -13,-26,-39,-52,-65,-78,-91,-104] ,
                    "b" :  [ 2,1,4],
                    "b1":  [ 1,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "b2":  [ 1,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "b3":  [ 1,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "b4":  [ 1,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 

                    "r" :  [ 2,1,4],
                    "r1":  [ 1,8,13,26,39,52,65,78,91,104],
                    "r2":  [ 1,8,-13,-26,-39,-52,-65,-78,-91,-104],
                    "r3":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "r4":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],

                    "p":   [ 1,1,-13 ],
                    "+g" :  [ 1,7,-1, 1, -12,-13,-14, 12,   14  ],
                    "+s" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],
                    "+c" :  [ 1,5,       -12,-13,-14, 12,   14  ],
                    "+n" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],

                    //  bk side mover
                    "+l" :  [ 2, 1, 3],
                    "+l1":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+l2":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+l3":  [ 3, 2, -13,13 ],

                    "+b" :  [ 2,1,5],
                    "+b1":  [ 1,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "+b2":  [ 1,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "+b3":  [ 1,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "+b4":  [ 1,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 
                    "+b5":  [ 3,8,  -1,  1,-12,-13,-14, 12,13,14  ],

                    "+r" :  [ 2,1,5],
                    "+r1":  [ 1,8,13,26,39,52,65,78,91,104],
                    "+r2":  [ 1,8,-13,-26,-39,-52,-65,-78,-91,-104],
                    "+r3":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+r4":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+r5":  [ 3,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "+p":   [ 1,6,-1, 1, -12,-13,-14,    13     ],

                    "K" :  [ 1,8,-1, 1, 12,13,14, -12,-13,-14  ],
                    "G" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "S" :  [ 1,5,        12, 13, 14,-12,  -14  ],
                    "C" :  [ 1,4,        12, 13, 14,   -13  ],
                    "N" :  [ 1,2,  27 ,  25 ],

                    "L" :  [ 2,1, 1],
                    "L1":  [ 1, 8, 13,26,39,52,65,78,91,104] ,


                    "B" :  [ 2,1,4],
                    "B1":  [ 1,8,  14, 28, 42, 56, 70, 84, 98, 112] ,
                    "B2":  [ 1,8,  12, 24, 36, 48, 60, 72, 84, 96],
                    "B3":  [ 1,8, -14,-28,-42,-56,-70,-84,-98,-112],
                    "B4":  [ 1,8, -12,-24,-36,-48,-60,-72,-84,-96 ], 

                    "R" :  [ 2,1,4],
                    "R1":  [ 1,8,13,26,39,52,65,78,91,104],
                    "R2":  [ 1,8,-13,-26,-39,-52,-65,-78,-91,-104],                    
                    "R3":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "R4":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "P":   [ 1,1, 13 ],

                    // elephant
                    "+G" :  [ 1,7,-1, 1,  12, 13, 14,-12,  -14  ],
                    "+S" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "+C" :  [ 1,5,        12, 13, 14,-12,  -14  ],
                    "+N" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "+P":   [ 1,6,-1, 1,  12, 13, 14,   -13     ],

                    // side mover
                    "+L" :  [ 2,1, 3],
                    "+L1":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+L2":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+L3":  [ 3, 2, -13,13 ],

                    "+B" :  [ 2,1,5],
                    "+B1":  [ 1,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "+B2":  [ 1,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "+B3":  [ 1,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "+B4":  [ 1,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 
                    "+B5":  [ 3,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    
                    "+R" :  [ 2,1,5],
                    "+R1":  [ 1,8,13,26,39,52,65,78,91,104],
                    "+R2":  [ 1,8,-13,-26,-39,-52,-65,-78,-91,-104],                    
                    "+R3":  [ 1,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+R4":  [ 1,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+R5":  [ 3,8,-1, 1, -12,-13,-14, 12,13,14  ]

                }

                
                this.selectedCell = null;
                this.moveCount = 0;   
                v_selection_flg=0;
                  
                this.objCap_pieces_sav = { black: [], white: [] };
                this.gameOver = false;
                
                // Piece symbols
                this.pieceskan = {
                    // Sente pieces
                    'K': '王', // King
                    'G': '金', // Gold
                    'S': '銀', // Silver
                    'N': '桂', // Knight
                    'L': '香', // Lance
                    'B': '角', // Bishop
                    'R': '飛', // Rook
                    'P': '歩', // Pawn
                    // Promoted pieces
                    '+S': '成', // Promoted Silver
                    '+N': '成', // Promoted Knight
                    '+L': '成', // Promoted Lance
                    '+B': '馬', // Promoted Bishop (Dragon Horse)
                    '+R': '竜', // Promoted Rook (Dragon King)
                    '+P': 'と'  // Promoted Pawn (Tokin)
                };
				
                this.pieces = {
                    // Sente pieces
                    'K': 'K', // King
                    'G': 'G', // Gold
                    'S': 'S', // Silver
                    'N': 'N', // Knight
                    'L': 'L', // Lance
                    'B': 'B', // Bishop
                    'R': 'R', // Rook
                    'P': 'P', // Pawn
                    'C': 'C',
                    // Promoted pieces
                    '+S': '+S', // Promoted Silver
                    '+N': '+N', // Promoted Knight
                    '+L': '+L', // Promoted Lance
                    '+B': '+B', // Promoted Bishop (Dragon Horse)
                    '+R': '+R', // Promoted Rook (Dragon King)
                    '+P': '+P',  // Promoted Pawn (Tokin)
                    '+C': '+C',  

                    'k': 'k', // King
                    'g': 'g', // Gold
                    's': 's', // Silver
                    'n': 'n', // Knight
                    'l': 'l', // Lance
                    'b': 'b', // Bishop
                    'r': 'r', // Rook
                    'p': 'p', // Pawn
                    'c': 'c', 
                    // Promoted pieces
                    '+s': '+s', // Promoted Silver
                    '+n': '+n', // Promoted Knight
                    '+l': '+l', // Promoted Lance
                    '+b': '+b', // Promoted Bishop (Dragon Horse)
                    '+r': '+r', // Promoted Rook (Dragon King)
                    '+p': '+p',  // Promoted Pawn (Tokin)
                    '+c': '+c' 
                };

                
                // notice we did not switch player
                // this is move zero
                this.initializeBoard();

                document.addEventListener('mousemove', (e) => {
                    mousePosition.x = e.clientX;
                    mousePosition.y = e.clientY;
                });

                document.addEventListener('keydown', (e) => {
                    // Check for the desired key (e.g., 'Enter' key)
                    if (e.key === 'Space') {
                        // Prevent default browser behavior for the keypress
                        e.preventDefault(); 
                        simulateClickAtCursor();
                    }
                });

                this.renderBoard();
                this.renderCapturedPieces();
                this.currentPlayer = 'white';
                this.switchPlayer();
                this.updateStatus();
            }

            
            process_flip(mycmd) {
                var imgbank;
                
                const parm1 = substr1(mycmd,0,2);
                const parm2 = substr1(mycmd,2,1);
                if ( parm1 == "fb" ) {
                    imgbank = document.getElementsByClassName("imgblack");
                } else {
                    imgbank = document.getElementsByClassName("imgwhite");
                }

                var x;
                for (x=0; x < imgbank.length; x++) {
                    var imgx = imgbank[x];
                    if (Number(parm2) == 0) imgx.style.transform= "rotate(0deg)";
                    else imgx.style.transform= "rotate(180deg)";
                }
                
                


            }

            process_cmd(mycmd) {
                const line1 = mycmd;
                
                const char1 = substr1(line1,0,1);
                switch (char1) {
                    case "f":
                        this.process_flip(mycmd);
                        break;
                    case "m":
                        break;  
                }

            }

            onSubmit() {
                // Access the value of the 'fname' input field within 'myForm'
                const elem = document.getElementById("fname");
                this.cmd = elem.value; 
                console.log(this.cmd);
                if (this.cmd.length > 0) { this.process_cmd(this.cmd); }
                return true;
    
            }

            
            printboard() {
                var msg = "";
                var char1 = "";
                var x=0; var y=0;
                console.log("xx-00-01-02-03-04-05-06-07-08-09-10-11-12");
                for (x=0; x < 9; x++) {
                    msg = x.toString().padStart(2,'0') + " ";
                    for (y=0; y < 13; y++) {
                        char1 = board[  ( this.gensub(x, y) ) ];
                        if (char1.length == 1) char1 = char1 + "  ";
                        if (char1.length == 2) char1 = char1 + " ";
                        msg = msg + char1;
                    }
                    console.log(msg);
                }

            }

            generate_board_xref() {
                var ctr1 = 0;
                var ctr2 = 0;
                var x = 0;
                var y = 0;

                for (x=0; x<9; x++) {
                    for (y=0; y<13; y++) {
                        ctr1 = this.gensub(x,y);
                        ctr2 = 116 - ctr1;
                        board_xref.push( ([ctr1,ctr2]) ) ; 
                    }
                }
            }


            // this is to populate the move bucket
            // when complete it will contain all the possible moves 1 color 
            // can make ... this will be used to determine if a king is in check
            // later on ... not used right now

            // mv_bucket contains all the pieces that are friendly that are on board
            // this excludes the drop zones

            generate_move_list(player) {
                mv_bucket = [];
                for ( let k=0; k < v_boardsize; k++) {
                    let r = this.toRowj(k);
                    let c = this.toColj(k);
                    if ( c < 2 || c > 10) { continue; }
 
                        // const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                        const movechar = board[ this.gensub(r,c) ];
                        if ( this.pieceColorShort(movechar) == player) {
                            mv_bucket.push( [r,c] ); 
                        }


                }

                //if (mv_bucket.length > 0 ) {
                //    if (this. urrentPlayer = "white") {
                //        let PocketPiece =board[0][0]
                //        if (PocketPiece && PocketPiece == "white" ) { let nop = 1}
                //        else { mv_bucket.push[0,0]; }
                //    }
                //    if (this. urrentPlayer = "black") {
                //        let PocketPiece =board[0][0]
                //        if (PocketPiece && PocketPiece == "white" ) { let nop = 1}
                //        else { mv_bucket.push[8,12]; }
                //    }
                // }
                return mv_bucket; 
            }
            
            // this section is run when the "new game" button is hit

            initializeBoard() {
                this.renderBoard_once();
                // Clear brd
                //brd = Array(9).fill(null).map(  () => Array(13).fill(null)  );
                v_movepart = 0;
                
                let xp=0; 
                let yp=0;
                let zp=0;
                let ctrp=0;
                this.flg_drop = 0;
                this.generate_board_xref();
                
                //ctrp is the number of squares you populate with a sfen
                // it should always be 116 or you have an invalid sfen key

                for (zp=0; zp < SFEN.length; zp++) {
                    var char1 = (SFEN.substring(zp,(zp+1)));

                    // hack ... Fen was designed as a 1 char
                    //      promoted pieces are +{fen} so
                    //      you have to make up a hack to accomodate a promoted piece.

                    // Example: if sfen contains a +R it is a promoted piece of type Dragon
                    // char1 will now contain 2 chars with a plus_piece fen code
                    if (char1 === "+") {
                        zp++;
                        char1 = char1 + (SFEN.substring(zp,(zp+1)));
                        board.push(char1) ;
                        yp++;
                        ctrp++;
                        continue;  
                    }
                    
                    
                    if (char1 > "0" && char1 <= "9" ) {
                        for (i = 1; i <= Number(char1); i++) {
                           board.push( "x");
                           yp++;
                           ctrp++
                        }
                        continue;
                    }

                    if ( char1 >= "a" &&  char1 <= "z"   ) {
                        board.push(char1) ;
                        if (char1 == 'k') this.WhiteKing = ctrp;
                        yp++;
                        ctrp++;
                        continue;
                    }

                    if ( char1 == "/") {
                        xp++; 
                        yp=0;
                        continue;
                    } 

                    // everything is uppercase now
                    if ( char1 >= "A" &&  char1 <= "Z"   ) {
                        board.push(char1);
                        if (char1 == 'K') this.BlackKing = ctrp;
                        yp++;
                        ctrp++;
                        continue;
                    }

                     
                // end of for zp
                }

                 console.log("ctrp is ", ctrp);

                
                // Reset game state
                this.currentPlayer = 'black';
                this.selectedCell = null;
                v_selection_flg = 0;
                this.moveCount = 0;
                this.sav_move_list_yel_green_red = [];
                this.objCap_pieces_sav = { black: [], white: [] };
                this.gameOver = false;
                let nop = 1;
            }
            
            // jts see if you want to clean this up
            // if you keep an array of non-clear cells it would not have to run
            // this again the entire board.
            clearCells() {
                var divname;
                let ctr = 0;
                for (var row = 0; row < 9; row++) {
                    for (var col = 0; col < 13; col++) {
                        divname = "div" + ctr.toString().padStart(3, '0');
                        let divToRemove = document.getElementById(divname);                         
                        ctr++;
                        if (divToRemove) { divToRemove.remove(); }
                        
                    }
                }
                let nop = 1;
            }

            gensub(row,col) {
                x = row * 13 + col;
                return x;
            }

            // fen logic ... uppercase is black
            //     lowercase is white
            //     x is code for an empty square
            pieceColorShort(char1) {
                let a = "";
                let b = "";
                if (char1.length > 1) {b=char1.substring(1,2);}
                else {b=char1;}
                if ( b == "x" ) {
                    a = "none";
                    return a;
                }

                if ( b >= "a" &&  b <= "z"   ) {
                    a = "white";
                    return a;
                }
                // everything is uppercase now
                if ( b >= "A" &&  b <= "Z"   ) {
                    a = "black";
                    return a;      
                }

            }

            // this came from the original AI program
            // it wanted to keep track of piece color
            // this was used in the span html
            pieceColor(char1) {
                let a = "";
                let b = "";
                if (char1.length > 1) {b=char1.substring(1,2);}
                else {b=char1;}
                if ( b == "x" ) {
                    a = "piece none";
                    return a;
                }

                if ( b >= "a" &&  b <= "z"   ) {
                    a = "piece white";
                    return a;
                }
                // everything is uppercase now
                if ( b >= "A" &&  b <= "Z"   ) {
                    a = "piece black";
                    return a;      
                }

            }

            renderBoard() {
                sync1();
                this.renderBoard_norm();
                f_delay(9000);
            }

            renderBoard_flip() {
                var nop = 1;
                

                // jts this is old code .... i will clean-up later
                const boardElement = document.getElementById('board');
                boardElement.innerHTML = '';

                var divname;
                let ctr = 116;
                
                for (let row = 0; row <= 8; row++) {
                    for (let col = 0; col <= 12; col++) {
                        
                        
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        if ( col == 1 || col == 11 ) cell.className = 'cell2'; 
                        cell.dataset.row = row;
                        cell.dataset.col = col;
                        divname = "div" + ctr.toString().padStart(3, '0');
                        cell.id = divname; 
                        ctr++;
                        

                        const piece = board[ this.gensub(row,col) ];
                        if (piece) {
                            const pieceElement = document.createElement('span');
                            pieceElement.className = this.pieceColor(piece);
                            if ( piece == "x") { pieceElement.textContent = " "; } 
                            else { pieceElement.textContent = piece; } 
                            let span_id = "span" + row.toString().padStart(2,'0') + col.toString().padStart(2,'0')  
                            pieceElement.ID = span_id
                            // cell.appendChild(pieceElement);
                        }
                        
                        
                        if ( piece !== "x") {
                            let str_img = "images/" + this.ImageXref[ (piece) ];
                            let img = document.createElement('img');
                            img.setAttribute('src',str_img);
                            let img_color = this.pieceColorShort(piece);
                            let str_img_class = "img" + img_color;
                            img.setAttribute('class',str_img_class);
                            if ( this.flg_flip == 1) img.style.transform= "rotate(180deg)";
                            cell.appendChild(img)
                        }

                        cell.addEventListener('click', () => this.onClick_cell(divname));
                        boardElement.appendChild(cell);
                        var nop = 0;
                        nop++;

                        
                        // END OF COL LOOP
                    }
                    // end of row loop
                }
                // end of method
                return; 
                
            }

            
            renderBoard_rev() {
                const boardElement = document.getElementById('board');
                boardElement.innerHTML = '';
                var ctr = 116;
                var nID = 116;

                for (let row = 8; row >= 0; row--) {
                    for (let col = 12; col >= 0 ; col--) {
                
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        if ( col == 1 || col == 11 ) cell.className = 'cell2'; 
                        cell.dataset.row = row;
                        cell.dataset.col = col;
                        nID = this.gensub(row,col);
                        cell.dataset.nID = nID;
                        let divname = "div" + nID.toString().padStart(3, '0');
                        cell.id = divname; 
                        ctr--;
                        

                        cell.addEventListener('click', () => this.onClick_cell( divname ) );
                        boardElement.appendChild(cell);
                        var nop = 0;
                        nop++;

                        
                        // END OF COL LOOP
                    }
                    // end of row loop
                }
                // end of method
                return; 

            }

            renderBoard_once() {
                const boardElement = document.getElementById('board');
                boardElement.innerHTML = '';
                var ctr = 0;
                var divname = "div000";
                var nID = 0;

                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 13; col++) {
                
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        if ( col == 1 || col == 11 ) cell.className = 'cell2'; 
                        cell.dataset.row = row;
                        cell.dataset.col = col;
                        nID = this.gensub(row,col);
                        cell.dataset.nID = nID;
                        divname = "div" + nID.toString().padStart(3, '0');
                        cell.id = divname; 
                        ctr++;
                        

                        cell.addEventListener('click', () => this.onClick_cell( cell.id ) );
                        boardElement.appendChild(cell);
                        var nop = 0;
                        nop++;

                        
                        // END OF COL LOOP
                    }
                    // end of row loop
                }
                // end of method
                return; 

            }

            renderBoard_norm() {
                
                var divname;
                let ctr = 0;
                var nID;
                
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 13; col++) {
                        nID = this.gensub(row,col);
                        divname = "div" + nID.toString().padStart(3, '0');
                        if ( this.flg_flip == 1 ) {
                            var two_nid = board_xref[ this.gensub(row,col) ]
                            console.log(two_nid)
                            divname = "div" + two_nid[1].toString().padStart(3,'0');

                        }
                                        
                        const cellElement = document.getElementById(divname); 
                        var msg = divname + " " + cellElement.innerHTML;
                        console.log(msg);

                        const piece = board[ this.gensub(row,col) ];
                        
                        if ( piece === "x" && cellElement.innerHTML.length > 0 ) sync1(); 
                        if ( piece === "x") { cellElement.innerHTML='';}
                        else {
                            cellElement.innerHTML='';
                            let str_img = "images/" + this.ImageXref[ (piece) ];
                            let img = document.createElement('img');
                            img.setAttribute('src',str_img);
                            let img_color = this.pieceColorShort(piece);
                            let str_img_class = "img" + img_color;
                            img.setAttribute('class',str_img_class);
                            if ( this.flg_flip == 1) img.style.transform= "rotate(180deg)";
                            if ( this.flg_flip == 0) img.style.transform= "rotate(0deg)"
                            cellElement.appendChild(img)
                        }

                       
                                                
                        // END OF COL LOOP
                    }
                    // end of row loop
                }
                // end of method
                return; 
            }

            renderGrayNess(gColor) {
                sync1();

                if (gColor == 'white' ) {
                    const myElements = document.querySelectorAll(".imgwhite");

                    for (x=0; x < myElements.length; x++) {
	                    myElements[x].style.opacity = '1.0';
                    }

                    const myElements2 = document.querySelectorAll(".imgblack");

                    for (y=0; y < myElements2.length; y++) {
	                    myElements2[y].style.opacity = '0.5';
                    }
                }

                sync1();
                    
                if ( gColor == 'black' ) {
                    const myElements = document.querySelectorAll(".imgwhite");

                    for (x=0; x < myElements.length; x++) {
	                    myElements[x].style.opacity = '0.5';
                    }

                    const myElements2 = document.querySelectorAll(".imgblack");

                    for (y=0; y < myElements2.length; y++) {
	                    myElements2[y].style.opacity = '1.0';
                    }

                }

                sync1();
                 
            }
            
            renderCapturedPieces() {
                const blackElement = document.getElementById('black-captured');
                const whiteElement = document.getElementById('white-captured');
                
                blackElement.innerHTML = '';
                whiteElement.innerHTML = '';
                
                x = 0
                this.objCap_pieces_sav.black.forEach(piece => {
                    const pieceElement = document.createElement('span');
                    pieceElement.className = 'captured-piece';
                    x++;
                    pieceElement.ID = 'CPB_' + x.toString().padStart(3,'0');
                    pieceElement.textContent = this.pieces[ piece ];
                    pieceElement.addEventListener('click', () => this.onClick_CapturePieceBlack(piece, 'black'));
                    blackElement.appendChild(pieceElement);
                });
                
                x = 0;
                this.objCap_pieces_sav.white.forEach(
                    piece => {
                        const pieceElement = document.createElement('span');
                        pieceElement.className = 'captured-piece';
                        x++;
                        pieceElement.ID = 'CPW_' + x.toString().padStart(3,'0');
                        pieceElement.textContent = this.pieces[piece];
                        pieceElement.addEventListener('click', () => this.onClick_CapturePieceWhite(piece, 'white'));
                        whiteElement.appendChild(pieceElement);
                        }
                );

            }
            

            process_mv_bucket() {
                mv_bucket.forEach(
                        ([r, c]) => {
                          
                            const piece = board[ this.gensub(r,c) ];
                            if (piece != "x") {
                                const pieceElement = document.getElementsByName('span');
                                pieceElement.className = this.pieceColor(piece);
                                pieceElement.textContent = this.pieces[piece];
                                let span_id = pieceElement.ID
                            }
                        }
            
                    
                    );

                }

            make_yellow(nID) {
                this.f_make_yellow_select_cell(nID);
                var nop = 1;
                nop++;
                return;


            }
            
            make_green(nID) {
                //this.onClick_CapturePieceWhite(gp, 'white'));
                //this.onClick_CapturePieceBlack(gp, 'black'));
                this.highlightDropZones();
                return;
            }

                        // used in pass1
            // used in pass2
            //   on pass2 .... v_selection_flg=1
            onClick_cell( str_nID ) {
                this.divinfo = str_nID;
                if (this.gameOver) return;
                
                const nID = Number(substr1(str_nID,3,3));

                let piece = board[ nID ];

                if ( v_selection_flg === 0 )  {
                    let rc = this.onClick_cell_pass1(nID,piece);
                    if (rc == 0 ) v_selection_flg = 1;
                } else {
                    this.onClick_cell_pass2(nID,piece);
                    v_selection_flg = 0;
                }    
                var nop = 1;    
            }
 



            onClick_cell_pass1(nID,piece) {

                // pass1 pocket pocket col0(pre-move drop) col12(pre-move drop)

                var col = nID % 13;

                

       

                if ( col == 0 && this.currentPlayer === "white" && this.flg_flip == 0 ) {
                    this.onClick_cell_pass1_drop_type(nID,"white");
                    return 16;
                }
 
                if (col == 12 && this.currentPlayer === "black" && this.flg_flip == 0 ) {
                    this.onClick_cell_pass1_drop_type(nID,"black");
                    return 16;
                }

       

                // enter if ... on pass-1 only  this is work for a pre-move type
                if ( this.pieceColorShort(piece) === this.currentPlayer && v_selection_flg === 0) {
                    this.generate_move_list(this.currentPlayer);
                    this.f_make_yellow_select_cell( nID );
                    v_selection_flg = 1;
                }


                // if on pass1 you click enemy piece or empty square
                // you are not picking up the right piece
                // send a  ing and return code 12, rc=0 is perfect
                if ( this.pieceColorShort(piece) === this.currentPlayer) {
                    var nop = 1; 
                    return 0;
                } else {
                     const audio = new Audio('sound/ping.mp3');
                     audio.play();
                     this.showbanner();
                     v_selection_flg = 0; 
                     return 12;
                }
                 
                
            }

            onClick_cell_pass2(nID,piece) {

                // jts this is a un-testped patch
                // if you are in this method --- I think
                //  this selected cell is always on I need to test this dec 06
                if ( this.selectedCell) {
                    this.onClick_cell_pass2_move_type(nID);
                    return;
                }

                var col = nID % 13;
                

                if ( col == 0 && this.currentPlayer === "white"  ) {
                    this.onClick_cell_pass2_drop_type(nID,"white");
                    return;
                }

                if (col == 12 && this.currentPlayer === "black" ) {
                    this.onClick_cell_pass2_drop_type(nID,"black");
                    return;
                }

                this.onClick_cell_pass2_move_type(nID);
                return;

            }

            onClick_cell_pass1_drop_type(nID,color) {

                this.dzPieceInHand = board[ nID ];
                const piece = this.dzPieceInHand;

                if ( color === "white") {
                    this.flg_drop=1;
                    this.onClick_CapturePieceWhite(piece, this.currentPlayer);
                } else {
                    this.flg_drop=1;
                    this.onClick_CapturePieceBlack(piece, this.currentPlayer);
                }
                
                this.make_yellow(nID)
                this.make_green(nID);

                v_selection_flg = 1; 
                return;
            }

            onClick_cell_pass1_move_type(nID) {
                const piece = board[ nID ];
            }

            onClick_cell_pass2_drop_type(nID) {
                const piece = board[ nID ];
            }

            onClick_cell_pass2_move_type(nID) {
                if (this.selectedCell) {
                    const [selectednID] = this.selectedCell;
                    
                    if (selectednID === nID ) {
                        // Deselect
                        this.selectedCell = null;
                        this.clearHighlights(); 
                        return;
                    }
                    
                    // jts fix comment out isvalidmove
                    // validmoves are green and red 
                    // do we need to a valid again?  yes maybe for check
                    // comment code for now

                    
                    var pass2_ready = this.isValidMove(selectednID, nID); 

                    // pass2 - do your move and record a mess of stuff
                    if ( pass2_ready ) {
                        this.make_move(selectednID, nID);
                        this.selectedCell = null;
                        this.clearHighlights();
                        v_selection_flg = 0;
                        this.printboard();
                    } else {
                        this.selectedCell = null;
                        this.clearHighlights();
                        
                        // we are at the end of pass1
                        // if you clicked a piece make it yellow
                        // set the flag to say on the next ineration do a pass 2
                        //if ( this.pieceColorShort(piece) === this.currentPlayer) {
                        //    this.f_make_yellow_select_cell(row, col);
                        //    v_selection_flg = 1;
                        //    this.sav_move_list_yel_green_red.push( this.gensub(row,col) );
                        //}

                        const audio = new Audio('sound/error.mp3');
                        audio.play();

                    }

                // end of if selected cell    
                }
                return;
            }


            
       
            f_make_yellow_select_cell(nID) {
                const row = Math.trunc(nID);
                const col = nID % 13;
                this.selectedCell = [nID];
                this.highlightValidMoves(nID);
            }
            
            onClick_CapturePieceBlack(pieceType, player) {
                if ( (player !== this.currentPlayer && player != "none" ) || this.gameOver) return;
                
                this.dzPieceInHand = pieceType;
                this.highlightDropZones();
            }

            onClick_CapturePieceWhite(pieceType, player) {
                if ( (player !== this.currentPlayer && player != "none" ) || this.gameOver) return;
                
                this.dzPieceInHand = pieceType;
                this.highlightDropZones();
            }




            toRowj(nID) {
                let a = nID 
                let r =  parseInt ( (a/13) )
                return r;
            }

            toColj(nID) {
                let a = nID                
                let c = parseInt (  (a % 13) )
                return ((c));
            }

            // input: "div###"
            // output: array of possilbe moves
            // set: master piece on 1st click
            getListOfSquaresYouCanMoveto(nID) {
                var row = this.toRowj(nID);
                var col = this.toColj(nID);

                const piece = board[ this.gensub(row,col) ];
                if ( piece == "x" ) return [];
                
                this.c1PieceFEN = piece;

                if (this.flg_flip == 0) { 
                    var arrPossibleMoves =  this.movesYouCanDo[ (this.c1PieceFEN) ];
                }
                else {
                    var arrPossibleMoves =  this.movesYouCanDo_flip[ (this.c1PieceFEN) ];
                }

                return arrPossibleMoves;

            }
            
            highlightValidMovesPocket(currentPlayer) {
                if ( this.flg_flip == 0) {
                if ( currentPlayer == "white") {
                    const PocketCell = document.querySelector(`[data-row="0"][data-col="0"]`);
                    let looksquare = board[0]
                    let iamempty = 0;
                    
                    if (this.pieceColorShort(looksquare) == "none") { iamempty = 1;}
                    if ( iamempty == 1 ) {
                        const cell = PocketCell;
                        cell.classList.add('valid-move');
                        cell.addEventListener('click', () => this.onClickDropHere(0, 0));
                        this.sav_move_list_yel_green_red.push( this.gensub(0,0) );
                    }
                } else {
                    const PocketCell = document.querySelector(`[data-row="8"][data-col="12"]`);
                    let looksquare = board[116]
                    let iamempty = 0;
                    
                    if ( this.pieceColorShort(looksquare) == "none") { iamempty = 1;}
                    if ( iamempty == 1 ) {
                        const cell = PocketCell;
                        cell.classList.add('valid-move');
                        cell.addEventListener('click', () => this.onClickDropHere(8,12));
                        this.sav_move_list_yel_green_red.push( this.gensub(8,12) );
                    }
                }
                }
                
                return;
            }

            // pass 1 
            //  get the piece fen of the square you just clocked
            //  convert to an nID
            //  read the move array and run the loop

            highlightValidMoves(nID) {
                this.clearHighlights();
                
                var divname = "div" + nID.toString().padStart(3, '0');
                                        
                const selectedCell  = document.getElementById(divname);
                
                // jts get json value
                // jts work in getvalidmoves

                // selected square turns yellow if there is a piece there and
                // the piece is the correct color for the turn
                selectedCell.classList.add('selected');
                this.sav_move_list_yel_green_red.push(nID);
    
                //  pass1 
                //      pass the nID and run the array
                //      store in a possiblemoves array
                let possibleMoves = this.getListOfSquaresYouCanMoveto(nID);
                console.log('possible moves', possibleMoves)
                
                
                // pass1
                //    validmoves contains a list of everything that should be green or red
                var validMoves = this.getValidMoves(nID, possibleMoves);

                // pass1
                //     your clicked square is now yellow from prev method call
                //     the square of the enemy piece becomes red
                //     the square of an empty spot becomes green
                //     if zero most likely an error - you clicked wrong square (guess right now)
                validMoves.forEach(
                    ([r, c]) => {
                        const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                        var loc_color = this.pieceColorShort(board[ this.gensub(r,c) ]); 
                         
                        if ( loc_color !== this.currentPlayer && loc_color !== "none" ) {
                            // pass 1 - enemy square goes red
                            cell.classList.add('enemy-piece');
                            v_move_ctr_for_pocket++;
                            this.sav_move_list_yel_green_red.push( (this.gensub(r,c)) );
                        } else {
                            // pass 1 - empty square - square goes green
                            cell.classList.add('valid-move');
                            v_move_ctr_for_pocket++;
                            this.sav_move_list_yel_green_red.push( (this.gensub(r,c)) );
                        }
                    }
                );

                //  pass1
                //    if you have any valid moves and your pocket is empty
                //    make the pocket green so that you can pocket into that square
                if ( v_move_ctr_for_pocket > 0 ) this.highlightValidMovesPocket(this.currentPlayer);
                
                // end of section highlightvalidmoves
                var nop = 1;
            }
            
            // needs work
            // I need to add/fix pawn drop logic
            highlightDropZones() {
                this.clearHighlights();
                
                for (let row = 0; row < 9; row++) {
                    for (let col = 2; col < 11; col++) {
                        var looksquare = board[ this.gensub(row,col) ]
                        var iamempty = 0;
                          // null of this board=empty good to drop
                        if ( this.pieceColorShort(looksquare) === "none") { iamempty = 1;}
                        if ( iamempty == 1 ) {
                            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                            cell.classList.add('valid-move');
                            this.sav_move_list_yel_green_red.push( (this.gensub(row,col)) )
                            cell.addEventListener('click', () => this.onClickDropHere(row, col));
                        }
                    }
                }
            var nop = 1;    
            }
            
            clearHighlights() {
                v_move_ctr_for_pocket = 0;
                this.dzPieceInHand = null;
                document.querySelectorAll('.cell').forEach(
                    cell => { cell.classList.remove('selected', 'valid-move', 'enemy-piece');  }
                );
                v_selection_flg = 0;
                this.sav_move_list_yel_green_red = [];
                this.dzPieceInHand = null;
                sync1;
                
            }
            
            getValidMovesSlider(nID,numSections) {
                const piece = board[ nID ];
                                
                let moves2 = [];
                
                for (y=1; y <= numSections; y++) {
                    this.c2PieceFEN = this.c1PieceFEN + y.toString();
                 
                    // you nee to put the c2 var in parenthesis because
                    // it contains the special char +

                
                    if (this.flg_flip == 0) { 
                        var possibleMoves2 =  this.movesYouCanDo[ (this.c2PieceFEN) ];
                    }
                    else {
                        var possibleMoves2 =  this.movesYouCanDo_flip[ (this.c2PieceFEN) ];
                    }

                    
                    console.log(this.c2PieceFEN," possibleMoves2 ",possibleMoves2);
                    if ( possibleMoves2[0] == 2 ) {
                        console.log("error on moves slider");
                        debugger;
                        return [];
                    }

                    var flg_cont = 0;
                    

                    // position 0 - 1=jump 1 space break, 2=slider and break 3= 1 space and continue
                    // when going off board do you want to continue the x loop
                    //   or break out of x loop.  This is for dragon rook
                    if ( possibleMoves2[0] == 3 ) { flg_cont = 1; } else { flg_cont = 0; } 
                    if ( possibleMoves2[0] == 1 || possibleMoves2[0] == 3 ) {
                         
                        // position-1 how many elements are in the array
                        //   this represents the number of possible moves a piece can do
                        //   for example a King has the ability to make 8 moves if it is in the center of
                        //   the board and all adjecent squares are empty and there is no check
                        //     I named this variable range
                        let range = possibleMoves2[1];
                        let adjpos = 2
                        
                        for (let j=1; j <= range; j++) {
                            let new_nid = nID + possibleMoves2[adjpos];
                            let newRow = this.toRowj(new_nid);
                            let newCol = this.toColj(new_nid);
                            adjpos++;
                             
                            // if you are doing a long slide then you need to break
                            // if you are doing a 1 square jump then continue testing
                            if (newRow < 0 || newRow >= 9 || newCol < 2 || newCol >= 11) {
                                if (flg_cont == 1) continue;
                                break;
                            }
                                                        
                            var targetPiece = board[ (this.gensub(newRow,newCol)) ];
                            
                            // empty square ... continue for x loop
                            if (this.pieceColorShort(targetPiece) == "none") {
                                moves2.push([newRow, newCol]);
                            }
                            // opponent square ... stop for x loop
                            if (this.pieceColorShort(targetPiece) !== this.pieceColorShort(piece) && this.pieceColorShort(targetPiece) !== "none") {
                                moves2.push([newRow, newCol]);
                                if (flg_cont == 0 ) break;
                            }
                            // you have control of the square ... stop for x loop
                            if (this.pieceColorShort(targetPiece) === this.pieceColorShort(piece)) {
                                if (flg_cont == 0 ) break; 
                            } 
                            


                        }
                        //end of j loop
                    }
                    //end of possibleMoves2 type-1 if

                }  
                //end of y loop

                return moves2;
                // end of method

            }


            // pass1 
            //    run the move array-of-possible-moves
            //    type-1  simple 1 move leap
            //    type-2  complex slide move of rook or bishop
            //    type-3  append-move after a type-2 add all type-1 moves
            //            for example a dragon horse = bishop + king
            getValidMoves(nID, possibleMoves) {
                // if a piece is not selected there are no valid moves
                const piece = board[ nID ];
                if ( piece == "x" ) return [];
                
                let moves = [];

                if (possibleMoves[0] == 2) {
                    // ut oh ... this is a sliding piece like a bishop
                    // this is more complex to figure out
                    // go to a new method to do that
                    moves = this.getValidMovesSlider(nID,possibleMoves[2]);
                    return moves;
                }
  
                // position-0 piece is a 1 square move leap or night leap
                if ( possibleMoves[0] === 1 ) {
                    // position-1 how many elements are in the array
                    //   this represents the number of possible moves a piece can do
                    //   for example a King has the ability to make 8 moves if it is in the center of
                    //   the board and all adjecent squares are empty and there is no check
                    //     I named this variable range
                    let range = possibleMoves[1];
                    let adjpos = 2
                    
                    for (var j=1; j <= range; j++) {
                        var new_nid = nID + possibleMoves[adjpos];
                        var newRow = this.toRowj(new_nid);
                        var newCol = this.toColj(new_nid);
                        adjpos++;
                        if (newRow < 0 || newRow >= 9 || newCol < 2 || newCol >= 11) continue;

                        var targetPiece = board[ this.gensub(newRow,newCol) ];
                        
                            if (targetPiece === "x") { moves.push([newRow, newCol]); }
                            else {
                                if ( this.pieceColorShort(targetPiece) !== this.pieceColorShort(piece) ) {
                                    moves.push([newRow, newCol]);
                                }
                            }
                    }
                }

                return moves;
            }
            
            
            
            isValidMove(fromNID, toNID ) {
                var start_pt = fromNID ;
                var end_pt = toNID;
                var piece = board[start_pt];
                var piece2 = board[end_pt];
                if (piece === 'x') return false;
                if (piece2 !== 'x') {this.flg_capure = 1;}
                else {this.flg_capure = 0;}
                var hit = 0;
                this.sav_move_list_yel_green_red.forEach( cell_id => {
                    if (cell_id == end_pt) hit=1;
                }
                );

                if (hit == 1) return true;
                else {
                    const audio = new Audio('sound/error.mp3');
                    audio.play();
                } 
                return false;
            }
            
            // A move may be logged as 3 events in v_move_array
            // !cap (piece) location where it was
            // !drop (nID) location where is was dropped
            // m (piece) from to 
            make_move(fromNID , toNID) {
                var piece = board[ fromNID ];
                var temp_piece = board[ toNID ];
                
                
                // at the move did the target square have a piece on it? if yes ...
                //  - if promoted then demote
                //  - change color ... black is uppercase 
                
                if (temp_piece != "x") {
                    this.f_move_array_add( ("!CAP " + temp_piece + " " + toNID.toString().padStart(3,'0') ) );
                    temp_piece = temp_piece.replace('+', ''); 
                    if (this.pieceColorShort(temp_piece)  == "white") { 
                        temp_piece = temp_piece.toUpperCase();
                        var empty_drop_spot = this.find_empty_black();
                        if ( empty_drop_spot > 0) { 
                            board[empty_drop_spot] = temp_piece;
                            this.f_move_array_add(  ("!DROP " + empty_drop_spot.toString().padStart(3,'0') ) ); 
                        } else { 
                            this.objCap_pieces_sav.black.push(temp_piece);
                        }
                    } else {  
                        temp_piece = temp_piece.toLowerCase();
                        var empty_drop_spot = this.find_empty_white();
                        if ( empty_drop_spot > 0) { 
                            board[empty_drop_spot] = temp_piece;
                            this.f_move_array_add(  ("!DROP " + empty_drop_spot.toString().padStart(3,'0') ) ); 
                        } else { 
                            this.objCap_pieces_sav.white.push(temp_piece);
                             
                        }

                        
                    }
                }
                
               var msg = ""; 
               var to_nID = toNID; 
               var from_nID = fromNID;
               board[ to_nID ] = piece;
               board[ from_nID ] = "x"; 
                
                // jts fix promotion for pawns, knights, and lance
                // Check for promotion and must promote
                if (this.mustPromote(piece,toNID) && this.flg_drop == 0) {
                    msg = "!PROMOTE " + piece + " " + from_nID.toString().padStart(3,'0');
                    v_move_array.push(msg);
                    piece = "+" + piece;
                    board[ to_nID ] = piece;
                }
         
                // if the mustpromote routine was a success
                // the piece is now +p, if so this if statement is always false
                if ( 
                      ( this.canPromote(piece, toNID) && this.flg_drop == 0) ||
                      ( this.canPromote(piece, fromNID) && this.flg_drop == 0)
                    ) 
                {
                    if (confirm('Promote this piece?')) {
                        msg = "!PROMOTE " + piece + " " + from_nID.toString().padStart(3,'0'); 
                        v_move_array.push(msg);
                        piece = "+" + piece;
                        board[ to_nID ] = piece;
                    }
                }
                
                this.moveCount++;
                var move_xxx = this.moveCount.toString().padStart(3,'0');
                let move_string = "m" + move_xxx + " " + piece + " " + 
                    fromNID.toString().padStart(3,'0') + "-" +
                    toNID.toString().padStart(3,'0') ;
                v_move_array.push(move_string);
                v_selection_flg = 0;
                this.sav_move_list_yel_green_red = [] ; 
                
                this.renderBoard();
                this.renderCapturedPieces();
                this.switchPlayer();
                this.updateStatus();
                this.checkGameEnd();
                return;
            }
            
            onClickDropHere(row, col) {
                var piece = board[ this.gensub(row,col) ];

                // you must drop on an empty square, that is a value of x
                if ( piece !== "x") return;

                // if you don't have a piece-in-hand you are not doing a drop
                if (!this.dzPieceInHand) return;
                
                board[ this.gensub(row,col) ] =  this.dzPieceInHand;
                
                const capturedArray = this.objCap_pieces_sav[this.currentPlayer];
                const index = capturedArray.indexOf(this.dzPieceInHand);
                capturedArray.splice(index, 1);
                
                this.dzPieceInHand = null;
                this.clearHighlights();
                this.renderBoard();
                this.renderCapturedPieces();
                this.switchPlayer();
                this.updateStatus();
                this.checkGameEnd();
                sync1();
            }
            
            mustPromote(piece, nID) {
                var row = this.toRowj(nID)
                if ( piece.length == 1) {
                    if ( ['L','P'].includes(piece) && row < 1 && this.flg_flip == 0) return true;
                    

                    if ( ['l','p'].includes(piece) && row > 7 && this.flg_flip == 0) return true;
                    

                    if ( ['N',].includes(piece) && row < 2 && this.flg_flip == 0) return true;
                    

                    if ( ['n',].includes(piece) && row > 6 && this.flg_flip == 0) return true;
                    

                }
                return false; 
            }

            canPromote(piece, nID) {
                const row = this.toRowj(nID);
                if (piece == 'x' ) return false;
                if (piece.startsWith('+')) return false;
                if (['K','k'].includes(piece)) return false;
                
                if (this.pieceColorShort(piece) === "black" && this.flg_flip == 0 && row <= 2 ) { return true; }
                
                
                if (this.pieceColorShort(piece) === "white" && this.flg_flip == 0 && row >= 6 ) { return true; }
                
                
                

                return false;
            }
            
            switchPlayer() {
                this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
                
            }

            f_move_array_add(str1) {
               v_move_array.push(str1);
               return;

            }

            onBtn_setFlipFlag() {
                // zero noflip - 1 is flip
                this.flg_flip = this.flg_flip === 0 ? 1 : 0 ;
                // f_sav_board();
                // f_flip_board();
                this.renderBoard_rev();
                sync1();
                this.renderBoard();
                sync1();  
                this.updateStatus();
                sync1();  
                this.f_move_array_add("!FLIP");            
                return;
            }
            
            checkGameEnd() {
                // Simple check for king capture
                let have_blackKing = false, have_whiteKing = false;
                
                for (var rowg = 0; rowg < 9; rowg++) {
                    for (var colg = 0; colg < 13; colg++) {
                        const piece = board[ this.gensub(rowg,colg) ];
                        if (piece === 'K') { have_blackKing = true; }
                        if (piece === 'k') { have_whiteKing = true; } 
                            
                    }
                }
                
                if (!have_blackKing) {
                    this.gameOver = true;
                    document.getElementById('status').textContent = 'Gote wins! King captured!';
                } else if (!have_whiteKing) {
                    this.gameOver = true;
                    document.getElementById('status').textContent = 'Sente wins! King captured!';
                }
            }
            
            showbanner() {
                    var msg1 = "divinfox";
                    
                    msg1 = this.divinfo 
                    document.getElementById('status').textContent =  + msg1; 
            }

            updateStatus() {
                let gcolor = "";
                document.getElementById('current-player').textContent = 
                    this.currentPlayer === 'black' ? '(Sente)' : '(Gote)';
                document.getElementById('move-count').textContent = this.moveCount;
                
                if (!this.gameOver) {
                    let msg = "";
                    if ( this.currentPlayer === 'black' ) { 
                        msg = "Sente's turn ";
                        gcolor = "black"; 
                    } else { 
                        msg = "Gote's turn ";
                        gcolor = "white"; 
                    }
                    if (this.flg_flip == 0 ) { msg = msg + "- Sente's view"}
                    if (this.flg_flip == 1 ) { msg = msg + "- Gote's view"}
                    
                    let msg1 = this.divinfo + "-" + 
                               this.toRowj(Number(substr1(this.divinfo,3,3))).toString() + "-" + 
                               this.toColj(Number(substr1(this.divinfo,3,3))).toString();
                    document.getElementById('status').textContent = msg + "-" + msg1; 
                        
                    this.renderGrayNess(gcolor);
                }

                this.flg_drop = 0;
                v_selection_flg = 0;
            }

            find_empty_white() {
                let empty_pos = 0;
                if (this.flg_flip == 0) {
                    for (x=13; x <=116; x=x+13) {
                        var lookatpiece = board[ x ];
                        if ( lookatpiece == "x" ) { empty_pos = x; break; } 
                    }
                
                }
                    return empty_pos;
            }


            find_empty_black() {
                let empty_pos = 0;
                if (this.flg_flip == 0) {
                    for (x=103; x >= 12; x=x-13) {
                        var lookatpiece = board[ x ];
                        if ( lookatpiece == "x" ) { empty_pos = x; break; } 
                    }
                    
                }
                return empty_pos;

            }

            

            f_undo_cap(cmd) {
                var line1 = cmd;
                const rxfind = / /;
                const rxout = line1.split(rxfind); 
                console.log(rxout[0],rxout[1],rxout[2]);
                //
                var toLoc =   Number(substr1(rxout[2], 0,3));
                
                //
                board[  toLoc ] = (rxout[1]);
                return;


            }
            
            f_undo_flip(cmd) {
                this.flg_flip = this.flg_flip === 0 ? 1 : 0 ;
                //f_sav_board();
                //f_flip_board();
            }

            // msg = "!PROMOTE " + piece + " " + from_nID.toString().padStart(3,'0');
            f_undo_promote(cmd) {
                var line1 = cmd;
                const rxfind = / /;
                const rxout = line1.split(rxfind); 
                board[ (  Number(rxout[2]) ) ] = rxout[1];
                return;
            }

            f_undo_drop(cmd) {
                var line1 = cmd;
                const rxfind = / /;
                const rxout = line1.split(rxfind); 
                console.log(rxout);
                board[ (  Number(rxout[1]) ) ] = "x"
                return;
            }

            // 01234567890123  - adjpos values
            //      012345678 - substr1 values
            // mxxx +P nid-nid
            f_undo_move(cmd) {
                var adjpos = 0;
                var line1 = cmd; 
                var char1 = substr1(line1,5,1); 
                if (char1 == "+") { 
                    char1 = char1 + substr1(line1,6,1) ; 
                    adjpos = 8; 
                }
                else { adjpos = 7; }
                
                var fromNID = Number(substr1(line1,(adjpos+0),3));
                var toNID   = Number(substr1(line1,(adjpos+5),3));
                var loc1 = fromNID; 
                var loc2 = toNID; 
                console.log("undo move ", loc1,loc2)
                board[loc1] = char1;
                board[loc2] = "x";

            }

            f_move_back_process(cmd,eop,mctr) {
                var line1 = cmd;
                
                var char1 = substr1(line1,0,1);
                switch (char1) {
                    case "m":
                        // i really don't understand the logic here
                        // I want to do the while loop for two eop "m" array-elements
                        // if the m array-element is eop=1 this is an end-of-process
                        // indicator.  I want to skip the move and bubble up back to the
                        // while loop 
                        if ( mctr == 1) { this.f_undo_move(cmd); break; }
                    case "!":
                        if (line1.includes("!CAP "))     { this.f_undo_cap(cmd) ; break;}
                        if (line1.includes("!DROP "))    { this.f_undo_drop(cmd); break;  }
                        if (line1.includes("!FLIP "))    { this.f_undo_flip(cmd); break;}
                        if (line1.includes("!PROMOTE ")) { this.f_undo_promote(cmd); break;}
                        break;  
                }
                return;
            } 

            onBtn_goBack() {
                // you can not do a back move until step #3
                if ( v_move_array.length < 1) {
                    const audio = new Audio('sound/error.mp3');
                    audio.play();
                    return;
                }

                
                // end-of-process at zero we break the while loop
                // logic:
                // I want to process 1st m row and all !commands
                // when I hit 2nd m row ... special exit
                var mctr = 0;
                var eop = 1;

                while (eop > 0) {
                    if ( v_move_array.length == 0) { eop=0; break;}
                    var cmd = v_move_array[ (v_move_array.length - 1) ];
                    console.log("back is " + cmd);
                    var char1 = substr1(cmd,0,1);
                     
                    if (char1 == "m") {
                        mctr++;
                        if (mctr < 2  ) {
                            this.f_move_back_process(cmd,eop,mctr) 
                            this.renderBoard();
                            this.switchPlayer();
                            this.moveCount--;
                            this.updateStatus();
                            v_move_array.pop();
                            f_delay(1000);
                        } else { eop = 0; }
                    }

                    if (char1 != "m") {
                        this.f_move_back_process(cmd,eop,mctr) 
                        this.renderBoard();
                        this.updateStatus();
                        v_move_array.pop();
                        f_delay(1000);

                    
                    }
                    
                } 
            }
            
            // code here runs when button newgame is hit
            newGame() {
                board=[];
                v_move_array = [];
                v_move_action = [];
                const audio = new Audio('sound/start.mp3');
                audio.play();
                this.flg_flip = 0;
                this.initializeBoard();
                this.clearCells();
                this.renderBoard();
                this.renderCapturedPieces();
                this.currentPlayer = 'white';
                this.switchPlayer();          
                this.updateStatus();
            }
            
            showHelp() {
                const help = `
Shogi Piece Guide:
王/玉 - King: Moves one square in any direction
金 - Gold: Moves one square except diagonally backward
銀 - Silver: Moves one square diagonally or straight forward
桂 - Knight: Moves in an L-shape, two squares forward and one to the side
香 - Lance: Moves any number of squares straight forward
角 - Bishop: Moves diagonally any number of squares
飛 - Rook: Moves horizontally or vertically any number of squares
歩 - Pawn: Moves one square straight forward

Promoted pieces gain additional movement abilities.
Click a piece to see valid moves highlighted in green.
Enemy pieces you can capture are highlighted in pink.
                `;
                alert(help);
            }
// end-of-class ShogiGame
}
        
// Initialize game
const game = new ShogiGame();
