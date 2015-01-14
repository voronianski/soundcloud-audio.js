# <img src="http://www.officialpsds.com/images/thumbs/Soundcloud-Logo-psd47614.png" width="75" align="left">&nbsp;soundcloud-audio.js

> Wrapper around [HTML5 `<audio>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio) and SoundCloud [tracks](https://developers.soundcloud.com/docs/api/reference#tracks) and [playlists](https://developers.soundcloud.com/docs/api/reference#playlists) APIs. It could be treated as small replacement for official [SoundCloud SDK](https://developers.soundcloud.com/docs/api/sdks#javascript).

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
scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'});

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

#### `new SoundCloudAudio('YOUR_CLIENT_ID')`

### Methods

#### `load('url', callback)`

Load

#### `play([options])`


#### `pause()`
#### `next()`
#### `previous()`
#### `seek()`
#### `destroy()`

### Props

#### `audio`

Instance of raw `<audio>` element. There are several useful properties like `currentTime` (in `seconds`) or events you may want to listen with `addEventListener` (the full list of of them at [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)).

#### `duration`

SoundCloud track duration converted into `seconds` in order to be in sync with `audio.currentTime`.

#### `playing`

Shows the current state of the player, returns `false` or source of a currently streaming track.

### Events Handlers

_SoundCloudAudio_ starts to listen on 2 events when it's initialized - `timeupdate` and `ended`. Use these native handlers and override them for your use cases, instance of `audio`  is passed as argument. 

Listeners will be removed when _SoundCloudAudio_ is [destroy](https://github.com/voronianski/soundcloud-audio.js#destroy)ed.

#### `onTimeUpdate`

#### `onAudioEnded`

```javascript
var SoundCloudAudio = require('soundcloud-audio');

var scPlayer = new SoundCloudAudio('YOUR_CLIENT_ID');

scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'});
scPlayer.onTimeUpdate = function (audio) {
    console.log(audio.currentTime);
};
scPlayer.onAudioEnded = function () {
    console.log(scPlayer.track.title + ' just ended!');
};
```

## License

MIT Licensed

Copyright (c) 2015, Dmitri Voronianski [dmitri.voronianski@gmail.com](mailto:dmitri.voronianski@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
