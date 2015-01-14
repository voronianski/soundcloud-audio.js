# <img src="http://www.officialpsds.com/images/thumbs/Soundcloud-Logo-psd47614.png" width="75" align="left">&nbsp;soundcloud-audio.js

> Wrapper around [HTML5 `<audio>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio) and SoundCloud [tracks](https://developers.soundcloud.com/docs/api/reference#tracks) and [playlists](https://developers.soundcloud.com/docs/api/reference#playlists) APIs in order to stream audio easily. It could be treated as small replacement for official [SoundCloud SDK](https://developers.soundcloud.com/docs/api/sdks#javascript).

## Install

```bash
npm install soundcloud-audio --save
```

or

```bash
bower install soundcloud-audio --save
```

## Usage

```javascript
var SoundCloudAudio = require('soundcloud-audio');

var scPlayer = new SoundCloudAudio('YOUR_CLIENT_ID');

// if you have an api stream url you can just play it like that
scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'})

// OR in other cases you need load TRACK and resolve it's data
scPlayer.load('https://soundcloud.com/djangodjango/first-light', function (err, track) {
    // do smth with track object
    // e.g. display data in a view etc.
    console.log(track); 

    // once track is loaded it can be played
    scPlayer.play();

    // stop playing track and keep silence
    scPlayer.pause();
});

// OR load PLAYLIST and resolve it's data
scPlayer.load('https://soundcloud.com/dan-deacon/sets/feel-the-lightning-track-instrumental-stems', function (err, playlist) {
    // do smth with array of tracks or playlist's metadata
    // e.g. display playlist info in a view etc.
    
    // once playlist is loaded it can be played
    scPlayer.play();

    // for playlists it's possible to switch to another track in queue
    // e.g. we do it here when playing track is finished 
    scPlayer.onAudioEnded = function () {
        scPlayer.next();
    };

    // play specific track from playlist by it's index
    scPlayer.play({playlistIndex: 2});
});

```

## API

### `new SoundCloudAudio('YOUR_CLIENT_ID')`

### Methods

### `load('url', callback)`
### `play([options])`
### `pause()`
### `next()`
### `previous()`
### `seek()`

### Events

### `onTimeUpdate(func)`
### `onAudioEnded(func)`
