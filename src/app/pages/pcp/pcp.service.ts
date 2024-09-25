import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producaopcp } from 'src/app/core/models/producaopcp.model';
import { Maquinapcp } from 'src/app/core/models/maquinapcp.model';

@Injectable({
  providedIn: 'root'
})
export class PcpService {

  pcpUrl: string;

constructor(private  http: HttpClient) { 
  this.pcpUrl = `${environment.apiUrl}/pcp`
}


listarPcp(id: number): Promise<any> {
  return firstValueFrom(this.http.get(`${this.pcpUrl}/${id}`)).then(
    (response: any) => {
      const obj = response;
      return obj;
    }
  )
 }

 adicionar(producaopcp: Producaopcp): Promise<Producaopcp> {
  return firstValueFrom(this.http.post<Producaopcp>(this.pcpUrl, producaopcp))
 }

 atualizar(producaopcp: Producaopcp): Promise<Producaopcp> {
  return firstValueFrom(this.http.put(`${this.pcpUrl}/${producaopcp.id}`, producaopcp))
  .then((response) => response as Producaopcp);
 }

 excluir(id: number): Promise<void> {
  return firstValueFrom(this.http.delete(`${this.pcpUrl}/${id}`))
  .then()
  .then(() => null);
 }

 mostrarProduto(maquina: number): Promise<any> {
  return firstValueFrom(this.http.get(`${this.pcpUrl}/produto/${maquina}`)).then(
    (response: any) => {
      const obj = response;
      return obj;
    }
  )
 }

 mudarProduto(maquinapcp: Maquinapcp): Promise<Maquinapcp> {
  return firstValueFrom(this.http.put(`${this.pcpUrl}/produto/${maquinapcp.maquina}`, maquinapcp))
  .then((response) => response as Maquinapcp);
 }

 listarProduzindo(): Promise<any> {
  return firstValueFrom(this.http.get(`${this.pcpUrl}/produzindo`)).then(
    (response: any) => {
      const obj = response;
      return obj;
    }
  )
 }

 listarMaquinas(): Promise<any> {
  return firstValueFrom(this.http.get(`${this.pcpUrl}/maquinas`)).then(
    (response: any) => {
      const obj = response;
      return obj;
    }
  )
 }
}