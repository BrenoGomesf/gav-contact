import { Component, Input, OnInit } from '@angular/core';

type Action = 'new' | 'edit' | 'list';

@Component({
  selector: 'app-bread-title',
  templateUrl: './bread-title.component.html',
  styleUrls: ['./bread-title.component.css']
})
export class BreadTitleComponent implements OnInit {
  @Input('action')
  action: Action = 'list'
  @Input('id')
  id?: number
  constructor() { }

  ngOnInit(): void {
  }

}
