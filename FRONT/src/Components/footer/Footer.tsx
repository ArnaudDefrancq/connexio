import * as React from 'react';


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <>
        <footer>
            <p>© Copyright 2024 - Arnaud Defrancq - Tous droits réservés</p>
        </footer>
    </>
  );
};

export default Footer;
