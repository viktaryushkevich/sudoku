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