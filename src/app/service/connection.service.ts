import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';
import { Headers } from '@angular/http';


@Injectable()
export class ConnectionService {

  constructor(private _http:Http) {
    console.log('Servicio listo')
   }

   signin(content: object) {
     console.log(content)
     let header = new Headers({'Content-Type': 'application/json'});
     let options = new RequestOptions({ headers: header, body: JSON.stringify(content) });
    return this._http.post('http://localhost:5000/banco', JSON.stringify(content), options).pipe(map((response: any) => response));
  }

}
