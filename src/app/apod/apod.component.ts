import { Component, OnInit } from '@angular/core';

import { ApodService } from '../api/apod.service';
import { Apod } from '../models/apod';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.scss']
})
export class ApodComponent implements OnInit {

  apod:Apod;

  constructor(private apodService: ApodService) { }

  ngOnInit() {
    this.getApod();
  }

  getApod(): void{
    this.apodService.getApod().subscribe(
      (response:any)=>{
        this.apod = response;
      }
    );
  }

}
