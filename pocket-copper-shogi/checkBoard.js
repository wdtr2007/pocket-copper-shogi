class c_checkBoard {
    constructor() {
        this.blk_king_nid = 0;
        this.whi_king_nid = 0;
        this.color = "unknown";
        
        this.friend_piece_bucket2 = [];
        this.enemy_piece_bucket2 = [];
        this.friend_piece_bucket2_moves = [];
        this.friend_piece_bucket3_moves = [];
        this.enemy_piece_bucket2_moves = [];
        this.boardsize = 117
        this.flg_blk_check2 = 0;
        this.flg_whi_check2 = 0;
        
    }

    set_boardc(blk,whi,color) {
        boardc = [];
        for (x=0; x < board.length; x++) {
            boardc.push( board[x] );
            if ( board[x] == 'K' ) this.blk_king_nid = x;
            if ( board[x] == 'k' ) this.whi_king_nid = x;
            this.flg_blk_check2 = blk;
            this.flg_whi_check2 = whi;
            this.color = color;
            if (this.color == "white") this.opp_color = "black";
            if (this.color == "black") this.opp_color = "white";
        }
        
        this.doMoveStillinCheck2();
        return;
    } ;

    // jts working 12/20/2025 
    // if you are in check your moves list is probable invalid 
    // run each move and check if you are in check
    doMoveStillinCheck2() {
        this.friend_piece_bucket2 = [];
        this.friend_piece_bucket2_moves = [];

        

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
                case ( game.pieceColorShort(movechar) == this.color) :
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
                    
                    var fpossibleMoves = this.getListOfSquaresYouCanMoveto2(fnid);

                    var fmoves = [];
                    fmoves = this.getValidMoves2(fnid,(fpossibleMoves));

                    //fmoves is an array of arrays 
                    // fmoves.length = #number of moves the piece can do
                    // fmoves.array is [ row , col ]  target space you can move to.

                    var tgt_nID = -1;
                    
                    
                    fmoves.forEach(
                        ([r, c ]) => {
                            tgt_nID = game.gensub( r, c );
                            this.friend_piece_bucket2_moves.push( ([-1,fnid,fpiece, tgt_nID]) );
                            //var flg_check = this.DoTheMove_StillinCheck( fnid, fpiece, tgt_nID, gx );
                            //if ( flg_check == true ) {
                            //    // invalid move ... still in check after move
                            //    this.friend_piece_bucket2_moves.pop();
                            //    this.friend_piece_bucket2_moves.push( ([-2,fnid,fpiece, tgt_nID]) );
                            //} 
                        }
                    );

                }  // end of gx loop
 
                this.SaveToBoard_d();

                for (gx=0; gx < this.friend_piece_bucket2_moves.length; gx++) {
                
                    var zer_flg =this.friend_piece_bucket2_moves[gx][0] ;
                    var fp_fnid=this.friend_piece_bucket2_moves[gx][1];
                    var fp_piece = this.friend_piece_bucket2_moves[gx][2];
                    var fp_tgtnid = this.friend_piece_bucket2_moves[gx][3];
                    
                    let msgx = gx + " zer-flg " + zer_flg + " fnid " + fp_fnid + " fpiece " + fp_piece + " tgt-nid " + fp_tgtnid + " "
                    console.log(msgx)
                    this.SaveToBoard_d();
                    this.MakeTheMove2(gx,zer_flg,fp_fnid,fp_piece,fp_tgtnid);

                    msgx = gx + " zer-flg " + zer_flg + " B-CHK " + this.flg_blk_check2 + " W-CHK " + this.flg_whi_check2 ;
                    console.log(msgx); 
                    console.log( "                                     ");
                    console.log( "                                    ");

                    if ( this.flg_blk_check2 == 1 | this.flg_whi_check2 == 1) {
                        this.friend_piece_bucket2_moves[gx][0] = -2; 
                    }

                }

                this.friend_piece_bucket3_moves = [];

                for (gx=0; gx < this.friend_piece_bucket2_moves.length; gx++) {
                    zer_flg   = this.friend_piece_bucket2_moves[gx][0] ;
                    fp_fnid   = this.friend_piece_bucket2_moves[gx][1];
                    fp_piece  = this.friend_piece_bucket2_moves[gx][2];
                    fp_tgtnid = this.friend_piece_bucket2_moves[gx][3];
                    if ( zer_flg == -1 ) {
                        this.friend_piece_bucket3_moves.push( ([zer_flg,fp_fnid,fp_piece,fp_tgtnid]));
                    }

                }



                
                return;

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
    
    re_populate_enemy2(Color) {
        var opp_color;
        if (Color == 'white') {
            opp_color = 'black';
            this.flg_whi_check2 = 0;
        } else {
            opp_color = 'white';
            this.flg_blk_check2 = 0;
        }



        this.enemy_piece_bucket2 = [];
        this.enemy_piece_bucket2_moves = [];

        for ( var k=0; k < this.boardsize; k++) {
            var r = game.toRowj(k);
            var c = game.toColj(k);
            if ( c < 2 || c > 10) { continue; }

            var movechar = boardd[ game.gensub(r,c) ];
            switch (true) {
                case ( game.pieceColorShort(movechar) == opp_color) :
                    this.enemy_piece_bucket2.push( [k,movechar,r,c] );
                    break;
            }
        } // end of k loop

        return;
    }

    re_populate_ememy_moves2(Color, fp_nid, fp_piece) {
        var opp_color;
        if (Color == 'white') {
            opp_color = 'black';
            this.flg_whi_check2 = 0;
        } else {
            opp_color = 'white';
            this.flg_blk_check2 = 0;
        }

        console.log("enemy piece bucket2 len is " + this.enemy_piece_bucket2.length);

        for (var gx=0; gx < this.enemy_piece_bucket2.length; gx++ ) {
                    var enid = this.enemy_piece_bucket2[gx][0];   // array 1st elem is nid
                    var epiece = this.enemy_piece_bucket2[gx][1]; // array 2nd elem is shogi piece FEN
                    console.log("gx " +gx+ " enid " + enid + " epiece " + epiece);
                    var epossibleMoves = this.EnemyGetListOfSquaresYouCanMoveto2(enid);
                    console.log("epossibleMoves is " + epossibleMoves);

                    var emoves = [];
                    emoves = this.EnemyGetValidMoves2(enid,(epossibleMoves));
                    console.log("emoves " + emoves);

                    //fmoves is an array of arrays 
                    // fmoves.length = #number of moves the piece can do
                    // fmoves.array is [ row , col ]  target space you can move to.

                    var tgt_nID = -1;
                    this.flg_check = false;
                    
                    for (var emx=0; emx < emoves.length; emx++) {
                        var r = emoves[emx][0];
                        var c = emoves[emx][1];
                    
                        
                        tgt_nID = game.gensub( r, c );
                        this.enemy_piece_bucket2_moves.push( ([-1, enid, epiece, tgt_nID]) );
                         
                        if ( tgt_nID == this.whi_king_nid) {
                            this.flg_check = true;
                            this.flg_whi_check2 = 1;
                        }
                    
                        if ( tgt_nID == this.blk_king_nid) {
                            this.flg_check = true;
                            this.flg_blk_check2 = 1;
                        }
                         
                        if ( this.flg_check == true) {
                            console.log("found piece in check - move is ... nid " + fp_nid + " " + fp_piece);
                            break;
                            
                        }
                                                            
                        //var flg_check = this.DoTheMove_StillinCheck( enid, epiece, tgt_nID, gx );
                        //if ( flg_check == true ) {
                        //    // invalid move ... still in check after move
                        //    this.enemy_piece_bucket2_moves.pop();
                        //    this.enemy_piece_bucket2_moves.push( ([-2,enid,epiece, tgt_nID]) );

                    }  // end of emx for
                         
                    
                    
                    

                }  // end of gx loop
                return;


                
    } 
    // end of method

    SaveToBoard_d() {
        for ( var k=0; k < this.boardsize; k++) {
            boardd[k] = boardc[k];
        } // end of k loop
    }

    MakeTheMove2(gx,zer_flg,fp_fnid,fp_piece,fp_tgtnid) {
        boardd[ fp_fnid ] = "x";
        var dest_contains = boardd[ fp_tgtnid ]; 
        boardd[ fp_tgtnid ] = fp_piece;  
        
        if (fp_piece == 'k') this.blk_king_nid = fp_tgtnid;
        if (fp_piece == 'K') this.whi_king_nid = fp_tgtnid;

        console.log(" ")
        console.log("m2 ****");
        
        console.log("m2 make the move2 " + gx + " fpnid " + fp_fnid + " fp_piece  " + fp_piece + " destination is " + dest_contains);
        this.re_populate_enemy2(this.color)
        this.re_populate_ememy_moves2(this.color,fp_fnid,fp_piece);

        console.log("m2 dump the enemy moves " + gx + " " + zer_flg + "   fp_nid." + fp_fnid + "   fp piece . ",fp_piece);

        console.log("enemy pieces ....... " + this.enemy_piece_bucket2);
        console.log("enemy piece move ... " + this.enemy_piece_bucket2_moves);
        console.log("Check status .. B .. " + this.flg_blk_check2 + "   W .. " + this.flg_whi_check2);

        let nop = 1;


    }

    DoTheMove_StillinCheck_xxx( fnid, fpiece, tgt_nID, gx ){
        // make the move on the boardc
        var originalPieceAtTarget = boardc[ tgt_nID ];
        var retVal = true;
        boardc[ fnid ] = "x";
        boardc[ tgt_nID ] = fpiece;

        // this. e_populate_enemy(this.PlayerColor)
        // this. e_populate_ememy_moves(this.PlayerColor);

        // now check if you are in check after the move
        var in_check = 0;
        if ( this.color == "black") {
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

    
    EnemyGetListOfSquaresYouCanMoveto2(nID) {
                var row = game.toRowj(nID);
                var col = game.toColj(nID);

                const piece = boardd[ game.gensub(row,col) ];
                if ( piece == "x" ) return [];
                
                var c1PieceFEN = piece;

                // result set 1-d array of moves 1 particular piece can me
                // it is in a hard-coded json object 
                var arrPossibleMoves2 =  Json_list_movesYouCanDo[ (c1PieceFEN) ];
                

                return arrPossibleMoves2;

            }


    getListOfSquaresYouCanMoveto2(nID) {
                var row = game.toRowj(nID);
                var col = game.toColj(nID);

                const piece = boardc[ game.gensub(row,col) ];
                if ( piece == "x" ) return [];
                
                var c1PieceFEN = piece;

                // result set 1-d array of moves 1 particular piece can me
                // it is in a hard-coded json object 
                var arrPossibleMoves2 =  Json_list_movesYouCanDo[ (c1PieceFEN) ];
                

                return arrPossibleMoves2;

            }

EnemyGetValidMoves2(enID, possibleMoves) {
                // if a piece is not selected there are no valid moves
                const piece = boardd[ enID ];
                if ( piece == "x" ) return [];
                if ( piece == "r") debugger;
                
                let moves = [];

                if (possibleMoves[0] == 2) {
                    // ut oh ... this is a sliding piece like a bishop
                    // this is more complex to figure out
                    // go to a new method to do that
                    moves = this.getValidMovesSlider2(enID,possibleMoves[2]);
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
                        var new_nid = enID + possibleMoves[adjpos];
                        var newRow = game.toRowj(new_nid);
                        var newCol = game.toColj(new_nid);
                        adjpos++;
                        if (newRow < 0 || newRow >= 9 || newCol < 2 || newCol >= 11) continue;

                        var targetPiece = boardc[ game.gensub(newRow,newCol) ];
                        var in_check = 1;
         
                        switch (true) {
                            case (targetPiece === "x") :
                                moves.push([newRow, newCol]); 
                                break;
                            case ( game.pieceColorShort(targetPiece) !== game.pieceColorShort(piece) ) : 
                                moves.push([newRow, newCol]);
                                break;
                        }
                    }
                }

                return  moves;
            }


getValidMoves2(enID, possibleMoves) {
                // if a piece is not selected there are no valid moves
                const piece = boardc[ enID ];
                if ( piece == "x" ) return [];
                if ( piece == "r") debugger;
                
                let moves = [];

                if (possibleMoves[0] == 2) {
                    // ut oh ... this is a sliding piece like a bishop
                    // this is more complex to figure out
                    // go to a new method to do that
                    moves = this.getValidMovesSlider2(enID,possibleMoves[2]);
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
                        var new_nid = enID + possibleMoves[adjpos];
                        var newRow = game.toRowj(new_nid);
                        var newCol = game.toColj(new_nid);
                        adjpos++;
                        if (newRow < 0 || newRow >= 9 || newCol < 2 || newCol >= 11) continue;

                        var targetPiece = boardc[ game.gensub(newRow,newCol) ];
                        var in_check = 1;
         
                        switch (true) {
                            case (targetPiece === "x") :
                                in_check = this.still_in_check(piece,enID,targetPiece,new_nid)
                                if (in_check == 0 ) moves.push([newRow, newCol]); 
                                break;
                            case ( game.pieceColorShort(targetPiece) !== game.pieceColorShort(piece) ) : 
                                in_check = this.still_in_check(piece,enID,targetPiece,new_nid)
                                if (in_check == 0 ) moves.push([newRow, newCol]);
                                break;
                        }
                    }
                }

                return  moves;
            }
                        
                
    still_in_check(piece,nID,targetPiece,new_nid) {
        var check_ind = 0;
        boardc[nID] = "x";
        const piece2 = boardc[new_nid];
        boardc[new_nid] = piece;
        /// do work here
        if ( game.pieceColorShort(targetPiece) != "none" ) {
        if ( game.pieceColorShort(piece) != game.pieceColorShort(targetPiece) ) {
            if ( game.pieceColorShort(targetPiece) == "white" ) {
                if ( new_nid == this.whi_king_nid) check_ind = 1;
            } else {
                if ( new_nid == this.blk_king_nid) check_ind = 1;
            }
        }
        }
        /// end work
        boardc[new_nid] = piece2;
        boardc[nID] = piece; 
        return check_ind;
    }
                
    // if yes can drop fix?
    // jts we need to work on this section.
    can_drop_fix() {
        return;
    }

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

            var possibleMoves2 =  Json_list_movesYouCanDo[ (c2PieceFEN) ];

            
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