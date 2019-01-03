
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-newtab',
  styles: [
    `
    .newpane{
      padding: 1em;
      margin-left:500px;
      width:800px;
    }
  `
  ],
  template: `
  
  <div *ngIf="isPinned" [hidden]="!active" class="newpane">
    <ng-content></ng-content>
      <ng-container *ngIf="template"
         [ngTemplateOutlet]="template"
        >
    </ng-container>
</div>

  `  
})
export class NewTabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() dataContext;
  @Input() isPinned = true;
  
}