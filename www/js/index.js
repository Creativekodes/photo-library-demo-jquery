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

  requestAuthorization: function () {

    var self = this;

    cordova.plugins.photoLibrary.requestAuthorization(
      function () {
        // Retry
        self.loadPhotos();
      },
      function (err) {
        console.log('Error in requestAuthorization: ' + err);

        // TODO: explain to user why you need the permission, and continue when he agrees

        // Ask user again
        self.requestAuthorization();

      }, {
        read: true,
        write: false
      }
    );

  },

  loadPhotos: function () {

    var self = this;

    var gallery = $('#gallery');

    cordova.plugins.photoLibrary.getLibrary(
      function (chunk) {
        var library = chunk.library;
        // Here we have the library as array

        library.forEach(function (libraryItem) {

          var image = $('<img>', {
            src: libraryItem.thumbnailURL,
            style: 'margin: 5px; width: 100%;'
          });
          image.appendTo(gallery);

        });

      },
      function (err) {
        if (err.startsWith('Permission')) {

          console.log('Please provide the permission');

          // TODO: explain to user why you need the permission, and continue when he agrees

          self.requestAuthorization();

        } else { // Real error
          console.log('Error in getLibrary: ' + err);
        }
      }, {
        chunkTimeSec: 0.3,
      }
    );

  }
};

app.initialize();
