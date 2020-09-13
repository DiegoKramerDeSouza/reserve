
const envType = "prod";
const path="api/reservation/";
const dev="http://localhost:8080/api/reservation/";
const prod="https://iasd-reservation.azurewebsites.net/api/reservation/";

export const reservationApi = envType === "prod" ? prod : dev;

