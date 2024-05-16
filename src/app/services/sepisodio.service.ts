import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataPayload } from '../model/IdataPayload.model';
import { Iepisodio } from '../model/Iepisoido.model';
import { BASEURL } from '../util/configs';

@Injectable({
  providedIn: 'root'
})
export class SepisodioService {

  constructor(private httpClient: HttpClient) { }

  getEpisodios(pageNumber: number): Observable<IDataPayload<Iepisodio>>{
    return this.httpClient.get<IDataPayload<Iepisodio>>(`${BASEURL}/episode/?page=${pageNumber}`);
  }

  getEpisodio(id: number): Observable<Iepisodio> {
    return this.httpClient.get<Iepisodio>(`${BASEURL}/episode/${id}`)
  }
}
