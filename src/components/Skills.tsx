"use client";
import { useState, useEffect, useRef } from 'react';
import { skillsByCategory } from "../data/skills";
import Typewriter from './Typewriter';

export default function Skills() {
  const [showCommand, setShowCommand] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState<{[key: string]: boolean}>({});
  const [showProgress, setShowProgress] = useState<{[key: string]: boolean}>({});
  const [showSkills, setShowSkills] = useState<{[key: string]: number}>({});
  const [progressPercent, setProgressPercent] = useState<{[key: string]: number}>({});
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = Object.entries(skillsByCategory);

  // Intersection Observer to trigger when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            setTimeout(() => setShowCommand(true), 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  const startLoadingSequence = () => {
    let categoryIndex = 0;
    
    const processNextCategory = () => {
      if (categoryIndex < categories.length) {
        const [category] = categories[categoryIndex];
        
        // Step 1: Show scanning text first
        setLoadingSkills(prev => ({ ...prev, [category]: true }));
        
        categoryIndex++;
        
        // Move to next category after current one completes
        // This will be called after skills finish loading
        setTimeout(processNextCategory, 3000); // Give time for skills to load
      }
    };
    
    processNextCategory();
  };
  
  const onScanningComplete = (category: string) => {
    // Step 2: Show progress bar immediately after scanning text completes
    setShowProgress(prev => ({ ...prev, [category]: true }));
    
    // Step 3: Start loading skills right after
    setTimeout(() => {
      loadSkillsSequentially(category);
    }, 200);
  };

  const loadSkillsSequentially = (category: string) => {
    const skills = skillsByCategory[category as keyof typeof skillsByCategory];
    let count = 0;
    
    const loadNextSkill = () => {
      if (count < skills.length) {
        count++;
        setShowSkills(prev => ({ ...prev, [category]: count }));
        
        // Update progress percentage
        const percent = Math.round((count / skills.length) * 100);
        setProgressPercent(prev => ({ ...prev, [category]: percent }));
        
        // If this is the last skill, hide progress bar after a short delay
        if (count === skills.length) {
          setTimeout(() => {
            setShowProgress(prev => ({ ...prev, [category]: false }));
          }, 300);
        }
        
        setTimeout(loadNextSkill, 200); // 200ms between each skill
      }
    };
    
    loadNextSkill(); // Start immediately
  };

  return (
    <section ref={sectionRef} id="skills" className="w-full px-6 md:px-16 py-16 bg-terminal-bg">
      <div className="max-w-4xl mx-auto terminal-window p-6">
        {/* Command prompt */}
        <div className="mb-8">
          {showCommand && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-terminal-green font-mono">$</span>
              <Typewriter
                text="./scan_skills.sh --verbose"
                speed={25}
                showCursor={false}
                onComplete={() => setTimeout(startLoadingSequence, 300)}
                className="text-terminal-green"
              />
            </div>
          )}
        </div>

        {/* Loading sequence */}
        {Object.keys(loadingSkills).length > 0 && (
          <div className="space-y-6">
            {categories.map(([category, skills], categoryIndex) => (
              <div key={category}>
                {loadingSkills[category] && (
                  <div className="space-y-3">
                    {/* Category header with loading */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-terminal-amber font-mono">[{categoryIndex + 1}/{categories.length}]</span>
                      <Typewriter
                        text={`Scanning ${category}/ directory...`}
                        speed={8}
                        showCursor={false}
                        className="text-terminal-cyan"
                        delay={100}
                        onComplete={() => onScanningComplete(category)}
                      />
                    </div>

                    {/* Progress bar - only show when showProgress is true */}
                    {showProgress[category] && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-terminal-gray font-mono text-sm">Progress:</span>
                        <div className="flex-1 bg-black/60 border border-terminal-green/30 rounded h-2 overflow-hidden">
                          <div 
                            className="h-full bg-terminal-green transition-all duration-200 ease-out"
                            style={{
                              width: `${progressPercent[category] || 0}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-terminal-green font-mono text-sm">{progressPercent[category] || 0}%</span>
                      </div>
                    )}

                    {/* Skills display */}
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-terminal-gray font-mono">./</span>
                        <h3 className="text-xl md:text-2xl font-mono text-terminal-amber capitalize">
                          {category}
                        </h3>
                        <span className="text-terminal-gray font-mono text-sm">({skills.length} items)</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {skills.slice(0, showSkills[category] || 0).map((skill) => (
                          <div
                            key={skill}
                            className="font-mono text-sm text-terminal-green bg-black/60 border border-terminal-green/40 px-3 py-1.5 rounded hover:bg-black/80 hover:border-terminal-amber/60 hover:text-terminal-amber transition-all duration-300 hover:shadow-[0_0_8px_rgba(0,255,0,0.3)] cursor-default"
                            style={{
                              animation: 'fadeInScale 0.3s ease-out forwards'
                            }}
                          >
                            ✓ {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Completion message */}
            {Object.keys(loadingSkills).length === categories.length && (
              <div className="mt-8 p-4 border border-terminal-green/50 rounded bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="text-terminal-green font-mono">✅</span>
                  <Typewriter
                    text="Skill scan completed successfully! Ready for deployment."
                    speed={20}
                    showCursor={false}
                    className="text-terminal-green"
                    delay={500}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes fadeInScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
