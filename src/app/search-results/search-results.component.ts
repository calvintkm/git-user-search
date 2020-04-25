import { Component, OnInit } from "@angular/core";
import { SearchApiService } from "../services/search-api.service";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: "search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"],
})
export class SearchResultsComponent implements OnInit {
  constructor(private http: HttpClient, private search: SearchApiService) {
    this.results$ = this.search.results$;
  }
  menuIsOpen = false;
  results$: Observable<any>;
  sortOptions = [
    "best match",
    "most followers",
    "least followers",
    "most recently joined",
    "least recently joined",
    "most repositories",
    "least repositories",
  ];
  activeSortIndex = 0;

  ngOnInit() {}

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  closeMenu(event) {
    this.menuIsOpen = false;
    event.stopPropagation();
  }
  setActiveSortIndex(index) {
    if (this.activeSortIndex != index) {
      if (index > 0) {
        // 0 is best match
        var sortOptionSplit = this.sortOptions[index].split(" ");

        var order =
          sortOptionSplit[0].toLowerCase() === "least" ? "asc" : "desc";
        var sort = sortOptionSplit[sortOptionSplit.length - 1].toLowerCase();
        this.search.setSortOder(sort, order);
      } else {
        this.search.setSortOder("", "");
      }
    }
    this.activeSortIndex = index;

    // this.toggleMenu();
  }

  isActiveOption(option: String) {
    return option == this.sortOptions[this.activeSortIndex];
  }

  loadUserDetails(user) {
    this.search.searchUser(user);
  }
}
