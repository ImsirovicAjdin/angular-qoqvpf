// 6 Map streams to values to affect state

import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan'; 
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
    this.clock = Observable.merge(
      this.click$,
      Observable.interval(1000)
    )
      .startWith(new Date())
      .scan((acc, curr)=> {
        const date = new Date(acc.getTime());

        date.setSeconds(date.getSeconds() + 1);

        return date;
      })
  }
}
