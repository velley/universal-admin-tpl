import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { mock, setup } from 'mockjs'

@Injectable()
export class InMemHeroService implements InMemoryDbService {
  constructor() {
    
  }
  createDb() {
    return mock({
      'heroes|10-20': [
        {'name': '@cname', 'id|+1': 1}
      ]
    });
  }
}