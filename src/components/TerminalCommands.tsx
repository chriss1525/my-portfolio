"use client";
import React, { useState, useRef, useEffect } from 'react';
import { experience } from '../data/experience';
import { skillsByCategory } from '../data/skills';

interface CommandRecord {
  input: string;
  output: React.ReactNode;
  dir: string;
}

const SkillScanner = () => {
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  const allSkills = useRef(Object.values(skillsByCategory).flat());

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < allSkills.current.length) {
        const nextSkill = allSkills.current[i];
        setVisibleSkills(prev => [...prev, nextSkill]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-terminal-green font-mono space-y-1 mt-2">
      <p className="animate-pulse font-bold text-terminal-amber">/usr/bin/skill-scanner --recursive</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-xs opacity-90">
        {visibleSkills.map((skill, idx) => (
          <p key={idx}><span className="text-terminal-amber mr-2">[OK]</span>{skill.padEnd(20, '.')}</p>
        ))}
      </div>
      {visibleSkills.length === allSkills.current.length && (
        <p className="text-terminal-white mt-2 border-t border-terminal-green/30 pt-2">
          Verification complete. All modules operational.
        </p>
      )}
    </div>
  );
};

const TerminalCommands = () => {
  const [history, setHistory] = useState<CommandRecord[]>([]);

  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);
  const [currentDir, setCurrentDir] = useState('~');
  
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
        </pre>
      </div>
    ),
    "📚 I have a massive soft spot for EdTech. Given my background in education, I see myself investing in and building for the EdTech space in the future to bridge my two passions.",
    "A certified language and literature nerd. I'll happily lose track of time tracing linguistic roots or deep-diving into the vibrant world of African literature. If you want to talk syntax, etymology, or storytelling, I'm your person!",
    "Writing is my second language. When I'm not coding, I'm likely drafting a Web3 tutorial or pouring my heart into a Substack piece. I find that clear writing leads to clear code."
  ];

  const experienceCount = useRef(0);
  const themeCount = useRef(1); // Start at 1 to immediately change from default Neon Green

  // Auto-scroll to bottom when new command is entered
  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = currentInput.trim();
    if (!trimmedInput) return;
    
    const parts = trimmedInput.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const promptLabel = `okoth@chriss:${currentDir}$`;
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
            <p>  <span className="text-terminal-amber">blogs</span>        - Read my technical and personal writing</p>
            <p>  <span className="text-terminal-amber">download</span>     - Securely download my CV</p>
            <p>  <span className="text-terminal-amber">theme</span>        - Change the terminal color scheme</p>
            <p>  <span className="text-terminal-amber">coffee</span>       - Brew a cup of coffee</p>
            <p>  <span className="text-terminal-amber">clear</span>        - Clear terminal output</p>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <p className="text-terminal-cyan">
            <span className="hidden sm:inline">{promptLabel} </span>
            {whoamiResponses[whoamiCount.current % whoamiResponses.length]}
          </p>
        );
        whoamiCount.current += 1;
        break;
      case 'funfact':
        output = (
          <div className="text-terminal-cyan flex items-start gap-2">
            <span className="shrink-0">{promptLabel}</span>
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
            <p>LinkedIn <a href= "linkedin.com/in/christine-okoth/" target="_blank" rel="noreferrer" className="text-terminal-amber">linkedin.com/in/christine-okoth/</a></p>
          </div>
        );
        break;
      case 'blogs':
        output = (
          <div className="text-terminal-cyan space-y-2">
            <p>I use words to build just as much as I use code. You can find my work here:</p>
            <p><span className="text-terminal-amber">Medium:</span> <a href="https://medium.com/@okothchris15" target="_blank" rel="noreferrer" className="underline">Technical Deep-dives & Web3 Tutorials</a></p>
            <p><span className="text-terminal-amber">Substack:</span> <a href="https://amadwoman.substack.com/" target="_blank" rel="noreferrer" className="underline">&quot;Musings of a Mad Woman&quot; - Heartfelt pieces & random thoughts</a></p>
            <p className="text-xs text-terminal-gray italic">Warning: The Substack contains high levels of honesty and zero semicolons.</p>
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
        if (args.length === 0) {
          output = <p className="text-terminal-red">rm: missing operand</p>;
        } else {
          const target = args[0].toLowerCase();
          if (target === 'experience.log') {
            output = <p className="text-terminal-red">rm: cannot remove &apos;experience.log&apos;: Deleting my past won&apos;t give me a future with you. Permission denied.</p>;
          } else if (target === 'christine_okoth.pdf') {
            output = <p className="text-terminal-red">rm: cannot remove &apos;christine_okoth.pdf&apos;: File is currently being read by a potential employer. Try again after I&apos;m hired!</p>;
          } else if (target === 'scan_skills.sh') {
            output = <p className="text-terminal-red">rm: cannot remove &apos;scan_skills.sh&apos;: Self-preservation protocol active. This script is too pretty to die.</p>;
          } else if (target.includes('blockchain') || target.includes('backend') || target.includes('frontend')) {
            output = <p className="text-terminal-red">rm: {target}: You&apos;re trying to delete my actual value. My brain says no.</p>;
          } else if (target === 'skills' || target === 'skills/') {
            output = <p className="text-terminal-red">rm: cannot remove &apos;skills/&apos;: Is a directory. Use rmdir (but please don&apos;t).</p>;
          } else {
            output = <p className="text-terminal-red">rm: cannot remove &apos;{target}&apos;: No such file or directory. Are you trying to delete my hopes and dreams?</p>;
          }
        }
        break;
      case 'rmdir':
        if (args.length === 0) {
          output = <p className="text-terminal-red">rmdir: missing operand</p>;
        } else {
          const target = args[0].toLowerCase().replace(/\/$/, '');
          if (target === 'skills') {
            output = (
              <div className="text-terminal-red space-y-1">
                <p>rmdir: failed to remove &apos;skills/&apos;: Directory not empty.</p>
                <p className="text-xs italic opacity-70">Also, why would you want to delete my talent? 😢</p>
              </div>
            );
          } else {
            output = <p className="text-terminal-red">rmdir: failed to remove &apos;{target}&apos;: No such directory.</p>;
          }
        }
        break;
      case 'cd':
        const dest = args[0]?.replace(/\/$/, '');
        if (dest === '..') {
          if (currentDir === '~/skills') {
            setCurrentDir('~');
          } else {
            // Already at home or root, just keep it at ~
            setCurrentDir('~');
          }
        } else if (!dest || dest === '~') {
          setCurrentDir('~');
        } else if (dest === 'skills' && currentDir === '~') {
          setCurrentDir('~/skills');
        } else {
          output = <p className="text-terminal-red">cd: {dest}: No such file or directory</p>;
        }
        break;
      case 'pwd':
        output = <p className="text-terminal-cyan">/home/okoth/chriss{currentDir === '~' ? '' : '/skills'}</p>;
        break;
      case 'ls':
        const lsTarget = args[0]?.replace(/\/$/, '').toLowerCase();
        if (lsTarget === 'skills' || (currentDir === '~/skills' && !lsTarget)) {
          output = (
            <div className="text-terminal-cyan flex flex-wrap gap-4">
              <span>blockchain.sol</span>
              <span>backend.ts</span>
              <span>frontend.tsx</span>
            </div>
          );
        } else if (!lsTarget && currentDir === '~') {
          output = (
            <div className="text-terminal-cyan flex flex-wrap gap-4">
              <span>experience.log</span>
              <span className="text-terminal-amber">skills/</span>
              <span>CHRISTINE_OKOTH.pdf</span>
              <span className="text-terminal-green">scan_skills.sh</span>
            </div>
          );
        } else {
          output = <p className="text-terminal-red">ls: cannot access &apos;{args[0]}&apos;: No such file or directory</p>;
        }
        break;
      case 'cat':
        if (args.length === 0) {
          output = <p className="text-terminal-red">Usage: cat [file]</p>;
        } else {
          const target = args[0].toLowerCase();
          const fileName = target.split('/').pop() || '';
          // Strip potential extensions for skill lookups
          const skillKey = fileName.replace(/\.(sol|ts|tsx|js|rs|md)$/, '');

          if (target === 'experience.log' || (target === 'experience' && currentDir === '~')) {
            output = (
              <div className="space-y-6 text-terminal-cyan mt-2 border-l border-terminal-green/20 pl-4">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <p className="text-terminal-amber font-bold underline">{exp.title}</p>
                    <p className="text-xs opacity-70 mb-1">{exp.link !== "#" ? exp.link : ""}</p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            );
          } else if (target === 'christine_okoth.pdf') {
            output = (
              <div className="text-terminal-cyan mt-2 border-l border-terminal-amber/30 pl-4 space-y-2">
                <p className="text-terminal-amber font-bold underline">[PDF CONTENT PREVIEW: CHRISTINE_OKOTH.pdf]</p>
                <p><span className="text-terminal-amber">Role:</span> Fullstack Software Engineer | Web3 Developer | Educator</p>
                <p><span className="text-terminal-amber">Summary:</span> Experienced engineer specialized in system architecture and blockchain integration. Passionate about building robust software that solves real-world problems and educating the next generation of Web3 developers.</p>
                <p><span className="text-terminal-amber">Contact:</span> okothchris15@gmail.com | github.com/chriss1525</p>
                <p className="text-xs opacity-50 italic mt-2">To get the full document, use the &apos;download&apos; command.</p>
              </div>
            );
          } else if (target === 'scan_skills.sh') {
            output = (
              <div className="text-terminal-green font-mono text-xs opacity-80">
                <p>#!/bin/bash</p>
                <p>echo &quot;Initializing skill verification...&quot;</p>
                <p># Recursive scan of all skill directories</p>
                <p>find ./skills -type f -exec cat {} \;</p>
              </div>
            );
          } else if (skillsByCategory[skillKey as keyof typeof skillsByCategory]) {
            const skills = skillsByCategory[skillKey as keyof typeof skillsByCategory];
            output = (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill: string) => (
                  <span key={skill} className="text-terminal-green border border-terminal-green/30 px-2 py-0.5 rounded text-xs">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            );
          } else if (target.includes('skill')) {
            output = <p className="text-terminal-red">cat: {args[0]}: Is a directory</p>;
          } else {
            output = <p className="text-terminal-red">cat: {args[0]}: No such file or directory</p>;
          }
        }
        break;
      case './scan_skills.sh':
        output = <SkillScanner />;
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
        output = <p className="text-terminal-red">Command not found: {cmd}. Type &apos;help&apos; for available commands.</p>;
    }

    setHistory(prev => [...prev, { input: trimmedInput, output, dir: currentDir }]);
    setCurrentInput('');
  };

  return (
    <div className="w-full flex flex-col font-mono cursor-text" onClick={() => inputRef.current?.focus()}>
      <div className="mb-4">
        <p className="text-terminal-gray text-sm">
          {'>'} Boot sequence complete. Handing over to interactive shell...
        </p>
        <p className="text-terminal-gray text-sm mt-1">
          {'>'} System ready. <span className="text-terminal-cyan animate-pulse">Type a command below and press Enter. (try &apos;help&apos;)</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 max-h-[250px] pr-2">
          {history.map((record, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center text-terminal-green">
                <span className="mr-2">okoth@chriss:{record.dir}$</span>
                <span>{record.input}</span>
              </div>
              <div className="ml-4">
                {record.output}
              </div>
            </div>
          ))}

          <form onSubmit={handleCommandSubmit} className="flex items-center text-terminal-green mt-4">
            <span className="mr-2">okoth@chriss:{currentDir}$</span>
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
