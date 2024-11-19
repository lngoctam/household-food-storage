import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddUnit from "../components/AddUnit";
import url from "../data/setting";
import { Link } from "react-router-dom";

const UnitsPage = () => {
  const [unit, setUnit] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/units/delete/${id}`)
      .then((res) => {
        setUnit((prevUnits) => prevUnits.filter((unit) => unit.unitID !== id));
      })
      .catch((err) => console.log(err));
  };

  function addUnit(newUnit) {
    setUnit((prevUnits) => {
      return [...prevUnits, newUnit];
    });
  }

  useEffect(() => {
    axios
      .get(`${url}/units`)
      .then((res) => {
        setUnit(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <Header header="LIST OF UNITS" />
      <AddUnit onAdd={addUnit} />
      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" className="text-center col-sm-1">
                #
              </th>
              <th scope="col" className="text-center col-sm-1">
                Name
              </th>
              <th scope="col" className="text-center col-sm-1">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {unit.map((item, index) => {
              return (
                <tr className="text-center" key={item.unitID}>
                  <th scope="row" style={{ width: "33.33%" }}>
                    {index + 1}
                  </th>
                  <td style={{ width: "33.33%" }}>{item.unitName}</td>
                  <td style={{ width: "33.33%" }}>
                    {item.unitID && (
                      <div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(item.unitID)}
                        >
                          DELETE
                        </button>
                        <Link
                          to={`/units/update/${item.unitID}`}
                          className="btn btn-outline-info btn-sm mx-2"
                        >
                          UPDATE
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitsPage;

// import React from "react";
// import units_data from "../data/units_data";
// import Unit from "../components/Unit";
// import Header from "../components/Header";
// import AddUnit from "../components/AddUnit";

// const UnitsPage = (props) => {
//   return (
//     <div className="container mt-4">
//       <Header header="LIST OF UNITS" />
//       <AddUnit />
//       <div className="table-responsive">
//         <table className="table table-sm table-bordered table-hover">
//           <thead>
//             <tr className="text-center">
//               <th scope="col" className="col-sm-1">
//                 #
//               </th>
//               <th scope="col" className="col-sm-1">
//                 Name
//               </th>
//               <th scope="col" className="col-sm-1">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {units_data.map((item) => (
//               <Unit
//                 key={item.UnitID}
//                 unitID={item.unitID}
//                 unitName={item.unitName}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UnitsPage;
