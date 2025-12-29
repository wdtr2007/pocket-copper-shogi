class c_checkBoard {
    constructor() {
        this.blk_king_nid = 0;
        this.whi_king_nid = 0;
        this.PlayerColor = "unknown";
        this.friend_piece_bucket2 = [];
        this.enemy_piece_bucket2 = [];
        this.friend_piece_bucket2_moves = [];
        this.enemy_piece_bucket2_moves = [];
        this.boardsize = 117
        this.flg_blk_in_check = 0;
        this.flg_whi_in_check = 0;
        
    }

    set_boardc(blk,whi) {
        boardc = [];
        for (x=0; x < board.length; x++) {
            boardc.push( board[x] );
            if ( board[x] == 'K' ) this.blk_king_nid = x;
            if ( board[x] == 'k' ) this.whi_king_nid = x;
            this.flg_blk_in_check = blk;
            this.flg_whi_in_check = whi;
        }
        return;
    } ;

    // jts working 12/20/2025 
    // if you are in check your moves list is probable invalid 
    // run each move and check if you are in check
    doMoveStillinCheck() {
        this.friend_piece_bucket2 = [];
        this.friend_piece_bucket2_moves = [];

        this.enemy_piece_bucket2 = [];
        this.enemy_piece_bucket2_moves = [];

        this.m_populate_piece_bucket2();
        return; 
    }

    // this is a 2 level subroutine
    // level 1 populate friend piece list
    // level 2 generate all possible moves for each piece in friend piece list
    m_populate_piece_bucket2() {
        for ( var k=0; k < this.boardsize; k++) {
            var r = game.toRowj(k);
            var c = game.toColj(k);
            if ( c < 2 || c > 10) { continue; }

            var movechar = boardc[ game.gensub(r,c) ];
            switch (true) {
                case ( game.pieceColorShort(movechar) == this.PlayerColor) :
                    this.friend_piece_bucket2.push( [k,movechar,r,c] );
                    break;
                case ( game.pieceColorShort(movechar) == "none") :
                    var nop=1;
                    break;
                 default :
                    this.enemy_piece_bucket2.push( [k,movechar,r,c] );
                    break;       
            }
        } // end of k loop
        this.generateFriendPieceBucketMoves2();
        return;
    }


    generateFriendPieceBucketMoves2() {
                for (var gx=0; gx < this.friend_piece_bucket2.length; gx++ ) {
                    var fnid = this.friend_piece_bucket2[gx][0];   // array 1st elem is nid
                    var fpiece = this.friend_piece_bucket2[gx][1]; // array 2nd elem is shogi piece FEN
                    console.log("nid " + fnid + " piece " + fpiece);
                    var fpossibleMoves = this.getListOfSquaresYouCanMoveto2(fnid);
                    console.log("moves " +fpossibleMoves);

                    var fmoves = [];
                    fmoves = this.getValidMoves2(fnid,(fpossibleMoves));
                    console.log("fmoves " + fmoves);

                    //fmoves is an array of arrays 
                    // fmoves.length = #number of moves the piece can do
                    // fmoves.array is [ row , col ]  target space you can move to.

                    var tgt_nID = -1;
                        
                    fmoves.forEach(
                        ([r, c ]) => {
                            tgt_nID = game.gensub( r, c );
                            this.friend_piece_bucket2_moves.push( ([-1,fnid,fpiece, tgt_nID]) );
                            var flg_check = this.DoTheMove_StillinCheck( fnid, fpiece, tgt_nID, gx );
                            if ( flg_check == true ) {
                                // invalid move ... still in check after move
                                this.friend_piece_bucket2_moves.pop();
                                this.friend_piece_bucket2_moves.push( ([-2,fnid,fpiece, tgt_nID]) );
                            } 
                        }
                    );

                }  // end of gx loop
                return

    }

    isBlackKingInCheck3() {
        // returns 1 if in check 0 if not in check
        var in_check = 0;
        // loop through enemy pieces and see if any can attack black king
        for ( var ex=0; ex < this.enemy_piece_bucket2.length; ex++ ) {
            var enid = this.enemy_piece_bucket2[ex][0];
            var epiece = this.enemy_piece_bucket2[ex][1];
            var epossibleMoves = this.getListOfSquaresYouCanMoveto2(enid);
            var emoves = this.getValidMoves2(enid,(epossibleMoves));
            emoves.forEach(
                ([r, c ]) => {
                    var tgt_nID = game.gensub( r, c );
                    if ( tgt_nID == this.blk_king_nid ) {
                        in_check = 1;
                        console.log("black king in check by " + epiece + " at " + enid );
                    }
                }
            );
            if ( in_check == 1 ) break;
        }
        return in_check;
    }

    isWhiteKingInCheck3() {
        // returns 1 if in check 0 if not in check
        var in_check = 0;
        // loop through enemy pieces and see if any can attack white king
        for ( var ex=0; ex < this.enemy_piece_bucket2.length; ex++ ) {
            var enid = this.enemy_piece_bucket2[ex][0];
            var epiece = this.enemy_piece_bucket2[ex][1];
            var epossibleMoves = this.getListOfSquaresYouCanMoveto2(enid);
            var emoves = this.getValidMoves2(enid,(epossibleMoves));
            emoves.forEach(
                ([r, c ]) => {
                    var tgt_nID = game.gensub( r, c );
                    if ( tgt_nID == this.whi_king_nid ) {
                        in_check = 1;
                        console.log("white king in check by " + epiece + " at " + enid );
                    }
                }
            );
            if ( in_check == 1 ) break;
        }
        return in_check;
    }
    
    DoTheMove_StillinCheck( fnid, fpiece, tgt_nID, gx ){
        // make the move on the boardc
        var originalPieceAtTarget = boardc[ tgt_nID ];
        var retVal = true;
        boardc[ fnid ] = "x";
        boardc[ tgt_nID ] = fpiece;

        // now check if you are in check after the move
        var in_check = 0;
        if ( this.PlayerColor == "black") {
            // check if black king is in check
            in_check = this.isBlackKingInCheck3();
        } else {
            // check if white king is in check
            in_check = this.isWhiteKingInCheck3();
        }

        if ( in_check == 1 ) {
            // you are in check after the move
            retVal = false;
        }
        // undo the move on the boardc
        boardc[ fnid ] = fpiece;
        boardc[ tgt_nID ] = originalPieceAtTarget;

        return retVal;
        
    }


    getListOfSquaresYouCanMoveto2(nID) {
                var row = game.toRowj(nID);
                var col = game.toColj(nID);

                const piece = boardc[ game.gensub(row,col) ];
                if ( piece == "x" ) return [];
                
                var c1PieceFEN = piece;

                // result set 1-d array of moves 1 particular piece can me
                // it is in a hard-coded json object 
                var arrPossibleMoves2 =  movesYouCanDo[ (c1PieceFEN) ];
                

                return arrPossibleMoves2;

            }


getValidMoves2(nID, possibleMoves) {
                // if a piece is not selected there are no valid moves
                const piece = boardc[ nID ];
                if ( piece == "x" ) return [];
                if ( piece == "r") debugger;
                
                let moves = [];

                if (possibleMoves[0] == 2) {
                    // ut oh ... this is a sliding piece like a bishop
                    // this is more complex to figure out
                    // go to a new method to do that
                    moves = this.getValidMovesSlider2(nID,possibleMoves[2]);
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
                        var newRow = game.toRowj(new_nid);
                        var newCol = game.toColj(new_nid);
                        adjpos++;
                        if (newRow < 0 || newRow >= 9 || newCol < 2 || newCol >= 11) continue;

                        var targetPiece = boardc[ game.gensub(newRow,newCol) ];
                        var in_check = 1;
         
                        switch (true) {
                            case (targetPiece === "x") :
                                in_check = this.still_in_check(piece,nID,targetPiece,new_nid)
                                if (in_check == 0 ) moves.push([newRow, newCol]); 
                                break;
                            case ( game.pieceColorShort(targetPiece) !== game.pieceColorShort(piece) ) : 
                                in_check = this.still_in_check(piece,nID,targetPiece,new_nid)
                                if (in_check == 0 ) moves.push([newRow, newCol]);
                                break;
                        }
                    }
                }

                return moves;
            }
                        
                
    still_in_check(piece,nID,targetPiece,new_nid) {
        var check_ind = 0;
        boardc[nID] = "x";
        const piece2 = boardc[new_nid];
        boardc[new_nid] = piece;
        /// do work here
        /// end work
        boardc[new_nid] = piece2;
        boardc[nID] = piece; 
        return check_ind;
    }
                
    // if yes can drop fix?
    can_drop_fix() {}

    set_player_color(color) {
        if (color === "black") this.PlayerColor = "white";
        else ( this.PlayerColor = "black");
    }
   
    getValidMovesSlider2(nID,numSections) {
        const piece = boardc[ nID ];
        var c1PieceFEN = piece;
                        
        let moves2 = [];
        
        for (y=1; y <= numSections; y++) {
            var c2PieceFEN = c1PieceFEN + y.toString();
            
            // you nee to put the c2 var in parenthesis because
            // it contains the special char +

            var possibleMoves2 =  movesYouCanDo[ (c2PieceFEN) ];

            
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
                    let newRow = game.toRowj(new_nid);
                    let newCol = game.toColj(new_nid);
                    adjpos++;
                        
                    // if you are doing a long slide then you need to break
                    // if you are doing a 1 square jump then continue testing
                    if (newRow < 0 || newRow >= 9 || newCol < 2 || newCol >= 11) {
                        if (flg_cont == 1) continue;
                        break;
                    }
                                                
                    var targetPiece = boardc[ (game.gensub(newRow,newCol)) ];
                    
                    // empty square ... continue for x loop
                    if (game.pieceColorShort(targetPiece) == "none") {
                        moves2.push([newRow, newCol]);
                    }
                    // opponent square ... stop for x loop
                    if (game.pieceColorShort(targetPiece) !== game.pieceColorShort(piece) && game.pieceColorShort(targetPiece) !== "none") {
                        moves2.push([newRow, newCol]);
                        if (flg_cont == 0 ) break;
                    }
                    // you have control of the square ... stop for x loop
                    if (game.pieceColorShort(targetPiece) === game.pieceColorShort(piece)) {
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
    


}