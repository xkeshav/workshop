import BhashiniTranslator from "@scaler-school-of-technology/bhashini-web-translator";
import { Fragment } from 'react';


type BhashaProps = { name: string; }

export const Bhasha = (props: BhashaProps) => {
  console.log({ props }); /* added to suppress lint error */
  const API_KEY = import.meta.env.VITE_BHASHINI_API_KEY;
  const USER_ID = import.meta.env.VITE_BHASHINI_USER_ID;
  // console.log(API_KEY, USER_ID);
  const translator = new BhashiniTranslator(API_KEY, USER_ID);
  console.log({ translator });

  return (
    <Fragment>
      <h1>Bhasha : {props.name}</h1>
    </Fragment>
  );
}