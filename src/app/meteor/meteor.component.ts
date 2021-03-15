import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMeteor, MeteorService } from './meteor.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-meteor',
  templateUrl: './meteor.component.html',
  styleUrls: ['./meteor.component.scss'],
})
export class MeteorComponent implements OnInit {
  meteorsList: IMeteor[];
  meteorsPerYear: IMeteor[] = [];
  meteorsByMass: IMeteor[] = [];
  yearInput = '';
  massInput = '';
  isRefilter: IMeteor;

  constructor(private meteorService: MeteorService) {}

  ngOnInit(): void {}

  onSearchByYear(): void {
    this.meteorsList = this.meteorService.meteorList;
    this.meteorsPerYear = this.meteorsList.filter((m: IMeteor) => {
      if (m.year) {
        return this.yearInput === m.year.split('-')[0];
      }
      return false;
    });
  }

  onMassSearch(): void {
    if (this.isRefilter) {
      this.onSearchByYear();
    }
    this.meteorsByMass = this.meteorsPerYear.filter((m: IMeteor) => {
      if (m.mass) {
        return Number(m.mass) > Number(this.massInput);
      }
      return false;
    });
    if (!this.meteorsByMass.length) {
      this.isRefilter = this.meteorsList.find((m: IMeteor) => {
        if (m.mass) {
          return Number(m.mass) > Number(this.massInput);
        }
        return false;
      });

      if (this.isRefilter) {
        this.yearInput = this.isRefilter.year.split('-')[0];
      }
    }
  }

  reset(): void {
    this.massInput = '';
    this.yearInput = '';
    this.isRefilter = null;
    this.meteorsPerYear = [];
    this.meteorsByMass = [];
  }
}
