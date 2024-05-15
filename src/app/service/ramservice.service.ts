import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASEURL = 'https://rickandmortyapi.com/api';

@Injectable({
  providedIn: 'root'
})
export class RAMServiceService {

  constructor(private httpClient: HttpClient) { }

  
}
