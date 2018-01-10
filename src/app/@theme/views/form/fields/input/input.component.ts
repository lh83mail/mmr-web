import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() value
  @Input() id

  private control
  
  constructor() { }

  ngOnInit() {
    this.control = new FormControl(this.value)
    this.formGroup.setControl(this.id, this.control) 
  }

}
