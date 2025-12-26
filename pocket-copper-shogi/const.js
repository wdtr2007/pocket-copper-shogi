const ImageXref = {                              
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

const movesYouCanDo = {
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



const del_movesYouCanDo_flip = {
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

// Piece symbols
const pieceskan = {
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

const pieces_orig_set = {
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

// global vars 

var v_movepart = 0;
var v_boardsize = 13 * 9;
var x,y,z,i = 0;
var friend_piece_bucket = [];
var friend_piece_bucket_moves = [];
var v_selection_flg = 0;
var v_move_array = [];
var v_move_action = [];
var v_move_ctr_for_pocket = 0;

var SFEN = "2lnsgkgsnl2/c2r5b3/2ppppppppp2/292/292/292/2PPPPPPPPP2/3B5R3/2LNSGKGSNL1C";
var board = []; 
var board_sav = [];
var board_xref = [];
var board_element = [];
var boardc = [];
var checkBoard = null;

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

async function play_sound(file1) {
     const audio = new Audio(file1);
     await audio.play();
}



function right(str, num) {  return str.slice(-num); }
function isLowerCase(str) { return str === str.toLowerCase(); }

async function sync1() {
    await waitForDOMLoaded();
} 

function substr1(str1,start,len) {
    return str1.substring(start,(start+len));
}

setTimeout(function() { var nop=1;}, 1000);  // 1000 milliseconds = 1 second

function f_delay(time) {
    return new Promise(resolve => setTimeout(resolve,time));
}



/**
 * Creates a promise that resolves when the DOM is fully loaded.
 * @returns {Promise<void>}
 */
function waitForDOMLoaded() {
    return new Promise((resolve) => {
        if (document.readyState === 'loading') {
            // DOM is still loading, wait for the event
            document.addEventListener('DOMContentLoaded', () => {
                resolve();
            }, { once: true });
        } else {
            // DOM is already loaded
            resolve();
        }
    });
}

// An async function to utilize the await keyword
async function initializePage() {
    console.log("Waiting for the DOM to load...");
    await waitForDOMLoaded();
    console.log("DOM fully loaded and parsed. Initializing application...");

    // Now you can safely interact with the DOM elements
    const element = document.getElementById('myElement');
    if (element) {
        element.textContent = 'Content added after DOM load';
    }
}

// Call the async function
initializePage();






// end of global funs




