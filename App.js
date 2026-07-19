const { useState } = React;
const root = ReactDOM.createRoot(document.getElementById('root'));

function SukoonApp() {
  const [connected, setConnected] = useState(false);
  const [activeZone, setActiveZone] = useState('NONE');
  const [intensity, setIntensity] = useState(50);

  const connectBluetooth = async () => {
    try {
      await navigator.bluetooth.requestDevice({ filters: [{ name: 'SUKOON-PAD' }] });
      setConnected(true);
      alert("Device Connected!");
    } catch (err) {
      alert("Connection failed");
    }
  };

  const sendMassageCommand = (zone) => {
    if (!connected) return alert("Pehle device connect karein!");
    setActiveZone(zone);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-cyan-400">SUKOON-PAD</h1>
          <p className="text-xs text-neutral-500">PRO MASSAGE SYSTEM</p>
        </div>
        <button 
          onClick={connectBluetooth}
          className={`px-4 py-2 rounded-full border text-sm ${connected ? 'border-green-500 text-green-500' : 'border-cyan-500 text-cyan-400'}`}
        >
          🔵 {connected ? 'CONNECTED' : 'CONNECT'}
        </button>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {['HEAD','BACK','LEGS'].map(z => (
          <button 
            key={z}
            onClick={() => sendMassageCommand(z)}
            className={`p-6 rounded-2xl border ${activeZone === z ? 'bg-cyan-900 border-cyan-500' : 'bg-neutral-900 border-neutral-800'} flex-col items-center gap-2`}
          >
            <span className="text-3xl">{z==='HEAD'?'🧠':z==='BACK'?'👤':'🦶'}</span>
            <span className="font-bold text-sm">{z}</span>
          </button>
        ))}
      </div>

      <div className="bg-neutral-900 p-6 rounded-2xl mb-6">
        <label className="block mb-3 text-neutral-400">INTENSITY: {intensity}%</label>
        <input 
          type="range" 
          value={intensity} 
          onChange={(e) => setIntensity(e.target.value)}
          className="w-full h-2 bg-neutral-700 rounded-lg accent-cyan-500" 
        />
      </div>

      <div className="bg-neutral-900 p-6 rounded-2xl border-neutral-800">
        <h2 className="text-lg mb-4">LIVE STATUS</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Connection</span> <span className={connected ? 'text-green-500' : 'text-red-500'}>{connected ? 'ONLINE' : 'OFFLINE'}</span></div>
          <div className="flex justify-between"><span>Zone</span> <span className="text-cyan-400">{activeZone}</span></div>
        </div>
        <button 
          onClick={() => setActiveZone('NONE')}
          className="w-full mt-4 py-3 bg-red-600 rounded-xl font-bold"
        >
          STOP ALL
        </button>
      </div>
    </div>
  );
}

root.render(<SukoonApp />);
