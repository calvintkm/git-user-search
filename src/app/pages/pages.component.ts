import { Component, OnInit } from "@angular/core";
import { SearchApiService } from "../services/search-api.service";

@Component({
  selector: "page-selector",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
})
export class PagesComponent implements OnInit {
  constructor(private search: SearchApiService) {}
  maxPage: number;
  current_page;
  errorMsg = "";
  ngOnInit() {
    this.search.results$.subscribe((results) => {
      var _maxPage = Math.ceil(results.total_count / 30);
      this.maxPage = _maxPage > 34 ? 34 : _maxPage;
      this.current_page = results.current_page;
      this.errorMsg = "";
    });
  }

  goto(page) {
    this.search.goto(page);
  }
  prev() {
    this.search.prevPage();
  }
  next() {
    if (this.current_page == this.maxPage) {
      this.errorMsg =
        "we are unable to provide more user information, due to the 1000 queries limit imposed by Github. To find more results, use the sorting and filtering functions available. ";
    } else {
      this.search.nextPage();
    }
  }
}
