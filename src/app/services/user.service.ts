import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGNORED_STATUSES } from './token-interceptor.service';

const URL = 'http://localhost:3000/api/v1/usuarios/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) {}

  getUsers(){
    return this.http.get<any>(URL)
  }

  createUser(data: any): Observable<any> {
    return this.http.post(URL, data, httpOptions);
  }

  getUserByDoc(id: any){
    return this.http.get<any>(URL+`${id}`,{
      context: new HttpContext().set(IGNORED_STATUSES, [400]),
    })
  }

  updateUser(id: any, data: any){
    return this.http.put<any>(URL+`${id}`, data, httpOptions);
  }

  deleteUser(id: any){
    return this.http.delete<any>(URL+`${id}`)
  }

}
