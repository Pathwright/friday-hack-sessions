var mockData = [
  {id: 1, body: "This is my note!"},
  {id: 2, body: "This is my other note!"},
  {id: 3, body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit asperiores voluptatum quia saepe deleniti, necessitatibus consequuntur suscipit natus ducimus. Magnam quam eaque necessitatibus totam consectetur, libero debitis quaerat maxime cumque?"},
]

var NotesFetcher = {
  fetch: function () {
    // returning a Promise because that is what fetch does.
    return new Promise(function (resolve, reject) {
      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere.
      setTimeout(function () {

        // resolve with some mock data
        resolve(mockData);
      }, 250);
    });
  }
};

module.exports = NotesFetcher