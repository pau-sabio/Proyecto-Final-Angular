import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComicsService } from 'src/app/services/comics.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  public comicForm!: FormGroup;
  //Almacenamos el reflejo de comicData del servicio
  public newComic = this.comicsService.comicData;
  //Almacenamos el reflejo del id de comicData del servicio para que nos sea más facil hacer el put y el delete
  public comicID = this.comicsService.comicData.id;

  constructor(private formBuilder: FormBuilder, private comicsService: ComicsService, private router: Router) { }

  ngOnInit(): void {
    //Vaciamos el comic nada más arrancar nuestro formulario para asegurarnos de que no se ha quedado nada almacenado
    this.comicsService.clearComic();
    //Construimos nuestro formulario
    this.comicForm = this.formBuilder.group({
      //Le asignamos como valor inicial a cada uno de los campos su campo correspondiente con newComic por si queremos editar algo existente que refleje lo que metemos en comicData
      title: [this.newComic.title, [Validators.required, Validators.minLength(2)]],
      author: [this.newComic.author, [Validators.required]],
      company: [this.newComic.company, [Validators.required]],
      cover: [this.newComic.cover, [Validators.required]]
    })

    //Con esta funcion que tiene un formulario reactivo de Angular podemos capturar en un objeto de golpe el resultado de un formulario a tiempo real:
    this.comicForm.valueChanges.subscribe((changes) => {
      this.newComic = changes;
    })
  }

  //Definimos la funcion que se ejecutara al subir el formulario
  public onSubmit() {
    if (this.comicID !== "") {
      //Como es distinto a "" es que hay un comic ya, por lo tanto lo vamos a editar
      //IMPORTANTE: Teneis que ejecutar el suscribe porque si no no funciona el metodo http
      this.comicsService.editComic(this.comicID, this.newComic).subscribe();
      Swal.fire('Comic editado correctamente');
    } else {
      //Si es "" es que no existe el comic y lo vamos a postear
      this.comicsService.postComic(this.newComic).subscribe();
      Swal.fire('Comic creado correctamente')
    }

    //Resetar el formulario
    this.comicForm.reset();
    //En cuanto termine de ejecutarse el onsubmit se vaya dinamicamente como si fuera un routerLink a comics otra vez
    this.router.navigate(["/comics"])
  }

  public delete() {
    //Con este confirm evitamos borrar un comic si no estamos seguros
    // if (confirm("¿Estas seguro de borrar el comic?") == true) {
    //   //Estamos pasandole el id de cada uno de los comics para borrarlo
    //   this.comicsService.deleteComic(this.comicID).subscribe();
    //   //Borar el formulario
    //   this.comicForm.reset();
    //   alert("Comic borrado correctamente");
    //   this.router.navigate(["/comics"])
    // } else {
    //   this.router.navigate(["/comics"])
    // }
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Vas a perder el comic definitivamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
     this.comicsService.deleteComic(this.comicID).subscribe();
    //   //Borar el formulario
    this.comicForm.reset();
        Swal.fire(
          'Borrado!',
          'Tu comic ha desaparecido.',
          'success'
        )
        this.router.navigate(["/comics"])
      }
    })

  }

}
