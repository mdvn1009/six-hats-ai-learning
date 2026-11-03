// ---------- The six hats ----------
const hats = [
  {
    name: "White hat", role: "Facts", color: "var(--hat-white)",
    q: "What are the facts we have, and what facts do we still need?",
    groups: [
      { h: "What we know", i: [
        "The tool tracks progress, suggests content and alerts faculty about students at risk.",
        "The promise of better results is a claim from the seller, not yet a proven fact.",
        "Students and faculty have raised three concerns: privacy, over-reliance and bias."
      ]},
      { h: "What is missing", i: [
        "What data is collected, who can see it and how long it is kept.",
        "How the tool decides that a student is at risk.",
        "Independent results from colleges like ours.",
        "Whether students can opt out."
      ]}
    ]
  },
  {
    name: "Blue hat", role: "Process", color: "var(--hat-blue)",
    q: "What is our thinking process? How should we proceed?",
    groups: [
      { h: "Agenda", i: ["Decide whether the college should adopt the tool, and under what conditions."] },
      { h: "Order of hats", i: ["White, Blue, Red, Black, Yellow, Green."] },
      { h: "How we proceed", i: [
        "The question is not whether the tool is good. The question is whether the college can use it fairly and safely.",
        "Conclusions are drawn at the end and checked against real results."
      ]}
    ]
  },
  {
    name: "Red hat", role: "Feelings", color: "var(--hat-red)",
    q: "What is our gut reaction while trying to solve this problem?",
    groups: [
      { h: "As students", i: [
        "Being watched may stop us exploring topics out of curiosity.",
        "An at risk label can feel like a judgement, even when it is kind.",
        "If everyone uses the tool, saying no does not feel possible."
      ]},
      { h: "As faculty", i: [
        "Worry that our judgement of students counts for less than a score.",
        "Worry about being blamed if an alert is not acted on."
      ]},
      { h: "Will I be able to solve it?", i: ["Yes. The worry is about trust, and trust can be built with rules that are real."] }
    ]
  },
  {
    name: "Black hat", role: "Risks", color: "var(--hat-black)",
    q: "What are the potential downsides, problems and risks?",
    groups: [
      { h: "What could go wrong", i: [
        "Measuring the wrong thing: the tool sees marks, not a family problem or an illness.",
        "Self-fulfilling labels: a student marked at risk may be treated differently and lose confidence.",
        "Bias: the tool learns from past data and may judge differently prepared students as weaker.",
        "Wrong alerts: a false alarm labels a healthy student, and a missed alert ignores one who needs help.",
        "Gaming: students may chase the numbers instead of learning.",
        "Data that outlives its purpose, and a college locked in to one vendor."
      ]}
    ]
  },
  {
    name: "Yellow hat", role: "Benefits", color: "var(--hat-yellow)",
    q: "What value does it create for the case scenario?",
    groups: [
      { h: "What it could give us", i: [
        "Early notice of students who struggle quietly. This helps most when a person follows up.",
        "Practice at the right level, if the suggestions are accurate.",
        "A view across the class: if many fail one topic, the teaching may need to change.",
        "Students who can see their own progress and take charge of it.",
        "Tutoring and mentoring directed to where it is needed."
      ]},
      { h: "The honest summary", i: ["The tool does not create learning. It creates information about learning. Its value depends on what people do with it."] }
    ]
  },
  {
    name: "Green hat", role: "Ideas", color: "var(--hat-green)",
    q: "What is our primary plan? What is our alternative plan if it fails?",
    groups: [
      { h: "Primary plan", i: [
        "Pilot first, protect always: one semester, two departments, clear targets, strict privacy rules and a person making every final decision."
      ]},
      { h: "Alternative plan", i: [
        "Keep personalised content and switch off risk alerts.",
        "Let students use the tool privately.",
        "Choose another vendor or build a smaller tool in the college.",
        "Spend the money on more mentors and tutors."
      ]}
    ]
  }
];

const tabs = document.getElementById("tabs");
const panel = document.getElementById("panel");

function showHat(index) {
  const hat = hats[index];
  tabs.querySelectorAll("button").forEach((b, n) => {
    b.setAttribute("aria-selected", n === index ? "true" : "false");
    b.tabIndex = n === index ? 0 : -1;
  });
  panel.style.borderTopColor = hat.color === "var(--hat-white)" ? "var(--line)" : hat.color;
  panel.setAttribute("aria-label", hat.name);
  let html = '<p class="question">' + hat.q + "</p>";
  hat.groups.forEach(g => {
    html += "<h3>" + g.h + "</h3><ul>" + g.i.map(t => "<li>" + t + "</li>").join("") + "</ul>";
  });
  panel.innerHTML = html;
}

hats.forEach((hat, index) => {
  const b = document.createElement("button");
  b.type = "button";
  b.setAttribute("role", "tab");
  b.innerHTML = '<span class="swatch" style="background:' + hat.color + '"></span>' + hat.name + ": " + hat.role.toLowerCase();
  b.addEventListener("click", () => showHat(index));
  b.addEventListener("keydown", e => {
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % hats.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + hats.length) % hats.length;
    if (next !== null) { e.preventDefault(); showHat(next); tabs.children[next].focus(); }
  });
  tabs.appendChild(b);
});
showHat(0);

// ---------- The alert desk ----------
const outcomes = {
  auto: {
    cls: "bad",
    text: "Riya’s record now says at risk. In fact she was ill for two weeks and missed lab week. The label stays on her record, and some teachers begin to expect less from her."
  },
  human: {
    cls: "good",
    text: "Her faculty mentor talks to her and learns about the illness. A catch-up lab is arranged and no label is recorded. The alert did its job: it started a conversation."
  }
};

const outcome = document.getElementById("outcome");
const choiceButtons = document.querySelectorAll(".choices button");

choiceButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const o = outcomes[btn.dataset.choice];
    choiceButtons.forEach(b => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
    outcome.className = "outcome " + o.cls;
    outcome.textContent = o.text;
  });
});
