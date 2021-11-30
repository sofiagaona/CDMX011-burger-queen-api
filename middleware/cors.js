const allowlist = ['http://example1.com', 'http://example2.com'];
module.exports = ((req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.headers.host) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
});
