import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  docu : any = '';
  user : any = [];
  viewA : boolean = true;
  viewB : boolean = false;
  form: FormGroup | any;
  submitted = false;

  constructor(
    private location: Location,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ){}

  searchUser(): void {
    this.userService.getUserByDoc(this.docu)
    .subscribe({
      next: (v) => {this.user=v;
      
      this.viewA = false;
      this.viewB = true;

      this.form = this.formBuilder.group(
        {
          nombres: [this.user.nombres, Validators.required],
          numero_doc: [
            this.user.numero_doc,
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20)
            ]
          ],
          age: [this.user.age, [Validators.required]],
          height: [this.user.height, [Validators.required]],
          telefono: [
            this.user.telefono,
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20)
            ]
          ],
          pass: [
            this.user.pass,
            [
              Validators.required
            ]
          ],
          rol: [this.user.rol, [Validators.required]],
          estado_usuario: [this.user.estado_usuario, [Validators.required]]
        }
      );


      },
      error: (e) => {
        Swal.fire(
          'Error',
          'Mensaje del servidor: '+e.error.data.error,
          'error'
        )
      }
    })
  }

  ngOnInit(): void {
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  backClicked() {
    this.location.back();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;
    
    this.userService.updateUser(this.user.usuario_id, data).subscribe({
      next: data => {
        Swal.fire(
          'Usuario actualizado',
          'Se modifico el usuario correctamente',
          'success'
        )
        this.onReset();
        this.docu = '';
        this.viewA = true;
        this.viewB = false;
      },
      error: err => {
        Swal.fire(
          'Error',
          'Ocurrió un error!',
          'error'
        )
        console.log(err);
      }
    });
    
    
    
  }

}
