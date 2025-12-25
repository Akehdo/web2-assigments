const axios = require("axios");
const crypto = require("crypto");

const BINGX_BASE_URL = "https://open-api.bingx.com";
const ENDPOINT = "/openApi/agent/v1/account/inviteAccountList";

function sign(params, secretKey) {
  const query = new URLSearchParams(params).toString();
  return crypto.createHmac("sha256", secretKey).update(query).digest("hex");
}

async function getDirectReferrals() {
  const apiKey = process.env.BINGX_API_KEY;
  const secretKey = process.env.BINGX_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error("API Key and Secret Key are required");
  }

  const params = {
    pageIndex: 1,
    pageSize: 200,
    timestamp: Date.now(),
  };

  const signature = sign(params, secretKey);

  const response = await axios.get(`${BINGX_BASE_URL}${ENDPOINT}`, {
    headers: {
      "X-BX-APIKEY": apiKey,
    },
    params: {
      ...params,
      signature,
    },
  });

  return response.data.data.list
    .filter((item) => item.directInvitation)
    .map((item) => ({
      uid: item.uid,
      email: item.email,
    }));
}

module.exports = {
  getDirectReferrals,
};
