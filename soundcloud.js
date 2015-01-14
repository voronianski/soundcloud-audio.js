'use strict';

var jsonp = require('jsonp');

function SoundCloud (clientId) {
    if (!(this instanceof SoundCloud)) {
        return new SoundCloud(clientId);
    }

    if (!clientId) {
        throw new Error('SoundCloud API clientId is required, get it - https://developers.soundcloud.com/');
    }

    this._clientId = clientId;
    this._baseUrl = 'http://api.soundcloud.com';

    this.playing = false;
    this.duration = 0;

    this.audio = document.createElement('audio');
    this.audio.addEventListener('timeupdate', this._onTimeUpdate, false);
    this.audio.addEventListener('ended', this._onAudioEnded, false);
}

SoundCloud.prototype.load = function (url, callback) {
    if (!url) {
        throw new Error('SoundCloud track or playlist url is required');
    }

    url = this._baseUrl+'/resolve.json?url='+url+'&client_id='+this._clientId;

    jsonp(url, {prefix: 'jsonp_callback_'+Math.round(100000 * Math.random())}, function (err, data) {
        if (err) {
            callback(err);
        }

        if (data.tracks) {
            this._playlist = data;
        } else {
            this._track = data;
        }

        this.duration = data.duration/1000;

        callback(null, data);
    }.bind(this));
};

SoundCloud.prototype.play = function (options) {
    options = options || {};
    var src;

    if (options.streamUrl) {
        src = options.streamUrl;
    } else if (this._playlist && this._playlist.tracks.length) {
        src = this._playlist.tracks[(options.playlistIndex || 0)].stream_url;
    } else if (this._track) {
        src = this._track.stream_url;
    }

    if (!src) {
        throw new Error('There is no tracks to play, use `streamUrl` option or `load` method');
    }

    src += '?client_id='+this._clientId;

    if (src !== this.audio.src) {
        this.audio.src = src;
    }

    this.playing = src;
    this.audio.play();
};

SoundCloud.prototype.pause = function () {
    this.audio.pause();
    this.playing = false;
};

SoundCloud.prototype.next = function () {

};

SoundCloud.prototype.previous = function () {

};

SoundCloud.prototype.seek = function (e) {
    if (!this.audio.readyState) {
        return false;
    }
    var percent = e.offsetX / e.target.offsetWidth || (e.layerX - e.target.offsetLeft) / e.target.offsetWidth;
    var time = percent * this.audio.duration || 0;
    this.audio.currentTime = time;
};

SoundCloud.prototype._onTimeUpdate = function () {
    console.log(this);
    this.currentTime = this.audio.currentTime;
};

SoundCloud.prototype._onAudioEnded = function () {

};

SoundCloud.prototype.destroy = function () {
    this.audio.removeEventListener('timeupdate', this._onTimeUpdate);
    this.audio.removeEventListener('ended', this._onAudioEnded);
};

module.exports = SoundCloud;
