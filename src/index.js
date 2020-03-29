module.exports = function solveSudoku(matrix) {
  while (!isSolved(matrix)) {
      for (x = 0; x < 9; x++) {
          for (y = 0; y < 9; y++) {
            matrix[y][x] = digit(matrix, x, y);
          }
      }
  }

  return matrix;
}

function digit(matrix, x, y) {
  if (matrix[y][x] !== 0) return matrix[y][x];

  var row = matrix[y];
  var column = columnArray(matrix, x);
  var grid = gridArray(matrix, x, y);
  
  var knowns = row.concat(column, grid);
  
  var possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(item) { return knowns.indexOf(item) === -1; });

  return possibilities.length == 1 ? possibilities[0] : 0;
}

function columnArray(matrix, idx) {
  return matrix.map(function(row) { return row[idx]; });
}

function gridArray(matrix, x, y) {
  x = Math.floor(x / 3) * 3;
  y = Math.floor(y / 3) * 3;
  
  var arr = [];
  
  for (i = x; i < x + 3; i++) {
      for (j = y; j < y + 3; j++) {
          arr.push(matrix[j][i]);
      }
  }
  
  return arr;
}

function sum(arr) {
  return arr.reduce(function(a, n) { return a + n; }, 0);
}

function winningRow(arr) {
  return sum(arr.map(function(num) { return Math.pow(2, num - 1); })) == 511;
}

function isSolved(matrix) {
  return matrix.filter(function (row) { return !winningRow(row); }).length === 0;
}