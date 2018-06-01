var whois = require('whois');

exports.whois = function whois(req, res){
  var url;
  if(req.body.site){
    url = parseUrl(req.body.site);
  }else if(req.query && req.query.site){
    url = parseUrl(req.query.site);
  }else{
    return res.status( 420 ).send( 'Missing required \'site\' parameter.' );
  }
  
  whois.lookup(url, function(err, data) {
    if(err){
      return res.status( 500 ).send( 'Something went wrong on our end.' );
    }else{
      return res.status( 200 ).send( data );
    }
  });
}
