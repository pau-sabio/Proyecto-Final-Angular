import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  public themeText = "☀️"
  constructor() { }

  ngOnInit(): void {
  }

  public changeTheme() {
    document.body.classList.toggle("light");
    if (this.themeText === "☀️") {
      this.themeText = "🌙"
    } else {
      this.themeText = "☀️"
    }
  }

}
