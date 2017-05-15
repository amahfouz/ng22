import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Category } from './category';

@Injectable()
export class CategoryHttpService {

  private catUrl = 'api/categories';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getCategories(): Promise<Category[]> {
    return this.http.get(this.catUrl)
               .toPromise()
               .then(this.handleSuccess)
               .catch(this.handleError);
  }

  create(prevCatId: number): Promise<any> {
    return this.http.post(this.catUrl, '{}', {headers: this.headers}).toPromise();
  }

  private handleSuccess(response: any): Category[] {
    return response.json().data as Category[];
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}
