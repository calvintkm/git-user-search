import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SearchApiService } from "../services/search-api.service";
import { FormGroup, FormControl, NgForm } from "@angular/forms";

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  @ViewChild("searchBar") searchBar: ElementRef;

  placeholder = "Enter Git user....";
  searchState = "User";
  errorMsg = "";
  openFilter = false;
  noOfFiltersAppllied = 0;

  constructor(private search: SearchApiService) {}

  ngOnInit() {
    this.placeholder;
  }

  toggleSearchState() {
    this.searchState = this.searchState == "User" ? "Repo" : "User";

    this.placeholder = `Enter Git ${this.searchState}....`;
  }

  isUser() {
    return this.searchState == "User";
  }

  updateSearch(page = 1) {
    let inputVal = this.searchBar.nativeElement.value;
    if (inputVal.length > 0 || this.search.validFilters()) {
      this.search.userApi(this.searchBar.nativeElement.value);
      this.errorMsg = "";
    } else {
      this.errorMsg = "we cant start the search without any leads";
    }
    return false;
  }

  toggleFilter() {
    this.openFilter = !this.openFilter;
  }

  setFilter(formEl: NgForm) {
    this.noOfFiltersAppllied = Object.keys(formEl.value).filter(
      (key) => formEl.value[key] != null && formEl.value[key].length > 0
    ).length;

    this.search.setQFilters(formEl.value);
    this.toggleFilter();
    return false;
  }
}
