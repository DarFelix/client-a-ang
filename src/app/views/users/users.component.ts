import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  titleA = 'Creación de usuarios';
  explainA = 'Este formulario te permite crear un usuario en el sistema';
  linkBtnA = '/usuarios/crear';

  titleB = 'Listado de usuarios';
  explainB = 'Tabla con el listado de usuarios existente en la BD';
  linkBtnB = '/usuarios/lista';

  titleC = 'Actualización de un usuario';
  explainC = 'Este formulario permite actualizar un usuario existente';
  linkBtnC = '/usuarios/editar';

  titleD = 'Eliminar usuario';
  explainD = 'Puedes buscar un usuario y eliminarlo de la BD';
  linkBtnD = '/usuarios/eliminar';

  

}
