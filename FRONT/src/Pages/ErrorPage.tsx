import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IErrorPageProps {
}

const ErrorPage: React.FunctionComponent<IErrorPageProps> = () => {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (!localStorage.getItem('data')) navigate('/');
  }, [])
  return(
    <>
      <h1>Error</h1>
    </>
  ) ;
};

export default ErrorPage;
