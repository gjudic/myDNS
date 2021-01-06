require('dotenv').config();
const publicIp = require('public-ip');
var domains = (JSON.parse(process.env.DOMAINS));
var ovh = require('ovh')({
    endpoint: 'ovh-eu',
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    consumerKey: process.env.CONSUMER_KEY
  });

  (async () => {
    var myip = (await publicIp.v4());

    domains.forEach(element => {
        ovh.request('PUT', '/domain/zone/' + element.domain + '/record/' + element.id, {
            target : myip
        }, function (err, result) {
            console.log(err || result);
            console.log("Le domaine " + element.domain + " a ete match avec l'IP " + myip);
          });
        ovh.request('POST', '/domain/zone/' + element.domain + '/refresh', function (err, result) {
            console.log(err || result);
          });
    });
})();