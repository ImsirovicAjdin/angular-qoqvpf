// 7 Use ngrx/store and Reducers for Angular Application State

import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan'; 
import 'rxjs/add/operator/mapTo';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="click$.next()">Update</button>
    <h1>{{clock | async | date: 'MMM d, y, h:mm:ss a'}}</h1>
  `
})
export class AppComponent  {
  click$ = new Subject();
  clock;

  constructor() {
    /* (3) start */
    this.clock = Observable.merge(
      this.click$.mapTo('hour'),
      Observable.interval(1000).mapTo('second')
    ) /* (3) end*/
      .startWith(new Date()) // (1) an initial value of new Date
      /* (2) start */
      .scan((acc, curr)=> {
        const date = new Date(acc.getTime());

        if(curr === 'second'){
          date.setSeconds(date.getSeconds() + 1);
        }

        if(curr === 'hour'){
          date.setHours(date.getHours() + 1);
        }

        return date;
      }) /* (2) end */
  }
}
/*
What we've done here with .startWith and .scan is actually a very common pattern:
(1) we have an initial value
(2) we wanna change the value 
(3) based on some other values that come through
*/