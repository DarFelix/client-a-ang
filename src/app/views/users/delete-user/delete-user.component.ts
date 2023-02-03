import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import Swal from 'sweetalert2'

import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit{

  docu : any = '';
  user : any = [];

  constructor(
    private location: Location,
    private userService: UserService
  ){}

  searchUser(): void {

    if(this.docu === ''){
      return;
    }
    
    this.userService.getUserByDoc(this.docu)
    .subscribe({
      next: (v) => {this.user=v;
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se eliminará al usuario "+this.user.nombres,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          this.userService.deleteUser(this.user.usuario_id)
          .subscribe({
           next: () => {
            Swal.fire(
              '¡Borrado!',
              'El usuario ha sido borrado del sistema.',
              'success'
            );
            this.docu='';
           }
          });

        }
      })
      
      },
      error: (e) => {
        console.error(e.error.data.error);
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

  backClicked() {
    this.location.back();
  }

}
