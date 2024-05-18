import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IDataPayload } from '@models/IdataPayload.model';
import { Ilocalizacao } from '@models/Ilocalizacao.model';

import { BASEURL } from '../util/configs';

@Injectable({
  providedIn: 'root'
})
export class SlocalizacaoService {

  constructor(private httpClient: HttpClient) { }

  getLocal(id: number): Observable<Ilocalizacao> {
    return this.httpClient.get<Ilocalizacao>(`${BASEURL}/location/${id}`)
  }

  getFilter(queryParam: string): Observable<IDataPayload<Ilocalizacao>> {
    return this.httpClient.get<IDataPayload<Ilocalizacao>>(`${BASEURL}/location/?${queryParam}`)
  }
}
