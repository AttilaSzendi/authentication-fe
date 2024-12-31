import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  private apiUrl = environment.apiUrl;

  private authSecretKey = 'Bearer Token';


  constructor() { }

  async getAllHousingLocations(): Promise<{ data: HousingLocation[] }> {
    const response = await fetch(`${this.apiUrl}/real-estates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(this.authSecretKey), // this should be attached to every api call behind the scene.
      }
    });
    return await response.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.apiUrl}/real-estates}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(this.authSecretKey), // this should be attached to every api call behind the scene.
      }
    });
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
