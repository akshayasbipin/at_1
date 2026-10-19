# Project Log: I Let My Hormones Run My To-Do List, and They’re a Better Manager Than Me

*Winter Arc, Entry 003*
 
For this winter arc, i decided to work on the "engineering" part of my life, and tried to combine my tasks with my period tracker (in hopes that i can decide which task to take up).
 
Let me explain.
 
## The problem
 
My to-do list had no idea who I was. On Monday it asked me to learn a new framework. On Tuesday, to film a reel with high energy. On the Thursday before my period, it asked me to *make big decisions*. 
 
Meanwhile, my body runs on a monthly schedule more reliable than any JIRA sprint I've worked under. So I thought: what if the planner just... listened?
 
## Day 1 is a volcano
 
The whole system hangs on one emoji. When my period starts, I add 🌋 to a calendar called `Cycle`. That event is **day 1**. Everything else is calculated from it:
 
- cycle length: the average gap between my last few 🌋s
- today's day number
- ovulation: roughly cycle length minus 14
Tiny emoji, enormous power. Three volcanoes in my calendar and my entire week reorganizes itself.
 
## Five seasons of me
 
The script sorts every day into one of five phases, and each one has a personality:
 
| Phase | Vibe | What the planner wants from me |
|---|---|---|
| 🩸 Menstrual | The Reset | Maintenance, review, light admin. Hydrate. Fewer commitments. |
| 🌱 Follicular | The Climb | Deep learning, hard problems, brainstorming. |
| ☀️ Ovulation | The Spotlight | Reels, collaboration, being visible. |
| 🍂 Early luteal | The Grind | Finish things. Methodical, slightly obsessive accountant brain. |
| 🌙 Late luteal | The Tidy | Admin and wrap-up. **No big decisions.** |
 
 
Each phase also comes with a body briefing: where cramps tend to show up, when I'm likely strongest physically or mentally, a journal prompt, and a yoga video search. It is basically a weather forecast for my own head.
 
## The scoring function
 
Every open task in my Google Tasks list gets a score, and the highest scores make today's plan. Points come from:
 
- **Category fit.** Tasks are `deep`, `creative`, `admin`, `review` or `maintenance`. A `maintenance` task in my menstrual phase scores big. A `deep` task there scores nothing.
- **Tags.** `#must-do` is +60. `#urgent` is +50. `#optional` is a gentle -15, like a sigh.
- **Deadlines.** Overdue tasks get +70, a polite scream from the past.
- **Time budget.** The day has a 120-minute budget. After the first task, anything that would blow the budget stays out. The first task always gets in, so the planner can never hand me an empty day.
The result is a plan with one to five tasks, depending on the phase. Late luteal gets three, because I deserve mercy. Follicular gets five, because I'm feeling invincible and need adult supervision.

Although as an addition, i can add an LLM to add the category, duration and tags if required so i dont have to think so much, but the free google models seem to always through traffic error. Until i can afford to buy a subscription or find a way to integrate my local LLM to this google script flow, i will use my brain.

![](/blog-images/post-4-image2.png)
 
## The bugs, a short horror anthology
 
**The AI that wasn't.** I wanted an LLM to sort my tasks. Google's free model replied with a 404 (retired, new model name please), then with a 503 telling me it was experiencing "high demand". Three retries later, the verdict was still *high demand*. So the final version has **no AI in it at all**. It is regular expressions, i.e, whole-word matching. My "smart" planner is regex all the way down.
 
**The word-matching crimes.** An early version matched pieces of words. It would have filed "credit card bill" under *creative*, because "credit" contains "edit". Whole-word matching fixed that. My real task list went from about half-right to correct, mostly by teaching it words like `otel`, `sdk` and `databricks` (yes, word-to-word match).
 
**The lazy shortcut.** If the keyword guesser gets a task wrong, I just type the bucket first: `deep: databricks certification`. It's the most low-tech override in the system and the one I use most.
 
## What it looks like day to day
 
One calendar event per day, in a calendar called `Cycle Plan`. The title says something like *🍂 EARLY LUTEAL · Day 17 · 5 tasks*. The description holds the checklist and the body notes. The widget on my phone shows the title, I tap for details, and every 30 minutes the script quietly checks whether my life has changed. It runs on Google's servers, so my laptop can be off and my phone can be dead. It doesn't care.
 
## What I actually learned
 
1. **Over-engineering is a love language.** Nobody needed this. I needed it.
2. **Free tools are enough.** Apps Script, Calendar, Tasks. No server, no database, no bill (I already have this in abundance).
3. **Forecasts beat willpower.** Knowing it's a low-energy week lets me plan around it instead of calling it laziness.
My cycle is a schedule I've been running on the whole time. I just finally wrote it down.
 
*(Not medical advice. The phases are estimates from averages. Day 1 is exact, and everything after it is a good guess. It is just an experiment-ish)*
 
![](/blog-images/post-4-image1.png)
