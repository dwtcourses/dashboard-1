import * as React from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from "react-virtualized";
import { Header, ShowIf } from 'app/components';
import * as styles from './logs.scss';
import { PrismCode } from 'app/components/prism';
import { observer, inject } from 'mobx-react';
import { APP_STATE } from 'app/constants';
import { InjectedStores, AppStateStore } from 'app/stores';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100
});

export interface LogsState {
  autoScroll: boolean;
  scrollTo: number;
}
export interface LogsProps extends InjectedStores { }


@inject(APP_STATE)
@observer
export class Logs extends React.Component<LogsProps, LogsState> {
  state = {
    autoScroll: true,
    scrollTo: undefined
  }

  //clientHeight: 456, scrollHeight: 2967, scrollTop: 2511}
  onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    this.setState(state => ({
      autoScroll: true//scrollTop === 0 ? state.autoScroll : scrollHeight - clientHeight === scrollTop
    }))
  }
  componentWillReact() {
    console.log("I will re-render, since the todo has changed!")
  }

  render() {
    console.log('logs', this.props)
    const { logs, logsSize } = this.props[APP_STATE] as AppStateStore;

    return (
      <div>
        <div className='rockstat'>
          <Header logsBadge={""} />
        </div>
        <div className={styles.AutoSizerWrapper}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                onScroll={this.onScroll}
                height={height}
                width={width}
                rowHeight={cache.rowHeight}
                rowCount={logsSize}
                className={styles.List}
                overscanRowCount={3}
                scrollToAlignment={"end"}
                scrollToIndex={this.state.scrollTo}
                rowRenderer={this.renderRow}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }

  renderRow = ({ index, key, style, parent }) => {
    const item = this.props[APP_STATE].logs[index];
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}>
        {({ measure }) => (
          <div key={key} className={styles.row} style={style}>
            <span className={styles.time}>{item.time}</span>
            <span className={styles.name}>{item.cname}</span>
            <span className={styles.content}>
              <PrismCode async={true} language={item.json ? "json" : 'inform7'}>{item.data}</PrismCode>
            </span>
          </div>

        )}
      </CellMeasurer>
    )
  }
}
