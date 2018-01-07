import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() children;
  @ViewChild("heroForm") theForm;

  constructor() { }

  ngOnInit() {
  }

  submit() {
    console.log('form-vlaues', this.children)
    console.log("form", this.theForm)
  }

  load() {}
}
