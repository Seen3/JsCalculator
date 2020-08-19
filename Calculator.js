function calcStuff(str,operation)
{
    let num="";
    let num1="";
    let num2="";
    let pos=str.indexOf(operation)
    let i=pos-1;
    let Pos=pos;
    while(i>=0&&(Number.isInteger(parseInt(str[i])))||str[i]==`.`)
    {
        num=str[i]+num;
        i--;
        Pos--;
    }
    i=pos+1;
    num1=num;
    if(operation=='+')
    {
        if(Pos-1>0&&str[Pos-1]=='-')
        {
            num1=`-${num1}`;
        }
    }
    num="";
    while((Number.isInteger(parseInt(str[i]))||str[i]=='.')&&i<str.length)
    {
        num=num+str[i];
        i++;
    }
    num2=num;
    let exp=`${num1}${operation}${num2}`;
    num1=parseFloat(num1);
    num2=parseFloat(num2);
    let loc=str.indexOf(exp);
    let locationEnd=loc+exp.length;
    if (operation=='+')
    {
        if (num1<0)
        {
            str=`${str.slice(0,loc)}+${num1+num2}${str.slice(locationEnd)}`
        }
        else{
            str=`${str.slice(0,loc)}${num1+num2}${str.slice(locationEnd)}`;
        }
    }
    else if (operation=='-')
    {
        str=`${str.slice(0,loc)}${num1-num2}${str.slice(locationEnd)}`;
    }
    else if(operation=='*')
    {
        str=`${str.slice(0,loc)}${num1*num2}${str.slice(locationEnd)}`;
    }
    else if(operation=='/')
    {
        str=`${str.slice(0,loc)}${num1/num2}${str.slice(locationEnd)}`;
    }
    return str;
}
function calculator(str)
{ 
    if (str.indexOf('+-')!=-1)
    {
        str=`${str.slice(0,str.indexOf('+-'))}-${str.slice(str.indexOf('+-')+2)}`;
    }
    let div=str.indexOf('/');
    if (div==-1)
    {
        let mult=str.indexOf('*');
        if (mult==-1)
        {
            let add=str.indexOf('+');
            if (add==-1)
            {
                let sub=str.indexOf('-');
                if (sub==-1)
                {
                    return str;
                }
                else{
                    if(str[0]=='-'&&str.indexOf('+')==-1&&str.indexOf('*')==-1&&str.indexOf('/')==-1)
                    {
                        return str;
                    }
                    str=calcStuff(str,'-');
                    return calculator(str);
                }            }
            else
            {                str=calcStuff(str,'+');
                return calculator(str);
            }
        }
        else
        {
            str=calcStuff(str,'*');
            return calculator(str);
        }
    }
    else
    {
        str=calcStuff(str,'/');
        return calculator(str);
    }
}function test_calculator()
{
    if(calculator('2+3-2')!=eval('2+3-2'))
    {
        prompt('2+3-2 failed');
        return false;
    }
    if(calculator('2*30-10/2')!=eval('2*30-10/2'))
    {
        prompt('2*30-10/2 failed');
        return false;
    }
    if (calculator('1000-50*10/2')!=eval('1000-50*10/2'))
    {
        prompt('2*30-10/2 failed');
        return false;
    }
    return true;
}
