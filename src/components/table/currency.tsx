type typeCurrency = {
  [key: string]: JSX.Element;
};

const currency: typeCurrency = {
  rupee: <span>&#8377;</span>,
  dollar: <span>&#36;</span>,
  pound: <span>&#163;</span>,
  yen: <span>&#165;</span>,
  euro: <span>&#8364;</span>,
};

export const amountFormatter = (amount: string, valueType: string) => {
  let newamount = amount.toString();
  let length = newamount.length;
  type typenewstr = JSX.Element | string;

  let newstr: typenewstr = "";

  if (length <= 3) {
    newstr += newamount;
  } else {
    let j = 0;
    newamount
      .split("")
      .reverse()
      .forEach((item: string) => {
        if (j === 3) {
          newstr = newstr + "," + item;
        } else if (j % 2 !== 0 && j > 3) {
          newstr = newstr + "," + item;
        } else {
          newstr += item;
        }

        j++;
      });
    newstr = newstr.split("").reverse().join("");
  }

  newstr = (
    <p>
      {valueType !== null && valueType !== undefined && valueType !== ""
        ? currency[valueType.trim().toLowerCase()]
        : currency.rupee}
      {newstr}
    </p>
  );

  return newstr;
};
