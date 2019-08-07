// import * as Sentry from "@sentry/browser";

function init() {
  /* Sentry.init({
    dsn: "https://e3c78d1613f64b91bf76ff6a9710888e@sentry.io/1496672"
  }); */
}

function log(error) {
  console.error(error);
}

export default {
  init,
  log
};
