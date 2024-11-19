function verifyPayment(paymentDetails, callback) {
  setTimeout(() => {
    if (paymentDetails.amount <= 0) {
      console.log("Payment failed: Invalid amount.");
      return callback(new Error("Payment verification failed"));
    }
    console.log(
      `Payment of ${paymentDetails.amount} verified using ${paymentDetails.method}`
    );
    callback();
  }, 1000);
}

function checkInventory(orderItems, callback) {
  setTimeout(() => {
    const inStock = orderItems.every((item) => item !== "Out of Stock Item");
    if (!inStock) {
      console.log("Inventory check failed: Some items are out of stock.");
      return callback(new Error("Inventory check failed"));
    }
    console.log("All items in stock");
    callback();
  }, 1000);
}

function arrangeShipping(shippingDetails, callback) {
  setTimeout(() => {
    if (!shippingDetails.address) {
      console.log("Shipping failed: No address provided.");
      return callback(new Error("Shipping arrangement failed"));
    }
    console.log(`Shipping arranged to ${shippingDetails.address}`);
    callback();
  }, 1000);
}

function sendConfirmationEmail(customerEmail, callback) {
  setTimeout(() => {
    if (!customerEmail) {
      console.log("Email sending failed: No email address provided.");
      return callback(new Error("Email sending failed"));
    }
    console.log(`Confirmation email sent to ${customerEmail}`);
    callback();
  }, 1000);
}

// Callback hell scenario
const paymentDetails = { amount: 100, method: "Credit Card" };
const orderItems = ["Item1", "Item2", "Item3"];
const shippingDetails = { address: "123 Main St" };
const customerEmail = "customer@example.com";

verifyPayment(paymentDetails, (err) => {
  if (err) return console.error(err.message);

  checkInventory(orderItems, (err) => {
    if (err) return console.error(err.message);

    arrangeShipping(shippingDetails, (err) => {
      if (err) return console.error(err.message);

      sendConfirmationEmail(customerEmail, (err) => {
        if (err) return console.error(err.message);

        console.log("Order process complete!");
      });
    });
  });
});
