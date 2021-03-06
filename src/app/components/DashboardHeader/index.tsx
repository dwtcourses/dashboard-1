import * as React from 'react';
import * as styles from './style.css'

import DayPickerInput from 'react-day-picker/DayPickerInput';

import Select from 'react-select';
import { options as selectOption, stepValueProps } from '@app/constants/stepValues';
import { format, parseDate, formatDate } from 'app/lib/date';
import { observer, inject } from 'mobx-react';
import { APP_STATE } from 'app/constants';
import { AppStateStore } from 'app/stores';

interface DashboardHeaderProps {

}

interface DashboardHeaderState {
  from?: Date;
  to?: Date;
  options: Array<stepValueProps>;
  changeOption: stepValueProps | null;
}

@inject(APP_STATE)
@observer
export class DashboardHeader extends React.Component<{ }, DashboardHeaderState> {
  state = {
    from: new Date(),
    to: new Date(),
    options: selectOption,
    changeOption: null
  };

  to: DayPickerInput;
  timeout: number;
  componentWillMount(){
    const appState = this.props[APP_STATE] as AppStateStore;
    this.setState({
      from: appState.fromDate,
      to: appState.toDate
    })
  }
  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  focusTo = () => {
    this.timeout = window.setTimeout(() => this.to.getInput().focus(), 0);
  }

  handleFromChange = (from: Date) => {
    this.setState({ from });
  }

  handleToChange = (to: Date) => {
    this.setState({ to });
  }

  changeStep = (int) => {
    // console.log(int.value)
    this.setState({ changeOption: int })
  }

  render() {
    const { from, to, options, changeOption } = this.state;
    const modifiers = { start: from, end: to };
    const now = new Date();
    return (
      <div className={styles.headerContent}>

        <h1 className={styles.title}>DASHBOARD</h1>

        <div className={styles.selctedContainer}>

          <div className="InputFromTo">
            <DayPickerInput
              value={from}
              placeholder="From"
              format={format}
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: { from: from, to: to },
                disabledDays: { after: to },
                month: now,
                // fromMonth: from,
                toMonth: now,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => this.focusTo(),
              }}
              onDayChange={this.handleFromChange}
            />
            {' '}<span className={'InputFromTo-line'}>—</span>{' '}
            <span className="InputFromTo-to">
              <DayPickerInput
                ref={el => (this.to = el)}
                value={to}
                placeholder="To"
                format={format}
                formatDate={formatDate}
                parseDate={parseDate}
                required
                dayPickerProps={{
                  selectedDays: { from: from, to: to },
                  disabledDays: { before: from, after: new Date() },
                  modifiers,
                  month: now,
                  toMonth: now,
                  numberOfMonths: 2,
                }}
                onDayChange={this.handleToChange}
              />
            </span>
          </div>
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
