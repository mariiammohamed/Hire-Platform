import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matched-jobs',
  templateUrl: './matched-jobs.component.html',
  styleUrls: ['./matched-jobs.component.scss'],
})
export class MatchedJobsComponent {
  @Input() matched_job: any;
  @Output() toggleBookmark = new EventEmitter<void>();

  // Sending the job id to the (selected-job) profile page
  //initializing the "Router" service
  constructor(private router: Router) {}

  redirectToProfile(id: any) {
    this.router.navigate(['job-profile', id]);
  }

  onToggleBookmark(jobId: number) {
    // Emit an event to notify the parent component to toggle the bookmark
    this.toggleBookmark.emit();
  }
}
