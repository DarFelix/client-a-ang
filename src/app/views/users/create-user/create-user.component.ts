import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{

  form: FormGroup | any;
  submitted = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService
    ){}


  ngOnInit(): void {
    
    this.form = this.formBuilder.group(
      {
        nombres: ['', Validators.required],
        numero_doc: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        age: ['', [Validators.required]],
        height: ['', [Validators.required]],
        telefono: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        pass: [
          '',
          [
            Validators.required
          ]
        ],
        rol: ['', [Validators.required]],
        estado_usuario: ['', [Validators.required]]
      }
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;

    this.userService.createUser(data).subscribe({
      next: data => {
        Swal.fire(
          'Usuario registrado',
          'Se registro el usuario correctamente',
          'success'
        )
        this.onReset();
      },
      error: err => {
        Swal.fire(
          'Error',
          'Ocurrió un error!',
          'error'
        )
      }
    });
    
    
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  backClicked() {
    this.location.back();
  }

}
