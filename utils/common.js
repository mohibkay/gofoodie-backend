require("dotenv").config();
const { CURRENCY } = require("./constants");

const getCartTotal = (cart) => {
  return cart
    .reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0)
    .toFixed(2);
};

exports.getShippingAddress = ({
  first_name,
  last_name,
  email,
  street,
  city,
  state,
  pincode,
}) => {
  return `
    <span>${first_name} ${last_name},</span>
    <span>${street}, ${city}, ${state} - ${pincode}</span>
    <span>Email: ${email}</span>
  `;
};

const getToppings = (toppings, category) => {
  let toppingsList = "";
  if (category === "pizza") {
    if (toppings.length > 0) {
      toppingsList += `
        <p>
          <span style="font-weight: 500">Toppings:</span>&nbsp;${toppings.join(
            ", "
          )}
        </p>`;
    } else {
      toppingsList += `
        <p>
          <span style="font-weight: 500">Toppings:</span> Not selected
        </p>`;
    }
  } else {
    toppingsList += `<p></p>`;
  }

  return toppingsList;
};

const getFormattedToppings = (toppings) => {
  return toppings.map((topping) => topping.split("_").join(" "));
};

exports.getHTMLText = (name, cart, order_id, address) => {
  let htmlText = `
    <div>
      <p>Hello, ${name}</p>
      <p>Thanks for placing an order with us.</p>
      <p>Your order number is: ${order_id}</p>
      <p>Please check out the details of your order below.</p>
    </div>
  `;

  htmlText += '<ul style="width: 50%; font-size:0.9rem; margin:0; padding:0;">';

  cart.forEach(({ title, quantity, image, price, toppings, category }) => {
    const formattedToppings = getFormattedToppings(toppings);

    htmlText += `
      <li  style="display: flex; border-bottom: 1px solid #d0cbcb; padding-top: 0.5rem;">
        <div>
          <img src=${image} alt=${title} class="cart-img" style="width: 60px;height: 60px;border-radius: 10px;object-fit: cover;"/>
        </div>
        <div style="width: 250px; padding: 0 1rem; flex-grow: 1 !important;">
          <h6 style="font-size: 1rem;padding:0;margin: 0;">${title}</h6>
          ${getToppings(formattedToppings, category)}
        </div>
        <div class="amount">
          ${quantity} x ${CURRENCY} ${price}
        </div>
      </li>
    `;
  });

  htmlText += `
    <div style="display: flex;padding-top: 1rem;justify-content: space-between;border-top: 1px solid #000;margin-bottom: 1rem;font-weight: 600;letter-spacing: 1px;font-size: 1rem";>
      <div style="margin-right: 2rem;">Total amount</div>
      <div>${CURRENCY} ${getCartTotal(cart)}</div>
    </div>
  `;

  htmlText += `
  </ul>
  <div>
    <p>Your order will be delivered within two days to the shipping address mentioned below.</p>
    <pre><address>${address}</address></pre>
  </div>
  <div style="margin-top: 2rem; font-weight:bold;">We'll be happy to serve you again.</div>
  <div style="margin-top: 1rem">
    <div>Thanks,</div>
    <div>Food Market</div>
  </div>
  `;

  return htmlText;
};
