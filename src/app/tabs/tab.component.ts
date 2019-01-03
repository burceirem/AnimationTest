/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-tab',
  styles: [
    `
    .pane{
      padding: 1em;
      width:1500px;
    }
    .newpane{
      padding: 1em;
      margin-left:500px;
      width:800px;
    }
  `
  ],
  template: `

    <div [hidden]="!active" class="pane" (click)="bb()">
      <ng-content></ng-content>
      <ng-container *ngIf="template"
        [ngTemplateOutlet]="template"
      >
      </ng-container>
    </div>

    <div *ngIf="isPinned" [hidden]="!active" class="newpane">
    <ng-content></ng-content>
      <ng-container *ngIf="template"
         [ngTemplateOutlet]="template"
        >
    </ng-container>
</div>

  `  
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() dataContext;
  @Input() isPinned = false;
  

}