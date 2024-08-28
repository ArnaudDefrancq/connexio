import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IErrorPageProps {
}

export default class ErrorPage extends React.Component<IErrorPageProps> {
  public render() {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
}
