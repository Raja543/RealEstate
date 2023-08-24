const app = require("express")();
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "RAZORPAY_KEY_ID ",
  key_secret: "RAZORPAY_KEY_SECRET",
});

app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

app.post("/verification", (req, res) => {
  // do a validation
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

app.post("/razorpay", async (req, res) => {
	try {
	  const property = req.body.property; // Get the property object from the request body
  
	  // Extract necessary details from the property object
	  const price = property.price; // Modify this according to your property object structure
	  // Other details like property name, description, etc.
  
	  // You can add any other required logic here, e.g., validation, etc.
  
	  const payment_capture = 1;
	  const currency = "INR";
  
	  const options = {
		amount: price * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture,
	  };
  
	  // Create the Razorpay order
	  const response = await razorpay.orders.create(options);
	  console.log("Razorpay response:", response);
  
	  res.json({
		id: response.id,
		currency: response.currency,
		amount: response.amount,
	  });
	} catch (error) {
	  console.error("Error handling payment:", error);
	  res.status(500).json({ error: "An error occurred while processing payment" });
	}
  });
  

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
