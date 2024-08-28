import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IHomePageProps {
}

export default class HomePage extends React.Component<IHomePageProps> {
  public render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}
