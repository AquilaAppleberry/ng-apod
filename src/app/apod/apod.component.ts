import { Component, OnInit } from '@angular/core';
//1. Import ActivatedRoute
import { ActivatedRoute } from '@angular/router';
import { ApodService } from '../api/apod.service';
import { Apod } from '../models/apod';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.scss']
})
export class ApodComponent implements OnInit {

  apod:Apod;
  //1. Create date as an instance variable
  date:string;

  constructor(
    private apodService: ApodService,
    //2. Inject ActivatedRoute into the constructor
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    //3. Subscribe to parameterized route
    this.router.params.subscribe((params) => {
      this.getApod(params['date']);
    });
  }

  //4. Replace the current date with an updated method signature
  getApod(date:string): void{

    if(!date){
      date = new Date().toISOString().slice(0,10);
    }

    this.apodService.getApod(date).subscribe(
      (response:any)=>{
        this.apod = response;
        //3.  Update this.date on each API call
        this.date = this.randomDate(new Date(1995,5,16), new Date());
        //4. Log this.date to the JS console
        console.log(this.apod);
      }
    );

  }

  //2. Create a method that returns a random date
  randomDate(start, end): string{
    let date = new Date(
      start.getTime() + Math.random() *
        (end.getTime() - start.getTime())
    );

    return new Date(date).toISOString().slice(0,10);
  }

}
