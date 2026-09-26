import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import JourneyCanvas from './components/JourneyCanvas';
import Gallery from './components/Gallery';
import LoveLetters from './components/LoveLetters';
import Timeline from './components/Timeline';
import FloatingHearts from './components/FloatingHearts';
import ClickHearts from './components/ClickHearts';
import Envelope from './components/Envelope';
import GiftBox from './components/GiftBox';
import CrystalBall from './components/CrystalBall';
import SayYesButton from './components/SayYesButton';
import MusicToggle from './components/MusicToggle';
import { config } from './config';
import MagicCursor from './components/MagicCursor';
import CursorRing from './components/CursorRing';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#ffb347', background: '#0a0a1a', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1>💔 Something broke</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app">
      <FloatingHearts />
      <MagicCursor />
      <CursorRing />
      {started && <ClickHearts />}
      {started && <MusicToggle />}

      <AnimatePresence mode="wait">
        {!started ? (
          <StartScreen key="start" onStart={() => setStarted(true)} />
        ) : (
          <main key="main" className="main-content">
            <JourneyCanvas />

            <section className="section hero">
              <h1 className="hero-title">
                For My {config.herNickname}, <span className="gold">{config.herName}</span>
              </h1>
              <p className="hero-sub">A journey from my heart to yours, {config.yourName} 💛</p>
              <p className="hero-tip">✨ Tap anywhere for hearts · Scroll to explore ✨</p>
            </section>

            <Gallery />
            <Envelope />
            <GiftBox />
            <LoveLetters />
            <CrystalBall />
            <Timeline />
            <SayYesButton />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}