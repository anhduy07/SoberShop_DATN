import React from 'react';
import {IconContext} from "react-icons";
import {MdClear} from "react-icons/md";
import {useHistory} from "react-router-dom";

export default function CartHeader() {
  const history = useHistory();

  return (
    <div className="Cart_header">
      <h2>Cart</h2>
      <IconContext.Provider value={{ size: '2em' }}>
        <MdClear onClick={() => history.push('/')} />
      </IconContext.Provider>
    </div>
  );
}
