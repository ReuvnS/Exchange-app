import "./App.css";
import React, { useState } from "react";
import History from "./Components/History";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Update from "./Components/Update";
function App() {
  const [coins, setCoins] = useState([
    { name: "euro", price: 5 },
    { name: "dolar", price: 4 },
    { name: "shekal", price: 1 },
  ]);
  const [from, setFrom] = useState("euro");
  const [to, setTo] = useState("euro");
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [showHis, setShowHis] = useState(false);
  // var unique = coins.filter((v, i, a) => a.indexOf(v) === i);
  const addCoin = (type, value) => {
    debugger;
    let val = parseInt(value);
    if (type == "" || value == "") {
      alert("You have to fill both values!");
      return;
    }
    let newCoins = [];
    let num = 0;
    coins.map((coin) => {
      if (coin.name === type) {
        newCoins.push({ name: type, price: val });
      } else {
        newCoins.push({ name: coin.name, price: coin.price });
        num = num + 1;
      }
    });
    if (num == coins.length) {
      newCoins.push({ name: type, price: val });
    }
    setCoins(newCoins);
  };

  const deleteHistory = (i) => {
    let tempList = history.filter((e, index) => index != i);
    setHistory(tempList);
  };

  const btnDisabled = (e) => {
    setNum(e.target.value);
    setDisabled(false);
  };

  const coinsValue = () => {
    let calculate = 0;
    let toPrice = 0;
    let fromPrice = 0;
    if (num <= 0) {
      alert("You have to set value");
      return;
    }

    coins.map((coin) => {
      if (coin.name === from) fromPrice = coin.price;
      if (coin.name == to) toPrice = coin.price;
    });
    calculate = (num * fromPrice) / toPrice;
    alert(`Your exchange value is ${calculate}`);
    setHistory([...history, { from, to, num, calculate }]);
  };

  return (
    <div className="App">
      <Router>
        <Link to="/">
          <h1 style={{ color: "green" }}>Exchange</h1>
        </Link>

        <Switch>
          <Route exact path="/">
            <h4 style={{ color: "blue" }}>
              From :
              <select onChange={(e) => setFrom(e.target.value)}>
                {coins.map((coin, index) => {
                  return <option value={coin.name}>{coin.name}</option>;
                })}
              </select>
            </h4>
            <input
              type="number"
              placeholder="How much?"
              onChange={btnDisabled}
            />
            <h4 style={{ color: "red" }}>
              To :
              <select onChange={(e) => setTo(e.target.value)}>
                {coins.map((coin, index) => {
                  return <option>{coin.name}</option>;
                })}
              </select>
            </h4>
            {disabled ? (
              <button onClick={coinsValue} disabled className="btn">
                Start
              </button>
            ) : (
              <button className="btn" onClick={coinsValue}>
                Start
              </button>
            )}

            <br />
            <Link to="/update">
              <button className="btn">Update</button>
            </Link>
            <a style={{ color: "black" }} href="https://facebook.com">
              Share on Facebook
            </a>
            <button className="btn" onClick={() => setShowHis(!showHis)}>
              History
            </button>
            <Route exact path="/"></Route>
            {showHis ? (
              <History history={history} delete={deleteHistory} />
            ) : null}
          </Route>

          <Route
            exact
            path="/update"
            component={() => {
              return <Update coins={coins} updateCoins={addCoin} />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
