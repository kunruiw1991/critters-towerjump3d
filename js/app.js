/**
 * Critter Helix Tower 3D: Bouncy Cloud Climb!
 * 3D WebGL Rotating Spiral Helix Tower Jump & Smash Race (Three.js)
 * Round 4: 100% Zero-Text Kid-Friendly Visual Cockpit — Visual Fever Progress Gauge,
 * Dual-Icon Superpower Badges, Live Critter+Tower Launch Preview on Play Button & HUD,
 * On-Screen Swipe/Steer Deflection Puck, and Pulsing Ready-to-Tap Power Pedals + Active Drain!
 */
(() => {
  'use strict';

  // 8 Smiling Critters Roster (with dual-icon superpower affordances for pre-reading kids)
  const CRITTERS = [
    { id: 'hoppy',      icon: 'icons/hoppy.jpg',      emoji: '🐰', trait: '⚡', traitPair: '⚡⬆️', perk: 'bounce',   color: 0x00e676, rim: 0x69f0ae },
    { id: 'catnap',     icon: 'icons/catnap.jpg',     emoji: '🐱', trait: '🌙', traitPair: '🌙🪂', perk: 'float',    color: 0xaa00ff, rim: 0xe040fb },
    { id: 'dogday',     icon: 'icons/dogday.jpg',     emoji: '🐶', trait: '☀️', traitPair: '☀️🧲', perk: 'magnet',   color: 0xff9100, rim: 0xffd740 },
    { id: 'craftycorn', icon: 'icons/craftycorn.jpg', emoji: '🦄', trait: '🌈', traitPair: '🌈💥', perk: 'fever',    color: 0x00e5ff, rim: 0x84ffff },
    { id: 'picky',      icon: 'icons/picky.jpg',      emoji: '🐷', trait: '🍎', traitPair: '🍎⭐', perk: 'snack',    color: 0xff4081, rim: 0xff80ab },
    { id: 'kickin',     icon: 'icons/kickin.jpg',     emoji: '🐥', trait: '⭐', traitPair: '⭐🔋', perk: 'recharge', color: 0xffea00, rim: 0xffff8d },
    { id: 'bobby',      icon: 'icons/bobby.jpg',      emoji: '🐻', trait: '❤️', traitPair: '❤️🛡️', perk: 'shield',   color: 0xff1744, rim: 0xff8a80 },
    { id: 'bubba',      icon: 'icons/bubba.jpg',      emoji: '🐘', trait: '💡', traitPair: '💡🟢', perk: 'beacon',   color: 0x2979ff, rim: 0x82b1ff }
  ];

  // 8 Distinct Spiral Helix Towers
  const TOWERS = [
    {
      id: 0, emoji: '🍭', theme: 'lollipop', rings: 26,
      skyTop: 0x511e8a, skyBot: 0x190936,
      pillarColor: 0xf48fb1, sliceColor: 0xab47bc, sliceAltColor: 0xf8bbd0,
      spiralStep: 2, gapWidth: 2,
      springChance: 0.24, crackChance: 0.26, hazardChance: 0.08, aiSpeed: 0.84
    },
    {
      id: 1, emoji: '☁️', theme: 'cloud', rings: 28,
      skyTop: 0x1565c0, skyBot: 0x0a2346,
      pillarColor: 0xb3e5fc, sliceColor: 0x4fc3f7, sliceAltColor: 0xe1f5fe,
      spiralStep: 1, gapWidth: 2,
      springChance: 0.25, crackChance: 0.28, hazardChance: 0.10, aiSpeed: 0.88
    },
    {
      id: 2, emoji: '🍓', theme: 'strawberry', rings: 30,
      skyTop: 0x880e4f, skyBot: 0x2c061a,
      pillarColor: 0xf8bbd0, sliceColor: 0xec407a, sliceAltColor: 0xfce4ec,
      spiralStep: 2, gapWidth: 2,
      springChance: 0.26, crackChance: 0.30, hazardChance: 0.11, aiSpeed: 0.91
    },
    {
      id: 3, emoji: '🍋', theme: 'lemon', rings: 32,
      skyTop: 0x33691e, skyBot: 0x12260a,
      pillarColor: 0xfff59d, sliceColor: 0xdce775, sliceAltColor: 0xf9fbe7,
      spiralStep: 3, gapWidth: 2,
      springChance: 0.26, crackChance: 0.30, hazardChance: 0.12, aiSpeed: 0.94
    },
    {
      id: 4, emoji: '🍉', theme: 'watermelon', rings: 34,
      skyTop: 0x004d40, skyBot: 0x041e19,
      pillarColor: 0x80cbc4, sliceColor: 0xff8a80, sliceAltColor: 0x26a69a,
      spiralStep: 2, gapWidth: 3,
      springChance: 0.27, crackChance: 0.32, hazardChance: 0.13, aiSpeed: 0.97
    },
    {
      id: 5, emoji: '🍇', theme: 'grape', rings: 36,
      skyTop: 0x311b92, skyBot: 0x12062c,
      pillarColor: 0xce93d8, sliceColor: 0x7e57c2, sliceAltColor: 0xb39ddb,
      spiralStep: 1, gapWidth: 2,
      springChance: 0.28, crackChance: 0.32, hazardChance: 0.14, aiSpeed: 1.00
    },
    {
      id: 6, emoji: '❄️', theme: 'ice', rings: 38,
      skyTop: 0x01579b, skyBot: 0x041b33,
      pillarColor: 0xb2ebf2, sliceColor: 0x26c6da, sliceAltColor: 0xe0f7fa,
      spiralStep: 3, gapWidth: 2,
      springChance: 0.28, crackChance: 0.34, hazardChance: 0.15, aiSpeed: 1.03
    },
    {
      id: 7, emoji: '🌈', theme: 'rainbow', rings: 40,
      skyTop: 0x391885, skyBot: 0x140630,
      pillarColor: 0xf8bbd0, sliceColor: 0x90caf9, sliceAltColor: 0xce93d8,
      spiralStep: 2, gapWidth: 3,
      springChance: 0.30, crackChance: 0.36, hazardChance: 0.16, aiSpeed: 1.06
    }
  ];

  const STORAGE_KEY = 'critters_helix_tower3d_save_v1';
  const RING_STEP_Y = 3.2;
  const SLICE_SURFACE_OFFSET = 0.30;
  const RACER_RADIUS = 0.64;
  const TOWER_RADIUS = 4.6;
  const RACER_ORBIT_RADIUS = 3.45;
  const SLICES_PER_RING = 12;
  const SLICE_ARC = (Math.PI * 2) / SLICES_PER_RING;
  const PARTICLE_POOL_SIZE = 90;
  const DEBRIS_POOL_SIZE = 48;
  const SHOCKWAVE_POOL_SIZE = 14;
  const FLYING_COIN_POOL_SIZE = 12;
  const MAX_PHYSICS_SUBSTEP = 1 / 120;

  let saveState = {
    selectedCritter: 'hoppy',
    selectedTower: 0,
    unlockedTower: 0,
    towerStars: [0, 0, 0, 0, 0, 0, 0, 0],
    muted: false
  };

  function loadSave() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          saveState.selectedCritter = parsed.selectedCritter || 'hoppy';
          saveState.selectedTower = Number.isInteger(parsed.selectedTower) ? parsed.selectedTower : 0;
          saveState.unlockedTower = Number.isInteger(parsed.unlockedTower) ? parsed.unlockedTower : 0;
          if (Array.isArray(parsed.towerStars) && parsed.towerStars.length === 8) {
            saveState.towerStars = parsed.towerStars.map(n => Math.max(0, Math.min(3, Number(n) || 0)));
          }
          saveState.muted = Boolean(parsed.muted);
        }
      }
    } catch (e) {
      // Ignore storage error
    }
  }

  function writeSave() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveState));
    } catch (e) {
      // Ignore storage error
    }
  }

  // Synthesized Web Audio Engine (Sample-Accurate Scheduling & Click-Free Envelopes)
  class SoundFX {
    constructor() {
      this.ctx = null;
    }
    ensure() {
      if (saveState.muted) return null;
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }
    tone(freq, dur = 0.12, type = 'sine', gainVal = 0.14, slideTo = null, delaySec = 0) {
      const ctx = this.ensure();
      if (!ctx) return;
      const startTime = ctx.currentTime + Math.max(0, delaySec);
      const attack = Math.min(0.008, dur * 0.25);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(Math.max(30, freq), startTime);
      if (slideTo) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(35, slideTo), startTime + dur);
      }
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainVal, startTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.0008, startTime + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + dur + 0.01);
    }
    bounce(combo = 1) {
      const base = 300 + Math.min(combo, 12) * 32;
      this.tone(base, 0.11, 'triangle', 0.14, base * 1.45, 0);
    }
    spring() {
      this.tone(360, 0.22, 'sine', 0.18, 920, 0);
      this.tone(680, 0.18, 'triangle', 0.14, 1220, 0.06);
    }
    smash() {
      this.tone(190, 0.19, 'sawtooth', 0.20, 58, 0);
      this.tone(520, 0.14, 'square', 0.12, 220, 0.015);
    }
    aiSmashTick() {
      this.tone(260, 0.08, 'triangle', 0.06, 110, 0);
    }
    bump() {
      this.tone(420, 0.09, 'sine', 0.14, 620, 0);
    }
    star() {
      this.tone(780, 0.08, 'sine', 0.13, 1180, 0);
      this.tone(1175, 0.09, 'triangle', 0.10, 1568, 0.045);
    }
    hazard() {
      this.tone(230, 0.22, 'sawtooth', 0.16, 88, 0);
      this.tone(165, 0.20, 'square', 0.11, 72, 0.03);
    }
    feverChime() {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
      notes.forEach((f, i) => {
        this.tone(f, 0.16, 'triangle', 0.14, f * 1.12, i * 0.042);
        this.tone(f * 1.5, 0.12, 'sine', 0.08, f * 1.65, i * 0.042 + 0.015);
      });
    }
    power(type = null) {
      const mode = type || (game.feverTimer > 4.0 ? 'fever' : (game.pedals.smash.activeTimer > 0 ? 'smash' : (game.pedals.rocket.activeTimer > 0 ? 'rocket' : 'magnet')));
      if (mode === 'fever') {
        this.feverChime();
      } else if (mode === 'rocket') {
        this.tone(220, 0.32, 'sawtooth', 0.16, 980, 0);
        this.tone(440, 0.26, 'triangle', 0.14, 1320, 0.05);
        this.tone(880, 0.18, 'sine', 0.12, 1760, 0.12);
      } else if (mode === 'smash') {
        this.tone(140, 0.26, 'sawtooth', 0.22, 48, 0);
        [330, 440, 659.25, 880].forEach((f, i) => {
          this.tone(f, 0.15, 'square', 0.12, f * 1.08, i * 0.035);
        });
      } else {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          this.tone(f, 0.14, 'sine', 0.15, f * 1.22, i * 0.045);
        });
      }
    }
    victoryFanfare() {
      const melody = [
        { f: 523.25, d: 0.14, t: 0.00 },
        { f: 659.25, d: 0.14, t: 0.11 },
        { f: 783.99, d: 0.14, t: 0.22 },
        { f: 1046.5, d: 0.34, t: 0.34 },
        { f: 783.99, d: 0.12, t: 0.52 },
        { f: 1318.5, d: 0.42, t: 0.64 }
      ];
      melody.forEach(n => {
        this.tone(n.f, n.d, 'triangle', 0.16, n.f * 1.02, n.t);
        this.tone(n.f * 0.5, n.d, 'sine', 0.10, null, n.t);
      });
    }
    defeatTrombone() {
      // Expressive 4-note pitch-sliding brass trombone ("wah-wah-wah-waaaah")
      const steps = [
        { f0: 392.0, f1: 370.0, d: 0.22, t: 0.00 },
        { f0: 370.0, f1: 349.2, d: 0.22, t: 0.24 },
        { f0: 349.2, f1: 329.6, d: 0.22, t: 0.48 },
        { f0: 311.1, f1: 196.0, d: 0.58, t: 0.72 }
      ];
      steps.forEach(s => {
        this.tone(s.f0, s.d, 'sawtooth', 0.14, s.f1, s.t);
        this.tone(s.f0 * 0.5, s.d, 'triangle', 0.11, s.f1 * 0.5, s.t);
      });
    }
    fanfare(win) {
      if (win) {
        this.victoryFanfare();
      } else {
        this.defeatTrombone();
      }
    }
  }

  const sfx = new SoundFX();

  // Three.js Scene Globals
  let webglAvailable = false;
  let contextLost = false;
  let assetsReady = false;
  let pendingPlayStart = false;
  let scene, camera, renderer, pmremTexture, loadingManager, textureLoader;
  let towerGroup, ringsGroup, starsGroup, skyDecorGroup, racersGroup, particlesGroup;
  let dirLight, hemiLight, heroPointLight, bubbaBeaconMesh;
  let skyBgTexture = null;
  let crackPatternTexture = null;
  let tempProjVec = null;

  const textureCache = new Map();
  const emojiDataUrlCache = new Map();
  const themeTextureCache = new Map();
  const particleMatCache = new Map();
  const particlePool = [];
  const debrisPool = [];
  const shockwavePool = [];
  const flyingCoinPool = [];
  const disposablePool = [];
  const rankChipMap = new Map();
  let lastStandingsKey = '';
  let starPillBumpTimer = 0;

  let sharedSliceGeo, sharedSpringCoilGeo, sharedSpringArrowGeo, sharedHazardSpikeGeo, sharedCrackSeamGeo;
  let sharedStarGeo, sharedParticleGeo, sharedDebrisGeo, sharedShockwaveGeo, sharedShadowGeo;
  let sharedMedallionRimGeo, sharedMedallionFaceGeo;

  const prefersReducedMotion = () =>
    Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function addTrauma(amount) {
    const scale = prefersReducedMotion() ? 0.2 : 1.0;
    game.trauma = Math.min(1.0, game.trauma + amount * scale);
  }

  function applySRGB(tex) {
    if (!tex || typeof THREE === 'undefined') return tex;
    if ('colorSpace' in tex && THREE.SRGBColorSpace) {
      tex.colorSpace = THREE.SRGBColorSpace;
    } else if ('encoding' in tex && THREE.sRGBEncoding) {
      tex.encoding = THREE.sRGBEncoding;
    }
    return tex;
  }

  function createEmojiCanvas(critter) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const hexColor = '#' + critter.color.toString(16).padStart(6, '0');
    const hexRim = '#' + critter.rim.toString(16).padStart(6, '0');
    const grad = ctx.createRadialGradient(64, 52, 10, 64, 64, 62);
    grad.addColorStop(0, hexRim);
    grad.addColorStop(1, hexColor);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(64, 64, 62, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '72px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(critter.emoji, 64, 68);
    return canvas;
  }

  function getEmojiDataURL(critter) {
    if (emojiDataUrlCache.has(critter.id)) return emojiDataUrlCache.get(critter.id);
    const url = createEmojiCanvas(critter).toDataURL();
    emojiDataUrlCache.set(critter.id, url);
    return url;
  }

  function attachDomImgFallback(imgEl, critter) {
    if (!imgEl || !critter) return;
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = getEmojiDataURL(critter);
    };
  }

  function createEmojiFallbackTexture(critter) {
    const tex = new THREE.CanvasTexture(createEmojiCanvas(critter));
    applySRGB(tex);
    return tex;
  }

  function getCrackPatternTexture() {
    if (crackPatternTexture) return crackPatternTexture;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffc400';
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    const paths = [
      [[16, 20], [48, 42], [38, 76], [74, 96], [112, 114]],
      [[96, 18], [68, 52], [86, 82], [52, 112]],
      [[48, 42], [84, 48]],
      [[38, 76], [14, 98]]
    ];
    paths.forEach(pts => {
      ctx.beginPath();
      pts.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
    crackPatternTexture = new THREE.CanvasTexture(canvas);
    applySRGB(crackPatternTexture);
    return crackPatternTexture;
  }

  function getThemePatternTexture(cfg) {
    const cacheKey = cfg.theme;
    if (themeTextureCache.has(cacheKey)) return themeTextureCache.get(cacheKey);

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 128, 128);

    if (cfg.theme === 'lollipop') {
      ctx.fillStyle = '#ffe4f2';
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = '#f06292';
      ctx.lineWidth = 16;
      for (let i = -128; i < 256; i += 36) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 128, 128);
        ctx.stroke();
      }
    } else if (cfg.theme === 'cloud') {
      ctx.fillStyle = '#d8f0ff';
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = '#ffffff';
      [[32, 36, 22], [56, 32, 26], [82, 40, 20], [42, 92, 24], [76, 90, 26]].forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (cfg.theme === 'strawberry') {
      ctx.fillStyle = '#f48fb1';
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = '#fff9c4';
      for (let y = 16; y < 120; y += 26) {
        for (let x = 16; x < 120; x += 28) {
          const ox = x + ((y % 52 === 16) ? 10 : 0);
          ctx.beginPath();
          ctx.ellipse(ox, y, 4, 7, 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (cfg.theme === 'lemon') {
      ctx.fillStyle = '#fff9c4';
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = '#aed581';
      ctx.fillRect(0, 0, 128, 18);
      ctx.strokeStyle = '#dce775';
      ctx.lineWidth = 4;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(64, 70);
        ctx.lineTo(64 + Math.cos(a) * 54, 70 + Math.sin(a) * 54);
        ctx.stroke();
      }
    } else if (cfg.theme === 'watermelon') {
      ctx.fillStyle = '#ff8a80';
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = '#a5d6a7';
      ctx.fillRect(0, 0, 128, 26);
      ctx.fillStyle = '#2e7d32';
      ctx.fillRect(0, 0, 128, 16);
      ctx.fillStyle = '#263238';
      [[28, 54], [64, 48], [98, 58], [44, 92], [84, 96]].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.ellipse(x, y, 4, 7, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (cfg.theme === 'grape') {
      ctx.fillStyle = '#d1c4e9';
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = '#7e57c2';
      ctx.lineWidth = 4;
      [[28, 32, 14], [74, 28, 18], [104, 64, 12], [42, 84, 20], [88, 98, 15]].forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
      });
    } else if (cfg.theme === 'ice') {
      ctx.fillStyle = '#e0f7fa';
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = '#4dd0e1';
      ctx.lineWidth = 4;
      [[38, 40], [92, 86]].forEach(([cx, cy]) => {
        for (let k = 0; k < 3; k++) {
          const a = (k * Math.PI) / 3;
          ctx.beginPath();
          ctx.moveTo(cx - Math.cos(a) * 22, cy - Math.sin(a) * 22);
          ctx.lineTo(cx + Math.cos(a) * 22, cy + Math.sin(a) * 22);
          ctx.stroke();
        }
      });
    } else {
      const bands = ['#ffcdd2', '#ffe0b2', '#fff9c4', '#c8e6c9', '#b3e5fc', '#e1bee7'];
      bands.forEach((col, idx) => {
        ctx.fillStyle = col;
        ctx.fillRect(0, idx * (128 / bands.length), 128, Math.ceil(128 / bands.length));
      });
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    applySRGB(tex);
    themeTextureCache.set(cacheKey, tex);
    return tex;
  }

  function updateSkyGradient(skyTopHex, skyBotHex) {
    if (!scene || typeof THREE === 'undefined') return;
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const topStr = '#' + skyTopHex.toString(16).padStart(6, '0');
    const botStr = '#' + skyBotHex.toString(16).padStart(6, '0');
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, topStr);
    grad.addColorStop(0.55, topStr);
    grad.addColorStop(1, botStr);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 4, 256);

    if (skyBgTexture) skyBgTexture.dispose();
    skyBgTexture = new THREE.CanvasTexture(canvas);
    applySRGB(skyBgTexture);
    scene.background = skyBgTexture;
  }

  function preloadCritterTextures() {
    if (!textureLoader) return;
    const maxAniso = (renderer && renderer.capabilities) ? renderer.capabilities.getMaxAnisotropy() : 1;

    CRITTERS.forEach(critter => {
      const fallbackTex = createEmojiFallbackTexture(critter);
      textureCache.set(critter.icon, fallbackTex);

      textureLoader.load(
        critter.icon,
        (loadedTex) => {
          applySRGB(loadedTex);
          loadedTex.anisotropy = maxAniso;
          loadedTex.needsUpdate = true;
          textureCache.set(critter.icon, loadedTex);
          game.racers.forEach(r => {
            if (r.critter.icon === critter.icon && r.badgeMat) {
              r.badgeMat.map = loadedTex;
              r.badgeMat.needsUpdate = true;
            }
          });
          fallbackTex.dispose();
        },
        undefined,
        () => {}
      );
    });
  }

  function getCritterTexture(critterOrPath) {
    const critter = typeof critterOrPath === 'object'
      ? critterOrPath
      : (CRITTERS.find(c => c.icon === critterOrPath) || CRITTERS[0]);
    if (textureCache.has(critter.icon)) {
      return textureCache.get(critter.icon);
    }
    const fallback = createEmojiFallbackTexture(critter);
    textureCache.set(critter.icon, fallback);
    return fallback;
  }

  function trackDisposable(obj) {
    disposablePool.push(obj);
    return obj;
  }

  function clearDisposables() {
    while (disposablePool.length > 0) {
      const item = disposablePool.pop();
      if (item && typeof item.dispose === 'function') {
        item.dispose();
      }
    }
  }

  function createWedgeGeometry(innerR, outerR, height, arcAngle) {
    const shape = new THREE.Shape();
    const half = arcAngle * 0.46;
    const segments = 8;
    shape.moveTo(Math.cos(-half) * innerR, Math.sin(-half) * innerR);
    shape.lineTo(Math.cos(-half) * outerR, Math.sin(-half) * outerR);
    for (let i = 1; i <= segments; i++) {
      const a = -half + (i / segments) * (half * 2);
      shape.lineTo(Math.cos(a) * outerR, Math.sin(a) * outerR);
    }
    for (let i = segments; i >= 0; i--) {
      const a = -half + (i / segments) * (half * 2);
      shape.lineTo(Math.cos(a) * innerR, Math.sin(a) * innerR);
    }
    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06
    });
    extrude.rotateX(Math.PI / 2);
    extrude.translate(0, height * 0.5, 0);
    return extrude;
  }

  function updateCameraFraming() {
    if (!camera) return;
    const w = Math.max(1, window.innerWidth);
    const h = Math.max(1, window.innerHeight);
    const aspect = w / h;
    camera.aspect = aspect;

    // Adapt vertical FOV so narrow portrait phones and short landscape screens keep the full 5-racer spiral ring framed
    if (aspect < 0.65) {
      camera.fov = 64;
    } else if (aspect < 0.85) {
      camera.fov = 58;
    } else if (h <= 620 && aspect > 1.3) {
      camera.fov = 55;
    } else {
      camera.fov = 52;
    }

    if (game.mode === 'select') {
      const isLandscape = (aspect >= 1.1) && (w >= 680);
      if (isLandscape) {
        camera.setViewOffset(w, h, -Math.round(w * 0.21), 0, w, h);
        camera.position.set(0, 3.6, 12.2);
        camera.lookAt(0, 1.35, 0);
      } else {
        camera.setViewOffset(w, h, 0, Math.round(h * 0.24), w, h);
        camera.position.set(0, 3.5, aspect < 0.7 ? 14.2 : 13.0);
        camera.lookAt(0, 1.35, 0);
      }
    } else if (game.mode === 'result') {
      camera.clearViewOffset();
      const zDist = aspect < 0.75 ? 17.5 : 15.5;
      camera.position.set(0, game.towerHeight + 5.0, zDist);
      camera.lookAt(0, game.towerHeight + 1.8, 0);
    } else {
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
  }

  function initFlyingCoinPool() {
    if (flyingCoinPool.length > 0) return;
    const hudScreen = document.getElementById('screen-hud') || document.body;
    for (let i = 0; i < FLYING_COIN_POOL_SIZE; i++) {
      const el = document.createElement('div');
      el.className = 'flying-star-coin';
      el.textContent = '⭐';
      hudScreen.appendChild(el);
      flyingCoinPool.push({
        el,
        active: false,
        sx: 0,
        sy: 0,
        tx: 0,
        ty: 0,
        t: 0,
        dur: 0.42,
        reward: 1
      });
    }
  }

  function spawnFlyingStarCoin(worldX, worldY, worldZ, reward = 1) {
    if (!camera || !tempProjVec || flyingCoinPool.length === 0) {
      awardStarPoints(reward);
      return;
    }
    tempProjVec.set(worldX, worldY, worldZ).project(camera);
    const sx = (tempProjVec.x * 0.5 + 0.5) * window.innerWidth;
    const sy = (-tempProjVec.y * 0.5 + 0.5) * window.innerHeight;

    const starPillEl = document.getElementById('hud-stars');
    const rect = starPillEl ? starPillEl.getBoundingClientRect() : { left: window.innerWidth - 90, top: 28, width: 30, height: 24 };
    const tx = rect.left + rect.width * 0.5;
    const ty = rect.top + rect.height * 0.5;

    const coin = flyingCoinPool.find(c => !c.active);
    if (!coin) {
      awardStarPoints(reward);
      return;
    }
    coin.active = true;
    coin.sx = sx;
    coin.sy = sy;
    coin.tx = tx;
    coin.ty = ty;
    coin.t = 0;
    coin.dur = 0.42;
    coin.reward = reward;
    coin.el.style.display = 'block';
    coin.el.style.opacity = '1';
    coin.el.style.transform = `translate3d(${sx - 13}px, ${sy - 13}px, 0) scale(1.15)`;
  }

  function awardStarPoints(reward = 1) {
    const playerPerk = game.player ? game.player.critter.perk : '';
    for (let k = 0; k < reward; k++) {
      game.scoreStars += 1;
      if (playerPerk === 'snack' && game.scoreStars % 4 === 0) {
        game.scoreStars += 2;
        pulsePlayerPerkChip();
      }
    }
    const pill = document.querySelector('.star-pill');
    if (pill) {
      pill.classList.add('pill-bump');
      starPillBumpTimer = 0.18;
    }
  }

  function initThree() {
    if (typeof window.THREE === 'undefined') {
      webglAvailable = false;
      assetsReady = true;
      return false;
    }

    try {
      const container = document.getElementById('webgl-container');
      container.innerHTML = '';
      tempProjVec = new THREE.Vector3();

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x160a3a, 0.010);

      camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 220);
      camera.position.set(0, 5.2, 15.5);
      camera.lookAt(0, 2.2, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      if ('useLegacyLights' in renderer) {
        renderer.useLegacyLights = false;
      }
      if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      container.appendChild(renderer.domElement);

      renderer.domElement.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        contextLost = true;
      }, false);

      renderer.domElement.addEventListener('webglcontextrestored', () => {
        contextLost = false;
        buildTowerScene(saveState.selectedTower);
      }, false);

      if (THREE.PMREMGenerator) {
        const pmremGen = new THREE.PMREMGenerator(renderer);
        const envScene = new THREE.Scene();
        envScene.background = new THREE.Color(0x2a165c);
        const lightPanelGeo = new THREE.PlaneGeometry(10, 10);
        const topPanel = new THREE.Mesh(lightPanelGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
        topPanel.position.set(0, 8, 0);
        topPanel.rotation.x = Math.PI / 2;
        envScene.add(topPanel);

        const warmPanel = new THREE.Mesh(lightPanelGeo, new THREE.MeshBasicMaterial({ color: 0xff80ab, side: THREE.DoubleSide }));
        warmPanel.position.set(8, 2, 6);
        warmPanel.lookAt(0, 0, 0);
        envScene.add(warmPanel);

        const cyanPanel = new THREE.Mesh(lightPanelGeo, new THREE.MeshBasicMaterial({ color: 0x00e5ff, side: THREE.DoubleSide }));
        cyanPanel.position.set(-8, 3, -6);
        cyanPanel.lookAt(0, 0, 0);
        envScene.add(cyanPanel);

        pmremTexture = pmremGen.fromScene(envScene, 0.04).texture;
        scene.environment = pmremTexture;
        lightPanelGeo.dispose();
        pmremGen.dispose();
      }

      hemiLight = new THREE.HemisphereLight(0xfff8e7, 0x281866, 1.15);
      scene.add(hemiLight);

      dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
      dirLight.position.set(9, 24, 14);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.set(1024, 1024);
      dirLight.shadow.camera.left = -7;
      dirLight.shadow.camera.right = 7;
      dirLight.shadow.camera.top = 7;
      dirLight.shadow.camera.bottom = -7;
      dirLight.shadow.camera.near = 1;
      dirLight.shadow.camera.far = 60;
      dirLight.shadow.bias = -0.0005;
      dirLight.shadow.normalBias = 0.02;
      scene.add(dirLight);
      scene.add(dirLight.target);

      heroPointLight = new THREE.PointLight(0xfff3e0, 55, 30, 2);
      heroPointLight.position.set(0, 4, 8);
      scene.add(heroPointLight);

      sharedSliceGeo = createWedgeGeometry(1.85, TOWER_RADIUS, 0.48, SLICE_ARC);
      sharedSpringCoilGeo = new THREE.TorusGeometry(0.36, 0.09, 10, 20);
      sharedSpringCoilGeo.rotateX(Math.PI / 2);
      sharedSpringArrowGeo = new THREE.ConeGeometry(0.28, 0.42, 12);
      sharedHazardSpikeGeo = new THREE.ConeGeometry(0.22, 0.52, 10);
      sharedCrackSeamGeo = new THREE.BoxGeometry(1.65, 0.08, 0.16);
      sharedStarGeo = new THREE.OctahedronGeometry(0.42, 0);
      sharedParticleGeo = new THREE.SphereGeometry(0.18, 8, 8);
      sharedDebrisGeo = new THREE.BoxGeometry(0.46, 0.22, 0.36);
      sharedShockwaveGeo = new THREE.RingGeometry(0.85, 1.18, 48);
      sharedShockwaveGeo.rotateX(-Math.PI / 2);
      sharedShadowGeo = new THREE.CircleGeometry(0.62, 18);
      sharedShadowGeo.rotateX(-Math.PI / 2);
      sharedMedallionRimGeo = new THREE.CircleGeometry(0.55, 24);
      sharedMedallionFaceGeo = new THREE.CircleGeometry(0.46, 24);

      towerGroup = new THREE.Group();
      ringsGroup = new THREE.Group();
      starsGroup = new THREE.Group();
      skyDecorGroup = new THREE.Group();
      racersGroup = new THREE.Group();
      particlesGroup = new THREE.Group();

      const beaconGeo = new THREE.TorusGeometry(0.58, 0.08, 10, 24);
      beaconGeo.rotateX(Math.PI / 2);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, toneMapped: false });
      bubbaBeaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      bubbaBeaconMesh.visible = false;
      ringsGroup.add(bubbaBeaconMesh);

      towerGroup.add(ringsGroup);
      towerGroup.add(starsGroup);
      scene.add(skyDecorGroup);
      scene.add(towerGroup);
      scene.add(racersGroup);
      scene.add(particlesGroup);

      initEffectPools();

      loadingManager = new THREE.LoadingManager();
      loadingManager.onLoad = () => {
        assetsReady = true;
        if (pendingPlayStart) {
          pendingPlayStart = false;
          startTowerRace(saveState.selectedTower);
        }
      };
      textureLoader = new THREE.TextureLoader(loadingManager);
      preloadCritterTextures();

      setTimeout(() => {
        assetsReady = true;
        if (pendingPlayStart) {
          pendingPlayStart = false;
          startTowerRace(saveState.selectedTower);
        }
      }, 1200);

      window.addEventListener('resize', onResize);
      webglAvailable = true;
      return true;
    } catch (err) {
      webglAvailable = false;
      assetsReady = true;
      return false;
    }
  }

  function initEffectPools() {
    particlePool.length = 0;
    debrisPool.length = 0;
    shockwavePool.length = 0;

    const palette = [0x00e5ff, 0x00e676, 0xffea00, 0xffab00, 0xff1744, 0xff80ab, 0xffffff];
    palette.forEach(hex => {
      if (!particleMatCache.has(hex)) {
        particleMatCache.set(hex, new THREE.MeshBasicMaterial({ color: hex, toneMapped: false }));
      }
    });

    const defaultMat = particleMatCache.get(0xffea00);
    for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
      const mesh = new THREE.Mesh(sharedParticleGeo, defaultMat);
      mesh.visible = false;
      particlesGroup.add(mesh);
      particlePool.push({ mesh, active: false, vx: 0, vy: 0, vz: 0, life: 0 });
    }

    for (let i = 0; i < DEBRIS_POOL_SIZE; i++) {
      const mesh = new THREE.Mesh(sharedDebrisGeo, defaultMat);
      mesh.visible = false;
      particlesGroup.add(mesh);
      debrisPool.push({ mesh, active: false, vx: 0, vy: 0, vz: 0, rvx: 0, rvy: 0, rvz: 0, life: 0 });
    }

    for (let i = 0; i < SHOCKWAVE_POOL_SIZE; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffea00,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        toneMapped: false
      });
      const mesh = new THREE.Mesh(sharedShockwaveGeo, mat);
      mesh.visible = false;
      particlesGroup.add(mesh);
      shockwavePool.push({ mesh, mat, active: false, t: 0, dur: 0.45, maxScale: 4.0 });
    }
  }

  function getSharedParticleMaterial(colorHex) {
    if (!particleMatCache.has(colorHex)) {
      particleMatCache.set(colorHex, new THREE.MeshBasicMaterial({ color: colorHex, toneMapped: false }));
    }
    return particleMatCache.get(colorHex);
  }

  function onResize() {
    if (!camera || !renderer) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateCameraFraming();
  }

  function resetTransientPools() {
    for (let i = 0; i < particlePool.length; i++) {
      particlePool[i].active = false;
      if (particlePool[i].mesh) particlePool[i].mesh.visible = false;
    }
    for (let i = 0; i < debrisPool.length; i++) {
      debrisPool[i].active = false;
      if (debrisPool[i].mesh) debrisPool[i].mesh.visible = false;
    }
    for (let i = 0; i < shockwavePool.length; i++) {
      shockwavePool[i].active = false;
      if (shockwavePool[i].mesh) shockwavePool[i].mesh.visible = false;
    }
    for (let i = 0; i < flyingCoinPool.length; i++) {
      flyingCoinPool[i].active = false;
      if (flyingCoinPool[i].el) flyingCoinPool[i].el.style.display = 'none';
    }
  }

  function resetInputState() {
    game.input.left = false;
    game.input.right = false;
    game.input.dragging = false;
    game.hitStopTimer = 0;
    ['btn-left', 'btn-right'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('pressed');
    });
  }

  // Ensure every ring always keeps at least 2 unsmashed normal/spring slices so racers can never get stuck falling through an empty ring
  function canSmashSliceInRing(ring, targetSlice) {
    if (!ring || !targetSlice) return false;
    if (targetSlice.type === 'cracked' || targetSlice.type === 'hazard') return true;
    let safeStandingCount = 0;
    for (let i = 0; i < ring.slices.length; i++) {
      const s = ring.slices[i];
      if (s && !s.smashed && s !== targetSlice && (s.type === 'normal' || s.type === 'spring')) {
        safeStandingCount++;
      }
    }
    return safeStandingCount >= 2;
  }

  // Game Runtime State
  const game = {
    mode: 'select',
    towerIndex: 0,
    towerConfig: TOWERS[0],
    towerHeight: 80,
    towerAngle: 0,
    towerAngularVel: 0,
    camFloorY: 0.30,
    camSmoothY: 0.94,
    camSmoothVel: 0,
    trauma: 0,
    hitStopTimer: 0,
    rings: [],
    stars: [],
    racers: [],
    player: null,
    finishOrder: [],
    combo: 1,
    feverTimer: 0,
    scoreStars: 0,
    bobbyShieldAvailable: false,
    perkPulseTimer: 0,
    pedals: {
      magnet: { charge: 100, activeTimer: 0, maxDur: 4.5 },
      rocket: { charge: 100, activeTimer: 0, maxDur: 1.65 },
      smash:  { charge: 100, activeTimer: 0, maxDur: 1.2 }
    },
    input: {
      left: false,
      right: false,
      dragging: false,
      lastX: 0,
      lastMoveTime: 0
    },
    lastTime: performance.now()
  };

  function pulsePlayerPerkChip() {
    game.perkPulseTimer = 0.55;
    if (game.player) {
      const entry = rankChipMap.get(game.player.id);
      if (entry && entry.chip) {
        entry.chip.classList.add('perk-pulse');
      }
    }
  }

  function getRacersRosterForTower(towerIdx) {
    const playerCritter = CRITTERS.find(c => c.id === saveState.selectedCritter) || CRITTERS[0];
    const aiPool = CRITTERS.filter(c => c.id !== playerCritter.id);
    const chosenAI = [0, 1, 2, 3].map(k => aiPool[(towerIdx * 2 + k) % aiPool.length]);
    return [playerCritter, ...chosenAI];
  }

  // Sync the giant #btn-play button and #hud-hero-chip with the chosen Critter portrait, dual-icon perk, and Tower emoji!
  function syncLaunchCockpitPreview() {
    saveState.unlockedTower = Math.max(0, Math.min(TOWERS.length - 1, Number(saveState.unlockedTower) || 0));
    saveState.selectedTower = Math.max(0, Math.min(saveState.unlockedTower, Number(saveState.selectedTower) || 0));
    const critter = CRITTERS.find(c => c.id === saveState.selectedCritter) || CRITTERS[0];
    const tower = TOWERS[saveState.selectedTower] || TOWERS[0];

    const playAvatar = document.getElementById('play-btn-avatar');
    if (playAvatar) {
      playAvatar.src = critter.icon;
      playAvatar.alt = critter.emoji;
      attachDomImgFallback(playAvatar, critter);
    }
    const playPerk = document.getElementById('play-btn-perk');
    if (playPerk) playPerk.textContent = critter.traitPair;
    const playTower = document.getElementById('play-btn-tower');
    if (playTower) playTower.textContent = `${tower.emoji}👑`;

    const hudAvatar = document.getElementById('hud-player-avatar');
    if (hudAvatar) {
      hudAvatar.src = critter.icon;
      hudAvatar.alt = critter.emoji;
      attachDomImgFallback(hudAvatar, critter);
    }
    const hudPerk = document.getElementById('hud-player-perk');
    if (hudPerk) hudPerk.textContent = critter.traitPair;
    const hudTower = document.getElementById('hud-tower-badge');
    if (hudTower) hudTower.textContent = tower.emoji;
  }

  function swapSelectedCritterInPlace() {
    syncLaunchCockpitPreview();
    const chosenRacers = getRacersRosterForTower(game.towerIndex);
    if (!game.racers.length || game.racers.length !== chosenRacers.length) {
      buildTowerScene(game.towerIndex);
      return;
    }

    chosenRacers.forEach((critter, idx) => {
      const r = game.racers[idx];
      r.id = critter.id;
      r.critter = critter;
      if (r.bodyMat) {
        r.bodyMat.color.setHex(critter.color);
        r.bodyMat.emissive.setHex(critter.color);
      }
      if (r.haloMat) {
        r.haloMat.color.setHex(r.isPlayer ? 0xffd700 : critter.rim);
      }
      if (r.rimMat) {
        r.rimMat.color.setHex(r.isPlayer ? 0xffd700 : critter.rim);
      }
      if (r.badgeMat) {
        r.badgeMat.map = getCritterTexture(critter);
        r.badgeMat.needsUpdate = true;
      }
    });

    buildHudMarkers();
    syncRacerTransforms();
  }

  function findSupportRingBelow(racerY, sliceIdx) {
    const startRing = Math.min(game.rings.length - 1, Math.floor((racerY + 0.35) / RING_STEP_Y));
    for (let rIdx = startRing; rIdx >= 0; rIdx--) {
      const ring = game.rings[rIdx];
      if (!ring) continue;
      const surfaceY = ring.y + SLICE_SURFACE_OFFSET;
      if (surfaceY > racerY + 0.25) continue;
      const slice = ring.slices[sliceIdx];
      if (slice && !slice.smashed) {
        return ring;
      }
    }
    return null;
  }

  function syncRacerTransforms() {
    if (!webglAvailable || !game.racers.length) return;

    const camX = camera ? camera.position.x : 0;
    const camZ = camera ? camera.position.z : 15.5;

    for (let idx = 0; idx < game.racers.length; idx++) {
      const r = game.racers[idx];
      const worldAngle = r.isPlayer ? (Math.PI * 0.5) : (r.localAngle - game.towerAngle);
      const localAngle = r.isPlayer
        ? (((worldAngle + game.towerAngle) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        : (((r.localAngle) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      const effRadius = RACER_ORBIT_RADIUS + (r.radialOffset || 0);
      const wx = Math.cos(worldAngle) * effRadius;
      const wz = Math.sin(worldAngle) * effRadius;

      const speedStretch = 1 + Math.min(0.24, Math.abs(r.vy) * 0.010);
      const sy = (r.squash < 0.96) ? r.squash : speedStretch;
      const sxz = 1 / Math.sqrt(Math.max(0.55, sy));
      r.bodyMesh.scale.set(sxz, sy, sxz);

      if (r.invulnTimer > 0) {
        r.bodyMesh.visible = Math.floor(r.invulnTimer * 22) % 2 === 0;
      } else {
        r.bodyMesh.visible = true;
      }

      if (r.haloMesh) {
        r.haloMesh.position.y = RACER_RADIUS * sy + 0.16;
      }

      const meshYaw = Math.PI * 0.5 - worldAngle;
      r.mesh.position.set(wx, r.y, wz);
      r.mesh.rotation.set(0, meshYaw, 0);

      if (r.isPlayer) {
        const tSec = performance.now() * 0.001;
        if (r.magnetAuraGroup) {
          const magOn = game.pedals.magnet.activeTimer > 0 || game.feverTimer > 0;
          r.magnetAuraGroup.visible = magOn;
          if (magOn) {
            r.magnetAuraGroup.rotation.y = tSec * 6.5;
            r.magnetAuraGroup.rotation.z = Math.sin(tSec * 5.0) * 0.28;
            r.magnetAuraGroup.scale.setScalar(1.0 + 0.12 * Math.sin(tSec * 12.0));
          }
        }
        if (r.rocketFlameGroup) {
          const rockOn = game.pedals.rocket.activeTimer > 0 || game.feverTimer > 0;
          r.rocketFlameGroup.visible = rockOn;
          if (rockOn) {
            const flicker = 0.85 + 0.38 * Math.abs(Math.sin(tSec * 38.0));
            r.rocketFlameGroup.position.y = -RACER_RADIUS * sy - 0.08;
            r.rocketFlameGroup.scale.set(0.92 + 0.12 * flicker, flicker, 0.92 + 0.12 * flicker);
            r.rocketFlameGroup.rotation.y = tSec * 14.0;
          }
        }
        if (r.smashShellMesh) {
          const smashOn = game.pedals.smash.activeTimer > 0 || game.feverTimer > 0;
          r.smashShellMesh.visible = smashOn;
          if (smashOn) {
            r.smashShellMesh.rotation.x = tSec * 5.2;
            r.smashShellMesh.rotation.y = -tSec * 7.4;
            r.smashShellMesh.scale.setScalar(1.04 + 0.16 * Math.sin(tSec * 18.0));
          }
        }
        if (game.feverTimer > 0) {
          const hue = (tSec * 1.65) % 1.0;
          if (r.haloMat) r.haloMat.color.setHSL(hue, 1.0, 0.58);
          if (r.rimMat) r.rimMat.color.setHSL((hue + 0.18) % 1.0, 1.0, 0.58);
          if (heroPointLight) heroPointLight.color.setHSL(hue, 0.95, 0.65);
        } else {
          if (r.haloMat) r.haloMat.color.setHex(0xffd700);
          if (r.rimMat) r.rimMat.color.setHex(0xffd700);
          if (heroPointLight) heroPointLight.color.setHex(0xfff3c4);
        }
        ['magnet', 'rocket', 'smash'].forEach(k => {
          const pd = game.pedals[k];
          const btnEl = document.getElementById(`pedal-${k}`);
          if (btnEl && pd) {
            btnEl.classList.toggle('recharging', pd.charge < 35 && pd.activeTimer <= 0);
          }
        });
      }

      if (r.billboardPivot && r.medallionCard) {
        const toCamYaw = Math.atan2(camX - wx, camZ - wz);
        r.billboardPivot.rotation.set(0, toCamYaw - meshYaw, 0);
        r.medallionCard.position.z = RACER_RADIUS * sxz + 0.06;
      }

      const sliceIdx = Math.floor(((localAngle + SLICE_ARC * 0.5) % (Math.PI * 2)) / SLICE_ARC) % SLICES_PER_RING;
      const supportRing = findSupportRingBelow(r.y, sliceIdx);
      if (supportRing) {
        const surfaceY = supportRing.y + SLICE_SURFACE_OFFSET;
        const bottomY = r.y - RACER_RADIUS * sy;
        const gap = Math.max(0, bottomY - surfaceY);
        r.shadowMesh.visible = true;
        r.shadowMesh.position.set(wx, surfaceY + 0.01, wz);
        const shadowScale = Math.max(0.38, 1.0 - gap * 0.075);
        r.shadowMesh.scale.setScalar(shadowScale);
        r.shadowMat.opacity = Math.max(0.08, 0.46 * Math.exp(-gap * 0.22));
      } else {
        r.shadowMesh.visible = false;
      }
    }

    if (bubbaBeaconMesh && game.player) {
      if (game.player.critter.perk === 'beacon' && game.mode === 'playing') {
        const nextRingIdx = Math.min(game.rings.length - 1, Math.floor(game.player.y / RING_STEP_Y) + 1);
        const nextRing = game.rings[nextRingIdx];
        const springSlice = nextRing ? nextRing.slices.find(s => s && !s.smashed && s.type === 'spring') : null;
        if (springSlice) {
          const sa = springSlice.sliceIndex * SLICE_ARC;
          bubbaBeaconMesh.visible = true;
          bubbaBeaconMesh.position.set(
            Math.cos(sa) * RACER_ORBIT_RADIUS,
            nextRing.y + SLICE_SURFACE_OFFSET + 0.68,
            Math.sin(sa) * RACER_ORBIT_RADIUS
          );
          bubbaBeaconMesh.scale.setScalar(1 + 0.15 * Math.sin(performance.now() * 0.012));
        } else {
          bubbaBeaconMesh.visible = false;
        }
      } else {
        bubbaBeaconMesh.visible = false;
      }
    }

    if (game.player) {
      const refY = game.mode === 'playing' ? game.camSmoothY : game.player.y;
      dirLight.position.set(9, refY + 22, 14);
      dirLight.target.position.set(0, refY, 0);
      dirLight.target.updateMatrixWorld();
      heroPointLight.position.set(0, refY + 3.0, 9.5);
    }
  }

  function buildTowerScene(towerIdx) {
    const safeIdx = Math.max(0, Math.min(TOWERS.length - 1, Number(towerIdx) || 0));
    const cfg = TOWERS[safeIdx] || TOWERS[0];
    resetTransientPools();
    resetInputState();
    game.towerIndex = safeIdx;
    game.towerConfig = cfg;
    game.towerHeight = cfg.rings * RING_STEP_Y;
    game.rings = [];
    game.stars = [];
    game.racers = [];
    game.finishOrder = [];
    game.towerAngle = 0;
    game.towerAngularVel = 0;
    game.camFloorY = SLICE_SURFACE_OFFSET;
    game.camSmoothY = SLICE_SURFACE_OFFSET + RACER_RADIUS;
    game.camSmoothVel = 0;
    game.trauma = 0;
    game.hitStopTimer = 0;

    syncLaunchCockpitPreview();

    if (!webglAvailable) return;

    clearDisposables();
    while (ringsGroup.children.length) ringsGroup.remove(ringsGroup.children[0]);
    if (bubbaBeaconMesh) ringsGroup.add(bubbaBeaconMesh);
    while (starsGroup.children.length) starsGroup.remove(starsGroup.children[0]);
    while (skyDecorGroup.children.length) skyDecorGroup.remove(skyDecorGroup.children[0]);
    while (racersGroup.children.length) racersGroup.remove(racersGroup.children[0]);
    particlePool.forEach(pt => { pt.active = false; pt.mesh.visible = false; });
    debrisPool.forEach(db => { db.active = false; db.mesh.visible = false; });
    shockwavePool.forEach(sw => { sw.active = false; sw.mesh.visible = false; });
    flyingCoinPool.forEach(fc => { fc.active = false; fc.el.style.display = 'none'; });

    towerGroup.rotation.y = 0;
    scene.fog.color.setHex(cfg.skyBot);
    updateSkyGradient(cfg.skyTop, cfg.skyBot);

    const themeTex = getThemePatternTexture(cfg);

    const pillarGeo = trackDisposable(new THREE.CylinderGeometry(1.78, 1.78, game.towerHeight + 12, 28, 1));
    const pillarMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: cfg.pillarColor,
      map: themeTex,
      roughness: 0.36,
      metalness: 0.12
    }));
    const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);
    pillarMesh.position.y = game.towerHeight * 0.5;
    pillarMesh.receiveShadow = true;
    ringsGroup.add(pillarMesh);

    const stripeMat = trackDisposable(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }));
    for (let r = 0; r <= cfg.rings; r += 2) {
      const torusGeo = trackDisposable(new THREE.TorusGeometry(1.81, 0.06, 8, 24));
      const torus = new THREE.Mesh(torusGeo, stripeMat);
      torus.rotation.x = Math.PI / 2;
      torus.position.y = r * RING_STEP_Y;
      ringsGroup.add(torus);
    }

    const normalMats = [
      trackDisposable(new THREE.MeshStandardMaterial({ color: cfg.sliceColor, map: themeTex, roughness: 0.30, metalness: 0.12 })),
      trackDisposable(new THREE.MeshStandardMaterial({ color: cfg.sliceAltColor || cfg.pillarColor, map: themeTex, roughness: 0.30, metalness: 0.12 }))
    ];
    const rainbowRingMats = cfg.theme === 'rainbow'
      ? Array.from({ length: 8 }, (_, i) => {
          const c = new THREE.Color().setHSL((i / 8), 0.82, 0.78);
          return trackDisposable(new THREE.MeshStandardMaterial({
            color: c,
            map: themeTex,
            roughness: 0.28,
            metalness: 0.12
          }));
        })
      : null;

    const crackMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0xffc400,
      map: getCrackPatternTexture(),
      emissive: 0xff6d00,
      emissiveIntensity: 0.25,
      roughness: 0.28,
      metalness: 0.18
    }));
    const crackSeamMat = trackDisposable(new THREE.MeshBasicMaterial({
      color: 0x3e2723,
      toneMapped: false
    }));
    const springSliceMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0x00e676,
      emissive: 0x00c853,
      emissiveIntensity: 0.28,
      roughness: 0.25,
      metalness: 0.18
    }));
    const springCoilMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0xb9f6ca,
      emissive: 0x00e676,
      emissiveIntensity: 0.45,
      roughness: 0.18,
      metalness: 0.35
    }));
    const hazardMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0xff1744,
      emissive: 0xd50000,
      emissiveIntensity: 0.35,
      roughness: 0.28,
      metalness: 0.18
    }));
    const hazardSpikeMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0xff5252,
      emissive: 0xff1744,
      emissiveIntensity: 0.45,
      roughness: 0.22,
      metalness: 0.25
    }));
    const starMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffab00,
      emissiveIntensity: 0.55,
      roughness: 0.18,
      metalness: 0.55
    }));

    const spiralStep = cfg.spiralStep || 2;
    const gapWidth = cfg.gapWidth || 2;

    for (let r = 0; r < cfg.rings; r++) {
      const y = r * RING_STEP_Y;
      const ringSlices = [];
      const spiralIndex = (r * spiralStep + towerIdx) % SLICES_PER_RING;
      const springIndex = (spiralIndex + gapWidth + 1) % SLICES_PER_RING;
      const secondSpringIndex = (spiralIndex + gapWidth + 6) % SLICES_PER_RING;

      for (let s = 0; s < SLICES_PER_RING; s++) {
        let isGap = false;
        if (r > 0) {
          for (let g = 0; g < gapWidth; g++) {
            if (s === (spiralIndex + g) % SLICES_PER_RING) {
              isGap = true;
              break;
            }
          }
        }
        if (isGap) {
          ringSlices.push(null);
          continue;
        }

        let type = 'normal';
        let mat = rainbowRingMats ? rainbowRingMats[(r + s) % rainbowRingMats.length] : normalMats[(r + s) % 2];

        if (r === 0) {
          if (s % 3 === 0) {
            type = 'spring';
            mat = springSliceMat;
          }
        } else {
          const seed = Math.sin(r * 17.3 + s * 31.7 + towerIdx * 57.1) * 0.5 + 0.5;
          if (s === springIndex || (s === secondSpringIndex && seed < cfg.springChance + 0.35)) {
            type = 'spring';
            mat = springSliceMat;
          } else if (seed < cfg.crackChance) {
            type = 'cracked';
            mat = crackMat;
          } else if (r > 2 && seed > 1.0 - cfg.hazardChance && s !== (springIndex + 1) % SLICES_PER_RING) {
            type = 'hazard';
            mat = hazardMat;
          }
        }

        const mesh = new THREE.Mesh(sharedSliceGeo, mat);
        const angle = s * SLICE_ARC;
        mesh.position.y = y;
        mesh.rotation.y = -angle;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        let springAssembly = null;
        if (type === 'spring') {
          springAssembly = new THREE.Group();
          springAssembly.position.set(RACER_ORBIT_RADIUS, SLICE_SURFACE_OFFSET, 0);

          const coil1 = new THREE.Mesh(sharedSpringCoilGeo, springCoilMat);
          coil1.position.set(0, 0.08, 0);
          coil1.castShadow = true;
          springAssembly.add(coil1);

          const coil2 = new THREE.Mesh(sharedSpringCoilGeo, springCoilMat);
          coil2.position.set(0, 0.22, 0);
          coil2.castShadow = true;
          springAssembly.add(coil2);

          const arrow = new THREE.Mesh(sharedSpringArrowGeo, springCoilMat);
          arrow.position.set(0, 0.48, 0);
          arrow.castShadow = true;
          springAssembly.add(arrow);

          mesh.add(springAssembly);
        } else if (type === 'hazard') {
          [-0.55, 0, 0.55].forEach((offsetR, spIdx) => {
            const spike = new THREE.Mesh(sharedHazardSpikeGeo, hazardSpikeMat);
            spike.position.set(RACER_ORBIT_RADIUS + offsetR, SLICE_SURFACE_OFFSET + 0.25, (spIdx - 1) * 0.14);
            spike.castShadow = true;
            mesh.add(spike);
          });
        } else if (type === 'cracked') {
          const seam1 = new THREE.Mesh(sharedCrackSeamGeo, crackSeamMat);
          seam1.position.set(RACER_ORBIT_RADIUS, SLICE_SURFACE_OFFSET + 0.02, 0);
          seam1.rotation.y = 0.35;
          mesh.add(seam1);

          const seam2 = new THREE.Mesh(sharedCrackSeamGeo, crackSeamMat);
          seam2.position.set(RACER_ORBIT_RADIUS, SLICE_SURFACE_OFFSET + 0.02, 0);
          seam2.rotation.y = -0.45;
          mesh.add(seam2);
        }

        ringsGroup.add(mesh);

        const sliceData = {
          ringIndex: r,
          sliceIndex: s,
          type,
          smashed: false,
          mesh,
          springAssembly,
          baseY: y,
          dipY: 0,
          dipVel: 0,
          coilScale: 1,
          coilVel: 0,
          jellyScale: 1,
          jellyVel: 0
        };
        ringSlices.push(sliceData);

        if ((r + s + towerIdx) % 3 === 0 && type !== 'hazard') {
          const starMesh = new THREE.Mesh(sharedStarGeo, starMat);
          const worldAngle = angle;
          const bx = Math.cos(worldAngle) * RACER_ORBIT_RADIUS;
          const by = y + 1.35;
          const bz = Math.sin(worldAngle) * RACER_ORBIT_RADIUS;
          starMesh.position.set(bx, by, bz);
          starsGroup.add(starMesh);
          game.stars.push({
            mesh: starMesh,
            angle: worldAngle,
            y: by,
            baseX: bx,
            baseY: by,
            baseZ: bz,
            collected: false,
            pulling: false,
            pullProgress: 0
          });
        }
      }

      game.rings.push({
        index: r,
        y,
        slices: ringSlices
      });
    }

    const crownRingGeo = trackDisposable(new THREE.CylinderGeometry(TOWER_RADIUS * 1.08, TOWER_RADIUS * 1.08, 0.7, 32));
    const crownRingMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffab00,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.65
    }));
    const crownPlatform = new THREE.Mesh(crownRingGeo, crownRingMat);
    crownPlatform.position.y = game.towerHeight + 0.4;
    crownPlatform.receiveShadow = true;
    ringsGroup.add(crownPlatform);

    const propMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: cfg.pillarColor,
      emissive: cfg.sliceColor,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.25
    }));
    let propGeo;
    if (cfg.theme === 'lollipop' || cfg.theme === 'rainbow') {
      propGeo = trackDisposable(new THREE.TorusGeometry(1.1, 0.28, 10, 20));
    } else if (cfg.theme === 'ice' || cfg.theme === 'strawberry') {
      propGeo = trackDisposable(new THREE.OctahedronGeometry(1.25, 0));
    } else if (cfg.theme === 'watermelon') {
      propGeo = trackDisposable(new THREE.ConeGeometry(1.2, 1.8, 4));
    } else {
      propGeo = trackDisposable(new THREE.SphereGeometry(1.2, 12, 12));
    }

    for (let c = 0; c < 20; c++) {
      const t = c / 19;
      const ca = Math.PI * (1.10 + t * 0.80);
      const dist = 22 + (c % 3) * 4;
      const propMesh = new THREE.Mesh(propGeo, propMat);
      propMesh.position.set(Math.cos(ca) * dist, (c / 20) * game.towerHeight + 1.5, Math.sin(ca) * dist);
      propMesh.rotation.set(c * 0.4, c * 0.7, 0);
      skyDecorGroup.add(propMesh);
    }

    const chosenRacers = getRacersRosterForTower(towerIdx);
    const initialSurfaceY = SLICE_SURFACE_OFFSET + RACER_RADIUS;

    const startLocalAngles = [
      Math.PI * 0.5,
      Math.PI * 0.5 - 2 * SLICE_ARC,
      Math.PI * 0.5 + 2 * SLICE_ARC,
      Math.PI * 0.5 - 4 * SLICE_ARC,
      Math.PI * 0.5 + 4 * SLICE_ARC
    ];

    chosenRacers.forEach((critter, idx) => {
      const isPlayer = idx === 0;
      const racerGroup = new THREE.Group();

      const bodyGeo = trackDisposable(new THREE.SphereGeometry(RACER_RADIUS, 24, 24));
      const bodyMat = trackDisposable(new THREE.MeshStandardMaterial({
        color: critter.color,
        emissive: critter.color,
        emissiveIntensity: 0.16,
        roughness: 0.25,
        metalness: 0.2
      }));
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      racerGroup.add(bodyMesh);

      const haloGeo = trackDisposable(new THREE.TorusGeometry(0.36, 0.06, 10, 24));
      const haloMat = trackDisposable(new THREE.MeshBasicMaterial({
        color: isPlayer ? 0xffd700 : critter.rim,
        toneMapped: false
      }));
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      haloMesh.position.y = RACER_RADIUS + 0.16;
      racerGroup.add(haloMesh);

      let magnetAuraGroup = null;
      let rocketFlameGroup = null;
      let smashShellMesh = null;

      if (isPlayer) {
        magnetAuraGroup = new THREE.Group();
        const magRing1Geo = trackDisposable(new THREE.TorusGeometry(0.92, 0.05, 10, 28));
        const magRing1Mat = trackDisposable(new THREE.MeshBasicMaterial({
          color: 0x00e5ff,
          transparent: true,
          opacity: 0.88,
          blending: THREE.AdditiveBlending,
          toneMapped: false
        }));
        const magRing1 = new THREE.Mesh(magRing1Geo, magRing1Mat);
        magRing1.rotation.x = Math.PI / 2;
        magnetAuraGroup.add(magRing1);

        const magRing2Geo = trackDisposable(new THREE.TorusGeometry(0.78, 0.04, 10, 24));
        const magRing2Mat = trackDisposable(new THREE.MeshBasicMaterial({
          color: 0xffea00,
          transparent: true,
          opacity: 0.82,
          blending: THREE.AdditiveBlending,
          toneMapped: false
        }));
        const magRing2 = new THREE.Mesh(magRing2Geo, magRing2Mat);
        magRing2.rotation.x = Math.PI / 3;
        magnetAuraGroup.add(magRing2);
        magnetAuraGroup.visible = false;
        racerGroup.add(magnetAuraGroup);

        rocketFlameGroup = new THREE.Group();
        const outerConeGeo = trackDisposable(new THREE.ConeGeometry(0.38, 0.96, 12));
        outerConeGeo.translate(0, -0.48, 0);
        outerConeGeo.rotateX(Math.PI);
        const outerConeMat = trackDisposable(new THREE.MeshBasicMaterial({
          color: 0xff6d00,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          toneMapped: false
        }));
        const outerCone = new THREE.Mesh(outerConeGeo, outerConeMat);
        rocketFlameGroup.add(outerCone);

        const innerConeGeo = trackDisposable(new THREE.ConeGeometry(0.22, 0.62, 10));
        innerConeGeo.translate(0, -0.31, 0);
        innerConeGeo.rotateX(Math.PI);
        const innerConeMat = trackDisposable(new THREE.MeshBasicMaterial({
          color: 0xfff59d,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          toneMapped: false
        }));
        const innerCone = new THREE.Mesh(innerConeGeo, innerConeMat);
        rocketFlameGroup.add(innerCone);
        rocketFlameGroup.position.y = -RACER_RADIUS;
        rocketFlameGroup.visible = false;
        racerGroup.add(rocketFlameGroup);

        const smashShellGeo = trackDisposable(new THREE.OctahedronGeometry(0.95, 1));
        const smashShellMat = trackDisposable(new THREE.MeshBasicMaterial({
          color: 0xff4081,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          toneMapped: false
        }));
        smashShellMesh = new THREE.Mesh(smashShellGeo, smashShellMat);
        smashShellMesh.visible = false;
        racerGroup.add(smashShellMesh);
      }

      const billboardPivot = new THREE.Group();
      const medallionCard = new THREE.Group();
      medallionCard.position.z = RACER_RADIUS + 0.06;

      const rimMat = trackDisposable(new THREE.MeshBasicMaterial({
        color: isPlayer ? 0xffd700 : critter.rim,
        toneMapped: false
      }));
      const rimMesh = new THREE.Mesh(sharedMedallionRimGeo, rimMat);
      rimMesh.position.z = -0.01;
      medallionCard.add(rimMesh);

      const portraitTex = getCritterTexture(critter);
      const badgeMat = trackDisposable(new THREE.MeshBasicMaterial({
        map: portraitTex,
        toneMapped: false
      }));
      const faceMesh = new THREE.Mesh(sharedMedallionFaceGeo, badgeMat);
      faceMesh.position.z = 0.0;
      medallionCard.add(faceMesh);

      billboardPivot.add(medallionCard);
      racerGroup.add(billboardPivot);

      const shadowMat = trackDisposable(new THREE.MeshBasicMaterial({
        color: 0x05020f,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      }));
      const shadowMesh = new THREE.Mesh(sharedShadowGeo, shadowMat);
      racersGroup.add(shadowMesh);

      racersGroup.add(racerGroup);

      const startLocalAngle = startLocalAngles[idx];
      const aiSpeedTiers = [1.0, 0.98, 0.92, 0.86, 0.80];
      const racerObj = {
        id: critter.id,
        critter,
        isPlayer,
        racerIndex: idx,
        aiTierMult: aiSpeedTiers[idx] || 0.84,
        aiShieldAvailable: critter.perk === 'shield',
        mesh: racerGroup,
        bodyMesh,
        bodyMat,
        haloMesh,
        haloMat,
        magnetAuraGroup,
        rocketFlameGroup,
        smashShellMesh,
        billboardPivot,
        medallionCard,
        rimMat,
        badgeMat,
        shadowMesh,
        shadowMat,
        y: initialSurfaceY,
        vy: 14.5,
        angle: Math.PI * 0.5,
        localAngle: startLocalAngle,
        angVel: 0,
        radialOffset: 0,
        radialVel: 0,
        invulnTimer: 0,
        bumpCooldown: 0,
        squashHoldTimer: 0,
        pendingLaunchVy: 0,
        aiSteerTimer: 0,
        aiTargetLocalAngle: startLocalAngle,
        aiBoostCooldown: 2.2 + idx * 0.6,
        finished: false,
        finishTime: 0,
        squash: 1
      };

      game.racers.push(racerObj);
      if (isPlayer) game.player = racerObj;
    });

    camera.position.set(0, 5.2, 15.5);
    camera.lookAt(0, 2.2, 0);
    updateCameraFraming();
    syncRacerTransforms();
    buildHudMarkers();
  }

  function spawnBurst(x, y, z, colorHex, count = 12) {
    if (!webglAvailable) return;
    const mat = getSharedParticleMaterial(colorHex);
    const baseOutwardAngle = Math.atan2(z, x);
    let spawned = 0;
    for (let i = 0; i < particlePool.length && spawned < count; i++) {
      const pt = particlePool[i];
      if (pt.active) continue;
      pt.active = true;
      pt.mesh.material = mat;
      pt.mesh.position.set(x, y, z);
      pt.mesh.scale.setScalar(1);
      pt.mesh.visible = true;
      const spread = ((spawned / Math.max(1, count - 1)) - 0.5) * 2.6 + (Math.random() - 0.5) * 0.35;
      const a = baseOutwardAngle + spread;
      const spd = 3.8 + Math.random() * 5.2;
      pt.vx = Math.cos(a) * spd;
      pt.vy = 2.6 + Math.random() * 5.6;
      pt.vz = Math.sin(a) * spd + 1.8;
      pt.life = 0.52 + Math.random() * 0.25;
      spawned++;
    }
  }

  function spawnShockwave(x, y, z, colorHex, maxScale = 4.2, dur = 0.44) {
    if (!webglAvailable) return;
    const sw = shockwavePool.find(s => !s.active);
    if (!sw) return;
    sw.active = true;
    sw.t = 0;
    sw.dur = dur;
    sw.maxScale = maxScale;
    sw.mat.color.setHex(colorHex);
    sw.mat.opacity = 0.92;
    sw.mesh.position.set(x, y, z);
    sw.mesh.scale.setScalar(0.85);
    sw.mesh.visible = true;
  }

  function spawnSliceDebris(slice, ringY, colorHex = 0xffc400, shardCount = 5) {
    if (!webglAvailable || !slice) return;
    const mat = getSharedParticleMaterial(colorHex);
    const worldAngle = slice.sliceIndex * SLICE_ARC - game.towerAngle;
    const cx = Math.cos(worldAngle) * RACER_ORBIT_RADIUS;
    const cz = Math.sin(worldAngle) * RACER_ORBIT_RADIUS;
    const cy = ringY + SLICE_SURFACE_OFFSET;

    let spawned = 0;
    for (let i = 0; i < debrisPool.length && spawned < shardCount; i++) {
      const db = debrisPool[i];
      if (db.active) continue;
      db.active = true;
      db.mesh.material = mat;
      const jitterA = worldAngle + (spawned - 2) * 0.08;
      const rDist = RACER_ORBIT_RADIUS + (Math.random() - 0.5) * 0.9;
      db.mesh.position.set(Math.cos(jitterA) * rDist, cy, Math.sin(jitterA) * rDist);
      db.mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      db.mesh.scale.setScalar(1.0);
      db.mesh.visible = true;

      const outSpd = 4.2 + Math.random() * 4.5;
      db.vx = Math.cos(jitterA) * outSpd;
      db.vy = 3.2 + Math.random() * 4.8;
      db.vz = Math.sin(jitterA) * outSpd + 1.4;
      db.rvx = (Math.random() - 0.5) * 14;
      db.rvy = (Math.random() - 0.5) * 14;
      db.rvz = (Math.random() - 0.5) * 14;
      db.life = 0.62;
      spawned++;
    }
    spawnShockwave(cx, cy + 0.05, cz, colorHex, 2.8, 0.36);
  }

  function activatePedal(type) {
    if (game.mode !== 'playing' || !game.player || game.player.finished) return;
    const p = game.pedals[type];
    if (!p || p.charge < 35) return;

    p.charge = Math.max(0, p.charge - 55);
    sfx.power();

    const btnEl = document.getElementById(`pedal-${type}`);
    if (btnEl) {
      btnEl.classList.remove('pedal-triggered');
      void btnEl.offsetWidth;
      btnEl.classList.add('pedal-triggered');
    }

    const px = Math.cos(game.player.angle) * RACER_ORBIT_RADIUS;
    const pz = Math.sin(game.player.angle) * RACER_ORBIT_RADIUS;

    if (type === 'magnet') {
      p.activeTimer = p.maxDur;
      spawnShockwave(px, game.player.y, pz, 0x00e5ff, 5.2, 0.46);
      spawnBurst(px, game.player.y, pz, 0x00e5ff, 16);
      addTrauma(0.22);
    } else if (type === 'rocket') {
      p.activeTimer = p.maxDur;
      game.player.vy = Math.max(game.player.vy, 28.5);
      game.player.squashHoldTimer = 0;
      addCombo(2);
      spawnShockwave(px, game.player.y - 0.3, pz, 0xffab00, 4.8, 0.44);
      spawnBurst(px, game.player.y, pz, 0xffab00, 20);
      addTrauma(0.38);
    } else if (type === 'smash') {
      p.activeTimer = p.maxDur;
      game.player.vy = Math.max(game.player.vy, 25.0);
      game.player.squashHoldTimer = 0;
      addCombo(3);
      const curRing = Math.floor(game.player.y / RING_STEP_Y);
      for (let r = Math.max(1, curRing - 1); r <= Math.min(game.rings.length - 1, curRing + 2); r++) {
        const ring = game.rings[r];
        if (!ring) continue;
        spawnShockwave(0, ring.y + SLICE_SURFACE_OFFSET + 0.05, 0, 0xff80ab, 6.6, 0.48);
        ring.slices.forEach(sl => {
          if (sl && !sl.smashed && (sl.type === 'cracked' || sl.type === 'hazard')) {
            sl.smashed = true;
            sl.mesh.visible = false;
            spawnSliceDebris(sl, ring.y, sl.type === 'hazard' ? 0xff1744 : 0xffc400, 3);
          }
        });
      }
      const playerLocal = (((game.player.angle + game.towerAngle) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      game.racers.forEach(ai => {
        if (ai.isPlayer || ai.finished) return;
        if (Math.abs(ai.y - game.player.y) < RING_STEP_Y * 2.2) {
          const dAng = Math.atan2(Math.sin(ai.localAngle - playerLocal), Math.cos(ai.localAngle - playerLocal));
          ai.angVel += (dAng >= 0 ? 1 : -1) * 3.6;
          ai.radialVel = 3.2;
          ai.vy = Math.max(ai.vy, 14.0);
        }
      });
      sfx.smash();
      spawnBurst(px, game.player.y, pz, 0xff80ab, 22);
      addTrauma(0.80);
      game.hitStopTimer = 0.045;
    }
    updateHudDOM();
  }

  function addCombo(amount = 1) {
    game.combo = Math.min(25, game.combo + amount);
    const feverThreshold = (game.towerConfig && game.towerConfig.theme === 'rainbow') ? 5 : 6;
    if (game.combo >= feverThreshold && game.feverTimer <= 0) {
      const isCrafty = game.player && game.player.critter.perk === 'fever';
      game.feverTimer = isCrafty ? 5.4 : 4.2;
      if (isCrafty) pulsePlayerPerkChip();
      if (game.player) {
        const px = Math.cos(game.player.angle) * RACER_ORBIT_RADIUS;
        const pz = Math.sin(game.player.angle) * RACER_ORBIT_RADIUS;
        spawnShockwave(px, game.player.y, pz, 0x00e5ff, 5.4, 0.46);
        spawnShockwave(px, game.player.y + 0.15, pz, 0xff80ab, 6.2, 0.52);
        spawnBurst(px, game.player.y, pz, 0xffea00, 20);
      }
      addTrauma(0.36);
      sfx.power();
    }
  }

  function findSafeEscapeDir(ring, sliceIdx) {
    if (!ring) return 1;
    for (let offset = 1; offset <= 5; offset++) {
      const plusSlice = ring.slices[(sliceIdx + offset) % SLICES_PER_RING];
      const minusSlice = ring.slices[(sliceIdx - offset + SLICES_PER_RING) % SLICES_PER_RING];
      const plusSafe = plusSlice && !plusSlice.smashed && plusSlice.type !== 'hazard';
      const minusSafe = minusSlice && !minusSlice.smashed && minusSlice.type !== 'hazard';
      if (plusSafe && !minusSafe) return 1;
      if (minusSafe && !plusSafe) return -1;
      if (plusSafe && minusSafe) return (offset % 2 === 0) ? 1 : -1;
    }
    return 1;
  }

  function stepRacerPhysics(subDt, cfg, playerPerk, bouncePerkMult, playerWorldX, playerWorldZ) {
    const baseGravity = -30.0;
    const stageFrac = Math.max(0, Math.min(1, game.towerIndex / Math.max(1, TOWERS.length - 1)));
    const springSeekChance = 0.35 + stageFrac * 0.53; // 0.35 on Stage 1 -> 0.88 on Stage 8

    for (let idx = 0; idx < game.racers.length; idx++) {
      const r = game.racers[idx];
      if (r.finished) continue;

      if (r.invulnTimer > 0) r.invulnTimer = Math.max(0, r.invulnTimer - subDt);
      if (r.bumpCooldown > 0) r.bumpCooldown = Math.max(0, r.bumpCooldown - subDt);

      r.radialVel += (-65.0 * r.radialOffset - 10.5 * r.radialVel) * subDt;
      r.radialOffset += r.radialVel * subDt;

      if (Math.abs(r.angVel) > 0.001) {
        if (r.isPlayer) {
          game.towerAngle += r.angVel * subDt;
        } else {
          r.localAngle += r.angVel * subDt;
        }
        r.angVel *= Math.exp(-7.5 * subDt);
      }

      if (r.squashHoldTimer > 0) {
        r.squashHoldTimer -= subDt;
        r.squash = 0.60;
        if (r.squashHoldTimer <= 0 && r.pendingLaunchVy > 0) {
          r.vy = r.pendingLaunchVy;
          r.pendingLaunchVy = 0;
        }
        continue;
      }

      const prevY = r.y;

      // Calculate per-rival effective speed with staggered tiers & kid-friendly rubber-banding
      let aiEffSpeed = cfg.aiSpeed * (r.aiTierMult || 0.90);
      if (!r.isPlayer && game.player) {
        const heightRatio = r.y / Math.max(1, game.towerHeight);
        if (game.towerIndex === 0 && heightRatio > 0.68) {
          // Guarantee a forgiving 3-star 1st-place finish on Stage 1 when the player climbs near the crown
          aiEffSpeed *= Math.max(0.66, 1.0 - (heightRatio - 0.68) * 1.05);
        }
        const dyToPlayer = r.y - game.player.y;
        if (dyToPlayer > RING_STEP_Y * 2.5) {
          const leadBrake = game.towerIndex === 0 ? 0.72 : (0.82 + stageFrac * 0.10);
          aiEffSpeed *= leadBrake;
        } else if (dyToPlayer < -RING_STEP_Y * 3.0) {
          aiEffSpeed *= 1.16;
        }
      }

      if (r.isPlayer) {
        if (game.pedals.rocket.activeTimer > 0) {
          r.vy = Math.max(r.vy, 24.0);
        } else if (game.feverTimer > 0) {
          r.vy = Math.max(r.vy, 19.5);
        } else {
          const grav = (playerPerk === 'float' && r.vy < 0) ? baseGravity * 0.86 : baseGravity;
          r.vy += grav * subDt;
        }
      } else {
        const aiGrav = (r.critter.perk === 'float' && r.vy < 0) ? baseGravity * 0.88 : baseGravity;
        r.vy += aiGrav * subDt;
        r.aiSteerTimer -= subDt;
        r.aiBoostCooldown -= subDt;

        if (r.aiSteerTimer <= 0) {
          r.aiSteerTimer = (0.30 - stageFrac * 0.10) + Math.random() * 0.18;
          const lookRingIdx = Math.max(
            0,
            Math.min(
              game.rings.length - 1,
              Math.floor(r.y / RING_STEP_Y) + (r.vy > 2.5 ? 1 : 0)
            )
          );
          const ring = game.rings[lookRingIdx];
          if (ring) {
            const springs = ring.slices.filter(s => s && !s.smashed && s.type === 'spring');
            const safeSlices = ring.slices.filter(s => s && !s.smashed && s.type !== 'hazard');
            const tieBreakOffset = (idx - 2.5) * 0.11;

            if (springs.length > 0 && Math.random() < springSeekChance) {
              const chosenSpring = springs[(idx + lookRingIdx) % springs.length];
              r.aiTargetLocalAngle = chosenSpring.sliceIndex * SLICE_ARC + tieBreakOffset;
            } else if (safeSlices.length > 0) {
              const chosenSafe = safeSlices[(idx * 3 + lookRingIdx) % safeSlices.length];
              r.aiTargetLocalAngle = chosenSafe.sliceIndex * SLICE_ARC + tieBreakOffset;
            } else {
              r.aiTargetLocalAngle = r.localAngle + (Math.random() - 0.5) * 1.2;
            }
          }
        }
        const diff = Math.atan2(Math.sin(r.aiTargetLocalAngle - r.localAngle), Math.cos(r.aiTargetLocalAngle - r.localAngle));
        const steerRate = (2.35 + stageFrac * 0.95) * aiEffSpeed * (r.critter.perk === 'turn' ? 1.12 : 1.0);
        r.localAngle += Math.sign(diff) * Math.min(Math.abs(diff), subDt * steerRate);
      }

      r.y += r.vy * subDt;

      const minFloorY = SLICE_SURFACE_OFFSET + RACER_RADIUS * 0.62;
      if (r.y < minFloorY) {
        r.squash = 0.62;
        r.y = minFloorY;
        r.vy = r.isPlayer ? 16.5 * bouncePerkMult : 16.0 * aiEffSpeed;
        if (r.isPlayer) {
          game.camFloorY = SLICE_SURFACE_OFFSET;
          sfx.bounce(game.combo);
        }
      }

      const localAngle = r.isPlayer
        ? (((r.angle + game.towerAngle) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        : (((r.localAngle) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const sliceIdx = Math.floor(((localAngle + SLICE_ARC * 0.5) % (Math.PI * 2)) / SLICE_ARC) % SLICES_PER_RING;

      const curRingIdx = Math.floor(r.y / RING_STEP_Y);
      const prevRingIdx = Math.floor(prevY / RING_STEP_Y);
      const playerPowerSmashActive = r.isPlayer && (
        game.pedals.smash.activeTimer > 0 ||
        game.pedals.rocket.activeTimer > 0 ||
        game.feverTimer > 0
      );

      if (r.vy > 0 && curRingIdx > prevRingIdx && curRingIdx >= 0 && curRingIdx < game.rings.length) {
        const ringUp = game.rings[curRingIdx];
        const sliceUp = ringUp ? ringUp.slices[sliceIdx] : null;
        if (sliceUp && !sliceUp.smashed) {
          if (sliceUp.type === 'cracked' || (playerPowerSmashActive && sliceUp.type !== 'spring')) {
            sliceUp.smashed = true;
            sliceUp.mesh.visible = false;
            const debColor = sliceUp.type === 'hazard' ? 0xff1744 : (sliceUp.type === 'cracked' ? 0xffc400 : 0xff80ab);
            spawnSliceDebris(sliceUp, ringUp.y, debColor, 5);
            r.vy = Math.max(r.vy, 19.5 * (r.isPlayer ? bouncePerkMult : aiEffSpeed));
            if (r.isPlayer) {
              addCombo(1);
              spawnFlyingStarCoin(playerWorldX, r.y, playerWorldZ, cfg.theme === 'strawberry' ? 3 : 2);
              sfx.smash();
              spawnShockwave(playerWorldX, ringUp.y + SLICE_SURFACE_OFFSET, playerWorldZ, debColor, 3.4, 0.38);
              spawnBurst(playerWorldX, r.y, playerWorldZ, debColor, 12);
              addTrauma(0.22);
              game.hitStopTimer = 0.035;
            } else if (game.player && Math.abs(r.y - game.player.y) < 16) {
              const aiWorldAngle = r.localAngle - game.towerAngle;
              const aiWX = Math.cos(aiWorldAngle) * RACER_ORBIT_RADIUS;
              const aiWZ = Math.sin(aiWorldAngle) * RACER_ORBIT_RADIUS;
              spawnShockwave(aiWX, ringUp.y + SLICE_SURFACE_OFFSET, aiWZ, r.critter.color, 2.0, 0.28);
              spawnBurst(aiWX, r.y, aiWZ, r.critter.color, 7);
              sfx.aiSmashTick();
            }
          } else {
            sliceUp.jellyScale = 0.72;
            sliceUp.jellyVel = 8.5;
            if (r.isPlayer) {
              spawnShockwave(playerWorldX, ringUp.y + SLICE_SURFACE_OFFSET, playerWorldZ, 0xffffff, 2.0, 0.26);
            }
          }
        }
      }

      if (r.vy <= 0) {
        const topSearch = Math.min(game.rings.length - 1, Math.max(prevRingIdx, curRingIdx));
        const botSearch = Math.max(0, Math.min(prevRingIdx, curRingIdx));

        for (let rIdx = topSearch; rIdx >= botSearch; rIdx--) {
          const ring = game.rings[rIdx];
          if (!ring) continue;
          const sliceTopY = ring.y + SLICE_SURFACE_OFFSET;
          const landingSquash = 0.62;
          const landingCenterY = sliceTopY + RACER_RADIUS * landingSquash;

          if (prevY >= landingCenterY - 0.28 && r.y <= landingCenterY + 0.22) {
            const slice = ring.slices[sliceIdx];
            if (slice && !slice.smashed) {
              r.squash = landingSquash;
              r.y = landingCenterY;

              if (r.isPlayer) {
                game.camFloorY = sliceTopY;
              }

              const aiBouncePerk = (!r.isPlayer && r.critter.perk === 'bounce') ? 1.05 : 1.0;
              let launchVy = r.isPlayer ? 16.4 : 15.8 * aiEffSpeed * aiBouncePerk;

              if (slice.type === 'spring') {
                slice.coilScale = 0.36;
                slice.coilVel = 10.5;
                slice.dipVel = -1.4;
                const melonBonus = (cfg.theme === 'watermelon') ? 1.08 : 1.0;
                launchVy = r.isPlayer ? (23.2 * bouncePerkMult * melonBonus) : (21.6 * aiEffSpeed * aiBouncePerk);
                if (r.isPlayer) {
                  addCombo(2);
                  if (cfg.theme === 'lollipop') {
                    spawnFlyingStarCoin(playerWorldX, r.y, playerWorldZ, 1);
                  }
                  if (playerPerk === 'bounce') pulsePlayerPerkChip();
                  sfx.spring();
                  spawnShockwave(playerWorldX, sliceTopY + 0.04, playerWorldZ, 0x00e676, 2.8, 0.36);
                  spawnBurst(playerWorldX, r.y, playerWorldZ, 0x00e676, 14);
                  addTrauma(0.14);
                } else if (game.player && Math.abs(r.y - game.player.y) < 16) {
                  const aiWorldAngle = r.localAngle - game.towerAngle;
                  const aiWX = Math.cos(aiWorldAngle) * RACER_ORBIT_RADIUS;
                  const aiWZ = Math.sin(aiWorldAngle) * RACER_ORBIT_RADIUS;
                  spawnShockwave(aiWX, sliceTopY + 0.04, aiWZ, r.critter.color, 2.2, 0.32);
                  spawnBurst(aiWX, r.y, aiWZ, r.critter.color, 8);
                }
              } else if (slice.type === 'cracked') {
                slice.smashed = true;
                slice.mesh.visible = false;
                spawnSliceDebris(slice, ring.y, 0xffc400, 5);
                launchVy = r.isPlayer ? (18.8 * bouncePerkMult) : (17.5 * aiEffSpeed * aiBouncePerk);
                if (r.isPlayer) {
                  addCombo(1);
                  spawnFlyingStarCoin(playerWorldX, r.y, playerWorldZ, cfg.theme === 'strawberry' ? 3 : 1);
                  sfx.smash();
                  spawnBurst(playerWorldX, r.y, playerWorldZ, 0xffab00, 12);
                  addTrauma(0.22);
                  game.hitStopTimer = 0.04;
                } else if (game.player && Math.abs(r.y - game.player.y) < 16) {
                  const aiWorldAngle = r.localAngle - game.towerAngle;
                  const aiWX = Math.cos(aiWorldAngle) * RACER_ORBIT_RADIUS;
                  const aiWZ = Math.sin(aiWorldAngle) * RACER_ORBIT_RADIUS;
                  spawnShockwave(aiWX, sliceTopY + 0.04, aiWZ, r.critter.color, 2.0, 0.28);
                  spawnBurst(aiWX, r.y, aiWZ, r.critter.color, 7);
                  sfx.aiSmashTick();
                }
              } else if (slice.type === 'hazard') {
                if (playerPowerSmashActive) {
                  slice.smashed = true;
                  slice.mesh.visible = false;
                  spawnSliceDebris(slice, ring.y, 0xff1744, 5);
                  launchVy = 21.5;
                  addCombo(2);
                  spawnFlyingStarCoin(playerWorldX, r.y, playerWorldZ, 2);
                  sfx.smash();
                  addTrauma(0.28);
                } else if (r.isPlayer && game.bobbyShieldAvailable) {
                  game.bobbyShieldAvailable = false;
                  slice.smashed = true;
                  slice.mesh.visible = false;
                  spawnSliceDebris(slice, ring.y, 0xff80ab, 5);
                  launchVy = 21.0;
                  pulsePlayerPerkChip();
                  sfx.spring();
                  spawnBurst(playerWorldX, r.y, playerWorldZ, 0xff80ab, 16);
                  addTrauma(0.20);
                } else if (!r.isPlayer && r.aiShieldAvailable) {
                  r.aiShieldAvailable = false;
                  slice.smashed = true;
                  slice.mesh.visible = false;
                  spawnSliceDebris(slice, ring.y, r.critter.color, 4);
                  launchVy = 18.5 * aiEffSpeed;
                } else if (r.invulnTimer > 0) {
                  slice.dipVel = -1.6;
                  launchVy = r.isPlayer ? 16.4 : 15.8 * aiEffSpeed;
                } else {
                  const escDir = findSafeEscapeDir(ring, sliceIdx);
                  r.invulnTimer = 0.65;
                  r.radialVel = 2.6;
                  launchVy = r.isPlayer ? 13.8 : 14.2 * aiEffSpeed;

                  if (r.isPlayer) {
                    game.combo = 1;
                    game.towerAngle += escDir * SLICE_ARC * 0.65;
                    r.angVel = escDir * 3.8;
                    sfx.hazard();
                    spawnShockwave(playerWorldX, sliceTopY + 0.04, playerWorldZ, 0xff1744, 3.0, 0.38);
                    spawnBurst(playerWorldX, r.y, playerWorldZ, 0xff1744, 12);
                    addTrauma(0.45);
                    game.hitStopTimer = 0.05;
                  } else {
                    r.localAngle += escDir * SLICE_ARC * 0.75;
                    r.angVel = escDir * 3.6;
                  }
                }
              } else {
                if (playerPowerSmashActive && rIdx > 0) {
                  slice.smashed = true;
                  slice.mesh.visible = false;
                  spawnSliceDebris(slice, ring.y, 0xff80ab, 5);
                  launchVy = 20.4 * bouncePerkMult;
                  addCombo(1);
                  spawnFlyingStarCoin(playerWorldX, r.y, playerWorldZ, 1);
                  sfx.smash();
                  addTrauma(0.20);
                } else {
                  slice.dipVel = -1.8;
                  const stageNormalBoost = (cfg.theme === 'cloud') ? 1.10 : (cfg.theme === 'grape' ? 1.06 : 1.0);
                  launchVy = r.isPlayer ? (16.4 * bouncePerkMult * stageNormalBoost) : (15.8 * aiEffSpeed * aiBouncePerk);
                  if (r.isPlayer) {
                    sfx.bounce(game.combo);
                  }
                }
              }

              if (r.isPlayer && r.squashHoldTimer <= 0) {
                r.squashHoldTimer = 0.032;
                r.pendingLaunchVy = launchVy;
                r.vy = 0;
              } else {
                r.vy = launchVy;
              }
              break;
            }
          }
        }
      }

      if (r.y >= game.towerHeight) {
        r.y = game.towerHeight + 1.1;
        r.vy = 0;
        r.finished = true;
        r.finishTime = performance.now();
        game.finishOrder.push(r);
      }

      r.squash += (1 - r.squash) * Math.min(1, subDt * 12);
    }

    // Racer-vs-Racer 3D Bumps & Separation in Tower-Local Space
    const nRacers = game.racers.length;
    for (let i = 0; i < nRacers; i++) {
      const rA = game.racers[i];
      if (rA.finished) continue;
      for (let j = i + 1; j < nRacers; j++) {
        const rB = game.racers[j];
        if (rB.finished) continue;

        const dy = rA.y - rB.y;
        if (Math.abs(dy) > 1.25) continue;

        const angA = rA.isPlayer ? (rA.angle + game.towerAngle) : rA.localAngle;
        const angB = rB.isPlayer ? (rB.angle + game.towerAngle) : rB.localAngle;
        const dAng = Math.atan2(Math.sin(angA - angB), Math.cos(angA - angB));
        const arcDist = Math.abs(dAng) * RACER_ORBIT_RADIUS;
        const distSq = arcDist * arcDist + dy * dy;

        if (distSq < 1.28 * 1.28) {
          const pushSign = dAng >= 0 ? 1 : -1;
          const overlapAng = Math.max(0.02, (1.30 - arcDist) / RACER_ORBIT_RADIUS);

          if (!rA.isPlayer) rA.localAngle += pushSign * overlapAng * 0.6;
          if (!rB.isPlayer) rB.localAngle -= pushSign * overlapAng * 0.6;

          if (rA.bumpCooldown <= 0 && rB.bumpCooldown <= 0) {
            rA.bumpCooldown = 0.28;
            rB.bumpCooldown = 0.28;
            rA.angVel += pushSign * 2.2;
            rB.angVel -= pushSign * 2.2;
            rA.radialVel = 2.4;
            rB.radialVel = -2.0;
            rA.vy = Math.max(rA.vy, 14.5) + 2.5;
            rB.vy = Math.max(rB.vy, 14.5) + 2.5;

            if (rA.isPlayer || rB.isPlayer) {
              sfx.bump();
              addTrauma(0.18);
              spawnBurst(playerWorldX, game.player.y, playerWorldZ, 0xff80ab, 8);
            }
          }
        }
      }
    }
  }

  function updateSimulation(dt) {
    if (game.mode !== 'playing') {
      if (webglAvailable && towerGroup) {
        towerGroup.rotation.y += dt * 0.42;
        game.towerAngle = towerGroup.rotation.y;
        const t = performance.now() * 0.0045;
        if (game.mode === 'result' && game.lastOrder && game.lastOrder.length) {
          const crownSurfaceY = game.towerHeight + 0.75 + RACER_RADIUS;
          const podiumAngles = [
            Math.PI * 0.5,
            Math.PI * 0.5 - 0.32,
            Math.PI * 0.5 + 0.32,
            Math.PI * 0.5 - 0.64,
            Math.PI * 0.5 + 0.64
          ];
          game.lastOrder.forEach((r, rankIdx) => {
            const phase = t + rankIdx * 0.9;
            const isTop3 = rankIdx < 3;
            const bob = isTop3
              ? Math.abs(Math.sin(phase * 1.35)) * (1.05 - rankIdx * 0.15)
              : Math.abs(Math.sin(phase * 0.55)) * 0.14;
            r.y = crownSurfaceY + bob;
            r.vy = isTop3 ? Math.cos(phase * 1.35) * 6 : 0;
            r.squash = isTop3 ? (bob < 0.08 ? 0.76 : 1.0) : 0.80;
            if (!r.isPlayer) {
              r.localAngle = podiumAngles[rankIdx] + game.towerAngle;
            }
          });
          if (camera) {
            camera.position.set(0, game.towerHeight + 5.0, 15.5);
            camera.lookAt(0, game.towerHeight + 1.8, 0);
          }
        } else {
          game.racers.forEach((r, idx) => {
            const phase = t + idx * 0.85;
            const bob = Math.abs(Math.sin(phase)) * 0.95;
            r.y = SLICE_SURFACE_OFFSET + RACER_RADIUS + bob;
            r.vy = Math.cos(phase) * 5;
            r.squash = bob < 0.08 ? 0.78 : 1.0;
          });
        }
        syncRacerTransforms();
      }
      return;
    }

    const cfg = game.towerConfig;
    const playerPerk = game.player ? game.player.critter.perk : '';

    if (game.trauma > 0) {
      game.trauma = Math.max(0, game.trauma - dt * 1.6);
    }
    if (starPillBumpTimer > 0) {
      starPillBumpTimer -= dt;
      if (starPillBumpTimer <= 0) {
        const pill = document.querySelector('.star-pill');
        if (pill) pill.classList.remove('pill-bump');
      }
    }

    for (let i = 0; i < flyingCoinPool.length; i++) {
      const fc = flyingCoinPool[i];
      if (!fc.active) continue;
      fc.t += dt;
      const u = Math.min(1, fc.t / fc.dur);
      const ease = 1 - Math.pow(1 - u, 3);
      const cx = fc.sx + (fc.tx - fc.sx) * ease;
      const cy = fc.sy + (fc.ty - fc.sy) * ease - Math.sin(u * Math.PI) * 48;
      const sc = 1.15 - u * 0.35;
      fc.el.style.transform = `translate3d(${cx - 13}px, ${cy - 13}px, 0) scale(${sc.toFixed(2)})`;
      if (u >= 1) {
        fc.active = false;
        fc.el.style.display = 'none';
        awardStarPoints(fc.reward);
      }
    }

    if (game.hitStopTimer > 0) {
      game.hitStopTimer = Math.max(0, game.hitStopTimer - dt);
      updateHudDOM();
      return;
    }

    let turnInput = 0;
    if (game.input.left) turnInput -= 1;
    if (game.input.right) turnInput += 1;

    if (turnInput !== 0) {
      const targetVel = turnInput * 2.95;
      const maxDelta = 26.0 * dt;
      const diff = targetVel - game.towerAngularVel;
      game.towerAngularVel += Math.sign(diff) * Math.min(Math.abs(diff), maxDelta);
    } else if (!game.input.dragging) {
      const brakeBase = (cfg.theme === 'ice') ? 0.035 : 0.0004;
      game.towerAngularVel *= Math.pow(brakeBase, dt);
      if (Math.abs(game.towerAngularVel) < 0.02) game.towerAngularVel = 0;
    }

    if (!game.input.dragging) {
      game.towerAngle += game.towerAngularVel * dt;
    }
    if (towerGroup) towerGroup.rotation.y = game.towerAngle;

    const rechargeMult = (playerPerk === 'recharge' ? 1.32 : 1.0) * (cfg.theme === 'lemon' ? 1.25 : 1.0);
    ['magnet', 'rocket', 'smash'].forEach(k => {
      const pd = game.pedals[k];
      pd.charge = Math.min(100, pd.charge + dt * 18 * rechargeMult);
      if (pd.activeTimer > 0) {
        pd.activeTimer = Math.max(0, pd.activeTimer - dt);
      }
    });

    if (game.feverTimer > 0) {
      game.feverTimer = Math.max(0, game.feverTimer - dt);
      if (game.feverTimer === 0) {
        game.combo = 1;
      }
    }

    if (game.perkPulseTimer > 0) {
      game.perkPulseTimer = Math.max(0, game.perkPulseTimer - dt);
      if (game.perkPulseTimer === 0 && game.player) {
        const entry = rankChipMap.get(game.player.id);
        if (entry && entry.chip) entry.chip.classList.remove('perk-pulse');
      }
    }

    const playerWorldX = Math.cos(game.player.angle) * RACER_ORBIT_RADIUS;
    const playerWorldZ = Math.sin(game.player.angle) * RACER_ORBIT_RADIUS;

    if (game.feverTimer > 0 || game.pedals.rocket.activeTimer > 0 || game.pedals.smash.activeTimer > 0 || game.pedals.magnet.activeTimer > 0) {
      const rainbowPalette = [0x00e5ff, 0x00e676, 0xffea00, 0xffab00, 0xff1744, 0xff80ab];
      const trailHex = game.feverTimer > 0
        ? rainbowPalette[Math.floor(performance.now() * 0.025) % rainbowPalette.length]
        : (game.pedals.rocket.activeTimer > 0 ? 0xffab00 : (game.pedals.smash.activeTimer > 0 ? 0xff80ab : 0x00e5ff));
      spawnBurst(playerWorldX, game.player.y - 0.35, playerWorldZ, trailHex, 1);
    }

    const baseMagnet = (playerPerk === 'magnet') ? 2.35 : 1.55;
    const magnetRadius = (game.pedals.magnet.activeTimer > 0 || game.feverTimer > 0) ? 7.5 : baseMagnet;

    for (let i = 0; i < game.stars.length; i++) {
      const st = game.stars[i];
      if (st.collected) continue;
      st.mesh.rotation.y += dt * 3.8;

      if (st.pulling) {
        st.pullProgress += dt / 0.18;
        const u = Math.min(1, st.pullProgress);
        const pLocalAngle = game.player.angle + game.towerAngle;
        const tx = Math.cos(pLocalAngle) * RACER_ORBIT_RADIUS;
        const ty = game.player.y;
        const tz = Math.sin(pLocalAngle) * RACER_ORBIT_RADIUS;
        st.mesh.position.set(
          st.baseX + (tx - st.baseX) * u,
          st.baseY + (ty - st.baseY) * u,
          st.baseZ + (tz - st.baseZ) * u
        );
        st.mesh.scale.setScalar(1.0 + 0.35 * Math.sin(u * Math.PI));

        if (u >= 1) {
          st.collected = true;
          st.mesh.visible = false;
          spawnBurst(playerWorldX, game.player.y, playerWorldZ, 0xffea00, 6);
          spawnFlyingStarCoin(playerWorldX, game.player.y, playerWorldZ, 1);
          game.pedals.magnet.charge = Math.min(100, game.pedals.magnet.charge + 10);
          game.pedals.rocket.charge = Math.min(100, game.pedals.rocket.charge + 12);
          game.pedals.smash.charge = Math.min(100, game.pedals.smash.charge + 12);
          sfx.star();
        }
        continue;
      }

      const worldAngle = st.angle - game.towerAngle;
      const sx = Math.cos(worldAngle) * RACER_ORBIT_RADIUS;
      const sz = Math.sin(worldAngle) * RACER_ORBIT_RADIUS;
      const dy = game.player.y - st.y;
      const distSq = (sx - playerWorldX) ** 2 + dy * dy + (sz - playerWorldZ) ** 2;

      if (distSq < magnetRadius * magnetRadius) {
        st.pulling = true;
        st.pullProgress = 0;
        if (playerPerk === 'magnet' && distSq > 2.5) {
          pulsePlayerPerkChip();
        }
      }
    }

    const bouncePerkMult = (playerPerk === 'bounce') ? 1.07 : 1.0;
    let remainingDt = dt;
    while (remainingDt > 0.0001) {
      const subDt = Math.min(MAX_PHYSICS_SUBSTEP, remainingDt);
      stepRacerPhysics(subDt, cfg, playerPerk, bouncePerkMult, playerWorldX, playerWorldZ);
      remainingDt -= subDt;
      if ((game.player && game.player.finished) || game.finishOrder.length >= 4) {
        syncRacerTransforms();
        completeRace();
        return;
      }
    }

    for (let rIdx = 0; rIdx < game.rings.length; rIdx++) {
      const ring = game.rings[rIdx];
      for (let sIdx = 0; sIdx < SLICES_PER_RING; sIdx++) {
        const sl = ring.slices[sIdx];
        if (!sl || sl.smashed) continue;

        if (Math.abs(sl.dipY) > 0.001 || Math.abs(sl.dipVel) > 0.001) {
          sl.dipVel += (-180 * sl.dipY - 16 * sl.dipVel) * dt;
          sl.dipY += sl.dipVel * dt;
          if (Math.abs(sl.dipY) < 0.001 && Math.abs(sl.dipVel) < 0.005) {
            sl.dipY = 0;
            sl.dipVel = 0;
          }
          sl.mesh.position.y = sl.baseY + sl.dipY;
        }

        if (sl.springAssembly && (Math.abs(sl.coilScale - 1) > 0.002 || Math.abs(sl.coilVel) > 0.005)) {
          sl.coilVel += (220 * (1 - sl.coilScale) - 14 * sl.coilVel) * dt;
          sl.coilScale = Math.max(0.32, Math.min(1.45, sl.coilScale + sl.coilVel * dt));
          if (Math.abs(sl.coilScale - 1) < 0.003 && Math.abs(sl.coilVel) < 0.01) {
            sl.coilScale = 1;
            sl.coilVel = 0;
          }
          const cs = sl.coilScale;
          sl.springAssembly.scale.set(1 / Math.sqrt(cs), cs, 1 / Math.sqrt(cs));
        }

        if (Math.abs(sl.jellyScale - 1) > 0.002 || Math.abs(sl.jellyVel) > 0.005) {
          sl.jellyVel += (210 * (1 - sl.jellyScale) - 15 * sl.jellyVel) * dt;
          sl.jellyScale = Math.max(0.65, Math.min(1.25, sl.jellyScale + sl.jellyVel * dt));
          if (Math.abs(sl.jellyScale - 1) < 0.003 && Math.abs(sl.jellyVel) < 0.01) {
            sl.jellyScale = 1;
            sl.jellyVel = 0;
          }
          sl.mesh.scale.set(1, sl.jellyScale, 1);
        }
      }
    }

    for (let i = 0; i < particlePool.length; i++) {
      const pt = particlePool[i];
      if (!pt.active) continue;
      pt.life -= dt;
      if (pt.life <= 0) {
        pt.active = false;
        pt.mesh.visible = false;
        continue;
      }
      pt.vy -= 18 * dt;
      pt.mesh.position.x += pt.vx * dt;
      pt.mesh.position.y += pt.vy * dt;
      pt.mesh.position.z += pt.vz * dt;
      pt.mesh.scale.setScalar(Math.max(0.05, pt.life * 1.5));
    }

    for (let i = 0; i < debrisPool.length; i++) {
      const db = debrisPool[i];
      if (!db.active) continue;
      db.life -= dt;
      if (db.life <= 0) {
        db.active = false;
        db.mesh.visible = false;
        continue;
      }
      db.vy -= 22 * dt;
      db.mesh.position.x += db.vx * dt;
      db.mesh.position.y += db.vy * dt;
      db.mesh.position.z += db.vz * dt;
      db.mesh.rotation.x += db.rvx * dt;
      db.mesh.rotation.y += db.rvy * dt;
      db.mesh.rotation.z += db.rvz * dt;
      db.mesh.scale.setScalar(Math.max(0.1, db.life * 1.5));
    }

    for (let i = 0; i < shockwavePool.length; i++) {
      const sw = shockwavePool[i];
      if (!sw.active) continue;
      sw.t += dt;
      const u = sw.t / sw.dur;
      if (u >= 1) {
        sw.active = false;
        sw.mesh.visible = false;
        continue;
      }
      const scale = 0.9 + (sw.maxScale - 0.9) * (1 - Math.pow(1 - u, 2));
      sw.mesh.scale.setScalar(scale);
      sw.mat.opacity = 0.92 * (1 - u);
    }

    if (camera && game.player) {
      const playerBottomY = game.player.y - RACER_RADIUS;
      if (playerBottomY < game.camFloorY - 0.15) {
        game.camFloorY = playerBottomY;
      }
      const desiredFocusY = game.camFloorY + 0.25 * Math.max(0, game.player.y - game.camFloorY);
      const omega = 6.2;
      const accel = omega * omega * (desiredFocusY - game.camSmoothY) - 2 * omega * game.camSmoothVel;
      game.camSmoothVel += accel * dt;
      game.camSmoothY += game.camSmoothVel * dt;

      const shake = game.trauma * game.trauma;
      const tSec = performance.now() * 0.001;
      const shakeX = shake * 0.25 * (Math.sin(tSec * 43) * 0.6 + Math.cos(tSec * 71) * 0.4);
      const shakeY = shake * 0.25 * (Math.cos(tSec * 53) * 0.6 + Math.sin(tSec * 89) * 0.4);
      const shakeRoll = shake * 0.021 * Math.sin(tSec * 61);

      camera.position.set(shakeX, game.camSmoothY + 4.4 + shakeY, 15.5);
      camera.lookAt(0, game.camSmoothY + 1.2, 0);
      camera.rotation.z += shakeRoll;
    }

    syncRacerTransforms();
    updateHudDOM();
  }

  function completeRace() {
    game.mode = 'result';
    updateCameraFraming();

    const remaining = game.racers
      .filter(r => !game.finishOrder.includes(r))
      .sort((a, b) => b.y - a.y);
    const fullOrder = [...game.finishOrder, ...remaining];

    const playerRank = fullOrder.findIndex(r => r.isPlayer) + 1;
    const earnedStars = playerRank === 1 ? 3 : playerRank === 2 ? 2 : playerRank === 3 ? 1 : 0;
    const qualified = playerRank <= 3;

    game.lastQualified = qualified;
    game.lastOrder = fullOrder;
    game.camSmoothY = game.towerHeight + 0.8;

    if (qualified) {
      saveState.towerStars[game.towerIndex] = Math.max(saveState.towerStars[game.towerIndex] || 0, earnedStars);
      if (game.towerIndex + 1 > saveState.unlockedTower && game.towerIndex + 1 < TOWERS.length) {
        saveState.unlockedTower = game.towerIndex + 1;
      }
      writeSave();
    }

    sfx.fanfare(qualified);
    renderResultModal(fullOrder, playerRank, earnedStars, qualified);
    showScreen('screen-result');
  }

  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => {
      el.classList.toggle('active', el.id === screenId);
    });
  }

  function renderSelectScreen() {
    syncLaunchCockpitPreview();

    const critterGrid = document.getElementById('critter-grid');
    critterGrid.innerHTML = '';
    CRITTERS.forEach(c => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'critter-card' + (saveState.selectedCritter === c.id ? ' selected' : '');
      card.dataset.critter = c.id;

      const img = document.createElement('img');
      img.className = 'critter-avatar';
      img.src = c.icon;
      img.alt = c.emoji;
      attachDomImgFallback(img, c);

      const badges = document.createElement('div');
      badges.className = 'critter-badges';
      badges.innerHTML = `<span>${c.emoji}</span><span>${c.traitPair}</span>`;

      card.appendChild(img);
      card.appendChild(badges);

      card.addEventListener('click', () => {
        if (saveState.selectedCritter === c.id) return;
        saveState.selectedCritter = c.id;
        writeSave();
        sfx.star();
        critterGrid.querySelectorAll('.critter-card').forEach(btn => {
          btn.classList.toggle('selected', btn.dataset.critter === c.id);
        });
        swapSelectedCritterInPlace();
      });
      critterGrid.appendChild(card);
    });

    const towerGrid = document.getElementById('tower-grid');
    towerGrid.innerHTML = '';
    TOWERS.forEach((t, idx) => {
      const unlocked = idx <= saveState.unlockedTower;
      const stars = saveState.towerStars[idx] || 0;
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'tower-card' +
        (saveState.selectedTower === idx ? ' selected' : '') +
        (unlocked ? '' : ' locked');
      card.dataset.tower = String(idx);
      const starsStr = unlocked
        ? ('⭐'.repeat(stars) + '☆'.repeat(3 - stars))
        : '🔒';
      card.innerHTML = `
        <div class="tower-icon">${t.emoji}</div>
        <div class="tower-stars">${starsStr}</div>
      `;
      card.addEventListener('click', () => {
        if (!unlocked) {
          sfx.hazard();
          return;
        }
        saveState.selectedTower = idx;
        writeSave();
        sfx.bounce(2);
        towerGrid.querySelectorAll('.tower-card').forEach(btn => {
          btn.classList.toggle('selected', Number(btn.dataset.tower) === idx);
        });
        buildTowerScene(idx);
      });
      towerGrid.appendChild(card);
    });
  }

  function buildHudMarkers() {
    const markersEl = document.getElementById('hud-markers');
    const ribbonEl = document.getElementById('hud-rank-ribbon');
    markersEl.innerHTML = '';
    ribbonEl.innerHTML = '';
    rankChipMap.clear();
    lastStandingsKey = '';

    const medalIcons = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    game.racers.forEach((r, idx) => {
      const dot = document.createElement('div');
      dot.className = 'racer-dot' + (r.isPlayer ? ' is-player' : '');
      dot.id = `marker-${r.id}`;
      dot.style.backgroundImage = `url('${r.critter.icon}'), url('${getEmojiDataURL(r.critter)}')`;
      markersEl.appendChild(dot);

      const chip = document.createElement('div');
      chip.className = 'rank-chip' + (r.isPlayer ? ' player-chip' : '');
      const medalSpan = document.createElement('span');
      medalSpan.textContent = medalIcons[idx] || '🐾';
      const img = document.createElement('img');
      img.src = r.critter.icon;
      img.alt = r.critter.emoji;
      attachDomImgFallback(img, r.critter);
      chip.appendChild(medalSpan);
      chip.appendChild(img);
      ribbonEl.appendChild(chip);
      rankChipMap.set(r.id, { chip, medalSpan });
    });
  }

  function getLiveStandings() {
    const finished = [...game.finishOrder];
    const active = game.racers
      .filter(r => !finished.includes(r))
      .sort((a, b) => b.y - a.y);
    return [...finished, ...active];
  }

  function updateHudDOM() {
    if (!game.player) return;
    const pct = Math.max(0, Math.min(100, (game.player.y / game.towerHeight) * 100));
    document.getElementById('hud-progress-fill').style.width = `${pct.toFixed(1)}%`;

    game.racers.forEach(r => {
      const dot = document.getElementById(`marker-${r.id}`);
      if (dot) {
        const rPct = Math.max(0, Math.min(100, (r.y / game.towerHeight) * 100));
        dot.style.left = `${rPct.toFixed(1)}%`;
      }
    });

    document.getElementById('hud-stars').textContent = String(game.scoreStars);
    document.getElementById('hud-combo').textContent = `x${game.combo}`;
    const comboPill = document.getElementById('hud-combo-pill');
    comboPill.classList.toggle('fever-active', game.feverTimer > 0);
    document.getElementById('fever-banner').classList.toggle('hidden', game.feverTimer <= 0);

    // Update Visual Fever Charge Progress Bar (#hud-fever-fill) inside #hud-combo-pill
    const feverFillEl = document.getElementById('hud-fever-fill');
    if (feverFillEl) {
      const feverThreshold = (game.towerConfig && game.towerConfig.theme === 'rainbow') ? 5 : 6;
      const maxFeverDur = (game.player && game.player.critter.perk === 'fever') ? 5.4 : 4.2;
      const feverPct = game.feverTimer > 0
        ? Math.max(0, Math.min(100, (game.feverTimer / maxFeverDur) * 100))
        : Math.max(12, Math.min(100, ((game.combo - 1) / Math.max(1, feverThreshold - 1)) * 100));
      feverFillEl.style.width = `${feverPct.toFixed(0)}%`;
    }

    // Update On-Screen Swipe / Steer Deflection Puck (#steer-thumb-puck)
    const puckEl = document.getElementById('steer-thumb-puck');
    if (puckEl) {
      const normTurn = Math.max(-1, Math.min(1, game.towerAngularVel / 2.95));
      const offsetPx = Math.round(normTurn * 46);
      puckEl.style.transform = `translate(calc(-50% + ${offsetPx}px), -50%) rotate(${Math.round(normTurn * 90)}deg)`;
    }

    const standings = getLiveStandings();
    const key = standings.map(r => r.id).join(',');
    if (key !== lastStandingsKey) {
      lastStandingsKey = key;
      const medalIcons = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
      const ribbonEl = document.getElementById('hud-rank-ribbon');
      standings.forEach((r, i) => {
        const entry = rankChipMap.get(r.id);
        if (entry) {
          entry.medalSpan.textContent = medalIcons[i];
          ribbonEl.appendChild(entry.chip);
        }
      });
    }

    // Power Pedals Charge / Active-Duration Drain Bar, Recharging Cooldown & Pulsing Ready Cue
    ['magnet', 'rocket', 'smash'].forEach(k => {
      const pd = game.pedals[k];
      const fillEl = document.getElementById(`fill-${k}`);
      const btnEl = document.getElementById(`pedal-${k}`);
      if (fillEl) {
        const barPct = pd.activeTimer > 0
          ? Math.max(0, Math.min(100, (pd.activeTimer / pd.maxDur) * 100))
          : Math.round(pd.charge);
        fillEl.style.width = `${barPct}%`;
      }
      if (btnEl) {
        btnEl.classList.toggle('ready', pd.charge >= 35 && pd.activeTimer <= 0);
        btnEl.classList.toggle('recharging', pd.charge < 35 && pd.activeTimer <= 0);
        btnEl.classList.toggle('active-glow', pd.activeTimer > 0);
      }
    });
  }

  function renderResultModal(fullOrder, playerRank, earnedStars, qualified) {
    const resultPanel = document.querySelector('.result-panel');
    if (resultPanel) {
      resultPanel.classList.toggle('defeat-mode', !qualified);
    }

    const bannerEl = document.getElementById('result-banner-icons');
    bannerEl.textContent = qualified ? '🏆 👑 🎉' : '💥 😢 🔄';

    const starsEl = document.getElementById('result-stars-row');
    starsEl.textContent = qualified
      ? ('⭐'.repeat(earnedStars) + '☆'.repeat(3 - earnedStars))
      : '☆☆☆';

    const medalIcons = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    const rankStarBadges = ['👑⭐⭐⭐', '🎉⭐⭐', '✨⭐', '😢☁️', '😢☁️'];
    const heights = [128, 102, 84, 58, 46];
    const colors = [
      'linear-gradient(180deg, #ffd700, #ff8f00)',
      'linear-gradient(180deg, #e0e0e0, #9e9e9e)',
      'linear-gradient(180deg, #ffab40, #bf360c)',
      'linear-gradient(180deg, #455a64, #263238)',
      'linear-gradient(180deg, #37474f, #1c262b)'
    ];

    const stageEl = document.getElementById('podium-stage');
    stageEl.innerHTML = '';
    fullOrder.forEach((r, i) => {
      const isQualifier = i < 3;
      const col = document.createElement('div');
      col.className = 'podium-col' +
        (r.isPlayer ? ' is-player' : '') +
        (isQualifier ? ' qualifier' : ' non-qualifier') +
        (i === 3 ? ' first-non-qualifier' : '');

      const medal = document.createElement('div');
      medal.className = 'podium-medal';
      medal.textContent = medalIcons[i];

      const rankStars = document.createElement('div');
      rankStars.className = 'podium-rank-stars';
      rankStars.textContent = rankStarBadges[i];

      const wrap = document.createElement('div');
      wrap.className = 'podium-avatar-wrap';
      const img = document.createElement('img');
      img.className = 'podium-avatar';
      img.src = r.critter.icon;
      img.alt = r.critter.emoji;
      attachDomImgFallback(img, r.critter);
      wrap.appendChild(img);

      const perkBadge = document.createElement('div');
      perkBadge.className = 'podium-perk-badge';
      perkBadge.textContent = r.critter.traitPair;

      const pillar = document.createElement('div');
      pillar.className = 'podium-pillar';
      pillar.style.height = `${heights[i]}px`;
      pillar.style.background = colors[i];
      pillar.textContent = r.critter.emoji;

      col.appendChild(medal);
      col.appendChild(rankStars);
      col.appendChild(wrap);
      col.appendChild(perkBadge);
      col.appendChild(pillar);
      stageEl.appendChild(col);
    });

    const nextBtn = document.getElementById('btn-next');
    nextBtn.classList.toggle('hidden', !qualified);
    const retryBtn = document.getElementById('btn-retry');
    if (retryBtn) {
      retryBtn.classList.toggle('pulse-cta', !qualified);
    }
  }

  function startTowerRace(towerIdx = saveState.selectedTower) {
    saveState.selectedTower = towerIdx;
    writeSave();
    if (!assetsReady) {
      pendingPlayStart = true;
      return;
    }
    game.mode = 'playing';
    game.lastQualified = false;
    buildTowerScene(towerIdx);
    game.combo = 1;
    game.feverTimer = 0;
    game.scoreStars = 0;
    game.bobbyShieldAvailable = Boolean(game.player && game.player.critter.perk === 'shield');
    game.pedals.magnet = { charge: 100, activeTimer: 0, maxDur: 4.5 };
    game.pedals.rocket = { charge: 100, activeTimer: 0, maxDur: 1.65 };
    game.pedals.smash = { charge: 100, activeTimer: 0, maxDur: 1.2 };
    showScreen('screen-hud');
    updateHudDOM();
    sfx.spring();
  }

  function bindEvents() {
    initFlyingCoinPool();

    const audioBtn = document.getElementById('btn-audio');
    const syncAudioIcon = () => {
      audioBtn.textContent = saveState.muted ? '🔇' : '🔊';
    };
    syncAudioIcon();
    audioBtn.addEventListener('click', () => {
      saveState.muted = !saveState.muted;
      writeSave();
      syncAudioIcon();
    });

    document.getElementById('btn-play').addEventListener('click', () => {
      startTowerRace(saveState.selectedTower);
    });

    document.getElementById('btn-home').addEventListener('click', () => {
      game.mode = 'select';
      buildTowerScene(saveState.selectedTower);
      renderSelectScreen();
      showScreen('screen-select');
    });

    document.getElementById('btn-result-home').addEventListener('click', () => {
      game.mode = 'select';
      buildTowerScene(saveState.selectedTower);
      renderSelectScreen();
      showScreen('screen-select');
    });

    document.getElementById('btn-retry').addEventListener('click', () => {
      startTowerRace(game.towerIndex);
    });

    document.getElementById('btn-next').addEventListener('click', () => {
      if (!game.lastQualified) return;
      const nextIdx = (game.towerIndex + 1) % TOWERS.length;
      if (nextIdx <= saveState.unlockedTower) {
        startTowerRace(nextIdx);
      } else {
        startTowerRace(game.towerIndex);
      }
    });

    document.getElementById('pedal-magnet').addEventListener('click', () => activatePedal('magnet'));
    document.getElementById('pedal-rocket').addEventListener('click', () => activatePedal('rocket'));
    document.getElementById('pedal-smash').addEventListener('click', () => activatePedal('smash'));

    const bindSteerBtn = (id, dirKey) => {
      const btn = document.getElementById(id);
      const press = (e) => {
        e.preventDefault();
        game.input[dirKey] = true;
        btn.classList.add('pressed');
      };
      const release = () => {
        game.input[dirKey] = false;
        btn.classList.remove('pressed');
      };
      btn.addEventListener('pointerdown', press);
      btn.addEventListener('pointerup', release);
      btn.addEventListener('pointerleave', release);
      btn.addEventListener('pointercancel', release);
    };
    bindSteerBtn('btn-left', 'left');
    bindSteerBtn('btn-right', 'right');

    // Unified Touch-Drag on both 3D Canvas and #steer-touch-track
    const startDrag = (e) => {
      if (game.mode !== 'playing') return;
      game.input.dragging = true;
      game.input.lastX = e.clientX;
      game.input.lastMoveTime = performance.now();
    };
    document.getElementById('webgl-container').addEventListener('pointerdown', startDrag);
    const touchTrack = document.getElementById('steer-touch-track');
    if (touchTrack) touchTrack.addEventListener('pointerdown', startDrag);

    window.addEventListener('pointermove', (e) => {
      if (!game.input.dragging || game.mode !== 'playing') return;
      const now = performance.now();
      const moveDt = Math.max(0.008, (now - game.input.lastMoveTime) * 0.001);
      const dx = e.clientX - game.input.lastX;
      game.input.lastX = e.clientX;
      game.input.lastMoveTime = now;
      const dAngle = dx * 0.011;
      game.towerAngle += dAngle;
      const instVel = Math.max(-4.5, Math.min(4.5, dAngle / moveDt));
      game.towerAngularVel = 0.55 * game.towerAngularVel + 0.45 * instVel;
      if (towerGroup) towerGroup.rotation.y = game.towerAngle;
    });
    window.addEventListener('pointerup', () => {
      game.input.dragging = false;
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') game.input.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') game.input.right = true;
      if (e.code === 'Digit1') activatePedal('magnet');
      if (e.code === 'Digit2' || e.code === 'Space') activatePedal('rocket');
      if (e.code === 'Digit3' || e.code === 'Enter') activatePedal('smash');
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') game.input.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') game.input.right = false;
    });
  }

  window.critterHelixGame = {
    get state() { return game; },
    get save() { return saveState; },
    get renderer() { return renderer; },
    startStage: (idx) => {
      assetsReady = true;
      startTowerRace(idx);
    },
    usePedal: (type) => activatePedal(type),
    forceFinish: (rank = 1) => {
      assetsReady = true;
      if (game.mode !== 'playing') startTowerRace(saveState.selectedTower);
      game.finishOrder = [];
      const ais = game.racers.filter(r => !r.isPlayer);
      for (let i = 0; i < Math.max(0, Math.min(4, rank - 1)); i++) {
        ais[i].finished = true;
        ais[i].y = game.towerHeight + 1.1;
        game.finishOrder.push(ais[i]);
      }
      game.player.y = game.towerHeight + 1.1;
      game.player.finished = true;
      game.finishOrder.push(game.player);
      completeRace();
    }
  };

  function animate(now) {
    requestAnimationFrame(animate);
    if (contextLost) return;
    const dt = Math.min(0.05, Math.max(0.001, (now - game.lastTime) * 0.001));
    game.lastTime = now;
    updateSimulation(dt);
    if (webglAvailable && renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function boot() {
    loadSave();
    bindEvents();
    renderSelectScreen();
    initThree();
    buildTowerScene(saveState.selectedTower);
    game.lastTime = performance.now();
    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
