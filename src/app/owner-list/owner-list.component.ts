import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>
  cars: Array<any>
  public id
  public delete = []
  constructor(
    private router: Router,
    private ownerService: OwnerService, 
    private carService: CarService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });
  }

  onChange(href: string, isChecked: boolean){
    if(isChecked){
      this.delete.push(href)
    }else{
      this.delete.splice(this.delete.indexOf(href), 1);
    }
  }

  obtainId(href){
    this.id = href.substring(50, href.length);
    this.router.navigate(['/owner-edit/' + this.id]);
  }

  remove(){
    for(const owner of this.delete){
      for (const own of this.owners){
        if(own._links.owner.href == owner){
          this.removeOwnerCar(own.dni)
        }
      }
      this.ownerService.remove(owner).subscribe();
    }
    window.location.reload()
  }

  removeOwnerCar(dni){
    this.carService.getAll().subscribe(data => {
      this.cars = data._embedded.cars;
      for (const car of this.cars) {
        if(car.ownerDni == dni){
          car.ownerDni = null;
          car.href = car._links.car.href;
          this.carService.save(car).subscribe();
        }
      }
    });
  }
}