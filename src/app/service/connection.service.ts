import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType} from '@angular/http';
import { map } from 'rxjs/operators';
import { Headers } from '@angular/http';


@Injectable()
export class ConnectionService {

  constructor(private _http:Http, ) {
    console.log('Servicio listo')
   }

   signin(content: any) {
     let body = {
       id: Number(content.id),
       nombre: content.nombre,
       apellido: content.apellido,
       fecha: content.fecha
     }
     let header = new Headers({'Content-Type': 'application/json'});
     let options = new RequestOptions({ headers: header, responseType: ResponseContentType.Json});
    return this._http.post('http://localhost:5001/banco', body).pipe(map((response: any) => response));

  }

}
