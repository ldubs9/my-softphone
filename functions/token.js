const Twilio = require('twilio');

exports.handler = async function(event, context) {
  // New SDK requires "Access Token"
  const AccessToken = Twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  // 1. Get keys (Note: We need API_KEY and API_SECRET now)
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKey = process.env.TWILIO_API_KEY;
  const apiSecret = process.env.TWILIO_API_SECRET;
  const appSid = process.env.TWILIO_APP_SID;

  // 2. Create the grant to allow outgoing calls
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: appSid,
    incomingAllow: true, // Allows receiving calls
  });

  // 3. Create the token
  const token = new AccessToken(accountSid, apiKey, apiSecret, { identity: 'user' });
  token.addGrant(voiceGrant);

  // 4. Return the token
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ token: token.toJwt() }),
  };
};
