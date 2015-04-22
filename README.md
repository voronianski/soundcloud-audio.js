# <img src="http://www.officialpsds.com/images/thumbs/Soundcloud-Logo-psd47614.png" width="75" align="left">&nbsp;soundcloud-audio.js

[![build status](http://img.shields.io/travis/voronianski/soundcloud-audio.js.svg?style=flat)](https://travis-ci.org/voronianski/soundcloud-audio.js)

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

// create new instance of audio
var scPlayer = new SoundCloudAudio('YOUR_CLIENT_ID');

// if you have an api stream url you can just play it like that
scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'});

// OR in other cases you need to load TRACK and resolve it's data
scPlayer.resolve('https://soundcloud.com/djangodjango/first-light', function (err, track) {
    // do smth with track object
    // e.g. display data in a view etc.
    console.log(track); 

    // once track is loaded it can be played
    scPlayer.play();

    // stop playing track and keep silence
    scPlayer.pause();
});

// OR to load PLAYLIST and resolve it's data
scPlayer.resolve('http://soundcloud.com/jxnblk/sets/yello', function (err, playlist) {
    // do smth with array of `playlist.tracks` or playlist's metadata
    // e.g. display playlist info in a view etc.
    console.log(playlist);

    // once playlist is loaded it can be played
    scPlayer.play();

    // for playlists it's possible to switch to another track in queue
    // e.g. we do it here when playing track is finished 
    scPlayer.on('ended', function () {
        scPlayer.next();
    });

    // play specific track from playlist by it's index
    scPlayer.play({playlistIndex: 2});
});

```

## API

#### `new SoundCloudAudio('YOUR_CLIENT_ID')`

Create an instance of _SoundCloudAudio_, internally uses HTML5 `<audio>` element which is available under [audio](https://github.com/voronianski/soundcloud-audio.js#audio) property. 

Client ID string is required, so get it here - https://developers.soundcloud.com.

### Methods

#### `resolve('url', callback)`

If you don't have SoundCloud `stream_url` (e.g. `https://api.soundcloud.com/tracks/:id/stream`) or you need track's metadata then this method is for you. Pass original track's or playlist's url as a first argument. Once data will be resolved without errors callback function will receive it as plain object as the only argument.

#### `play([options])`

Starts playing track if it's not playing right now. Accepts `options` object where all fields are completely optional:

- `streamUrl` - SoundCloud API `stream_url` string, if it's passed it will be the main source from where to play audio.
- `playlistIndex` - number that specifies the position of the track to play in resolved playlist `tracks` array.

#### `preload(streamUrl)`

Preloads track data without playing it.

#### `pause()`

Pause playing audio.

#### `stop()`

Stop playing audio and rewind it to start.

#### `next()`

Skip to the next track in playlist to play.

#### `previous()`

Return to the previous track in playlist.

#### `seek(event)`

Helper method for integrating with HTML [`<progress>`](http://caniuse.com/#feat=progressmeter) element and its' [polyfills](https://github.com/LeaVerou/HTML5-Progress-polyfill). Changes playback position, just pass the DOM event as the only argument and all necessary computations will be done automagically.

### Props

#### `audio`

Instance of raw `<audio>` element. There are several useful properties like `currentTime` (in `seconds`) or [events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events) you may want to listen with `addEventListener` (the full list of of them at [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)).

#### `duration`

SoundCloud track duration converted into `seconds` in order to be in sync with `audio.currentTime`.

#### `playing`

Shows the current state of the player, returns `false` or source of a currently streaming track.

### Events

_SoundCloudAudio_ provides shortcuts to subscribe or unsubscribe handler functions on native `audio` events. The list of supported events can be accessed here - https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events.

#### `on('event', handler)`

#### `off('event', handler)`

#### `unbindAll()`

```javascript
var SoundCloudAudio = require('soundcloud-audio');

var scPlayer = new SoundCloudAudio('YOUR_CLIENT_ID');

scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'});
scPlayer.on('timeupdate', function (audio) {
    console.log(audio.currentTime);
});
scPlayer.on('ended', function (audio) {
    console.log(scPlayer.track.title + ' just ended!');
});
```

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
3+ ✔ | 3.5+ ✔ | 9+ ✔ | 10+ ✔ | 3.1+ ✔ |

## Next Goals

- Add more methods of SoundCloud API (like `getTrackById` etc.)
- Provide streaming options and mimic events in order to easily integrate with [Waveform.js](http://waveformjs.org/)

## License

MIT Licensed

Copyright (c) 2015, Dmitri Voronianski [dmitri.voronianski@gmail.com](mailto:dmitri.voronianski@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
