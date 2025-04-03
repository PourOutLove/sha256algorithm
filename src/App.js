import './App.css';
import React, { useState, useEffect } from 'react';
import {
  padding,
  chunkString,
  rotateRight,
  stringToBinary,
  binaryToString,
  binaryToHex,
  stringToHex,
  hexToString, hexToBinary
} from './classes/utils'

import MessageBlock from './components/MessageBlock';
import MessageSchedule from './components/MessageSchedule';
import { sha256 } from './classes/sha'
import Hs from './components/Hs';
import Constants from './components/Constants';

import MessageScheduleCalculation from './components/MessageScheduleCalculation';
import CompressionCalculation from './components/CompressionCalculation';
import ButtonBack from './components/ButtonBack';
import ButtonBackFast from './components/ButtonBackFast';
import ButtonInit from './components/ButtonBackInit';
import ButtonClock from './components/ButtonClock';
import ButtonClockFast from './components/ButtonClockFast';
import ButtonClockFinish from './components/ButtonClockFinish';
import ButtonAutoClock from './components/ButtonAutoClock';
import BeforeLetters from './components/BeforeLetters';
import Explainer from './components/Explainer';
import ReactGA from 'react-ga4';

let trackingId = 'G-VV5G126B1Q';
if(window.location.host === 'localhost:3000') trackingId = 'G-TT309BT8YX';
ReactGA.initialize(trackingId);
ReactGA.send('pageview');

function App() {
  // ... (all the state declarations remain the same)

  const k = [
    1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993,
    -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
    1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
    -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872,
    -1866530822, -1538233109, -1090935817, -965641998];

  // ... (all the useEffect hooks remain the same)

  // ... (all the handler functions remain the same)

  return (
    <div className="App font-mono text-xs text-indigo-300 px-2 leading-3 bg-gray-900 h-screen transition">
      <div className="flex flex-col lg:flex-row w-full mb-2">
        <div className="w-full">
          <div className="flex">
            <select value={inputBase} onChange={e => onInputBaseChange(e.target.value)} className="bg-gray-700 mt-2 py-2 px-3 rounded mr-2 cursor-pointer hover:bg-gray-600 transition">
              <option value="text">Text</option>
              <option value="bin">Bin</option>
              <option value="hex">Hex</option>
            </select>
            <input type="text" className="bg-gray-700 mt-2 w-full py-2 px-3 mr-2 rounded" value={input} onChange={e => onInputChange(e.target.value)} placeholder={inputPlaceholder}/>
            <select value={base} onChange={e => setBase(e.target.value)} className="bg-gray-700 my-2 py-2 px-3 rounded mr-2 cursor-pointer hover:bg-gray-600 transition hidden">
              <option value="hex">Hex</option>
              <option value="bin">Bin</option>
            </select>
          </div>
        </div>
        <div className="w-full mt-2 items-center flex">
          <ButtonInit onClockInit={onClockInit} clock={clock} />
          <ButtonBackFast onClockBackFast={onClockBackFast} clock={clock} />
          <ButtonBack onClockBack={onClockBack} clock={clock} />
          <ButtonClock onClock={onClock} clock={clock} lastClock={lastClock} />
          <ButtonAutoClock onAutoClock={onAutoClock} clock={clock} lastClock={lastClock} autoplay={autoplay} />
          <ButtonClockFast onClockFast={onClockFast} clock={clock} lastClock={lastClock} />
          <ButtonClockFinish onClockFinish={onClockFinish} clock={clock} lastClock={lastClock} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="px-3 py-2 bg-yellow-800 text-yellow-200 border border-yellow-200 rounded text-center m-4 text-sm leading-4 sm:hidden">Please visit this website on desktop :)</div>
        <div className="col pr-1 w-[290px]">
          <MessageBlock data={paddedInput} base={base} clock={cycleClock()} chunksLoop={chunksLoop(clock)}/>
          <Explainer clock={cycleClock()} masterClock={clock} input={input} inputBase={inputBase} chunksCount={chunksCount} lastClock={lastClock(clock)} />
        </div>
        <div className="col pr-">
            <MessageSchedule data={wView} base={base} labels={'w'} clock={cycleClock()} currentChunk={chunksLoop(clock)}/>
        </div>
        <div className="col pr-4">
          <div className="pr-4">
            <div>
              <BeforeLetters letters={lettersBefore} base={base} clock={cycleClock()} labels={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ]} />
              <Hs hs={hsBefore} base={base} clock={cycleClock()} />
              <MessageScheduleCalculation letters={letters} clock={cycleClock()} wView={wView} base={base} k={k}/>
              <CompressionCalculation letters={lettersBefore} clock={cycleClock()} wView={wView} base={base} k={k} flash={flash} lastClock={lastClock} hsBefore={hsBefore} hs={hs} masterClock={clock} result={result} />
            </div>
          </div>
        </div>
        <div className="col">
          <Constants k={k} clock={cycleClock()}/>
        </div>
      </div>
    </div>
  );
}

export default App;
