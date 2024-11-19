import React from "react";

const Card = (props) => {
  return (
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Update Storage Name</h5>
        <h6 class="card-subtitle mb-2 text-muted">Current Name</h6>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <h6 class="card-subtitle mb-2 text-muted">New Name</h6>
        <button type="button" class="btn-close" aria-label="Close">Close</button>
        <a href="#" class="card-link">
          Another link
        </a>
      </div>
    </div>
  );
};

export default Card;
