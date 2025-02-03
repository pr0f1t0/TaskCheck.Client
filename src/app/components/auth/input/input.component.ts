import { Component, forwardRef, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent {
  labelText = input.required<string>()
  inputType = input<string>("text")

  value: string = ""

  onChange = (value: string) => {}
  onTouched = () => {}

  writeValue(value: string): void {
    this.value = value
    this.onChange(value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
}
