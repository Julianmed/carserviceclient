import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
  owner: any = {};
  cars: Array<any>
  owners: Array<any>
  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private carService: CarService) { 
  }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ownerService.get(id).subscribe((owner: any) => {
          if (owner) {
            this.owner = owner;
            this.owner.href = owner._links.self.href;
          } else {
            console.log(`Owner with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    for (const own of this.owners){
      if(own._links.owner.href == href){
        this.removeOwnerCar(own.dni)
      }
    }
    this.ownerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  removeOwnerCar(dni){
    this.carService.getAll().subscribe(data => {
      this.cars = data._embedded.cars;
      console.log("cars", this.cars);
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