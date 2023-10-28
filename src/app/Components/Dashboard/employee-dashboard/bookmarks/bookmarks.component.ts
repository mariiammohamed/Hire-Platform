import { Component } from "@angular/core";
import { DashboardHttpService } from "src/app/services/dashboard-http.service";
import { BehaviorSubject } from "rxjs";
import { TimeService } from "src/app/services/time.service";
import { ActivatedRoute,Router } from "@angular/router";

@Component({
	selector: "app-bookmarks",
	templateUrl: "./bookmarks.component.html",
	styleUrls: ["./bookmarks.component.scss"],
})
export class BookmarksComponent {
	bookmarks;
	paginationData: BehaviorSubject<any> = new BehaviorSubject({});

	constructor(
		private dashboardHttpService: DashboardHttpService,
		private time: TimeService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
	) {}
	ngOnInit() {

		this.getBookmarks();

	}
	getBookmarks(
	) {
		const page = this.activatedRoute.snapshot.params["page"];
		this.dashboardHttpService
			.getBookmarks(page)
			.subscribe((response: any) => {
				if (response.status === 200) {
					this.bookmarks = response.data.data.map((bookmark) => {
						bookmark.created_at = this.time.timeAgo(
							bookmark.created_at
						);
						return bookmark;
					});
					this.paginationData.next( {
						current_page:response.data.current_page,
						last_page: response.data.last_page,
					});
				} else {
					console.error(response.message);
				}
			});
	}
	deleteBookmark(jobId) {
		this.dashboardHttpService
			.deleteBookmark(jobId)
			.subscribe((response: any) => {
				console.log(response)
				if (response.status === 200) {
					this.redirectTo(this.router.url);
				} else {
					console.error(response.message);
				}
			});
	}
	redirectTo(uri: string) {
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => { this.router.navigate([uri]) });
	}

}
