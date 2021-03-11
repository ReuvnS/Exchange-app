import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
export default function Update(props) {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const updateDisabled = (e) => {
    setValue(e.target.value);
    setDisabled(false);
  };
  return (
    <div className="App">
      <table
        style={{
          border: "4px solid black",
          borderCollapse: "collapse",
          width: "300px",
          height: "150px",
          marginLeft: "600px",
        }}
      >
        <tr style={{ border: "4px solid black" }}>
          <th style={{ border: "4px solid black" }}>Type</th>
          <th style={{ border: "4px solid black" }}>value</th>
        </tr>
        {props.coins.map((coin) => {
          return (
            <tr style={{ border: "4px solid black" }}>
              <td style={{ border: "4px solid black" }}>{coin.name}</td>
              <td style={{ border: "4px solid black" }}>{coin.price}</td>
            </tr>
          );
        })}
      </table>
      <br />
      <input
        type="text"
        placeholder="Type"
        onChange={(e) => setType(e.target.value)}
      />
      <br />
      <input type="number" placeholder="value" onChange={updateDisabled} />
      <br />
      {disabled ? (
        <button
          className="btn"
          onClick={() => props.updateCoins(type, value)}
          disabled
        >
          Update
        </button>
      ) : (
        <button className="btn" onClick={() => props.updateCoins(type, value)}>
          Update
        </button>
      )}
      <br />
      <Link to="/">
        <button className="btn">Back</button>
      </Link>
    </div>
  );
}
