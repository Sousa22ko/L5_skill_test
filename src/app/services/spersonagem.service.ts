import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from '../util/configs';
import { IDataPayload } from '../model/IdataPayload.model';
import { Ipersonagem } from '../model/Ipersonagem.model';

@Injectable({
  providedIn: 'root'
})
export class SpersonagemService {

  constructor(private httpClient: HttpClient) { }

  getPersonagens(pageNumber: number): Observable<IDataPayload<Ipersonagem>>{
    return this.httpClient.get<IDataPayload<Ipersonagem>>(`${BASEURL}/character/?page=${pageNumber}`);
  }

  getPersonagem(id: number): Observable<Ipersonagem> {
    return this.httpClient.get<Ipersonagem>(`${BASEURL}/character/${id}`)
  }

  getGender(gender: string): Observable<IDataPayload<Ipersonagem>> {
    return this.httpClient.get<IDataPayload<Ipersonagem>>(`${BASEURL}/character/?gender=${gender}`);
  }

  getFilter(queryParam: string): Observable<IDataPayload<Ipersonagem>> {
    return this.httpClient.get<IDataPayload<Ipersonagem>>(`${BASEURL}/character/?${queryParam}`)
  }

}
