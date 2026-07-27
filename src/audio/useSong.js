import { useCallback, useRef, useState } from 'react';
import * as Tone from 'tone';

const CHORDS = [
  ['C4', 'Eb4', 'G4'],
  ['Ab3', 'C4', 'Eb4'],
  ['Bb3', 'D4', 'F4'],
  ['G3', 'Bb3', 'D4'],
];

const MELODY = [
  'G4', 'Ab4', 'G4', 'Eb4',
  'C4', 'Eb4', 'G4', 'Bb4',
  'F4', 'D4', 'F4', 'G4',
  'D4', 'Bb3', 'D4', 'G4',
];

export function useSong() {
  const [isPlaying, setIsPlaying] = useState(false);
  const engineRef = useRef(null);

  const buildEngine = useCallback(() => {
    if (engineRef.current) return engineRef.current;

    const filter = new Tone.Filter({ type: 'lowpass', frequency: 1800, rolloff: -24 });
    const chorus = new Tone.Chorus({ frequency: 2, delayTime: 3, depth: 0.25, wet: 0.25 }).start();
    const reverb = new Tone.Reverb({ decay: 4, wet: 0.35 });
    const analyser = new Tone.Analyser('waveform', 128);

    const piano = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.25, decay: 0.3, sustain: 0.6, release: 2.5 },
    });

    piano.chain(chorus, filter, reverb, Tone.Destination);
    piano.connect(analyser);
    piano.volume.value = -4;

    const sequence = new Tone.Sequence(
      (time, note) => {
        piano.triggerAttackRelease(note, '8n', time, 0.65);
      },
      MELODY,
      '8n',
    );

    let chordIndex = 0;
    const chordLoop = new Tone.Loop((time) => {
      piano.triggerAttackRelease(CHORDS[chordIndex], '2n', time, 0.55);
      chordIndex = (chordIndex + 1) % CHORDS.length;
    }, '2n');

    engineRef.current = { piano, sequence, chordLoop, analyser };
    return engineRef.current;
  }, []);

  const toggle = useCallback(async () => {
    await Tone.start();
    const { sequence, chordLoop, piano } = buildEngine();

    if (!isPlaying) {
      Tone.Transport.bpm.value = 90;
      sequence.start(0);
      chordLoop.start(0);
      Tone.Transport.start();
      setIsPlaying(true);
    } else {
      Tone.Transport.stop();
      sequence.stop();
      chordLoop.stop();
      piano.releaseAll();
      Tone.Transport.cancel();
      Tone.Transport.position = 0;
      setIsPlaying(false);
    }
  }, [buildEngine, isPlaying]);

  const getLevels = useCallback(() => {
    if (!engineRef.current) return null;
    return engineRef.current.analyser.getValue();
  }, []);

  return { isPlaying, toggle, getLevels };
}