import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  index: number = 0
  arr: any = new Array(42)
  player: boolean = true

  constructor() { }

  ngOnInit(): void {
    this.makeBoard()
  }

  makeBoard() {
    this.arr.fill()
    this.index = 0
    this.player = true

    const board = document.getElementById("board")

    for (let i = 0; i < 6; i++) {
      const row = document.createElement("div")
      row.classList.add("row")
      board!.append(row)
      this.makeRow(row)
    }
  }

  makeRow(row: any) {
    for(let i = 0; i < 7; i++) {
      const columnCell = document.createElement("div")
      columnCell.classList.add("column-cell")

      const columnCellHole = document.createElement("div")
      columnCellHole.classList.add("column-cell-hole")
      columnCellHole.id = this.index.toString()
      // columnCellHole.textContent = this.index.toString()
      columnCellHole.addEventListener("click", this.makePlay.bind(this))
      columnCellHole.addEventListener("mouseover", this.hoverOn.bind(this))
      columnCellHole.addEventListener("mouseout", this.hoverOut.bind(this))

      this.index++

      columnCell.appendChild(columnCellHole)
      row!.append(columnCell)
    }
  }

  makePlay(event: any) {
    let tmpArr: any = []

    for (let i = parseInt(event.target.id); i < 42; i = i + 7) {
      if (this.arr[i] !== undefined) { break }
      tmpArr.push(i)
    }

    if (tmpArr.length > 0) {
      tmpArr.reverse()
      const targetCell = document.getElementById(tmpArr[0].toString())

      targetCell!.classList.remove("tmp-yellow")
      targetCell!.classList.remove("tmp-blue")
      targetCell!.classList.add(this.player ? "yellow" : "blue")
      this.arr[targetCell!.id.toString()] = this.player ? "yellow" : "blue"
      this.player = !this.player

      this.winCheck(tmpArr[0])
    }

    this.hoverOn(event)
  }

  winCheck(id: any) {
    let cellsToCheck: any[] = []
    let howManyInARow = 0
    const oneToCheck = !this.player ? "yellow" : "blue"

    for (let i = id - 3; i < id + 4; i++) {
      if (i < 0 || i > 41) { continue }

      if (id % 7 === 0 && i >= id) {
        cellsToCheck.push(i)
        continue
      } else if (i % 7 === 0 && cellsToCheck[0] !== undefined && i > id) { break }

      cellsToCheck.push(i)
    }

    cellsToCheck.forEach ((cell, index) => {
      if (cell % 7 === 0) {
        cellsToCheck = cellsToCheck.slice(index)
      }
    })

    cellsToCheck.forEach ((cell) => {
      if (this.arr[cell] === oneToCheck) {
        howManyInARow++
      } else {
        howManyInARow = 0
      }

      if (howManyInARow === 4) { this.playerWins() }
    })

    cellsToCheck = []
    howManyInARow = 0

    for (let i = id - 18; i < id + 19; i = i + 6) {
      if (id === 0) { break }
      if (i < 1) { continue }
      if (i > 41) { break }
      if (i % 7 === 0 && i >= id) {
        cellsToCheck.push(i)
        break
      }
      cellsToCheck.push(i)
    }

    cellsToCheck.forEach ((cell, index) => {
      if (cell % 7 === 0 && index + 1 !== cellsToCheck.length) {
        cellsToCheck = cellsToCheck.slice(index + 1)
      }
    })

    cellsToCheck.forEach ((cell) => {
      if (this.arr[cell] === oneToCheck) {
        howManyInARow++
      } else {
        howManyInARow = 0
      }

      if (howManyInARow === 4) { this.playerWins() }
    })

    howManyInARow = 0

    for (let i = id - 21; i < id + 22; i = i + 7) {
      if (i < 0 || i > 41) { continue }
      if (this.arr[i] === oneToCheck) {
        howManyInARow++
      } else {
        howManyInARow = 0
      }

      if (howManyInARow === 4) { this.playerWins() }
    }

    cellsToCheck = []
    howManyInARow = 0

    for (let i = id - 24; i < id + 25; i = i + 8) {
      if (id === 6) { break }
      if (i < 1) { continue }
      if (i > 41) { break }
      if ((i + 1) % 7 === 0 && i >= id) {
        cellsToCheck.push(i)
        break
      }
      cellsToCheck.push(i)
    }

    cellsToCheck.forEach ((cell, index) => {
      if ((cell + 1) % 7 === 0 && index + 1 !== cellsToCheck.length) {
        cellsToCheck = cellsToCheck.slice(index + 1)
      }
    })

    cellsToCheck.forEach ((cell) => {
      if (this.arr[cell] === oneToCheck) {
        howManyInARow++
      } else {
        howManyInARow = 0
      }

      if (howManyInARow === 4) { this.playerWins() }
    })
  }

  playerWins() {
    window.alert(`${!this.player ? "yellow" : "blue"} wins!`)
    this.boardReset()
  }

  boardReset() {
    this.arr.fill()
    this.index = 0
    this.player = true

    const cells = document.getElementsByClassName("column-cell-hole")

    for (let x = 0; x < cells.length; x++) {
      cells[x].classList.remove("yellow")
      cells[x].classList.remove("blue")
    }
  }

  hoverOn(event: any) {
    let tmpArr: any = []

    for (let i = parseInt(event.target.id); i < 42; i = i + 7) {
      if (this.arr[i] !== undefined) { break }
      tmpArr.push(i)
    }

    if (tmpArr.length > 0) {
      tmpArr.reverse()
      const targetCell = document.getElementById(tmpArr[0].toString())
      targetCell!.classList.add(this.player ? "tmp-yellow" : "tmp-blue")
    }
  }

  hoverOut(event: any) {
    let tmpArr: any = []

    for (let i = parseInt(event.target.id); i < 42; i = i + 7) {
      if (this.arr[i] !== undefined) { break }
      tmpArr.push(i)
    }

    if (tmpArr.length > 0) {
      tmpArr.reverse()
      const targetCell = document.getElementById(tmpArr[0].toString())
      targetCell!.classList.remove(this.player ? "tmp-yellow" : "tmp-blue")
    }
  }
}
