"use client";
import React, { useState, useRef, useEffect } from 'react';
import { experience } from '../data/experience';

interface CommandRecord {
  input: string;
  output: React.ReactNode;
}

const TerminalCommands = () => {
  const [history, setHistory] = useState<CommandRecord[]>([]);

  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);
  
  // State to cycle through whoami responses
  const whoamiCount = useRef(0);
  const whoamiResponses = [
    "Dynamic Fullstack Developer excelling in system architecture and blockchain integration.",
    "Expert in Rust, Typescript, and smart contracts, delivering innovative, user-centric solutions.",
    "A Web3 teacher passionate about introducing newbies into the expansive world of blockchain.",
    "A critical thinker driving project success, with a soft spot for crossing Web3 with real-world utility."
  ];

  // State to cycle through fun facts
  const funfactCount = useRef(0);
  const funfactResponses: React.ReactNode[] = [
    "I studied Education with the intent to become a Language & Literature teacher.",
    "I started my tech journey in instructional design, laid my dev foundations at ALX, and somehow found myself building backend systems as a self-taught dev!",
    (
      <div key="music" className="flex flex-col">
        <span>🎵 I have a deep love for music and used to be a vocalist! 🎤</span>
        <pre className="text-terminal-amber text-xs leading-tight mt-2">
          {`
      _
     / \\
     | |
     | |
    /   \\
   |  o  |
   |     |
    \\___/
          `}
        </pre>
      </div>
    ),
    "📚 I have a massive soft spot for EdTech. Given my background in education, I see myself investing in and building for the EdTech space in the future to bridge my two passions."
  ];

  const experienceCount = useRef(0);
  const themeCount = useRef(1); // Start at 1 to immediately change from default Neon Green

  // Auto-scroll to bottom when new command is entered
  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCmd = currentInput.trim();
    if (!fullCmd) return;
    const cmd = fullCmd.toLowerCase().split(' ')[0];

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-terminal-cyan space-y-1">
            <p>Available commands:</p>
            <p>  <span className="text-terminal-amber">whoami</span>       - Display summary (try multiple times!)</p>
            <p>  <span className="text-terminal-amber">experience</span>   - View my work history (try multiple times!)</p>
            <p>  <span className="text-terminal-amber">skills</span>       - List core technologies</p>
            <p>  <span className="text-terminal-amber">funfact</span>      - Discover random things about me</p>
            <p>  <span className="text-terminal-amber">contact</span>      - Show contact information</p>
            <p>  <span className="text-terminal-amber">download</span>     - Securely download my CV</p>
            <p>  <span className="text-terminal-amber">theme</span>        - Change the terminal color scheme</p>
            <p>  <span className="text-terminal-amber">coffee</span>       - Brew a cup of coffee</p>
            <p>  <span className="text-terminal-amber">clear</span>        - Clear terminal output</p>
          </div>
        );
        break;
      case 'whoami':
        output = <p className="text-terminal-cyan">chriss@blockchain-developer:~$ {whoamiResponses[whoamiCount.current % whoamiResponses.length]}</p>;
        whoamiCount.current += 1;
        break;
      case 'funfact':
        output = (
          <div className="text-terminal-cyan flex items-start gap-2">
            <span className="shrink-0">chriss@blockchain-developer:~$</span>
            <div>{funfactResponses[funfactCount.current % funfactResponses.length]}</div>
          </div>
        );
        funfactCount.current += 1;
        break;
      case 'experience':
        const currentExp = experience[experienceCount.current % experience.length];
        output = (
          <div className="text-terminal-cyan mb-2">
            <p className="text-terminal-amber">{currentExp.title}</p>
            {currentExp.link !== "#" && (
              <p>
                <a href={currentExp.link} target="_blank" rel="noreferrer" className="text-terminal-cyan hover:text-terminal-white hover:underline">
                  [Visit Project]
                </a>
              </p>
            )}
            <div className="space-y-1 mt-2 text-terminal-gray">
              {currentExp.description.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        );
        experienceCount.current += 1;
        break;
      case 'skills':
        output = (
          <div className="text-terminal-cyan">
            <p>drwxr-xr-x  blockchain/  (Rust, Solidity, ICP, EVM L2s)</p>
            <p>drwxr-xr-x  backend/     (Node.js, Microservices, APIs, DBs)</p>
            <p>drwxr-xr-x  frontend/    (TypeScript, React, Next.js)</p>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="text-terminal-cyan">
            <p>Email:    <a href="mailto:okothchris15@gmail.com" className="text-terminal-amber hover:underline">okothchris15@gmail.com</a></p>
            <p>GitHub:   <a href="https://github.com/chriss1525" target="_blank" rel="noreferrer" className="text-terminal-amber hover:underline">github.com/chriss1525</a></p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setCurrentInput('');
        return;
      case 'sudo':
        output = <p className="text-terminal-red">chriss is not in the sudoers file. This incident will be reported.</p>;
        break;
      case 'rm':
        output = <p className="text-terminal-red">Nice try. I kind of need those files to get hired.</p>;
        break;
      case 'ls':
        output = (
          <div className="text-terminal-cyan flex flex-wrap gap-4">
            <span>experience.log</span>
            <span className="text-terminal-amber">skills/</span>
            <span>CHRISTINE_OKOTH.pdf</span>
            <span className="text-terminal-green">scan_skills.sh</span>
          </div>
        );
        break;
      case 'download':
        output = (
          <div className="text-terminal-cyan">
            <p>Initiating download sequence...</p>
            <p className="text-terminal-green animate-pulse mt-1">Downloading CHRISTINE_OKOTH.pdf...</p>
          </div>
        );
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = '/CHRISTINE_OKOTH.pdf';
          link.download = 'CHRISTINE_OKOTH.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 800);
        break;
      case 'theme':
        const themes = [
          { name: 'Neon Green', hex: '#00ff00' },
          { name: 'Cyberpunk Magenta', hex: '#ff00ff' },
          { name: 'Electric Cyan', hex: '#00ffff' },
          { name: 'Terminal Amber', hex: '#ffb000' },
          { name: 'Hacker Red', hex: '#ff0000' }
        ];
        const nextTheme = themes[themeCount.current % themes.length];
        document.documentElement.style.setProperty('--terminal-green', nextTheme.hex);
        output = <p style={{ color: nextTheme.hex }}>Theme successfully updated to {nextTheme.name}!</p>;
        themeCount.current += 1;
        break;
      case 'coffee':
        output = (
          <pre className="text-terminal-amber text-xs leading-tight">
            {`
  (  )   (   )  )
   ) (   )  (  (
   ( )  (    ) )
   _____________
  <_____________> ___
  |             |/ _ \\
  |               | | |
  |               |_| |
 ___|             |\\___/
/    \\___________/    \\
\\_____________________/
            `}
          </pre>
        );
        break;
      default:
        output = <p className="text-terminal-red">Command not found: {cmd}. Type 'help' for available commands.</p>;
    }

    setHistory(prev => [...prev, { input: fullCmd, output }]);
    setCurrentInput('');
  };

  return (
    <div className="w-full flex flex-col font-mono cursor-text" onClick={() => inputRef.current?.focus()}>
      <div className="mb-4">
        <p className="text-terminal-gray text-sm">
          {'>'} Boot sequence complete. Handing over to interactive shell...
        </p>
        <p className="text-terminal-gray text-sm mt-1">
          {'>'} System ready. <span className="text-terminal-cyan animate-pulse">Type a command below and press Enter. (try 'help')</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 max-h-[250px] pr-2">
          {history.map((record, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center text-terminal-green">
                <span className="mr-2">~/chriss $</span>
                <span>{record.input}</span>
              </div>
              <div className="ml-4">
                {record.output}
              </div>
            </div>
          ))}

          <form onSubmit={handleCommandSubmit} className="flex items-center text-terminal-green mt-4">
            <span className="mr-2">~/chriss $</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-terminal-green font-mono caret-terminal-green"
              autoFocus
              autoComplete="off"
              spellCheck="false"
              placeholder="Type 'help'..."
            />
          </form>
          <div ref={endOfTerminalRef} />
        </div>
    </div>
  );
};

export default TerminalCommands;
