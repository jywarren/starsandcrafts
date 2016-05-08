var peer, conn;

(function() {

  // peer connecting

  peer = new Peer('starsandcrafts-client', {key: 'wapghotvz0s2x1or'});

  conn = peer.connect('starsandcrafts-server');
  console.log('Peer created: ', peer)

  conn.on('open', function(){

    $('.command').click(function() {
      console.log($(this).attr('data-command'));
      conn.send($(this).attr('data-command'));
    });

  });

})();
