import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
})
export class CompaniesListComponent {
  @Input() company: any = '';

  // Sending the company id to the (selected-company) profile page
  //initializing the "Router" service
  constructor(private router: Router) {}

  redirectToProfile(id: any) {
    this.router.navigate(['company-profile', id]);
  }
}
