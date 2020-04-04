module.exports = function solveSudoku(matrix) {

  let commonGroup = [];
  let startNumber = 1 ;

  for(let y=0;y<9;y++){
    for(let x=0;x<9;x++){
      if (matrix[y][x] == 0 ){
        let t=startNumber;
        for(; t<10; t++) {
          if(check(x,y,t,matrix)) {
            matrix[y][x]=t;
            commonGroup.push({x,y,v:t});
            startNumber = 1;
            break;
          }
        }

        if(t==10){
          let a =commonGroup.pop();
          if(!a) throw "failed";
          x=a.x; y=a.y; startNumber=a.v+1;
          matrix[y][x] = 0;
          x--;
        }
      }
    }
  }
  return matrix;
}
function check(x,y,val, matrix){
  for(let i=0;i<9;i++){
    if(x!=i && val == matrix[y][i]) return false;
  }
  for(let i=0;i<9;i++){
    if(y!=i && val == matrix[i][x]) return false;
  }
  for(let i=0;i<3;i++)
    for(let j=0;j<3;j++){
      const [x0,y0] = [((x/3)|0)*3, ((y/3)|0)*3];
        if(x!=x0+i && y!=y0+j && val == matrix[y0+j][x0+i]) return false;
    }
    return true;
}
function* range(n,m) {
  var s = m ? n : 0;
  var e = m ? m : n-1;
  for(let i=s; i<=e; i++) yield i;
}