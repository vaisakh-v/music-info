import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'musicinfo-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submitQuery(form){
    form.submit();
  }

}
