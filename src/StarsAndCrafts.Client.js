StarsAndCrafts = SC = {};
module.exports = SC;

var Peer          = require('peerjs'),
    Class         = require('resig-class'),
    Keyboard      = require('keyboard-cjs');

$ = require('jquery');

SC.Client = Class.extend({

  init: function(role, options) {

    var _client = this;

    _client.options = options || {};
    _client.options.role = role || ""; // i.e. "helm" 

    _client.listeners = {};

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


    _client.onKey = function(keys, command) {

      _client.keyboard.on(keys, function(e) { _client.send(command) });

    }


    _client.onClick = function(selector, command) {

      $(selector).on('click', function() {
        _client.send(command);
      });

    }


    // send command to the server
    _client.send = function(command) {

      _client.connection.send(_client.options.role + ':' + command);

    }


    // listen for <namespace> from _client.listeners commands from the server
    _client.listen = function(namespace, handler) {

      _client.listeners[namespace] = handler;

    }


    // receive message from server and pass it to any registered listeners
    _client.receive = function(data) {

      var namespace = data.split(':')[0],
          attribute = data.split(':')[1];

      if (_client.listeners[namespace]) _client.listeners[namespace](attribute);

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
        if (_client.options.callback) _client.options.callback(_client.connection, _client.onKey);

      });

      _client.connection.on('close', function() {
 
        console.log('connection closed');
 
        $('.alert').html('Disconnected from server ' + _client.key);
        $('.alert').removeClass('alert-success');
        $('.alert').addClass('alert-warning');
 
        // _interface.peer.reconnect();
 
      });

      _client.peer.on('close', function() {

        console.log('peer disconnected');
  
        $('.alert').html('Disconnected from server ' + _client.key);
        $('.alert').removeClass('alert-success');
        $('.alert').addClass('alert-warning');

      });

      _client.connection.on('data', function(data) {

        console.log('received', data);

        _client.receive(data);

      });
 
    }
 
    _client.connect();

  }

});
