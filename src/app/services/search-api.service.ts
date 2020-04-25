import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";
import {
  userResults,
  userDetails,
  usersSearchResults,
  emptyUserSearchResults,
} from "../model/search-results.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchApiService {
  constructor(private http: HttpClient) {}

  private headerOptions = {};
  baseUrl = "https://api.github.com";

  private page = 1;
  private maxPage = 0;
  private sort = "";
  private order = "desc";
  private q: string = "";
  private queryText: string = "";
  private qFilters: string = "";
  results$ = new BehaviorSubject<usersSearchResults>(emptyUserSearchResults);
  // results$ = new Subject<usersSearchResults>();

  setQueryText(queryText) {
    this.queryText = queryText.trim();
  }
  setQ() {
    this.q = this.queryText;
    if (this.qFilters.length > 0) {
      if (this.q.length > 0) {
        this.q += " ";
      }
      this.q += this.qFilters;
    }
  }
  validFilters() {
    return this.qFilters != "";
  }
  setQFilters(filterObject) {
    let tempQFilter = "";
    Object.keys(filterObject)
      .filter((key) => filterObject[key] != null && filterObject[key] != "")
      .map((key) => {
        tempQFilter += ` ${key}:${filterObject[key]}`;
      });

    var refreshSearch = tempQFilter != this.qFilters && tempQFilter != "";
    this.qFilters = tempQFilter;

    this.page = 1;
    if (refreshSearch) {
      this.userApi();
    }
  }

  setMaxPage(maxCount) {
    let _maxPage = Math.ceil(maxCount / 30);
    this.maxPage = _maxPage > 34 ? 34 : _maxPage;
  }

  setSortOder(sort, order) {
    var refreshSearch =
      (this.sort != sort || this.order != order) && this.q != "";
    this.sort = sort;
    this.order = order;
    this.page = 1;
    if (refreshSearch) {
      this.userApi();
    }
  }

  appendPageSortOrder(params: HttpParams) {
    params = params.append("page", this.page.toString());
    if (this.sort != "") {
      params = params.append("sort", this.sort);
    }
    if (this.order != "") {
      params = params.append("order", this.order);
    }
    return params;
  }

  goto(page) {
    if (page > 0 && page <= this.maxPage && page !== this.page) {
      this.page = page;
      this.userApi();
    }
  }

  nextPage() {
    if (this.page + 1 <= this.maxPage) {
      this.page += 1;
      this.userApi();
    }
  }

  prevPage() {
    if (this.page - 1 > 0) {
      this.page -= 1;
      this.userApi();
    }
  }

  userApi(keywords = this.queryText) {
    const url = `${this.baseUrl}/search/users`;

    this.setQueryText(keywords);
    this.setQ();

    let params = new HttpParams().set("q", this.q);
    params = this.appendPageSortOrder(params);

    this.http
      .get<usersSearchResults>(url, { params })
      .subscribe((data) => {
        this.setMaxPage(data.total_count);
        this.results$.next({ ...{ current_page: this.page }, ...data });
      });
  }

  searchUser(user) {
    var url = `${this.baseUrl}/users/${user}`;

    this.http.get<userDetails>(url).subscribe((details) => {
      let _value = this.results$.getValue();
      _value.items = _value.items.map((item) => {
        if (item.login === user) {
          return { ...item, ...{ details } };
        }
        return item;
      });
      this.results$.next(_value);
    });
  }
}
