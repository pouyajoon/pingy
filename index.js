(function() {
  'use strict';

  console.log('-----------------------');
  console.log('hello welcome to pingy.', new Date());

  function getSiteContent(src) {
    var http = require('http');
    // console.info('get', src);
    return http.get({
      host: src,
      path: '/'
    }, function(response) {
      // Continuously update stream with data
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        console.info('get ', src, 'ends', body.length);
      });
    });
  }

  function getSite(src) {
    setTimeout(function() {
      getSiteContent(src);
    }, 0);
  }

  var later = require('later'),
    cron;
  cron = later.parse.cron('00,15,30,45 08-21 * * * *');

  // function to execute
  function logTime() {
    console.log(new Date());
  }

  function getSites() {
    logTime();
    var i, sites;
    sites = ['www.kaarchi.fr', 'demo.surfy.pro', 'mdm.surfy.pro', 'www.surfy.pro'];
    for (i = 0; i < sites.length; i += 1) {
      getSite(sites[i]);
    }
  }

  // execute logTime for each successive occurrence of the text schedule
  later.setInterval(getSites, cron);


}());
