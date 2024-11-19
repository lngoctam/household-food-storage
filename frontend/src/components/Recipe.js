import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const Recipe = (props) => {
  const instructions = props.instruction ? (
    props.instruction
      .split("\n")
      .map((line, index) => <p key={index}>{line.trim()}</p>)
  ) : (
    <p>No instructions available.</p>
  );
  return (
    <div>
      <Header header="RECIPE DETAIL" />
      <div
        className=" container card justify-content-center"
        style={{ width: "58rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">{props.recipeName}</h5>
          <Link
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              to="/recipes"
            ></Link>
          <h6 className="card-title">Category: {props.catID}</h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Calories: 
            {props.calories !== null ? ` ${props.calories}` : " n/a"}
          </li>
          <li className="list-group-item">
            Servings: 
            {props.servings !== null ? ` ${props.servings}` : " n/a"}
          </li>
          <li className="list-group-item">
            Preperation Time: 
            {props.prepTime !== null ? ` ${props.prepTime}` : " n/a"}
          </li>
          <li className="list-group-item">
            Cook Time: 
            {props.cookTime !== null ? ` ${props.cookTime}` : " n/a"}
          </li>
          <li className="list-group-item">
            Total Time: 
            {props.totalTime !== null ? ` ${props.totalTime}` : " n/a"}
          </li>
        </ul>
        <div className="card-body">
          <h6>Instruction</h6>
          {instructions}
        </div>
        <div>
          <button
            className="btn btn-outline-danger btn-sm"
            // onClick={() => handleDelete(item.ingredientID)}
          >
            DELETE
          </button>
          <Link
            // to={`/ingredients/update/${item.ingredientID}`}
            className="btn btn-outline-info btn-sm mx-2"
          >
            UPDATE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
