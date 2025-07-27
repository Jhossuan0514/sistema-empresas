import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { empresaClase } from '../empresaClase';
import { EmpresaService } from '../../../core/services/empresa.register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  templateUrl: './empresa-form.html',
  styleUrls: ['./empresa-form.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class EmpresaForm implements OnInit {
  empresaForm: FormGroup;
  empresaId?: number;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empresaForm = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      nitEmpresa: ['', Validators.required],
      direccionEmpresa: ['', Validators.required],
      ciudadEmpresa: ['', Validators.required],
      correoEmpresa: ['', [Validators.required, Validators.email]],
      telefonoEmpresa: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.empresaId = +idParam;
      this.cargarEmpresa(this.empresaId);
    }
  }

  cargarEmpresa(id: number): void {
    this.empresaService.obtenerEmpresaPorId(id).subscribe({
      next: (empresa) => this.empresaForm.patchValue(empresa),
      error: (err) => {
        console.error('Error al cargar la empresa', err);
        this.snackBar.open('⚠️ Error al cargar empresa', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  onSubmit(): void {
    if (this.empresaForm.valid) {
      const datosEmpresa: empresaClase = this.empresaForm.value;

      if (this.modoEdicion && this.empresaId !== undefined) {
        // Modo editar
        this.empresaService.actualizarEmpresa(this.empresaId, datosEmpresa).subscribe({
          next: () => {
            this.snackBar.open('✅ Empresa actualizada correctamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            this.router.navigate(['/listaEmpresa']);
          },
          error: (err) => {
            console.error('Error al actualizar empresa', err);
            this.snackBar.open('❌ Error al actualizar', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        });
      } else {
        // Modo crear
        this.empresaService.agregarEmpresa(datosEmpresa).subscribe({
          next: () => {
            this.snackBar.open('✅ Empresa registrada correctamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            this.empresaForm.reset();
          },
          error: (err) => {
            console.error('Error al registrar empresa', err);
            this.snackBar.open('❌ Error al registrar empresa', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        });
      }
    }
  }

  onCancel(): void {
    if (this.modoEdicion) {
      this.router.navigate(['/listaEmpresa']);
    } else {
      this.empresaForm.reset();
      this.snackBar.open('Formulario limpio 🧼', 'Cerrar', {
        duration: 2000,
        panelClass: ['snackbar-info']
      });
    }
  }
  
}
