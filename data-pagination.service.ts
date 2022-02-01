import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataPaginationService {

  public startingPoint: number = 0;
  public numLimit: number = 10;
  public currentPage: number = 1;
  public savedCurrentPage: number = 1;
  public totalCount: number = 0;
  public pages: number = 0;

  constructor() { }
  
  setStartingPoint(num : number) {
    this.startingPoint = num;
  }

  getStartingPoint(){
    return this.startingPoint;
  }

  setNumberLimit(num: number) {
    this.numLimit = num;
  }

  getNumberLimit() {
    return this.numLimit;
  }

  setCurrentPage(num: number) {
    this.currentPage = num;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  setSavedCurrentPage(num: number) {
    this.savedCurrentPage = num;
  }

  getSavedCurrentPage() {
    return this.savedCurrentPage;
  }

  setTotalCount(num: number) {
    this.totalCount = num;
  }

  getTotalCount() {
    return this.totalCount;
  }

  setPages(num: number) {
    this.pages = num;
  }

  getPages() {
    return this.pages;
  }

  hideNext() {
    if ((this.getStartingPoint() + this.getNumberLimit()) < this.getTotalCount()) {
      return false;
    }
    else
      return true;
  }
  hidePrev() {
    if (this.getStartingPoint() === 0) {
      return true;
    }
    else
      return false;
  }

  firstPage() {
    if (this.getStartingPoint() != 0) {
      this.setCurrentPage(1);
      this.setStartingPoint(0);
      this.setSavedCurrentPage(this.getCurrentPage());
      return true;
    }
    return false;
  }
  lastPage() {
    if (this.getCurrentPage() != this.getPages()) {
      this.setCurrentPage(this.getPages());
      var divide = this.getTotalCount() / this.getNumberLimit();
      var modulus = this.getTotalCount() % this.getNumberLimit();
      var roundDivide = Math.floor(divide);
      this.setStartingPoint(modulus == 0 ? this.getTotalCount() - this.getNumberLimit() : roundDivide * this.getNumberLimit());
      this.setSavedCurrentPage(this.getCurrentPage());
      return true;
    }
    return false;
  }

  nextPage() {
    this.setCurrentPage(this.getCurrentPage() + 1);
    this.setStartingPoint(this.getStartingPoint() + this.getNumberLimit());
    this.setSavedCurrentPage(this.getCurrentPage());
  }
  PrevPage() {
    if (this.getCurrentPage() > 1) {
      this.setCurrentPage(this.getCurrentPage() - 1);
      this.setSavedCurrentPage(this.getCurrentPage());
    }
    this.setStartingPoint(this.getStartingPoint() - this.getNumberLimit());
  }
}
