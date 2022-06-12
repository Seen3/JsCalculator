function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}
function div(a, b) {
    if (b == 0) {
        alert("Divide by zero not possible");
        return a;
    }
    else {
        b = parseFloat(b);
        return a / b;
    }
}
function operate(a, b, op) {
    let ans = 0;
    a = Number(a);
    b = Number(b);
    switch (op) {
        case '+':
            ans = add(a, b);
            break;
        case '-':
            ans = sub(a, b);
            break;
        case 'x':
            ans = mul(a, b);
            break;
        case '÷':
            ans = div(a, b);
            ans = ans;
            break;
        default:
            ans = 0;
    }
    console.log(a, b, op, ans);
    if (String(ans).includes('.'))
        return ans.toFixed(2);
    return ans;
}
let data = document.getElementById('data');
let equation = document.getElementById('equation');
let value = data.innerText;
let body = document.getElementById('body');
const pattern = /[0-9]/;
const operators = /^[+|\-|x|÷]$/;
let pressed1 = false;
let pressed2 = false;
let float = false;
let state = "no1";
let operator = null;
body.addEventListener('click', (event) => {
    value = data.innerText;
    if (event.target.nodeName === 'BUTTON') {
        let pressedButton = event.target.innerText;
        switch (state) {
            case "no1":
                if (pattern.test(pressedButton)) {
                    if (value == '0') {
                        data.innerText = pressedButton;
                    }
                    else {
                        data.innerText += pressedButton;
                    }
                }
                else if (pressedButton == '←') {
                    data.innerText = String(parseInt(parseInt(data.innerText) / 10));
                }
                else if (pressedButton == 'Clear') {
                    data.innerText = '0';
                    equation.innerText = '0';
                }
                else if (operators.test(pressedButton)) {
                    equation.innerText = data.innerText + pressedButton;
                    data.innerText = pressedButton;
                    state = "op";
                }
                break;
            case 'op':
                {
                    if (operators.test(pressedButton)) {
                        equation.innerText = equation.innerText.slice(0, -1) + pressedButton;
                        data.innerText = pressedButton;
                    }
                    else if (pattern.test(pressedButton)) {
                        data.innerText = pressedButton;
                        state = 'no2';
                    }
                    else if (pressedButton == 'Clear') {
                        data.innerText = '0';
                        equation.innerText = '0';
                        state='no1';
                    }
                    else if (pressedButton == '←') {
                        //to be implemented
                        data.innerText = equation.innerText.slice(0, -1);
                        equation.innerText=equation.innerText.slice(0,-1);
                        state='no1';
                    }
                    
                }
                break;
            case 'no2':
                {
                    if (pattern.test(pressedButton)) {
                        if (data.innerText=='0') {
                            data.innerText = pressedButton;
                        }
                        else {
                            data.innerText += pressedButton;
                        }
                    }
                    else if (pressedButton == '←') {
                        data.innerText = String(parseInt(parseInt(data.innerText) / 10));
                    }
                    else if (pressedButton == 'Clear') {
                        data.innerText = '0';
                        equation.innerText = '0';
                        state='no1';
                    }
                    else if(pressedButton=='=')
                    {
                        equation.innerText+=data.innerText;
                        let eq=equation.innerText;
                        console.log("Before",eq);
                        eq=eq.replace('x','*');
                        
                        eq=eq.replace('÷','/');
                        console.log("After:",eq);
                        data.innerText=String(eval(eq));
                        state='no1';
                    }
                    else if(operators.test(pressedButton))
                    {

                        equation.innerText = equation.innerText+data.innerText+ pressedButton;
                        data.innerText = pressedButton;
                        state='op';
                    }
                }
        }
    }
});
