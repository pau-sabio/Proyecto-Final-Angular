import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  constructor(private httpClient: HttpClient) { }

  //En este objeto almacenaremos las cosas de cada uno de los comics y ademas cuando esté vacio sabremos si el comic no está o existe
  public comicData = {
    title: "",
    author: "",
    company: "",
    cover: "",
    id: ""
  }
  //Funcion para setear a vacio el comic de nuevo
  public clearComic() {
    this.comicData = {
      title: "",
      author: "",
      company: "",
      cover: "",
      id: ""
    }
  }
  //Setear con X comic el comicData
  public editItem(item: any) {
    this.comicData = item
  }

  //Funcion para traer los comics
  public getComics() {
    return this.httpClient.get("http://localhost:3000/comics")
  }
  //Funcion para postear un nuevo comic
  public postComic(newComic: any) {
    return this.httpClient.post("http://localhost:3000/comics", newComic)
  }
  //Funcion para borrar un comic
  public deleteComic(comicID: any) {
    return this.httpClient.delete("http://localhost:3000/comics/" + comicID)
  }
  //Funcion para editar un comic
  public editComic(comicID: any, editedComic: any) {
    return this.httpClient.put("http://localhost:3000/comics/" + comicID, editedComic)
  }
}
