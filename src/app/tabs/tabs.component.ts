/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';

import { TabComponent } from './tab.component';
import { NewTabComponent } from './newtab.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';

@Component({
  selector: 'my-tabs',
  template: `
    <ul>
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a>{{tab.title}}</a>
      </li>
      <!-- dynamic tabs -->
      <li *ngFor="let tab of dynamicTabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a>{{tab.title}} <span class="tab-close" *ngIf="tab.isCloseable" (click)="closeTab(tab)">x</span></a>
      </li>
    </ul>

    <ng-content></ng-content>

    <ng-template dynamic-tabs #container></ng-template>
  `,
  styles: [
    `
    .tab-close {
      color: grey;
      text-align: right;
      cursor: pointer;
    }

    li{
      padding:10px;
      display:inline-block;
      -webkit-animation: slideright 0.5s forwards;
      animation: slideright 0.5s forwards;
    }
    a{
      border : 1px;
      width:100px;
      height:40px;
      background-color:#dddddd;
      padding:10px;
      border-radius: 5px; 

    }

    @-webkit-keyframes slideright {
    0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }

    100% {
        -webkit-transform: translateX(30px);
        transform: translateX(30px);
    }
}

@keyframes slideright {
    0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }

    100% {
        -webkit-transform: translateX(30px);
        transform: translateX(30px);
    }

}
    `
  ]
})
export class TabsComponent implements AfterContentInit {

  dynamicTabs: TabComponent[] = [];
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder: DynamicTabsDirective;

  

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}










  
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  openTab(title: string, template, data, isCloseable = false) {
  
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      TabComponent
    );

    
    const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
    const componentRef = viewContainerRef.createComponent(componentFactory);

    
    const instance: NewTabComponent = componentRef.instance as NewTabComponent;
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;
   // instance.isPinned=true;
    
    this.dynamicTabs.push(componentRef.instance as NewTabComponent);
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);


  }



  selectTab(tab: TabComponent) {
  
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));
    tab.active = true;

  }

  selectTabByIndex( index:number){
    for(let i=0; i<this.dynamicTabs.length;i++) {
      if (index == i) {
        this.selectTab(this.dynamicTabs[i]);
        break;
      }
    }
  }

  closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        viewContainerRef.remove(i);
  
     if(i == this.dynamicTabs.length && i == 0 )
     {
       this.selectTabByIndex(i);
        break;
      }
      if  (i == 0 ){
        this.selectTabByIndex(this.dynamicTabs.length-1);
        break;
      }
      else  {
        this.selectTabByIndex(this.dynamicTabs.length-1);
        break;
      } 
     }
    }
  }

  closeActiveTab() {
    const activeTabs = this.dynamicTabs.filter(tab => tab.active);

    if (activeTabs.length > 0) {
      this.closeTab(activeTabs[0]);
    }

  }
}
