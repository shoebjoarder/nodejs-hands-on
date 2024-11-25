function verifyPayment(paymentDetails) {
  // * Update the function using Promises
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (paymentDetails.amount <= 0) {
        console.log("Payment failed: Invalid amount.");
        reject(new Error("Payment verification failed"));
      } else {
        console.log(
          `Payment of ${paymentDetails.amount} 
            verified using ${paymentDetails.method}`
        );
        resolve();
      }
    }, 1000);
  });
}

function checkInventory(orderItems) {
  // * Update the function using Promises
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const inStock = orderItems.every((item) => {
        item !== "Out of Stock Item";
      });
      if (!inStock) {
        console.log(`Inventory check failed: 
            Some items are out of stock.`);
        reject(
          new Error("Inventory check failed")
        );
      } else {
        console.log("All items in stock");
        resolve();
      }
    }, 1000);
  });
}

function arrangeShipping(shippingDetails) {
  // * Update the function using Promises
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!shippingDetails.address) {
        console.log(`Shipping failed: 
          No address provided.`);
        reject(
          new Error("Shipping arrangement failed")
        );
      } else {
        console.log(`Shipping arranged to 
          ${shippingDetails.address}`);
        resolve();
      }
    }, 1000);
  });
}

function sendConfirmationEmail(customerEmail) {
  // * Update the function using Promises
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!customerEmail) {
        console.log(`Email sending failed: 
          No email address provided.`);
        reject(
          new Error("Email sending failed")
        );
      } else {
        console.log(`Confirmation email sent 
          to ${customerEmail}`);
        resolve();
      }
    }, 1000);
  });
}

const paymentDetails = { amount: 100, method: "Credit Card" };
const orderItems = ["Item1", "Item2", "Item3"];
const shippingDetails = { address: "123 Main St" };
const customerEmail = "customer@example.com";

// * Update the function using .then() 
// * to chain the asynchronous operations
verifyPayment(paymentDetails)
  .then(() => checkInventory(orderItems))
  .then(() => arrangeShipping(shippingDetails))
  .then(() => sendConfirmationEmail(customerEmail))
  .then(() => {
    console.log("Order process complete!");
  })
  .catch((err) => {
    console.error(err.message);
  });
