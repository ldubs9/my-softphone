const Twilio = require('twilio');

exports.handler = async function(event, context) {
  // 1. Get keys from Netlify Environment Variables
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const appSid = process.env.TWILIO_APP_SID; // The 'AP...' ID

  // 2. Create the capability token
  const ClientCapability = Twilio.jwt.ClientCapability;
  const capability = new ClientCapability({
    accountSid: accountSid,
    authToken: authToken,
  });

  // 3. Allow the browser to make outgoing calls using your TwiML App
  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: appSid
    })
  );

  // 4. Return the token to the browser
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" }, // Allow browser access
    body: JSON.stringify({ token: capability.toJwt() }),
  };
};