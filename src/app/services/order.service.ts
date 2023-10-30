import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrder(id: any) {
    return this.http.get<any>( environment.ApiUrl + 'api/v2/order/byidH/' + id,{
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI1NWE1NDAwOGFkMWJhNTg5YWEyMTBkMjYyOWMxZGY0MSIsImlhdCI6MTU5MDk0NTY4NH0.V-9GPQoET85cHM3YGSOLNYEKOw_ajQ7xn8bA6h_Xv60"
      })
    });
  }
}
