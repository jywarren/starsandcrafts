StarsAndCrafts = SC = {};
module.exports = SC;

var Peer          = require('peerjs'),
    Class         = require('resig-class'),
    Keyboard      = require('keyboard-cjs');

$ = require('jquery');

SC.Client = Class.extend({

  init: function(callback, options) {

    var _client = this;

    _client.options = options || {};
    _client.options.role = _client.options.role || ""; // usually "helm" 

    // https://www.npmjs.com/package/keyboard-cjs
    _client.keyboard = new Keyboard(window);

 
    var getUrlHashParameter = function(sParam) {
 
      var sPageURL = window.location.hash;
      if (sPageURL) sPageURL = sPageURL.split('#')[1];
      var sURLVariables = sPageURL.split('&');
  
      for (var i = 0; i < sURLVariables.length; i++) {
  
        var sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] == sParam) {
          return sParameterName[1];
        }
  
      }
 
    }
 
 
    // peer connecting
    _client.connect = function() {
  
      _client.key = getUrlHashParameter('key');
 
      $('.alert').html('Connecting to server ' + _client.key);
      $('.alert').addClass('alert-warning');
      $('.alert').removeClass('alert-success');
  
      _client.peer = new Peer(_client.key + "-" + _client.options.role, {key: 'wapghotvz0s2x1or'});
  
      _client.connection = _client.peer.connect(_client.key + "-server-" + _client.options.role);
      console.log('Peer created: ', _client.peer);
  
      _client.connection.on('open', function() {
  
        $('.alert').html('Connected to server ' + _client.key);
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('alert-warning');

        // should try to make some of above private
        if (callback) callback(_client.connection, _client.keyboard);

      });
 
    }
 
    _client.connect();

  }

});
