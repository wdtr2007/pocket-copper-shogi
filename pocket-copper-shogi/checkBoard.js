class c_checkBoard {
    constructor() {
        this.blk_king_nid = 0;
        this.whi_king_nid = 0;
        this.PlayerColor = "unknown";
        this.friend_piece_bucket = [];
        this.enemy_piece_bucket = [];
        this.friend_piece_bucket_moves = [];
        this.enemy_piece_bucket_moves = [];
        this.boardsize = 117
        
    }

    set_boardc() {
        boardc = [];
        for (x=0; x < board.length; x++) {
            boardc.push( board[x] );
            if ( board[x] == 'K' ) this.blk_king_nid = x;
            if ( board[x] == 'k' ) this.whi_king_nid = x;
        }

    } ;

    // jts working 12/20/2025 
    // if you are in check your moves list is probable invalid 
    // run each move and check if you are in check
    doMoveStillinCheck() {
        this.friend_piece_bucket = [];
        this.friend_piece_bucket_moves = [];

        this.enemy_piece_bucket = [];
        this.enemy_piece_bucket_moves = [];

        this.m_populate_piece_bucket();
        

    }

    m_populate_piece_bucket() {
        for ( var k=0; k < this.boardsize; k++) {
            var r = game.toRowj(k);
            var c = game.toColj(k);
            if ( c < 2 || c > 10) { continue; }

            var movechar = boardc[ game.gensub(r,c) ];
            switch (true) {
                case ( game.pieceColorShort(movechar) == this.PlayerColor) :
                    this.friend_piece_bucket.push( [k,movechar,r,c] );
                    break;
                case ( game.pieceColorShort(movechar) == "none") :
                    var nop=1;
                    break;
                 default :
                    this.enemy_piece_bucket.push( [k,movechar,r,c] );
                    break;       
            }

        }
    }

    generateFriendPieceBucketMoves2() {
                for (var gx=0; gx < friend_piece_bucket.length; gx++ ) {
                    var fnid = friend_piece_bucket[gx][0];   // 2-d array 1st elem is nid
                    var fpiece = friend_piece_bucket[gx][1];
                    var fpossibleMoves = this.getListOfSquaresYouCanMoveto2(fnid);

                    var fmoves = [];
                    fmoves = this.getValidMoves2(fnid,(fpossibleMoves));

                    
                    friend_piece_bucket_moves.push( ([-1,fnid,fpiece,(fmoves)]) );

                    //fmoves is an array of arrays 
                    // fmoves.length = #number of moves the piece can do
                    // fmoves.array is [ row , col ]  target space you can move to.

                    

                
                }

    }


    getListOfSquaresYouCanMoveto2(nID) {
                var row = this.toRowj(nID);
                var col = this.toColj(nID);

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
    


}