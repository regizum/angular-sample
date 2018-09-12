import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { range } from 'lodash';

import { RateDetailInterface } from '../../rate.interface';

@Component({
  selector: 'pe-rate-choose',
  templateUrl: 'rate-choose.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateChooseComponent implements OnInit, OnDestroy {

  @Input('rates')
  set setRates(rates: RateDetailInterface[]) {
    this.rates = rates;
    if (this.initialRateId && !this.selectedRate) {
      this.chooseRate(this.rates.find(rate => rate.id === this.initialRateId));
    } else if (this.selectedRate) {
      this.chooseRate(this.rates.find(rate => rate.id === this.selectedRate.id));
    }
    this.changeDetectorRef.detectChanges();
  }

  @Input('isLoading')
  set setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.changeDetectorRef.detectChanges();
  }

  @Input('initialRateId')
  set setInitialRateId(id: string) {
    if (id && !this.selectedRate) {
      this.initialRateId = id;
      this.chooseRate(this.rates.find(rate => rate.id === this.initialRateId));
      this.changeDetectorRef.detectChanges();
    }
  }
  @Input('doSelectRate')
  doSelectRate: Subject<string> = null;

  @Output() ratesSelectOpened: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() rateSelected: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('rateSelect') rateSelect: MatSelect;

  isLoading: boolean;
  linesCount: number = 5;
  initialRateId: string;
  rates: RateDetailInterface[] = null;
  selectedRate: RateDetailInterface = null;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.doSelectRate) {
      this.doSelectRate
        .pipe(takeUntil(this.destroyed$))
        .subscribe((id: string) => this.chooseRate(this.rates.find(rate => rate.id === id)));
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  chooseRate(rate: RateDetailInterface): void {
    if (rate) {
      this.rateSelected.emit(rate.id);
      this.selectedRate = rate;
    }
  }

  openRatesDropdown(): void {
    this.ratesSelectOpened.emit();
    this.rateSelect.open();
  }

  range(): number[] {
    return range(this.linesCount);
  }
}
