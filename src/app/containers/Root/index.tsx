import * as React from 'react';
import { GraphTest, Projects, SystemResources } from '../index';
import { RouteComponentProps } from 'react-router';
import { Header } from 'app/components';

export interface RootProps extends RouteComponentProps<any> {}

export class Root extends React.Component<RootProps, {}> {
  render() {
    return (
      <div className='rockstat'>
        <Header />

        <h1 className={'rockstat-title'}>DASHBOARD</h1>

        <GraphTest {...this.props}/>
        <Projects />
        <SystemResources />
      </div>
    );
  }
}
