import React from "react";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div  className="container mt-4">
      <Header header="OVERVIEW" />
      {/* <h2 className="text-center" style={{ color: 'red' }}>In process of doing "Analytical DB and BI Assignment" </h2> */}
      <p className="container fw-normal">
        In modern daily life, food waste is a constant struggle. In 2010, food
        waste was estimated to be around 30-40 percent of the food supply in the
        United States (USDA, 2024). Large family with kids usually have more
        than 1 storage spaces for food in their household (e.g. fridges,
        freezers, pantry, etc.) Family with working parents tend to go for
        larger shopping trip in less frequency and meal prep for the whole week.
        The struggle with meal planning for the entire week lie with the
        difficulty in keeping track of ingredients availabilities. The
        difficulty also increases if a household has more than 1 storage
        location for their foods. The Food Storage Management database will help
        a family view and keep track of their current inventories across all of
        their food storage spaces. In addition, the application will help users
        identify which ingredients are still needed for their meal plan and add
        those ingredients to the shopping list for the week. A household usually
        have 2 10 storage units, and those units can hold from tens to a few
        hundreds of ingredients, depending on the household size. By identifying
        the exact ingredients a family may need for the week meal prep, the
        database can increase shopping efficiency and reduce the chance of
        buying unnecessary ingredients, which may lead to food waste.
      </p>
    </div>
  );
};

export default HomePage;
