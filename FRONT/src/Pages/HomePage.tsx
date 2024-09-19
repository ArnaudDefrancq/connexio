import * as React from 'react';
import Header from '../Components/header/Header';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IHomePageProps {
}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  return (
    <>
      <Header />
    </>
  ) ;
};

export default HomePage;
