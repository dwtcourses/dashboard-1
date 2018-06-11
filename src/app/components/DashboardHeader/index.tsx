import * as React from 'react';
import * as styles from './style.scss';

import { DayPickerInput as DayPickerInputClass } from 'react-day-picker/types/DayPickerInput';
import * as DayPickerInput from 'react-day-picker/DayPickerInput';

import Select from 'react-select';
import { options as selectOption, stepValueProps } from '../../constants/stepValues';
// import { format, parseDate, formatDate } from 'app/lib/date';
import { observer, inject } from 'mobx-react';
import { STORE_TIME } from 'app/constants';
import { TimeStore } from 'app/stores';

interface DashboardHeaderProps {
  timeStore: TimeStore;
}

interface DashboardHeaderState {
  from?: Date;
  to?: Date;
  options: Array<stepValueProps>;
  changeOption: stepValueProps | null;
}

@inject(STORE_TIME)
@observer
export class DashboardHeader extends React.Component<{ timeStore?: TimeStore }, DashboardHeaderState> {
  state = {
    from: this.props.timeStore.fromDate,
    to: this.props.timeStore.toDate,
    options: selectOption,
    changeOption: null
  };

  to: DayPickerInputClass;
  timeout: number;

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  focusTo = () => {
    this.timeout = window.setTimeout(() => this.to.getInput().focus(), 0);
  }

  showFromMonth = () => {
    // const { from, to } = this.state;
    // if (!from) {
    //   return;
    // }
    // if (moment(to).diff(moment(from), 'months') < 2) {
    //   this.to.getDayPicker().showMonth(from);
    // }
  }

  handleFromChange = (from: Date) => {
    // this.setState({
    //   from: from
    // });
  }

  handleToChange = (to: Date) => {
    // this.props.timeStore.setToDate(to)
    // this.setState({
    //   to: to
    // }); //, this.showFromMonth
  }

  changeStep = (e) => {
    // this.setState({
    //   changeOption: e
    // })
  }

  render() {
    const { from, to, options, changeOption } = this.state;
    const modifiers = { start: from, end: to };
    const now = new Date();

    console.log(from, to)

    return (
      <div className={styles.headerContent}>

        <h1 className={styles.title}>DASHBOARD</h1>

        <div className={styles.selctedContainer}>

          {/* <div className="InputFromTo">
            <DayPickerInput
              value={from}
              placeholder="From"
              // format={format}
              // formatDate={formatDate}
              // parseDate={parseDate}
              dayPickerProps={{
                selectedDays: { from: from, to: to },
                // disabledDays: { after: to },
                // month: now,
                // fromMonth: from,
                // toMonth: now,
                modifiers,
                numberOfMonths: 2,
                // onDayClick: () => this.to.getInput().focus(),
              }}
              // onDayChange={this.handleFromChange}
            />{' '}<span className={'InputFromTo-line'}>—</span>{' '}
            <span className="InputFromTo-to">
              <DayPickerInput
                ref={el => (this.to = el)}
                value={to}
                placeholder="To"
                // format={format}
                // formatDate={formatDate}
                // parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: { from: from, to: to },
                  // disabledDays: { before: from, after: new Date() },
                  modifiers,
                  // month: now,
                  // toMonth: now,
                  numberOfMonths: 2,
                }}
                // onDayChange={this.handleToChange}
              />
            </span>
          </div> */}

          <div className={styles.stepContainer}>
            <Select
              value={changeOption}
              onChange={this.changeStep}
              options={options}
              clearable={false}
              multi={false}
              removeSelected={false}
              required
              placeholder={'Step'}
            />
          </div>
        </div>
      </div>
    );
  }
}