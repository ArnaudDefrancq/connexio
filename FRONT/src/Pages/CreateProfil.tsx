import * as React from 'react';
import FormCreateProfil from '../Components/createProfil/FormCreateProfil';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ICreateProfilProps {
}

const CreateProfil: React.FunctionComponent<ICreateProfilProps> = () => {
  return (
    <>
      <FormCreateProfil />
    </>
  );
};

export default CreateProfil;
