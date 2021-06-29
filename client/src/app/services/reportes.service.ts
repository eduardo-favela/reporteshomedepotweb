import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import API_URI from './API_URI'

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  registraReporte(reporte){
    return this.http.post(`${API_URI}/reportes/registrareporte`,reporte)
  }
  enviarEmail(reporte){
    return this.http.post(`${API_URI}/reportes/enviarEmail`,reporte)
  }
}
