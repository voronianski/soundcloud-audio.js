var CLIENT_ID = '08f79801a998c381762ec5b15e4914d5';
var PLAYLIST = 'http://soundcloud.com/jxnblk/sets/yello';

describe('soundcloud-audio', function () {
    var player;

    beforeEach(function () {
        player = new SoundCloudAudio(CLIENT_ID);
    });

    it('should create new player instance', function () {
        expect(player).toBeDefined();
    });

    describe('when resolving playlist', function () {
        var playlist;
        var firstTrack;
        var secondTrack;

        beforeEach(function (done) {
            player.resolve(PLAYLIST, function (_playlist) {
                playlist = _playlist;
                firstTrack = playlist.tracks[0].stream_url;
                secondTrack = playlist.tracks[1].stream_url;
                done();
            });
        });

        it('should have an array of tracks', function () {
            expect(playlist.tracks).toBeDefined();
        });

        it('should have playing defined as false', function () {
            expect(player.playing).toBeFalsy();
        });

        it('should have playlist duration in seconds', function () {
            expect(typeof(player.duration)).toBe('number');
        });

        describe('when playing playlist', function () {
            beforeEach(function () {
                player.play();
            });

            it('should have playing defined as true', function () {
                expect(player.playing).toBeTruthy();
            });

            describe('when skipping to next track', function () {
                beforeEach(function () {
                    player.next();
                });

                it('should have second track playing', function () {
                    expect(player.playing).toMatch(secondTrack);
                });

                describe('when skipping to previous track', function () {
                    beforeEach(function () {
                        player.previous();
                    });

                    it('should have first track playing', function () {
                        expect(player.playing).toMatch(firstTrack);
                    });

                    describe('when pausing the track', function () {
                        beforeEach(function () {
                            player.pause();
                        });

                        it('should have first track playing', function () {
                            expect(player.playing).toBeFalsy();
                        });
                    });
                });

            });
        });
    });
});
