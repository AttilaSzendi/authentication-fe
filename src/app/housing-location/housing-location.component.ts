import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink],
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.address}}" loading="lazy">
    <h2 class="listing-heading">{{ housingLocation.address }}</h2>
    <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.country }}</p>
    <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
  </section>
`,
  styleUrl: './housing-location.component.css'
})

export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
