
const envType = "prod"
export const reservationApi = envType === "prod" ? process.env.REACT_APP_PROD_ENDPOINT : process.env.REACT_APP_DEV_ENDPOINT;

