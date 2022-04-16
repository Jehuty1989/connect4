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
      columnCellHole.addEventListener("click", this.makePlay.bind(this))
      columnCellHole.addEventListener("mouseover", this.hoverOn.bind(this))
      columnCellHole.addEventListener("mouseout", this.hoverOut.bind(this))

      this.index++

      columnCell.appendChild(columnCellHole)
      row!.append(columnCell)
    }
  }

  makePlay(event: any) {
    console.log(event.target.id)
  }

  hoverOn(event: any) {
    event.target.classList.add(this.player ? "yellow" : "blue")
  }

  hoverOut(event: any) {
    event.target.classList.remove(this.player ? "yellow" : "blue")
  }
}
