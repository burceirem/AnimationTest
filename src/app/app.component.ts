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
  


  <ng-template let-person="person" #personEdit>
    <person-edit [person]="person" (savePerson)="onPersonFormSubmit($event)"></person-edit>
  </ng-template>

  <ng-template #collection>
      <div id="collection" class="contents" style = "height:400px; width:1200px;" >
        <div class="head">
          <h3 id="head">Tahsilat</h3>
          <button id="collection" (click)="onOpenCollectionNew($event)"  > XX </button>
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

  
  <ng-template #collectionnew>
    <div id="collectionnew" class="contents" >
      <div class="row" style="height:150px; width:450px; ">
        <div id="table">bir</div>
        <div id="table">bir</div>
        <div id="table">bir</div>
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
  #protocol{

    background-color:grey;
  }
  #credit{

    background-color:grey;
  }
  #collection{

    background-color:grey;
  }
  #collectionhidden{
    background-color:blue;
  }

  `
  ]
})
export class AppComponent {
  @ViewChild('personEdit') editPersonTemplate;
  @ViewChild('about') aboutTemplate;
  @ViewChild('protocol') protocolTemplate;
  @ViewChild('credit') creditTemplate;
  @ViewChild('collection') collectionTemplate;
  @ViewChild('collectionnew') collectionTemplateNew;
  @ViewChild(TabsComponent) tabsComponent;

  people = [
    {
      id: 1,
      name: 'Juri',
      surname: 'Strumpflohner',
      twitter: '@juristr'
    }
  ];

  onEditPerson(person) {
    this.tabsComponent.openTab(
      `Editing ${person.name}`,
      this.editPersonTemplate,
      person,
      true
    );
  }

  onAddPerson() {
    this.tabsComponent.openTab('New Person', this.editPersonTemplate, {}, true);
  }

  onPersonFormSubmit(dataModel) {
    if (dataModel.id > 0) {
      this.people = this.people.map(person => {
        if (person.id === dataModel.id) {
          return dataModel;
        } else {
          return person;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.people.push(dataModel);
    }

    // close the tab
    this.tabsComponent.closeActiveTab();
  }

  onOpenAbout() {
    this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  }
  onOpenCollection()
  {
    this.tabsComponent.openTab('Collection', this.collectionTemplate, {}, true);
  }
  onOpenCollectionNew()
  {
    this.tabsComponent.openTab('Collectionnew', this.collectionTemplateNew, {}, true);
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

    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    console.log(value);
    var element = document.getElementById(value);
    element.style.width="400px";
    var brc=value+"hidden";
    console.log(brc);

      var x = document.getElementById(brc);

      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
      x.style.display = "none";
      x.style.cssFloat="left";
      x.style.backgroundColor="blue";
     }
    
    }



  }
  

    

