import { Injectable, OnInit } from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { {{entity-upper}}HttpService } from './{{entity-lower}}-http.service';
import { {{entity-upper}} } from './{{entity-lower}}';


@Injectable()
export class {{entity-upper}}Service {

  private {{entity-lower}}List = new BehaviorSubject<{{entity-upper}}[]>([]);
  private isFetching: boolean;

  constructor(private {{entity-lower}}HttpService: {{entity-upper}}HttpService) {}

  get{{entity-upper}}List() {
    return this.{{entity-lower}}List.asObservable();
  }

  addAfter({{entity-lower}}: {{entity-upper}}) {
    this.{{entity-lower}}HttpService.create({{entity-lower}}.id).then(() => this.fetch());
  }

  init() {
    this.fetch();
  }

  private fetch() {
    if (this.isFetching) {
      return;
    }

    this.isFetching = true;

    this.{{entity-lower}}HttpService.get{{entity-upper}}List().then(
      data => {
        this.isFetching = false;
        this.{{entity-lower}}List.next(data);
      },
      err => {
        this.isFetching = false;
        console.log('Fail: ' + err);
        this.{{entity-lower}}List.error(err);
      });
  }
}
