import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { empresaClase } from '../empresaClase';
import { EmpresaService } from '../../../core/services/empresa.register.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogoConfirmacionDelete } from '../../../shared/components/dialogo-confirmacion-delete/dialogo-confirmacion-delete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-empresa-list',
  standalone: true,
  templateUrl: './empresa-list.html',
  styleUrls: ['./empresa-list.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
]
})
export class EmpresaList implements OnInit {
  displayedColumns: string[] = [
    'nombreEmpresa',
    'nitEmpresa',
    'direccionEmpresa',
    'ciudadEmpresa',
    'correoEmpresa',
    'telefonoEmpresa',
    'acciones'
  ];

  dataSource = new MatTableDataSource<empresaClase>([]);

  constructor(private empresaService: EmpresaService , private dialog:MatDialog , private router: Router) {}

  ngOnInit(): void {
    this.cargarEmpresas();

    this.dataSource.filterPredicate = (data, filter) =>
      Object.values(data).some(value =>
        value?.toString().toLowerCase().includes(filter)
      );
  }

  cargarEmpresas() {
    this.empresaService.getEmpresas().subscribe({
      next: (empresas) => this.dataSource.data = empresas,
      error: (err) => console.error('Error al cargar empresas:', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editarEmpresa(empresa: empresaClase) {
    this.router.navigate(['/editar-empresa', empresa.idEmpresa]);
  }

  eliminarEmpresa(id: number) {
    const dialogRef = this.dialog.open(DialogoConfirmacionDelete, {
      data: {
        mensaje: '¿Estás seguro de que deseas eliminar esta empresa?'
      }
    });
  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === true) {
        this.empresaService.eliminarEmpresa(id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(e => e.idEmpresa !== id);
            console.log('Empresa eliminada');
          },
          error: (err) => console.error('Error al eliminar empresa:', err)
        });
      }
    });
  }
}
