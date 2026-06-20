<div align="center">

# 🏛️ LLM Colosseum

### Where language models battle for the crown in antiquity.

**Four LLMs. One map. One winner.**
A browser-based, Age-of-Empires-style real-time strategy game in which competing language models play *against each other* — while you watch, coach, and score them.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![No build step](https://img.shields.io/badge/build-none%20required-success)
![Three.js](https://img.shields.io/badge/three.js-r128-blue)
![Providers](https://img.shields.io/badge/providers-OpenAI%20%C2%B7%20Anthropic%20%C2%B7%20Ollama%20%C2%B7%20Google-purple)

</div>

---

## What is this?

LLM Colosseum is a **sandbox arena for pitting language models against one another** at a task they were never trained for: running an economy and an army, in real time, inside a small RTS they've never seen.

It is **not** a leaderboard, not a peer-reviewed benchmark, and makes no claim to statistical rigor. It is a *hands-on, non-scientific testbed* — a fun, surprisingly revealing way to watch how different models behave when you drop them into an **unfamiliar framework** and ask them to **act**, not chat.

Each model is handed:

- a compact **JSON snapshot** of its situation every turn (resources, buildings, units, fog-of-war discoveries, threats, tech tree, the map bounds…),
- a **fixed set of tools** (`train_unit`, `build_structure`, `research_tech`, `upgrade_age`, `attack_target`, `explore`, …),
- and a single instruction: **win.**

Then it has to keep doing that, turn after turn, for an entire match.

## Why it's an interesting (if unscientific) eval

Most quick LLM demos reward a single clever answer. A full match of LLM Colosseum rewards something harder, and it stresses exactly the capabilities people care about in agents:

- **🎯 Precise tool calling under pressure.** Every move must be a single, valid JSON action with the right parameters. Hallucinate a tool, fumble the schema, or wrap it in prose and the turn is wasted. You can literally *watch* a model's format discipline hold or crumble.
- **🧭 Operating in a loose, unfamiliar framework.** There's no fine-tuning, no examples of "good play." The model only has the rules in its system prompt and the state in front of it. Can it infer a working strategy for a system it has never encountered?
- **🧠 Long-context, long-horizon strategy.** Economy → technology → military → conquest is a chain that plays out over dozens of turns. Models that optimize their economy forever and never build an army lose. Models that remember their plan, adapt to scouting, and convert resources into pressure win.
- **🔁 Error recovery.** When an action is rejected, the model gets a precise reason back (e.g. *"barracks not built yet — research it first"*). Does it correct course, or bang on the same locked door?
- **🗺️ Spatial & resource reasoning.** Fog of war hides the map. Resources and enemies must be **scouted** before they can be used or attacked. Good play means exploring, not guessing.
- **⏱️ Latency vs. quality.** Each model runs its **own independent loop** — faster models simply act more often. A brilliant-but-slow model can be out-tempoed by a decent-but-fast one, just like in the real world.

You won't get a p-value. You *will* get an immediate, visceral feel for which models can actually *play*.

## ✨ Features

- **🤖 4 models, fighting live** — each on its own asynchronous decision pipeline, so faster models genuinely move more often.
- **🔌 Bring any model** — OpenAI-compatible (OpenAI, vLLM, LM Studio, LiteLLM, Groq, OpenRouter, …), **Anthropic**, **Ollama**, and **Google (Gemini)**, with auto-detection. Mix local and cloud in the same match.
- **🔐 Every auth style** — none, API key (Bearer), header secret, Basic, or OAuth2 (paste a token or fetch via client-credentials).
- **🧰 Model library** — add, **test connection**, pick the served model, set per-model **max tokens** and **reasoning language**. Saved locally and **exportable/importable** as a file.
- **📝 Per-player system prompts** — give each seat its own brain (aggressive vs. economic, terse vs. verbose) from one editable template, and watch the styles collide.
- **🛰️ Live spectator dashboard** — a ranked leaderboard, a streaming **decision log** (every move + the model's stated reason, rejected actions flagged), per-model **advice chat**, and **play/pause** for any model (handy when one hits a quota).
- **📊 End-of-match model evaluation** — latency, decision count, action-success rate, JSON format fidelity, reasoning rate, error breakdown, behavior tags, and a transparent 0–100 **strategy score**.
- **🌍 Fully localized UI** — English, German, Spanish, Simplified Chinese — with the **model's** language chosen **separately** from the interface language.
- **🎮 Also human-playable** — Standard / Hard skirmishes and a Campaign vs. the built-in rule-based AI.
- **🚫 No build step** — it's plain HTML/CSS/JS + Three.js from a CDN. Clone, serve, play.

## 🚀 Quick start

No install, no bundler. You just need to serve the folder over HTTP (the app uses `fetch`, so opening `index.html` from `file://` won't work).

```bash
git clone https://github.com/asp67/llm-colosseum.git
cd llm-colosseum

# pick any static server:
npx http-server . -p 8080 -o          # Node
# python3 -m http.server 8080         # Python
# php -S localhost:8080               # PHP
```

Then open **http://localhost:8080** and click **Play → 🏟️ Arena**.

> 💡 **Fastest path to a match:** install [Ollama](https://ollama.com), pull a small, quick model (`ollama pull qwen2.5:7b`), and point a couple of arena seats at `http://localhost:11434`. Small + fast beats large + slow in a real-time arena.

## 🏟️ Setting up the Arena

1. **Model Library** → add your models. For each: set the **endpoint**, pick the **protocol/provider** (or leave on auto-detect), choose an **auth** method, hit **🔌 Test connection**, and select the served model. Optionally set **max tokens** and the **model language**.
2. **Arena participants** → for each of the 4 seats choose a **civilization** and a **controller** (one of your models, or the rule-based AI).
3. **System prompt** → tweak the shared template, or give individual seats their own prompt.
4. **⚔️ Start Arena** and watch.

While spectating you can **click a card** to fly the camera to that base, **drag** to pan, send a model **advice**, or **pause** a model entirely.

## 🧮 How a model is scored

The match-end **Strategy Score** (0–100) is a transparent composite — no black box:

| Weight | Factor |
|:---:|---|
| 34% | Action success rate (valid, accepted moves) |
| 20% | Progression (age advanced · buildings · military) |
| 18% | Format fidelity (well-formed JSON the engine could parse) |
| 15% | Reliability (no timeouts / network errors) |
| 13% | Action diversity (used the toolset, didn't loop one move) |

Alongside it you get raw stats — average/min/max latency, decisions made, success ratio, reasoning rate, and a full **error breakdown** (timeouts · parse fails · invalid actions · rejected) — plus quick **behavior tags** like *Aggressive*, *Economy-focused*, *Format issues*, or *Invents actions*.

## 🛠️ How it works

```
Browser (no backend)
├── Three.js (r128, via CDN)  — renders the 3D world
├── Game engine               — economy, combat, fog of war, ages, win conditions
├── Provider adapters         — OpenAI / Anthropic / Ollama / Google request shaping + auth
└── Per-model agent loop       — builds the JSON game-state, calls the model, parses ONE action,
                                 applies it, feeds the result back next turn
```

Each turn a model receives a structured snapshot and must return exactly one action:

```json
{ "action": "build_structure", "params": { "buildingType": "barracks", "reason": "need infantry to pressure the leader" } }
```

The engine validates it against the **advancement chain** (advance → research → build → resources → train) and returns a precise, actionable error if it can't be done — which becomes part of the model's context on the next turn. The full state contract is in [`game-state-schema.json`](game-state-schema.json).

**Action set:** `train_worker` · `train_unit` · `research_tech` · `upgrade_age` · `build_structure` · `build_wonder` · `harvest_resource` · `assign_workers` · `explore` · `move_units` · `attack_target` · `delete_unit` · `destroy_building` · `wait`.

## ⚔️ Game rules in a nutshell

- **Win** by either razing the **Town Centers of every** rival, **or** building a **Wonder** and holding it for the countdown.
- **Advance the ages** — Stone → Neolithic → Bronze → Iron — to unlock stronger units, tech, and (eventually) the Wonder. Buildings get an epoch-appropriate look and +50% HP per age.
- **Economy first, but not forever:** workers gather food/wood/stone/gold; houses raise the population cap (hard cap 100).
- **Counters:** cavalry > ranged > infantry > cavalry; infantry raze buildings best; towers defend.
- **Fog of war:** scout to reveal resources and enemies — a model can't harvest or attack what it hasn't discovered.
- **4 civilizations** — Egyptians, Greeks, Persians, Yamato — each with a unique bonus and Wonder.

## 🔒 Privacy & security

This is a **fully client-side** app with no backend of its own.

- API keys and other secrets you enter live in your **browser's `localStorage`** and are sent **directly from your browser** to the endpoints you configure — nothing is proxied through any third party.
- That's fine for **local, single-user testing**. Don't enter credentials on a shared or public machine, and scope/limit any keys you use.
- **Exporting** the model catalogue writes a JSON file that contains your keys **in plain text** (the app warns you). Keep that file private — never share it or commit it. (`*.secrets.json`, `llm-colosseum-models.json`, and `arenaConfig*.json` are git-ignored by default.)

## 🌍 Languages

The **interface** ships in English, German, Spanish, and Simplified Chinese. Separately, each **model** has its own language for how it reasons and writes its `reason` field — so you can run, say, a Chinese UI with English-thinking models, or vice versa. Defaults are English / English.

## 📁 Project structure

```
index.html              # screens, HUD, arena & library UI
css/styles.css          # all styling
js/
├── game.js             # core loop, economy, combat, win conditions
├── openai-ai.js        # LLM arena harness: provider adapters, agent loop, metrics
├── ai.js               # rule-based AI opponent
├── ui.js               # menus, model library, spectator dashboard
├── renderer.js         # Three.js scene, meshes, camera
├── i18n.js             # 4-language UI dictionary + game-content translations
├── civilizations.js    # civs, units, buildings, tech trees
├── buildings.js / units.js / resources.js / terrain.js / fogofwar.js / input.js
game-state-schema.json  # the JSON contract handed to every model each turn
```

## 🧰 Tech stack

Plain **HTML + CSS + JavaScript**, **Three.js r128** loaded from a CDN. No framework, no bundler, no transpile step. Cache-busting is done with a `?v=` query on each script tag.

## ⚠️ Disclaimers

- **Non-scientific.** This is a toy for intuition and entertainment, not a benchmark. Sample sizes are tiny, maps are random, and tempo (latency) heavily influences outcomes. Don't cite match results as model capability.
- **Not affiliated** with LMSYS / Chatbot Arena, OpenAI, Anthropic, Google, or any model provider. "LLM Colosseum" is just a fitting name for models fighting in an ancient arena.
- Built as a hobby project, with a generous assist from AI pair-programming.

## 🤝 Contributing

Issues and PRs welcome — new providers, civilizations, balance tweaks, better metrics, or translations. Keep it dependency-free and build-step-free where possible.

## 📜 License

[MIT](LICENSE) © 2026 asp67

---

<div align="center">
Made for the simple joy of watching language models try to out-think each other.
</div>
