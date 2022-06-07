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
    if (b==0)
    {
        alert("Divide by zero not possible");
        return a;
    }
    else{
    b=parseFloat(b);
    return a / b;
    }
}
function operate(a, b, op) {
    let ans = 0;
    a=Number(a);
    b=Number(b);
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
            ans=ans;
            break;
        default:
            ans=0;
    }
    console.log(a,b,op,ans);
    if (String(ans).includes('.'))
        return ans.toFixed(2);
    return ans;
}
let data=document.getElementById('data');
let value=data.innerText;
let body=document.getElementById('body');
const pattern=/[0-9]/;
const operators=/^[+|\-|x|÷]$/;
let pressed1=false;
let pressed2=false;
let float=false;
let operator=null;
body.addEventListener('click',(event)=>{
    if(event.target.nodeName==='BUTTON')
        {
            if (data.innerText.includes('.'))
            {
                float=true;
            }
            else{
                float=false;
            }
            let pressed=event.target.innerText;
            if (pressed=='Clear')
            {
                data.innerText=0;
                pressed1=false;
                pressed2=false;
            }
            else if(pressed=='←')
            {
                let currentData=parseFloat(data.innerText);
                if(String(currentData).includes('.'))
                {
                    currentData=String(currentData);
                    if(currentData[currentData.length-2]=='.')
                    {
                        currentData=parseInt(currentData);
                    }
                    else{
                    currentData=currentData.slice(0,-1);
                    }
                    data.innerText=currentData;
                }
                else if(Math.abs(currentData)>10)
                {
                    currentData=parseInt(currentData/10);
                    data.innerText=currentData;
                }
                else if(Math.abs(currentData)<10)
                {
                    currentData=0;
                    data.innerText=currentData;
                    pressed1=false;
                }
            }
            else if (pattern.test(pressed))
            {
                if (!pressed1){
                    data.innerText=pressed;
                    pressed1=true;
                }
                else if(pressed2)
                {
                    data.innerText=operate(data.innerText,pressed,operator);
                    pressed1=true;
                    pressed2=false;
                }
                else{
                    data.innerText+=pressed;
                }
            }
            else if(operators.test(pressed))
            {
                if(pressed1)
                {
                    pressed2=true;
                    operator=pressed;
                }
            }
            else if(pressed=='.')
            {
                if (!float)
                {
                    float=true;
                    data.innerText+='.';
                }
            }


        }
});