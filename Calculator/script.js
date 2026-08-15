const expressionBox = document.getElementById("expression");
const resultBox = document.getElementById("result");

const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");

const angleBtn = document.getElementById("angleBtn");
const sciBtn = document.getElementById("sciBtn");
const scientificKeys = document.getElementById("scientificKeys");

let expression = "";
let degreeMode = true;
let scientificMode = true;


/* =========================
   DISPLAY
========================= */

function updateDisplay() {

    expressionBox.textContent =
        expression || "0";

}


/* =========================
   ADD VALUE
========================= */

function appendValue(value) {

    expression += value;

    updateDisplay();

    previewResult();
}


/* =========================
   FUNCTIONS
========================= */

function appendFunction(name) {

    expression += name + "(";

    updateDisplay();
}


/* =========================
   DELETE
========================= */

function deleteLast() {

    const functions = [
        "sqrt(",
        "sin(",
        "cos(",
        "tan(",
        "log(",
        "ln("
    ];

    let removed = false;

    for (let fn of functions) {

        if (expression.endsWith(fn)) {

            expression =
                expression.slice(
                    0,
                    -fn.length
                );

            removed = true;

            break;
        }
    }

    if (!removed) {

        expression =
            expression.slice(0, -1);
    }

    updateDisplay();

    previewResult();
}


/* =========================
   CLEAR
========================= */

function clearAll() {

    expression = "";

    expressionBox.textContent = "0";
    resultBox.textContent = "0";
}


/* =========================
   ANGLE MODE
========================= */

angleBtn.addEventListener("click", () => {

    degreeMode = !degreeMode;

    angleBtn.textContent =
        degreeMode ? "DEG" : "RAD";

    document.getElementById("modeText").textContent =
        degreeMode ? "DEG" : "RAD";

});


/* =========================
   SCIENTIFIC MODE
========================= */

sciBtn.addEventListener("click", () => {

    scientificMode = !scientificMode;

    scientificKeys.style.display =
        scientificMode ? "grid" : "none";

    sciBtn.classList.toggle(
        "active",
        scientificMode
    );

});


/* =========================
   SQUARE
========================= */

function squareValue() {

    if (!expression) return;

    expression += "**2";

    updateDisplay();

    previewResult();
}


/* =========================
   FACTORIAL
========================= */

function factorial() {

    try {

        const value =
            Number(evaluateExpression(expression));

        if (
            !Number.isInteger(value) ||
            value < 0 ||
            value > 170
        ) {
            resultBox.textContent = "Error";
            return;
        }

        let answer = 1;

        for (let i = 2; i <= value; i++) {
            answer *= i;
        }

        expression = String(answer);

        updateDisplay();

        resultBox.textContent = answer;

    } catch {

        resultBox.textContent = "Error";
    }
}


/* =========================
   EVALUATE EXPRESSION
========================= */

