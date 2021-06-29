import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import API_URI from './API_URI'

@Injectable({
  providedIn: 'root'
})
export class CentroscostosService {

  constructor(private http: HttpClient) { }
  
  verCentrosCostosTodos(){
    return this.http.get(`${API_URI}/centrosCostos/todosvending`)
  }

  gettiposmaqvending(sucursal){
    return this.http.post(`${API_URI}/centrosCostos/tiposmaqpv`,sucursal)
  }
}
