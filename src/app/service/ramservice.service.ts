import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ipersonagem } from '../model/Ipersonagem.model';
import { Ilocation } from '../model/Ilocation.model';
import { IDataPayloadPersonagem } from '../model/IdataPayloadPersonagem.model';
import { IdataPayloadLocalizacao } from '../model/IdataPayloadLocalizacao.model';
import { IDataPayloadEpisodio } from '../model/IdataPayloadEpisodio.model';

const BASEURL = 'https://rickandmortyapi.com/api';

@Injectable({
  providedIn: 'root'
})
export class RAMServiceService {

  constructor(private httpClient: HttpClient) { }

  getPersonagens(pageNumber: number): Observable<IDataPayloadPersonagem>{
    return this.httpClient.get<IDataPayloadPersonagem>(`${BASEURL}/character/?page=${pageNumber}`);
  }

  getPersonagem(id: number): Observable<Ipersonagem> {
    return this.httpClient.get<Ipersonagem>(`${BASEURL}/character/${id}`)
  }

  getLocais(pageNumber: number): Observable<IdataPayloadLocalizacao>{
    return this.httpClient.get<IdataPayloadLocalizacao>(`${BASEURL}/location/?page=${pageNumber}`);
  }

  getLocal(id: number): Observable<Ilocation> {
    return this.httpClient.get<Ilocation>(`${BASEURL}/location/${id}`)
  }

  getEpisodios(pageNumber: number): Observable<IDataPayloadEpisodio>{
    return this.httpClient.get<IDataPayloadEpisodio>(`${BASEURL}/episode/?page=${pageNumber}`);
  }

  getEpisodio(id: number): Observable<Ilocation> {
    return this.httpClient.get<Ilocation>(`${BASEURL}/episode/${id}`)
  }
}
