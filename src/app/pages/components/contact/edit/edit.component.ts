import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id = Number(this.activateRoute.snapshot.paramMap.get('id'))
  constructor(
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}
