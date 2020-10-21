import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;
  public carId
  constructor( 
    private router:Router,
    private carService: CarService, 
    private giphyService: GiphyService ) { }

  ngOnInit(){
    this.carService.getAll().subscribe(data => {
      this.cars = data._embedded.cars;
      for (const car of this.cars){
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
  }

  obtainId(href){
    this.carId = href.substring(48, href.length);
    this.router.navigate(['car-edit/' + this.carId]);
  }
}