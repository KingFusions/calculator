import React, { useState, useRef } from "react";

function Buttons() {
    const input = useRef();
    const [final, setFinal] = useState("");
    let [num, setNum] = useState("");
    let [show, setShow] = useState(false);
    let [lastSymbol, setLastSymbol] = useState("");
    let [lastPow, setLastPow] = useState("");

    function getValue(symbol, kind) {
        if (kind === "num") {
            if (!show) {
                setFinal((prevFinal) => (prevFinal += symbol));
            } else {
                setNum((prevNum) => (prevNum += symbol));
            }
        } else if (kind === "opr") {
            if (num !== "") {
                if (symbol === "+") {
                    setLastSymbol(() => (lastSymbol = "+"));
                } else if (symbol === "-") {
                    setLastSymbol(() => (lastSymbol = "-"));
                } else if (symbol === "*") {
                    setLastSymbol(() => (lastSymbol = "*"));
                } else if (symbol === "/") {
                    setLastSymbol(() => (lastSymbol = "/"));
                } else if (symbol === "=") {
                    setShow(() => (show = false));
                    // setLastSymbol(() => "");
                }
                console.log("hi");
                total(lastSymbol);
                setNum(() => (num = ""));
                setLastPow(() => (lastPow = ""));
            } else if (num === "" && final !== "") {
                if (symbol === "+") {
                    setLastSymbol(() => (lastSymbol = "+"));
                } else if (symbol === "-") {
                    setLastSymbol(() => (lastSymbol = "-"));
                } else if (symbol === "*") {
                    setLastSymbol(() => (lastSymbol = "*"));
                } else if (symbol === "/") {
                    setLastSymbol(() => (lastSymbol = "/"));
                } else if (symbol === "=") {
                    console.log("cant press");
                }
                setNum(() => (num = ""));
                setShow(() => (show = true));
                setLastPow(() => (lastPow = ""));
            } else if (final === "" || lastSymbol !== "") {
                if (symbol === "+") {
                    console.log("cant press");
                } else if (symbol === "-") {
                    console.log("cant press");
                } else if (symbol === "*") {
                    console.log("cant press");
                } else if (symbol === "/") {
                    console.log("cant press");
                } else if (symbol === "=") {
                    console.log("cant press");
                }
            }
        } else if (kind === "com") {
            if (symbol === "c") {
                setFinal(() => "");
                setNum(() => "");
                setLastSymbol(() => "");
                setLastPow(() => "");
            } else if (symbol === "del") {
                if (!show) {
                    setFinal(() =>
                        input.current.value.substr(
                            0,
                            input.current.value.length - 1
                        )
                    );
                } else if (show) {
                    setNum((prevNum) => prevNum.substr(0, num.length - 1));
                } else {
                    console.log("cant press");
                }
            }
        } else if (kind === "pow") {
            if (final !== "" && num === "" && lastSymbol === "") {
                if (symbol === "%" && symbol !== lastPow) {
                    total("%");
                    setLastPow(() => (lastPow = "%"));
                } else if (
                    symbol === "." &&
                    symbol !== lastPow &&
                    lastPow !== "%"
                ) {
                    setFinal((prevFinal) => (prevFinal += symbol));
                    setLastPow(() => (lastPow = "."));
                } else if (symbol === "+/-") {
                    total("+/-");
                } else {
                    console.log("cant press");
                }
            } else if (num !== "") {
                if (symbol === "%" && symbol !== lastPow) {
                    total("%");
                    setLastPow(() => (lastPow = "%"));
                } else if (
                    symbol === "." &&
                    symbol !== lastPow &&
                    lastPow !== "%"
                ) {
                    if (show) {
                        setFinal((prevFinal) => (prevFinal += symbol));
                    } else {
                        setNum((prevNum) => (prevNum += symbol));
                    }
                    setLastPow(() => (lastPow = "."));
                } else if (symbol === "+/-") {
                    total("+/-");
                } else {
                    console.log("cant press");
                }
            } else if (final === "" || num === "") {
                if (symbol === "." && symbol !== lastPow && lastPow !== "%") {
                    if (final === "") {
                        setFinal((prevFinal) => (prevFinal += symbol));
                    } else if (num === "") {
                        setNum((prevNum) => (prevNum += symbol));
                    }
                    setLastPow(() => (lastPow = "."));
                }
            } else {
                console.log("cant press");
            }
        }
    }
    function total(symbol) {
        switch (symbol) {
            case "+":
                setFinal(
                    (prevFinal) =>
                        (prevFinal =
                            parseFloat(input.current.value) +
                            parseFloat(prevFinal))
                );
                console.log(input.current.value);
                break;

            case "-":
                setFinal(
                    (prevFinal) =>
                        (prevFinal =
                            parseFloat(prevFinal) -
                            parseFloat(input.current.value))
                );
                break;

            case "*":
                setFinal(
                    (prevFinal) =>
                        (prevFinal =
                            parseFloat(input.current.value) *
                            parseFloat(prevFinal))
                );
                break;

            case "/":
                setFinal(
                    (prevFinal) =>
                        (prevFinal =
                            parseFloat(prevFinal) /
                            parseFloat(input.current.value))
                );
                break;

            case "%":
                if (lastSymbol === "") {
                    setFinal(
                        () =>
                            (input.current.value =
                                parseFloat(input.current.value) / 100)
                    );
                } else {
                    setNum(
                        () =>
                            (input.current.value =
                                parseFloat(input.current.value) / 100)
                    );
                }
                break;

            case "+/-":
                if (lastSymbol === "") {
                    setFinal(
                        (prevFinal) =>
                            (prevFinal = parseFloat(input.current.value) * -1)
                    );
                } else {
                    setNum(
                        (prevNum) =>
                            (prevNum = parseFloat(input.current.value) * -1)
                    );
                }
                break;

            default:
                setFinal((prevFinal) => prevFinal);
        }
    }

    return (
        <div className="container">
            {console.log(final)}
            <div className="input">
                <input id="num" ref={input} value={show ? num : final} />
                <label className="answer">
                    {final !== "" && !isNaN(final)
                        ? `= ${final}`
                        : final === ""
                        ? ""
                        : "undefined"}
                </label>
            </div>
            <div className="btn-container">
                <form id="btn-value">
                    <button type="button" onClick={() => getValue("c", "com")}>
                        C
                    </button>
                    <button
                        type="button"
                        onClick={() => getValue("del", "com")}
                    >
                        del
                    </button>
                    <button type="button" onClick={() => getValue("%", "pow")}>
                        %
                    </button>
                    <button type="button" onClick={() => getValue("/", "opr")}>
                        /
                    </button>
                    <button type="button" onClick={() => getValue("7", "num")}>
                        7
                    </button>
                    <button type="button" onClick={() => getValue("8", "num")}>
                        8
                    </button>
                    <button type="button" onClick={() => getValue("9", "num")}>
                        9
                    </button>
                    <button type="button" onClick={() => getValue("*", "opr")}>
                        *
                    </button>
                    <button type="button" onClick={() => getValue("4", "num")}>
                        4
                    </button>
                    <button type="button" onClick={() => getValue("5", "num")}>
                        5
                    </button>
                    <button type="button" onClick={() => getValue("6", "num")}>
                        6
                    </button>
                    <button type="button" onClick={() => getValue("-", "opr")}>
                        -
                    </button>
                    <button type="button" onClick={() => getValue("1", "num")}>
                        1
                    </button>
                    <button type="button" onClick={() => getValue("2", "num")}>
                        2
                    </button>
                    <button type="button" onClick={() => getValue("3", "num")}>
                        3
                    </button>
                    <button type="button" onClick={() => getValue("+", "opr")}>
                        +
                    </button>
                    <button
                        type="button"
                        onClick={() => getValue("+/-", "pow")}
                    >
                        +/-
                    </button>
                    <button type="button" onClick={() => getValue("0", "num")}>
                        0
                    </button>
                    <button type="button" onClick={() => getValue(".", "pow")}>
                        .
                    </button>
                    <button type="button" onClick={() => getValue("=", "opr")}>
                        =
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Buttons;
