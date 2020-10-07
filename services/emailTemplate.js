// use join() to get rid of commas after each li - https://stackoverflow.com/questions/45812160/unexpected-comma-using-map

module.exports = (shoppingList) => {
  return `
        <html>
       
        <body>
            <div style="text-align: center;">
                <h3>Here is your shopping list!</h3>
                <ul style="list-style: none">${shoppingList.map(
                  ({ amount, name, unit, original }) =>
                    `<li style="display: flex; margin: 0 auto; padding: 1px;  list-style: none;">
                    <p style="font-weight: 600">${amount} &nbsp </p>
                    <p style="font-weight: 500; font-style: italic;">
                      <span>${unit} </span>
                      ${name}
                    </p>
                  </li>`
                ).join(" ")}</ul>
              <p style="font-weight: 700">Thank you!</p>
            </div>
        </body>
        </html>
    `;
};
