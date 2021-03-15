import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IMeteor {
  name: string;
  id: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: string;
  reclat: string;
  reclong: string;
  geolocation: { type: string; coordinates: number[] };
}

@Injectable({
  providedIn: 'root',
})
export class MeteorService {
  private _meteorList: IMeteor[];

  get meteorList(): IMeteor[] {
    return this._meteorList.slice();
  }
  constructor(private http: HttpClient) {
    this.getMeteors().subscribe((data) => (this._meteorList = data));
  }

  getMeteors(): Observable<IMeteor[]> {
    return this.http.get<IMeteor[]>(`${environment.NASA_URL}`);
  }
}
