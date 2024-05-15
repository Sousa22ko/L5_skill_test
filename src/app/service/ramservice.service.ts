import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ipersonagem } from '../model/Ipersonagem.model';
import { IDataPayload } from '../model/IdataPayload.model';
import { Ilocation } from '../model/Ilocation.model';

const BASEURL = 'https://rickandmortyapi.com/api';

@Injectable({
  providedIn: 'root'
})
export class RAMServiceService {

  constructor(private httpClient: HttpClient) { }

  getPersonagens(pageNumber: number): Observable<IDataPayload>{
    return this.httpClient.get<IDataPayload>(`${BASEURL}/character/?page=${pageNumber}`);
  }

  getPersonagem(id: number): Observable<Ipersonagem> {
    return this.httpClient.get<Ipersonagem>(`${BASEURL}/character/${id}`)
  }

  getLocais(pageNumber: number): Observable<IDataPayload>{
    return this.httpClient.get<IDataPayload>(`${BASEURL}/location/?page=${pageNumber}`);
  }

  getLocal(id: number): Observable<Ilocation> {
    return this.httpClient.get<Ilocation>(`${BASEURL}/location/${id}`)
  }

  getEpisodios(pageNumber: number): Observable<IDataPayload>{
    return this.httpClient.get<IDataPayload>(`${BASEURL}/episode/?page=${pageNumber}`);
  }

  getEpisodio(id: number): Observable<Ilocation> {
    return this.httpClient.get<Ilocation>(`${BASEURL}/episode/${id}`)
  }
}
