import React from "react";

const Ingredient = (props) => {
  return (
    <tr className="text-center">
      <th scope="row" className="text-center">
        {props.ingredientID}
      </th>
      <td>{props.ingredientName}</td>
      <td><button className="btn btn-danger">DELETE</button> <button className="btn btn-info">UPDATE</button></td>
    </tr>
  );
};

export default Ingredient;
