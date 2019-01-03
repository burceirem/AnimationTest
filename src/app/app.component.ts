//our root app component
import { Component, ViewChild } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';

 
@Component({
  selector: 'my-app',

  template: `
  <button (click)="onOpenCollection($event)">TAHSİLAT</button>
  <button (click)="onOpenCredit($event)">KREDİ</button>
  <button (click)="onOpenProtocol($event)">PROTOKOL</button>
  
  <my-tabs></my-tabs>
  

  <ng-template #collection>
      <div id="collection" class="contents">
        <div class="head">
          <h3 id="head">Tahsilat</h3>
          <button id="collection" (click)="resizeTab($event)"> XX </button>
        </div>
        <div class="row">
          <div id="table">b</div>
          <div id="table">b</div>
          <div id="table"></div>
          <div id="table"></div>
          <div id="table"></div>
          <div id="table"></div>
        </div>
    </div>
   
  </ng-template>

  <ng-template #credit>
      <div id="credit" class="contents">
      <div class="head">
        <h3 id="head">Kredi</h3>
        <button id="credit" (click)="resizeTab($event)" >XX</button>
      </div>
      <div class="row">
        <div id="table">bir</div>
        <div id="table">bir</div>
        <div id="table">bir</div>
        <div id="table">bir</div>
        <div id="table"></div>
        <div id="table"></div>
      </div>
    </div>
  </ng-template>

  <ng-template #protocol>
    <div id="protocol" class="contents">
    <div class="head">
        <h3 id="head">Protokol</h3>
        <button id="protocol" (click)="resizeTab($event)">XX</button>
    </div>
    
    <div class="row" id="row">
        <div id="table">iki</div>
        <div id="table">iki</div>
        <div id="table">iki</div>
        <div id="table">bir</div>
        <div id="table"></div>
        <div id="table"></div>
    </div>
  </div>
  </ng-template> 

  `,
 
  styles: [
     `
  div {
    -webkit-animation: slide 0.5s forwards;
    animation: slide 0.5s forwards;
  }
     
  @keyframes slide {
    0%{
      transform: translate3d(1000px, 0, 0);
    }
    100%{
      transform: translate3d(0px, 0, 0);
    }
  }

  .row{
    
    height:500px;
    width:1000px;
  }

  .contents{
    border: 1px;
    border-radius: 5px;
    background-color: #f7f7f7;
    margin:10px;
  }
  .resizetab{
    float: right;
    margin-top: -40px;
  }

  `
  ]
})
export class AppComponent {
 

  @ViewChild('protocol') protocolTemplate;
  @ViewChild('credit') creditTemplate;
  @ViewChild('collection') collectionTemplate;


  @ViewChild(TabsComponent) tabsComponent;


 
  onOpenCollection()
  {
    this.tabsComponent.openTab('Collection', this.collectionTemplate, {}, true);
  }
  
  onOpenCredit()
  {
    this.tabsComponent.openTab('Credit', this.creditTemplate, {}, true);
  }
  onOpenProtocol()
  {
    this.tabsComponent.openTab('Protocol', this.protocolTemplate, {}, true);
  }


  createTab(event){
    console.log(event.target.attributes);
    this.tabsComponent.openTab(
      event.target.innerHTML,
      event.template,
      event.dataContext,
      false,
    );
    }

      
  resizeTab(event){
    console.log("brc");
   
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue; 
    var element = document.getElementById(value);
    element.style.width="400px";
    element.style.height="100px";
    this.tabsComponent.dynamicTabs[0].isPinned=true;
    
    console.log(this.tabsComponent.dynamicTabs[0].isPinned);
    // var newdiv = document.createElement("div");
    // var t = document.createTextNode("This is a paragraph.");
    // newdiv.appendChild(t);
    // document.body.appendChild(newdiv);
    // newdiv.style.marginTop="-580px";
    // newdiv.style.marginLeft="580px";
  
    }
    
    }
   
 
  

    

