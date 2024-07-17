ngOnChanges will work if @Input is used in the same component where OnChanges is implements in the component


app.component.ts

export class AppComponent {
  parentItems =[
    {
      name: 'Bini',
      age:20
    },
    {
      name:'Babu',
      age: 30
    }
  ];
  pushArray(){
    this.parentItems.push({
      name:'Anna',
      age:24
    })
  }
}



App.component.html

<app-child [items]="parentItems"></app-child>
<button (click)="pushArray()">Push Array</button>


child.component.ts

export class ChildComponent implements OnChanges{
@Input() items : any[] =[];

ngOnChanges(changes: SimpleChanges): void {
console.log("Changes", changes);
}
}

child.component.html


<div *ngFor="let item of items">
    <p>{{item.name}} - {{item.age}}</p>
</div>


Pushing the array ( i.e in app.component.ts pushArray() function triggered when pushArray button is clicked) will push the array value with {name:'Anna', age:24} with the following function

 pushArray(){
    this.parentItems.push({
      name:'Anna',
      age:24
    })
  }


Hence output will be as follows

Bini - 20

Babu - 30

Anna - 24


But the console in ngOnChanges in child.component.ts (shown below) will not console in the console window because new reference to the array is not done in pushArray() in app.component.ts . 

ngOnChanges(changes: SimpleChanges): void {
console.log("Changes", changes);
}


So, replace the pushArray() in app.component.ts with the following. The below code will create a  new refence to the array parentItems and pass to items in child.component.ts through @Input


pushArray(){
    this.parentItems = [...this.parentItems, {
      name:'Anna',
      age:24
    }
    ]}


Hence, in console window console will be



Changes 
{items: SimpleChange}
items
: 
SimpleChange
currentValue
: 
Array(3)
0
: 
{name: 'Bini', age: 20}
1
: 
{name: 'Babu', age: 30}
2
: 
{name: 'Anna', age: 24}
length
: 
3
[[Prototype]]
: 
Array(0)
firstChange
: 
false
previousValue
: 
Array(2)
0
: 
{name: 'Bini', age: 20}
1
: 
{name: 'Babu', age: 30}
length
: 
2




Another way to create a new reference on pushArray in app.component.ts, depicted below


pushArray(){
       this.parentItems.push({   //Another way to get new refernce hence ngOnChanges will not trigger
     name:'Anna',
     age: 24
    })
     this.parentItems = [...this.parentItems];
  }
