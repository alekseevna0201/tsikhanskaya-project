let AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";

function TAjaxStorage(address) {
  this.storage = {};
  this.address = address;
  this.getStorageInfo();
}

TAjaxStorage.prototype.getStorageInfo = function () {
  let that = this;
  $.ajax({
    url: AjaxHandlerScript,
    type: 'POST',
    data: {
      f: 'READ',
      n: this.address
    },
    cache: false,
    success: function (response) {
      if (response.result) {
        let result = JSON.parse(response.result);
        that.storage = result;
      } else {
        that.storage = {};
      }
    },
    error: that.errorHandler
  });
};

TAjaxStorage.prototype.errorHandler = function () {
  alert('Ошибка!');
};


TAjaxStorage.prototype.addValue = function (name, info) {
  this.storage[name] = info;
  this.unlockStorageInfo();
};

TAjaxStorage.prototype.unlockStorageInfo = function () {
  let password = '123d';
  let that = this;
  $.ajax({
    url: AjaxHandlerScript,
    type: 'POST',
    data: {
      f: 'LOCKGET',
      n: this.address,
      p: password
    },
    cache: false,
    success: function () {
      $.ajax({
        url: AjaxHandlerScript,
        type: 'POST',
        data: {
          f: 'UPDATE',
          n: that.address,
          p: password,
          v: JSON.stringify(that.storage)
        },
        cache: false,
        error: that.errorHandler
      })
    },
    error: this.errorHandler
  })
};

let scoreStorageURL = 'ST_LIEBE_SCORESTORAGE';
let ScoreStorage = new TAjaxStorage(scoreStorageURL);

let scoreInfo = {
  score: score
};

for (let i = 0; i < obstacle.length; i++) {
  if (xPos + plane.width >= obstacle[i].x
    && xPos <= obstacle[i].x + obstacleUp.width
    && (yPos <= obstacle[i].y + obstacleUp.height
      || yPos + plane.height >= obstacle[i].y + obstacleUp.height + gap)
    || yPos + plane.height >= cvs.height) {
    ScoreStorage.addValue(name, scoreInfo);
  }
}