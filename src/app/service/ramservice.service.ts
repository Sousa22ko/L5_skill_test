import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personagem } from '../model/personagem.model';
import { IDataPayload } from '../model/IdataPayload.model';

const BASEURL = 'https://rickandmortyapi.com/api';

@Injectable({
  providedIn: 'root'
})
export class RAMServiceService {

  constructor(private httpClient: HttpClient) { }

  getPersonagens(pageNumber: number): Observable<IDataPayload>{
    return this.httpClient.get<IDataPayload>(`${BASEURL}/character/?page=${pageNumber}`);
  }
}
