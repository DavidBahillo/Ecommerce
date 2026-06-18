import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewPanel]',
  host: {
    class: 'border border-gray-300 rounded-xl bg-white p-4 sm:p-6',
  },
})
export class ViewPanel {
  constructor() {}
}
