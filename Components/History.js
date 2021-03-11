import React from "react";

export default function History(props) {
  return (
    <div>
      {props.history.map((coin, index) => {
        return (
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>#{index + 1}</p>
            <p style={{ fontWeight: "bold" }}>
              From {coin.from} To {coin.to}
            </p>
            <p style={{ fontWeight: "bold", color: "blue" }}>
              {coin.num}= {coin.calculate}
            </p>
            <button className="btn" onClick={() => props.delete(index)}>
              x
            </button>
          </div>
        );
      })}
    </div>
  );
}
