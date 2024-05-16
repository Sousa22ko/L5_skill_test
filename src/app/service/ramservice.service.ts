import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ipersonagem } from '../model/Ipersonagem.model';
import { Ilocalizacao } from '../model/Ilocalizacao.model';
import { IDataPayloadPersonagem } from '../model/IdataPayloadPersonagem.model';
import { IdataPayloadLocalizacao } from '../model/IdataPayloadLocalizacao.model';
import { IDataPayloadEpisodio } from '../model/IdataPayloadEpisodio.model';
import { Iepisodio } from '../model/Iepisoido.model';

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

  getLocal(id: number): Observable<Ilocalizacao> {
    return this.httpClient.get<Ilocalizacao>(`${BASEURL}/location/${id}`)
  }

  getEpisodios(pageNumber: number): Observable<IDataPayloadEpisodio>{
    return this.httpClient.get<IDataPayloadEpisodio>(`${BASEURL}/episode/?page=${pageNumber}`);
  }

  getEpisodio(id: number): Observable<Iepisodio> {
    return this.httpClient.get<Iepisodio>(`${BASEURL}/episode/${id}`)
  }

  getGender(gender: string): Observable<IDataPayloadPersonagem> {
    return this.httpClient.get<IDataPayloadPersonagem>(`${BASEURL}/character/?gender=${gender}`);
  }

  getPlanetas (): Observable<IdataPayloadLocalizacao> {
    return this.httpClient.get<IdataPayloadLocalizacao>(`${BASEURL}/location/?type=planet`);
  }
}
