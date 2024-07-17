import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
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
    // this.parentItems.push({  // will not create new refernce hence ngOnChanges will not trigger
    //   name:'Anna',
    //   age:24
    // })

    this.parentItems = [...this.parentItems, {  // will  create a new refernce hence ngOnChanges will not trigger
      name:'Anna',
      age:24
    }
    ]
  //  this.parentItems.push({   //Another way to get new refernce hence ngOnChanges will not trigger
  //   name:'Anna',
  //   age: 24
  //  })
  //   this.parentItems = [...this.parentItems];
  }
}
