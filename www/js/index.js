var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    this.loadPhotos();
  },

  loadPhotos: function() {

    var gallery = $('#gallery');

    cordova.plugins.photoLibrary.getLibrary(
      function (result) {
        var library = result.library;
        // Here we have the library as array

        library.forEach(function (libraryItem) {

          var image = $('<img>', { width: '100%', src: libraryItem.thumbnailURL, style: 'margin: 5px' });
          image.appendTo(gallery);

        });

      },
      function (err) {
        console.log('Error occured');
      }
    );

  }
};

app.initialize();
