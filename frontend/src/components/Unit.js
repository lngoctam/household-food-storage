import React from "react";

const Category = (props) => {
  return (
    <tr className="text-center">
      <th scope="row" className="text-center">
        {props.unitID}
      </th>
      <td>{props.unitName}</td>
      <td>
        <button className="btn btn-danger">DELETE</button>{" "}
        <button className="btn btn-info">UPDATE</button>
      </td>
    </tr>
  );
};

export default Category;
