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
  const staticRef = useRef(null);
  const loopRef = useRef(null);

  const buildStatic = useCallback(() => {
    if (staticRef.current) return staticRef.current;

    const filter = new Tone.Filter({ type: 'lowpass', frequency: 1800, rolloff: -24 });
    const chorus = new Tone.Chorus({ frequency: 2, delayTime: 3, depth: 0.25, wet: 0.25 }).start();
    const reverb = new Tone.Reverb({ decay: 4, wet: 0.35 });
    const analyser = new Tone.Analyser('fft', 64);

    const piano = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.25, decay: 0.3, sustain: 0.6, release: 2.5 },
    });

    piano.chain(chorus, filter, reverb, Tone.Destination);
    piano.connect(analyser);
    piano.volume.value = -4;

    staticRef.current = { piano, analyser };
    return staticRef.current;
  }, []);

  const createMusic = useCallback(() => {
    const { piano } = buildStatic();

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
      chordIndex++;
      if (chordIndex >= CHORDS.length) chordIndex = 0;
    }, '2n');

    loopRef.current = { sequence, chordLoop };
  }, [buildStatic]);

  const toggle = useCallback(async () => {
    await Tone.start();

    if (!isPlaying) {
      createMusic();
      const { sequence, chordLoop } = loopRef.current;

      Tone.Transport.bpm.value = 90;
      sequence.start(0);
      chordLoop.start(0);
      Tone.Transport.start();
      setIsPlaying(true);
    } else {
      Tone.Transport.stop();

      const { sequence, chordLoop } = loopRef.current || {};
      sequence?.stop();
      chordLoop?.stop();
      sequence?.dispose();
      chordLoop?.dispose();
      loopRef.current = null;

      staticRef.current?.piano.releaseAll();

      Tone.Transport.cancel();
      Tone.Transport.position = 0;
      setIsPlaying(false);
    }
  }, [isPlaying, createMusic]);

  const getLevels = useCallback(() => {
    if (!staticRef.current) return null;
    return staticRef.current.analyser.getValue();
  }, []);

  return { isPlaying, toggle, getLevels };
}