function evaluateExpression(input) {

    let exp = input;

    exp = exp
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("π", "Math.PI")
        .replace(/\be\b/g, "Math.E")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(");

    /*
       Convert sin/cos/tan according
       to DEG/RAD mode
    */

    if (degreeMode) {

        exp = exp.replace(
            /sin\(/g,
            "Math.sin(Math.PI/180*"
        );

        exp = exp.replace(
            /cos\(/g,
            "Math.cos(Math.PI/180*"
        );

        exp = exp.replace(
            /tan\(/g,
            "Math.tan(Math.PI/180*"
        );

    } else {

        exp = exp.replace(
            /sin\(/g,
            "Math.sin("
        );

        exp = exp.replace(
            /cos\(/g,
            "Math.cos("
        );

        exp = exp.replace(
            /tan\(/g,
            "Math.tan("
        );
    }


    /*
       Basic security validation.
       Only calculator characters are allowed.
    */

    if (
        !/^[0-9+\-*/%().,\s*MathPIE]+$/.test(
            exp
        )
    ) {
        throw new Error("Invalid expression");
    }

    return Function(
        '"use strict"; return (' +
        exp +
        ')'
    )();
}


/* =========================
   CALCULATE
========================= */

function calculate() {

    if (!expression) return;

    try {

        const answer =
            evaluateExpression(expression);

        if (
            typeof answer !== "number" ||
            !Number.isFinite(answer)
        ) {
            throw new Error();
        }

        const formatted =
            Number.isInteger(answer)
                ? answer
                : Number(
                    answer.toFixed(10)
                );

        resultBox.textContent =
            formatted;

        saveHistory(
            expression,
            formatted
        );

    } catch {

        resultBox.textContent =
            "Error";
    }
}


/* =========================
   LIVE PREVIEW
========================= */

function previewResult() {

    if (!expression) {

        resultBox.textContent = "0";

        return;
    }

    try {

        const answer =
            evaluateExpression(expression);

        if (
            typeof answer === "number" &&
            Number.isFinite(answer)
        ) {

            resultBox.textContent =
                Number(
                    answer.toFixed(10)
                );
        }

    } catch {

        // Ignore incomplete expressions
    }
}


/* =========================
   HISTORY
========================= */

function saveHistory(exp, answer) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "calculatorHistory"
            )
        ) || [];

    history.unshift({
        expression: exp,
        result: answer
    });

    history =
        history.slice(0, 20);

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );

    renderHistory();
}


function renderHistory() {

    let history =
        JSON.parse(
            localStorage.getItem(
                "calculatorHistory"
            )
        ) || [];

    if (history.length === 0) {

        historyList.innerHTML =
            `<p class="empty-history">
                No calculations yet
             </p>`;

        return;
    }


    historyList.innerHTML =
        history.map(
            item => `
            <div class="history-item"
                 onclick="useHistory('${item.expression.replace(/'/g, "\\'")}')">

                <div class="old-expression">
                    ${item.expression}
                </div>

                <div class="old-result">
                    = ${item.result}
                </div>

            </div>
            `
        ).join("");
}


function useHistory(value) {

    expression = value;

    updateDisplay();

    previewResult();

    historyPanel.classList.remove(
        "open"
    );
}


document
    .getElementById("clearHistory")
    .addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "calculatorHistory"
            );

            renderHistory();
        }
    );


/* =========================
   HISTORY PANEL
========================= */

document
    .getElementById("historyBtn")
    .addEventListener(
        "click",
        () => {

            historyPanel.classList.add(
                "open"
            );

            renderHistory();
        }
    );


document
    .getElementById("closeHistory")
    .addEventListener(
        "click",
        () => {

            historyPanel.classList.remove(
                "open"
            );
        }
    );


/* =========================
   THEME
========================= */

document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );

            const light =
                document.body.classList.contains(
                    "light"
                );

            document.getElementById(
                "themeBtn"
            ).textContent =
                light ? "🌙" : "☀️";
        }
    );


/* =========================
   COPY RESULT
========================= */

document
    .getElementById("copyBtn")
    .addEventListener(
        "click",
        async () => {

            const value =
                resultBox.textContent;

            if (value === "0") return;

            try {

                await navigator.clipboard.writeText(
                    value
                );

                document.getElementById(
                    "copyBtn"
                ).textContent = "✅";

                setTimeout(() => {

                    document.getElementById(
                        "copyBtn"
                    ).textContent = "📋";

                }, 1200);

            } catch {
                alert("Copy failed");
            }
        }
    );


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        const key = event.key;

        if (
            "0123456789+-*/().%"
                .includes(key)
        ) {

            appendValue(
                key === "*" ? "×" :
                key === "/" ? "÷" :
                key
            );
        }

        else if (key === "Enter") {
            calculate();
        }

        else if (key === "Backspace") {
            deleteLast();
        }

        else if (key === "Escape") {
            clearAll();
        }

        else if (key === "p" || key === "P") {
            appendValue("π");
        }

    }
);


/* INITIAL */

renderHistory();
updateDisplay();