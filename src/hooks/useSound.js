import { useCallback, useRef } from 'react';

const useSound = () => {
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback((name) => {
    try {
      const ctx = getCtx();
      if (ctx.state === 'suspended') ctx.resume();

      if (name === 'hover') {
        // Ultra-subtle crystalline whisper
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(4200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(5800, ctx.currentTime + 0.04);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(3000, ctx.currentTime);

        gain.gain.setValueAtTime(0.006, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }

      if (name === 'click') {
        // Soft glass tap — two tones, barely there
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(3200, ctx.currentTime);
        gain1.gain.setValueAtTime(0.008, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.05);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(4800, ctx.currentTime + 0.025);
        gain2.gain.setValueAtTime(0.005, ctx.currentTime + 0.025);
        gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.025);
        osc2.stop(ctx.currentTime + 0.08);
      }

      if (name === 'reveal') {
        // Ambient pad-like reveal, barely audible
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.3);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.004, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // Silently ignore if audio not supported
    }
  }, [getCtx]);

  return play;
};

export default useSound;
