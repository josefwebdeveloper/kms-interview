import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StockService} from '../../_services/stock.service';
import {Router} from '@angular/router';
import {debounceTime, mergeMap, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;
  filteredStock: Observable<any>;
  selectedData: string;
  trigger = this.stockService.triggerData;

  constructor(
    private stockService: StockService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchQuery: this.formBuilder.control('')
    });
    this.filteredStock = this.searchForm.valueChanges
      .pipe(
        startWith(''),
        debounceTime(350),
        mergeMap(data => this.search(data))
      );
  }

  search(value) {
    if (value.searchQuery === undefined || value.searchQuery === '' || value.searchQuery === this.selectedData) {
      return of([]);
    } else {
      return this.stockService.getHttp({function: 'SYMBOL_SEARCH', keywords: value.searchQuery});
    }
  }

  selected(e: MatAutocompleteSelectedEvent) {
    this.selectedData = e.option.value;
  }

  onSubmit() {
    const query = this.searchForm.value.searchQuery;
    this.resetForm();
    if (query.length > 0) {
      this.router.navigate(['stock', query]);
    }
  }

  resetForm() {
    this.searchForm.controls.searchQuery.setValue('');
  }


}
