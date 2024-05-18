import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IDataPayload } from '@models/IdataPayload.model';
import { Ipersonagem } from '@models/Ipersonagem.model';

import { BASEURL } from '../util/configs';

@Injectable({
  providedIn: 'root'
})
export class SpersonagemService {

  constructor(private httpClient: HttpClient) { }

  getPersonagem(id: number): Observable<Ipersonagem> {
    return this.httpClient.get<Ipersonagem>(`${BASEURL}/character/${id}`)
  }

  getFilter(queryParam: string): Observable<IDataPayload<Ipersonagem>> {
    return this.httpClient.get<IDataPayload<Ipersonagem>>(`${BASEURL}/character/?${queryParam}`)
  }

}
