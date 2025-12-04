
            function right(str, num) {  return str.slice(-num); }


        class ShogiGame {
            constructor() {
                this.board = Array(9).fill(null).map(  () => Array(13).fill(null)  );
            
            
        
                // 1 = jumper, 2 = slider, num of elements in array
        
                this.movesYouCanDo = {
                    "K" :  [ 1,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "G" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],
                    "S" :  [ 1,5,       -12,-13,-14, 12,   14  ],
                    "C" :  [ 1,4,       -12,-13,-14,    13  ],
                    "N" :  [ 1,2, -27 , -25 ],
                    "L" :  [ 2,1, 1],
                    "L1":  [ 2, 8, -13,-26,-39,-52,-65,-78,-91,-104] ,
                    "B" :  [ 2,1,4],
                    "B1":  [ 2,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "B2":  [ 2,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "B3":  [ 2,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "B4":  [ 2,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 
                    "R" :  [ 2,1,4],
                    "R1":  [ 2,8, ] ,
                    "R2":  [ 2,8, ],
                    "R3":  [ 2,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "R4":  [ 2,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "P":   [ 1,1,-13 ],

                    "+G" :  [ 1,7,-1, 1, -12,-13,-14, 12,   14  ],
                    "+S" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],
                    "+C" :  [ 1,5,       -12,-13,-14, 12,   14  ],
                    "+N" :  [ 1,6,-1, 1, -12,-13,-14,    13     ],
                    "+L" :  [ 2,1, 2],
                    "+L1":  [ 2, 8, -13,-26,-39,-52,-65,-78,-91,-104] ,
                    "+L2":  [ 2, 2, -13,13 ],
                    "+B" :  [ 2,1,5],
                    "+B1":  [ 2,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "+B2":  [ 2,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "+B3":  [ 2,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "+B4":  [ 2,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 
                    "+B5":  [ 1,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "+R" :  [ 2,1,5],
                    "+R1":  [ 2,8, ] ,
                    "+R2":  [ 2,8, ],
                    "+R3":  [ 2,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+R4":  [ 2,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+R5":  [ 1,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "+P":   [ 1,6,-1, 1, -12,-13,-14,    13     ],

                    "k" :  [ 1,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "g" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "s" :  [ 1,5,        12, 13, 14,-12,  -14  ],
                    "c" :  [ 1,4,        12, 13, 14,   -13  ],
                    "n" :  [ 1,2,  27 ,  25 ],
                    "l" :  [ 2,1, 1],
                    "l1":  [ 2, 8,  13, 26, 39, 52, 65, 78, 91, 104] ,
                    "b" :  [ 2,1,4],
                    "b1":  [ 2,8,  14, 28, 42, 56, 70, 84, 98, 112] ,
                    "b2":  [ 2,8,  12, 24, 36, 48, 60, 72, 84, 96],
                    "b3":  [ 2,8, -14,-28,-42,-56,-70,-84,-98,-112],
                    "b4":  [ 2,8, -12,-24,-36,-48,-60,-72,-84,-96 ], 
                    "r" :  [ 2,1,4],
                    "r1":  [ 2,8, ] ,
                    "r2":  [ 2,8, ],
                    "r3":  [ 2,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "r4":  [ 2,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "p":   [ 1,1, 13 ],

                    "+g" :  [ 1,7,-1, 1,  12, 13, 14,-12,  -14  ],
                    "+s" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "+c" :  [ 1,5,        12, 13, 14,-12,  -14  ],
                    "+n" :  [ 1,6,-1, 1,  12, 13, 14,   -13     ],
                    "+l" :  [ 2,1, 2],
                    "+l1":  [ 2, 8,  13, 26, 39, 52, 65, 78, 91, 104] ,
                    "+l2":  [ 2, 2, -13,13 ],
                    "+b" :  [ 2,1,5],
                    "+b1":  [ 2,8, -14,-28,-42,-56,-70,-84,-98,-112] ,
                    "+b2":  [ 2,8, -12,-24,-36,-48,-60,-72,-84,-96],
                    "+b3":  [ 2,8,  14, 28, 42, 56, 70, 84, 98, 112],
                    "+b4":  [ 2,8,  12, 24, 36, 48, 60, 72, 84, 96 ], 
                    "+b5":  [ 1,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "+r" :  [ 2,1,5],
                    "+r1":  [ 2,8, ] ,
                    "+r2":  [ 2,8, ],
                    "+r3":  [ 2,8, -1,-2,-3,-4,-5,-6,-7,-8],
                    "+r4":  [ 2,8,  1, 2, 3, 4, 5, 6, 7, 8],
                    "+r5":  [ 1,8,-1, 1, -12,-13,-14, 12,13,14  ],
                    "+p":   [ 1,6,-1, 1,  12, 13, 14,   -13     ]


                }

                this.currentPlayer = 'black'; // 'black' or 'white'
                this.selectedCell = null;
                this.moveCount = 0;
                this.capturedPieces = { black: [], white: [] };
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

                
                this.initializeBoard();
                this.renderBoard();
                this.updateStatus();
            }
            
            initializeBoard() {
                // Clear board
                board = Array(9).fill(null).map(  () => Array(13).fill(null)  );
                
                // Set up initial positions
                // Gote (opponent) pieces (top of board)
                this.board[0] = ['','','l','n','s','g','k','g','s','n','l','',''].map(p => ({type: p, player: 'white'}));
                this.board[1][0] = {type: 'c', player: 'white'};
                this.board[1][3] = {type: 'r', player: 'white'};
                this.board[1][9] = {type: 'b', player: 'white'};
                this.board[2] = ['','','p','p','p','p','p','p','p','p','p','',''].map(p => ({type: p, player: 'white'}));
                
                // Sente (player) pieces (bottom of board)
                this.board[6] = ['','','P','P','P','P','P','P','P','P','P','',''].map(p => ({type: p, player: 'black'}));
                this.board[7][3] = {type: 'B', player: 'black'};
                this.board[7][9] = {type: 'R', player: 'black'};
                this.board[8] = ['','','L','N','S','G','K','G','S','N','L','','C'].map(p => ({type: p, player: 'black'}));
                
                // Reset game state
                this.currentPlayer = 'black';
                this.selectedCell = null;
                this.moveCount = 0;
                this.capturedPieces = { black: [], white: [] };
                this.gameOver = false;
            }
            
            renderBoard() {
                const boardElement = document.getElementById('board');
                boardElement.innerHTML = '';

                var divname;
                let ctr = 0;
                
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 13; col++) {
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        cell.dataset.row = row;
                        cell.dataset.col = col;
                        divname = "div" + ctr.toString().padStart(3, '0');
                        cell.id = divname; 
                        ctr++;
                        
                        const piece = this.board[row][col];
                        if (piece) {
                            const pieceElement = document.createElement('span');
                            pieceElement.className = `piece ${piece.player}`;
                            pieceElement.textContent = this.pieces[piece.type];
                            cell.appendChild(pieceElement);
                        }
                        
                        cell.addEventListener('click', () => this.handleCellClick(row, col));
                        boardElement.appendChild(cell);
                    }
                }
                
                this.renderCapturedPieces();
            }
            
            renderCapturedPieces() {
                const blackElement = document.getElementById('black-captured');
                const whiteElement = document.getElementById('white-captured');
                
                blackElement.innerHTML = '';
                whiteElement.innerHTML = '';
                
                this.capturedPieces.black.forEach(piece => {
                    const pieceElement = document.createElement('span');
                    pieceElement.className = 'captured-piece';
                    pieceElement.textContent = this.pieces[piece];
                    pieceElement.addEventListener('click', () => this.selectCapturedPiece(piece, 'black'));
                    blackElement.appendChild(pieceElement);
                });
                
                this.capturedPieces.white.forEach(piece => {
                    const pieceElement = document.createElement('span');
                    pieceElement.className = 'captured-piece';
                    pieceElement.textContent = this.pieces[piece];
                    pieceElement.addEventListener('click', () => this.selectCapturedPiece(piece, 'white'));
                    whiteElement.appendChild(pieceElement);
                });
            }
            
            handleCellClick(row, col) {
                if (this.gameOver) return;
                
                const piece = this.board[row][col];
                
                if (this.selectedCell) {
                    const [selectedRow, selectedCol] = this.selectedCell;
                    
                    if (selectedRow === row && selectedCol === col) {
                        // Deselect
                        this.selectedCell = null;
                        this.clearHighlights();
                        return;
                    }
                    
                    // jts fix comment out isvalidmove
                    // validmoves are green and red 
                    // do we need to a valid again?  yes maybe for check
                    // comment code for now

                    // jts if (this.isValidMove(selectedRow, selectedCol, row, col)) {
                    if ( 1 == 1 ) {
                        this.makeMove(selectedRow, selectedCol, row, col);
                        this.selectedCell = null;
                        this.clearHighlights();
                        this.switchPlayer();
                        this.checkGameEnd();
                    } else {
                        this.selectedCell = null;
                        this.clearHighlights();
                        
                        if (piece && piece.player === this.currentPlayer) {
                            this.selectCell(row, col);
                        }
                    }
                } else {
                    // if you own this cell blk/wh and you clicked it
                    // and it was not clicked before make the cell yellow
                    if (piece && piece.player === this.currentPlayer) {
                        this.selectCell(row, col);
                    }
                }
            }
            
            selectCell(row, col) {
                this.selectedCell = [row, col];
                this.highlightValidMoves(row, col);
            }
            
            selectCapturedPiece(pieceType, player) {
                if (player !== this.currentPlayer || this.gameOver) return;
                
                this.selectedCapturedPiece = pieceType;
                this.highlightDropZones();
            }




            toRowj(nID) {
                let a = nID + 1
                let r =  parseInt ( (a/13) )
                return r;
            }

            toColj(nID) {
                let a = nID                
                let c = parseInt (  (a % 13) )
                return ((c));
            }

            getAdjSquares(ident1) {
                let row = this.toRowj(ident1);
                let col = this.toColj(ident1);

                const piece = this.board[row][col];
                if (!piece) return [];
                
                let pieceFen = piece.type;

                var arrPossibleMoves =  this.movesYouCanDo[pieceFen];
                console.log(arrPossibleMoves);

                return arrPossibleMoves;

            }
            
            highlightValidMoves(row, col) {
                this.clearHighlights();
                
                const selectedCell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                var ident1 = selectedCell.id;
                var nID = Number( right(ident1,3) );
                
                // jts get json value
                // jts work in getvalidmoves

                selectedCell.classList.add('selected');

                let adjSquares = this.getAdjSquares(nID);
                
                var validMoves = this.getValidMoves(row, col, nID, adjSquares);

                validMoves.forEach(([r, c]) => {
                    const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    if (this.board[r][c] && this.board[r][c].player !== this.currentPlayer) {
                        cell.classList.add('enemy-piece');
                    } else {
                        cell.classList.add('valid-move');
                    }
                });
            }
            
            highlightDropZones() {
                this.clearHighlights();
                
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 13; col++) {
                        if (!this.board[row][col]) {
                            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                            cell.classList.add('valid-move');
                            cell.addEventListener('click', () => this.dropPiece(row, col));
                        }
                    }
                }
            }
            
            clearHighlights() {
                document.querySelectorAll('.cell').forEach(cell => {
                    cell.classList.remove('selected', 'valid-move', 'enemy-piece');
                });
            }
            
            getValidMoves(row, col, nID, adjSquares) {
                // if a piece is not selected there are no valid moves
                const piece = this.board[row][col];
                if (!piece) return [];
                
                let moves = [];

                if ( adjSquares[0]== 1 ) {
                    let range = adjSquares[1];
                    let adjpos = 2
                    
                    for (let x=1; x <= range; x++) {
                        let new_nid = nID + adjSquares[adjpos];
                        let newRow = this.toRowj(new_nid);
                        let newCol = this.toColj(new_nid);
                        adjpos++;
                        if (newRow < 0 || newRow >= 9 || newCol < 0 || newCol >= 11) break;

                        console.log(newRow, newCol);
                        console.log(' ');
                        let targetPiece = this.board[newRow][newCol];
                        if (targetPiece) {
                            if (targetPiece.player !== piece.player) {
                                moves.push([newRow, newCol]);
                            }
                        } else {
                            moves.push([newRow, newCol]);
                        }


                    }
                }

                return moves;
            }
            
            getPieceDirections(type, player) {
                const forward = player === 'black' ? -1 : 1;
                
                
                const directions = {
                    'K': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(d => [...d, 1]),
                    'G': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                    'S': [[-1,-1],[-1,0],[-1,1],[1,-1],[1,1]].map(d => [d[0]*forward, d[1], 1]),
                    'C': [[-1,-1],[-1,0],[-1,1],[1,-1],[1,1]].map(d => [d[0]*forward, d[1], 1]),
                    'N': [[-2,-1],[-2,1]].map(d => [d[0]*forward, d[1], 1]),
                    'L': [[forward, 0, 9]],
                    'B': [[-1,-1],[-1,1],[1,-1],[1,1]].map(d => [...d, 9]),
                    'R': [[-1,0],[1,0],[0,-1],[0,1]].map(d => [...d, 9]),
                    'P': [[forward, 0, 1]],
                    '+S': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                    '+N': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                    '+L': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                    '+B': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(d => d[2] ? [...d.slice(0,2), 9] : [...d, 1]),
                    '+R': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(d => d[2] ? [...d.slice(0,2), 9] : [...d, 1]),
                    '+P': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                        
                    'k': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(d => [...d, 1]),
                    'g': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                    's': [[-1,-1],[-1,0],[-1,1],[1,-1],[1,1]].map(d => [d[0]*forward, d[1], 1]),
                    'c': [[-1,-1],[-1,0],[-1,1],[1,-1],[1,1]].map(d => [d[0]*forward, d[1], 1]),
                    'n': [[-2,-1],[-2,1]].map(d => [d[0]*forward, d[1], 1]),
                    'l': [[forward, 0, 9]],
                    'b': [[-1,-1],[-1,1],[1,-1],[1,1]].map(d => [...d, 9]),
                    'r': [[-1,0],[1,0],[0,-1],[0,1]].map(d => [...d, 9]),
                    'p': [[forward, 0, 1]],
                    '+s': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                    '+n': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                    '+k': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1]),
                    '+b': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(d => d[2] ? [...d.slice(0,2), 9] : [...d, 1]),
                    '+r': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(d => d[2] ? [...d.slice(0,2), 9] : [...d, 1]),
                    '+p': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,0]].map(d => [d[0]*forward, d[1], 1])
                };
        
            
                
                return directions[type] || [];
            }
            
            isValidMove(fromRow, fromCol, toRow, toCol) {
                const validMoves = this.getValidMoves(fromRow, fromCol);
                return validMoves.some(([r, c]) => r === toRow && c === toCol);
            }
            
            makeMove(fromRow, fromCol, toRow, toCol) {
                const piece = this.board[fromRow][fromCol];
                const capturedPiece = this.board[toRow][toCol];
                
                if (capturedPiece) {
                    let capturedType = capturedPiece.type.replace('+', '');
                    this.capturedPieces[this.currentPlayer].push(capturedType);
                }
                
                this.board[toRow][toCol] = piece;
                this.board[fromRow][fromCol] = null;
                
                // Check for promotion
                if (this.canPromote(piece, toRow)) {
                    if (confirm('Promote this piece?')) {
                        this.board[toRow][toCol].type = '+' + piece.type;
                    }
                }
                
                this.moveCount++;
                this.renderBoard();
            }
            
            dropPiece(row, col) {
                if (!this.selectedCapturedPiece || this.board[row][col]) return;
                
                this.board[row][col] = { type: this.selectedCapturedPiece, player: this.currentPlayer };
                
                const capturedArray = this.capturedPieces[this.currentPlayer];
                const index = capturedArray.indexOf(this.selectedCapturedPiece);
                capturedArray.splice(index, 1);
                
                this.selectedCapturedPiece = null;
                this.clearHighlights();
                this.renderBoard();
                this.switchPlayer();
                this.checkGameEnd();
            }
            
            canPromote(piece, row) {
                if (piece.type.startsWith('+')) return false;
                if (['K', 'G'].includes(piece.type)) return false;
                
                if (piece.player === 'black') {
                    return row <= 2;
                } else {
                    return row >= 6;
                }
            }
            
            switchPlayer() {
                this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
                this.updateStatus();
            }
            
            checkGameEnd() {
                // Simple check for king capture
                let blackKing = false, whiteKing = false;
                
                for (let row = 0; row < 13; row++) {
                    for (let col = 0; col < 13; col++) {
                        const piece = this.board[row][col];
                        if (piece && piece.type === 'K') { blackKing = true; }
                        if (piece && piece.type === 'K') { whiteKing = true; } 
                            
                    }
                }
                
                if (!blackKing) {
                    this.gameOver = true;
                    document.getElementById('status').textContent = 'Gote wins! King captured!';
                } else if (!whiteKing) {
                    this.gameOver = true;
                    document.getElementById('status').textContent = 'Sente wins! King captured!';
                }
            }
            
            updateStatus() {
                document.getElementById('current-player').textContent = 
                    this.currentPlayer === 'black' ? '(Sente)' : '(Gote)';
                document.getElementById('move-count').textContent = this.moveCount;
                
                if (!this.gameOver) {
                    document.getElementById('status').textContent = 
                        `${this.currentPlayer === 'black' ? 'Sente' : 'Gote'}'s turn`;
                }
            }
            
            newGame() {
                this.initializeBoard();
                this.renderBoard();
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
        }
        
        // Initialize game
        const game = new ShogiGame();
