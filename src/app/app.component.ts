// 6 Map streams to values to affect state

import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan'; 
import 'rxjs/add/operator/mapTo'; // (3) so let's import mapTo
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
    this.clock = Observable.merge( // (5) because either s or H are the things being pushed thru in this merged {O}
      this.click$.mapTo('hour'),              // (2) when this pushes through it'll update an entire hour
      Observable.interval(1000).mapTo('second') // (1) when this pushes through it'll update only 1 second
    )
      .startWith(new Date())
      .scan((acc, curr)=> { // (4) so now what comes through in this current is either second or hour
        const date = new Date(acc.getTime());

        date.setSeconds(date.getSeconds() + 1);

        return date;
      })
  }
}
