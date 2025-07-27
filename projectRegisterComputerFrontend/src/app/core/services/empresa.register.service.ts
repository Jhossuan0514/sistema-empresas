import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empresaClase } from '../../features/empresa/empresaClase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'http://localhost:8080/api/empresas'; // URL base del backend

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<empresaClase[]> {
    return this.http.get<empresaClase[]>(this.apiUrl);
  }

  agregarEmpresa(empresa: empresaClase): Observable<empresaClase> {
    return this.http.post<empresaClase>(this.apiUrl, empresa);
  }

  eliminarEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarEmpresa(id: number, empresa: empresaClase): Observable<empresaClase> {
    return this.http.put<empresaClase>(`${this.apiUrl}/${id}`, empresa);
  }

  obtenerEmpresaPorId(id: number): Observable<empresaClase> {
    return this.http.get<empresaClase>(`${this.apiUrl}/${id}`);
  }
}
