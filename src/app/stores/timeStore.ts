import { observable, action, computed } from 'mobx';
import { subDays, differenceInDays } from 'date-fns';

export class TimeStore {




  @observable period = 1; // day by default
  @observable offset = 0; // from now

  @computed get fromDate() {
    return subDays(this.toDate, this.period)
  }

  @computed get toDate() {
    return subDays(new Date(), this.offset)
  }

  // @action setToDate(date) {
  //   this.offset = differenceInDays(date, this.now)
  // }

  @computed get now() {
    return new Date();
  }

}