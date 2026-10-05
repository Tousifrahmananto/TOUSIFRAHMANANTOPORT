import { useRef, useState } from "react";
import { skillGroups } from "./skillData";

export default function Skills({ onProjectLink }: { onProjectLink: () => void }) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(skillGroups[0].items[0].name);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = skillGroups[groupIndex];
  const select = (index: number) => {
    setGroupIndex(index);
    setExpanded(skillGroups[index].items[0].name);
  };
  return (
    <section id="skills" className="skills section-shell" aria-labelledby="skills-title">
      <div className="section-heading">
        <div><h2 id="skills-title">The skills behind the work.</h2></div>
        <p>Choose an area then open a skill to see how it connects to my projects, teaching or research.</p>
      </div>
      <div className="skills-layout">
        <div className="skills-tabs" role="tablist" aria-label="Skill areas">
          {skillGroups.map((item, index) => (
            <button key={item.id} ref={(node) => { tabs.current[index] = node; }}
              id={`skill-tab-${item.id}`} role="tab" type="button"
              aria-selected={index === groupIndex} aria-controls="skills-panel"
              tabIndex={index === groupIndex ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % skillGroups.length;
                else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + skillGroups.length) % skillGroups.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = skillGroups.length - 1;
                else return;
                event.preventDefault();
                select(next);
                tabs.current[next]?.focus();
              }}>
              <span>{item.title}</span><span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
        <div key={group.id} id="skills-panel" role="tabpanel"
          aria-labelledby={`skill-tab-${group.id}`} className="skills-panel">
          <h3>{group.title}</h3>
          <p className="skills-intro">{group.intro}</p>
          <div className="skills-list">
            {group.items.map((item, index) => {
              const open = expanded === item.name;
              const id = `skill-${group.id}-${index}`;
              return (
                <div className="skill-row" key={item.name}>
                  <h4><button type="button" aria-expanded={open} aria-controls={`${id}-detail`}
                    id={id} onClick={() => setExpanded(open ? null : item.name)}>
                    {item.name}<span aria-hidden="true">{open ? "−" : "+"}</span>
                  </button></h4>
                  <div id={`${id}-detail`} role="region" aria-labelledby={id} hidden={!open} className="skill-detail">
                    <p>{item.description}</p>
                    <a className="text-link" href={item.evidence.href}
                      onClick={() => { if (item.evidence.href.startsWith("#project-")) onProjectLink(); }}
                      {...(item.evidence.href.startsWith("/") || item.evidence.href.startsWith("https:")
                        ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {item.evidence.label}<span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

