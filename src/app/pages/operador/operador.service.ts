import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Operador } from 'src/app/core/models/operador.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

operadorUrl: string;

constructor(private  http: HttpClient) { 
  this.operadorUrl = `${environment.apiUrl}/operadores`
}


listarOperadores(): Promise<any> {
  console.log(firstValueFrom(this.http.get(`${this.operadorUrl}`)).then(
    (response) => {
      const obj = response as any[];
      this.convertStringDate(obj);
      return obj;
    }
  ))
  return firstValueFrom(this.http.get(`${this.operadorUrl}`)).then(
    (response) => {
      const obj = response as any[];
      this.convertStringDate(obj);
      return obj;
    }
  )
 }

 excluir(id: number): Promise<void> {
  return firstValueFrom(this.http.delete(`${this.operadorUrl}/${id}`))
  .then()
  .then(() => null);
 }


 adicionar(operador: Operador): Promise<Operador> {
  return firstValueFrom(this.http.post<Operador>(this.operadorUrl, operador));
 }


 atualizar(operador: Operador): Promise<Operador> {
  return firstValueFrom(this.http.put(`${this.operadorUrl}/${operador.id}`, operador))
  .then((response) => response as Operador);
 }


 buscarPorId(id: number) {
  return firstValueFrom(this.http.get(`${this.operadorUrl}/${id}`))
  .then((response) => response as Operador);
}


 mudarStatus(id: number, status: boolean): Promise<void> {
  const headers = new HttpHeaders().append(
    'Content-Type',
    'application/json'
  );
  return firstValueFrom(this.http.put(`${this.operadorUrl}/${id}/status`, status, { headers }))
  .then(() => null);
}


AlternarLista(valor: string): Promise<any> {
  return firstValueFrom(this.http.get(`${this.operadorUrl}${valor}`))
  .then((response) => response);
}



convertStringDate(obj: any[]) {
  obj.forEach((element) => {
    // Certifique-se de que o formato da string de data está correto
    const dateFormat = 'YYYY/MM/DD H:mm';
    
    // Verifique se a data não é nula ou indefinida antes de tentar convertê-la
    if (element.datagravacao) {
      element.datagravacao = moment(element.datagravacao, dateFormat)
        .tz('America/Sao_Paulo')
        .toDate();
    }
  });
}

}
