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


      data_received = ovh.request('GET', '/domain/zone/' + element.domain + '/record/' + element.id, function (error, dom) {
        if(dom.target == myip)
        {
          console.log("[//] Le domaine " + element.domain + " est déja associé à l'IP " + myip);
        }
        else
        {
          ovh.request('PUT', '/domain/zone/' + element.domain + '/record/' + element.id, {
            target : myip
        }, function (err, result) {
            if(err == null || result == null)
            {
              console.log("[++] Le domaine " + element.domain + " a ete associe a l'IP " + myip);
              ovh.request('POST', '/domain/zone/' + element.domain + '/refresh', function (err, result) {
                if(err == null || result == null)
                {
                  console.log("[++] Le domaine " + element.domain + " a ete refresh");
                }
                else
                {
                  console.log(err || result);
                }
              });
            }
            else
            {
              console.log(err || result);
            }
          });
        }
      });
    });
})();