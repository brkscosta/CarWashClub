const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "32f07b0d",
  apiSecret: "vH9SFKhg0eB016Mv",
});

const from = "CarWashApp";
const to = "351960313828";
const text = "Hello from CarWashApp";

nexmo.message.sendSms(from, to, text);
