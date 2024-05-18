import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IDataPayload } from '@models/IdataPayload.model';
import { Iepisodio } from '@models/Iepisodio.model';

import { BASEURL } from '../util/configs';

@Injectable({
  providedIn: 'root'
})
export class SepisodioService {

  constructor(private httpClient: HttpClient) { }
  
  getEpisodio(id: number): Observable<Iepisodio> {
    return this.httpClient.get<Iepisodio>(`${BASEURL}/episode/${id}`)
  }

  getFilter(queryParam: string): Observable<IDataPayload<Iepisodio>> {
    return this.httpClient.get<IDataPayload<Iepisodio>>(`${BASEURL}/episode/?${queryParam}`)
  }
}
