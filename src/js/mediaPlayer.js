import Plyr from 'plyr';

export default function mediaPlayer() {
    new Plyr('audio', {});
    new Plyr('.case__content-video video', {});
}
