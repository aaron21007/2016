function celdas(rows, column, grid){

  let grupos = new Array()
  let grupos_vacios=0
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < rows; j++) {
      
      let elemento_adyacente=0

      if (grid[i][j]==1) {
        let derecha=0
        let abajo = 0
        let arriba = 0
        let izquierda = 0

        if (i==0) {
          if (j==0) {
              derecha = (grid[0][j+1]==1?`${i},${j+1}`:0)
              abajo = (grid[i+1][j]==1?`${i+1},${j}`:0)

          } else if (j == column - 1) {
             izquierda = (grid[i][j + 1]==1?`${i},${j+1}`:0)
             abajo = (grid[i + 1][j]==1?`${i+1},${j}`:0)

          }else{
             izquierda = grid[i][j -1]
             abajo = grid[i + 1][j]
             derecha = grid[i][j + 1]

          }
          
        }else if(i==rows-1){
          if (j == 0) {
              derecha = grid[i][j + 1]
              arriba = grid[i - 1][j]

          } else if (j == column - 1) {
               izquierda = grid[i][j - 1]
               arriba = grid[i-1][j]

          } else {
               izquierda = grid[i][j - 1]
               arriba = grid[i - 1][j]
               derecha = grid[i][j + 1]

          }
        }else{
             izquierda = grid[i][j - 1]
             abajo = grid[i + 1][j]
             derecha = grid[i][j + 1]
             arriba = grid[i - 1][j]

        }

        

      }
      
    }
    
  }


function serach(grupos,elemento){
    let esta = false
    for (var i = 0; i < grupos.length + 1; i++) {
      if (myArray[i][0] === elemento) {
        esta=true
        break;
      }
    }
}


}



let rows = 5
let columns = 4
let grid = [[1,1,0,0],[0,0,1,0], [0,0,0,0],[1,0,1,1], [1,1,1,1]]


console.log('Salida: ' + celdas(rows, columns, grid));

