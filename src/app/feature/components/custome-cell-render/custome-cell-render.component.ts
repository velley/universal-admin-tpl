import { Component, Inject, OnInit } from '@angular/core';
import { UniversalTableCell, UNIVERSAL_TABLE_CELL } from 'src/app/shared/domain/table.interfce';

@Component({
  selector: 'app-custome-cell-render',
  templateUrl: './custome-cell-render.component.html',
  styleUrls: ['./custome-cell-render.component.less']
})
export class CustomeCellRenderComponent implements OnInit {
  data: any;

  constructor(
    @Inject(UNIVERSAL_TABLE_CELL) private cellData: UniversalTableCell
  ) { }

  ngOnInit(): void {
    this.data = this.cellData.rowData[this.cellData.colData.field];
  }

}
