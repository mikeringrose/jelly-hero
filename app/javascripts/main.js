requirejs.config({
  baseUrl: '.',
  paths: {
    app: 'app/javascripts'
  },
  shim: {
    'libs/underscore': {
      exports: '_'
    },
    'libs/jquery': {
      exports: '$'
    },
    'libs/processing': {
      exports: 'Processing'
    }
  }
});

require(['app/app'], function(App) {
  window.app = new App(document.getElementById("mycanvas"));
});