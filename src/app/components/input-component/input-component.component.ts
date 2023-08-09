import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css'],
})
export class InputComponentComponent {
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter();

  // ...

  onHeaderValueChange(event: any) {
    console.log(event.target.value);
    this.inputValueChange.emit(event.target.value); // Emit the value from the input component
  }
}
