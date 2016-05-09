var peer, conn;

(function() {

  // peer connecting

  peer = new Peer('starsandcrafts-client', {key: 'wapghotvz0s2x1or'});

  conn = peer.connect('starsandcrafts-server');
  console.log('Peer created: ', peer)

  conn.on('open', function(){

    $('.command').on('mousedown', function() {
      console.log($(this).attr('data-command'));
      conn.send($(this).attr('data-command'));
    });

    $(document).on('keydown', function(e) {
      console.log(e.which)
      if ( e.which == 38 ) conn.send('up')
      if ( e.which == 40 ) conn.send('down')
      if ( e.which == 37 ) conn.send('left')
      if ( e.which == 39 ) conn.send('right')
      if ( e.which == 81 ) conn.send('tiltleft')
      if ( e.which == 69 ) conn.send('tiltright')
    });

  });

})();
