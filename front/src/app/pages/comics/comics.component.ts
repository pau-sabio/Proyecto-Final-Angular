import { ComicInterface } from './../../models/comic.interface';
import { Component, OnInit } from '@angular/core';
import { ComicsService } from 'src/app/services/comics.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
  public comicList: ComicInterface[] = [];
  constructor(private comicsService: ComicsService, private router: Router) { }

  ngOnInit(): void {
    this.comicsService.getComics().subscribe((data: any) => {
      this.comicList = data
    })
  }

  public catchComic(comic: any) {
    this.comicsService.editItem(comic);
    this.router.navigate(["/gestion"])
  }
}
