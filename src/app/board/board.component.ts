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
      columnCellHole.textContent = this.index.toString()
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

    // if (this.arr[event.target.id.toString()] === undefined) {
    // }
  }

  winCheck(id: any) {
    let cellsToCheck = []
    let howManyInARow = 0
    const oneToCheck = !this.player ? "yellow" : "blue"

    for (let i = -3; i < 4; i++) {
      if (this.arr[id + i] === oneToCheck) { howManyInARow++ }

      if (howManyInARow === 4) {
        this.playerWins()
        break
      }
    }

    howManyInARow = 0

    for (let i = id - 18; i < id + 19; i = i + 6) {
      if (i < 1) { continue }
      if (i > 41) { break }
      if (i % 7 === 0 && i >= id) {
        cellsToCheck.push(i)
        break
      }
      cellsToCheck.push(i)
    }

    console.log(cellsToCheck)

    for (let index in cellsToCheck) {
      if (cellsToCheck[index] % 7 === 0 && parseInt(index) + 1 !== cellsToCheck.length) {
        cellsToCheck = cellsToCheck.slice(parseInt(index) + 1)
        // console.log(cellsToCheck)
      }
    //   // if (cellsToCheck[index] > 41) {
    //   //   console.log(cellsToCheck)
    //   //   cellsToCheck = cellsToCheck.slice(0, (parseInt(index) * -1))
    //   //   console.log(cellsToCheck)
    //   // }
    }
    console.log(cellsToCheck)

    for (let i = id - 18; i < id + 19; i = i + 6) {
      if ((id - 5) % 7 === 0 && i < id - 5) { continue }
      if (i > 38 || id > 38) { break }
      if (((id + 1) % 7 === 0 && i < id) || i < 0) { continue }
      // if (i < 1) { continue }
      if (this.arr[i] === oneToCheck) { howManyInARow++ }
      // console.log(howManyInARow)
      // console.log(i)

      if (howManyInARow === 4) {
        this.playerWins()
        break
      }
    }

    howManyInARow = 0

    for (let i = id - 40; i < id + 41; i = i + 6) {
      if (this.arr[i] === oneToCheck) { howManyInARow++ }
      // console.log(i)

      if (howManyInARow === 4) {
        this.playerWins()
        break
      }
    }
  }

  playerWins() {
    window.alert(`${!this.player ? "yellow" : "blue"} wins!`)
    location.reload()
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

    // if (this.arr[event.target.id.toString()] === undefined) {
    //   event.target.classList.add(this.player ? "tmp-yellow" : "tmp-blue")
    // }
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

    // if (this.arr[event.target.id.toString()] === undefined) {
    //   event.target.classList.remove(this.player ? "tmp-yellow" : "tmp-blue")
    // }
  }
}
