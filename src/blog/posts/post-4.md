# Project Log: I Let My Hormones Run My To-Do List, and They’re a Better Manager Than Me

*Winter Arc, Entry 003*
 
Most people start their winter arc with a gym membership. I started mine by making my to-do list read my period from a calendar.
 
Let me explain.
 
## The problem
 
My to-do list had no idea who I was. On Monday it asked me to learn a new framework. On Tuesday, to film a reel with high energy. On the Thursday before my period, it asked me to *make big decisions*. 
 
Meanwhile, my body runs on a monthly schedule more reliable than any Jira sprint I've worked under. So I thought: what if the planner just... listened?
 
## Day 1 is a volcano
 
The whole system hangs on one emoji. When my period starts, I add 🌋 to a calendar called `Cycle`. That event is **day 1**. Everything else is calculated from it:
 
- cycle length: the average gap between my last few 🌋s
- today's day number
- ovulation: roughly cycle length minus 14
Tiny emoji, enormous power. Three volcanoes in my calendar and my entire week reorganizes itself.

## Five buckets for every task
 
A planner that knows my phase is useless if it can't tell what kind of work a task is. So every task lands in one of five buckets:
 
| Bucket | What lives in it | Example from my actual list |
|---|---|---|
| 🧠 `deep` | Long, focused thinking: coding, building, studying, certifications | Databricks GenAI certification, OTel libs, this very planner |
| 🎬 `creative` | Things other people will see: reels, writing, editing, designing | A reel about how I built this system |
| 📋 `admin` | Chores and errands that need almost no brainpower | Sell old phone, bank stuff, resume tweaks |
| 🔍 `review` | Looking back or planning ahead: revising, reflecting, journaling | Redo my interview doc in STAR format |
| 🧘 `maintenance` | Looking after the machine: yoga, stretching, walks, tidying, rest | Gentle yoga, laundry, a sleep wind-down |
 
`maintenance` was the late addition. My first version had only four buckets, and then I noticed the menstrual phase had nothing sensible to put in it. "Go for a walk" is not admin and it is definitely not deep work, so it got its own bucket.
 
### Which bucket shows up when
 
Each phase has a ranked list of buckets it prefers, and a cap on how many tasks I'm allowed:
 
| Phase | Buckets it wants, in order | Max tasks |
|---|---|---|
| 🩸 Menstrual | maintenance, review, admin | 3 |
| 🌱 Follicular | deep, creative, review | 5 |
| ☀️ Ovulation | creative, deep, admin | 4 |
| 🍂 Early luteal | deep, admin, review | 5 |
| 🌙 Late luteal | admin, maintenance, review, creative | 3 |
 
That's why my reels get top billing at ovulation. `deep` task just scores zero for category fit, so it sinks to the bottom, but it can still appear if slots are free, or if it’s overdue or tagged #must-do
 
### How a task gets its bucket
 
Nobody wants to tag 40 checkboxes, so the planner works it out in this order:
 
1. **My override wins.** Start a title with the bucket word, as `deep: databricks certification` or `#deep databricks certification`. Shortcuts work too: `dsa:`, `reel:`, `chore:`, `revise:`, `wellness:` and so on. A line with just the bucket name in the task details works as well.
2. **Life-admin words come next.** Resume, bill, bank, charger, appointment and friends go straight to `admin`.
3. **Then the keyword lists.** Whole-word matches only, checked in order: maintenance, deep, creative, review.
4. **Anything unrecognised becomes `admin`**, the safest default, since admin appears in almost every phase.
I can also add a duration (`| 60m` or `[20m]`) and tags like `#focus` or `#quick` right in the title or details. They feed into the scoring below.

I could also add an LLM to pick the category, duration and tags for me, but the free Google models keep throwing traffic errors. Until i can afford to buy a subscription or find a way to integrate my local LLM to this google script flow, i will use my brain.

![](/blog-images/post-4-image2.png)

## The scoring function
 
Every open task in my Google Tasks list gets a score, and the highest scores make today's plan. Points come from:
 
- **Category fit.** The earlier a task's bucket sits in the phase's preference list, the more points it earns. A `maintenance` task in my menstrual phase scores big. A `deep` task there scores nothing.
- **Tags.** `#must-do` is +60. `#urgent` is +50. `#optional` is a gentle -15, like a sigh.
- **Deadlines.** Overdue tasks get +70, a polite scream from the past.
- **Time budget.** The day has a 120-minute budget. After the first task, anything that would blow the budget stays out. The first task always gets in, so the planner can never hand me an empty day.
The result is a plan with one to five tasks, depending on the phase. Late luteal gets three, because I deserve mercy. Follicular gets five, because I'm feeling invincible and need adult supervision.
 
## The bugs, a short horror anthology
 
**The AI that wasn't.** I wanted an LLM to sort my tasks. Google's free model replied with a 404 (retired, new model name please), then with a 503 telling me it was experiencing "high demand". Three retries later, the verdict was still *high demand*. So the final version has **no AI in it at all**. It is regular expressions, i.e., whole-word matching. My "smart" planner is regex all the way down.
 
**The word-matching crimes.** An early version matched pieces of words. It would have filed "credit card bill" under *creative*, because "credit" contains "edit". Whole-word matching fixed that. My real task list went from about half-right to correct, mostly by teaching it words like `otel`, `sdk` and `databricks` (yes, word-to-word match).
 
**The lazy shortcut.** If the keyword guesser gets a task wrong, I just type the bucket first: `deep: databricks certification`. It's the most low-tech override in the system and the one I use most.
 
## What it looks like day to day
 
One calendar event per day, in a calendar called `Cycle Plan`. The title says something like *🍂 EARLY LUTEAL · Day 17 · 5 tasks*. The description holds the checklist and the body notes. The widget on my phone shows the title, I tap for details, and every 30 minutes the script quietly checks whether my life has changed. It runs on Google's servers, so my laptop can be off and my phone can be dead. It doesn't care.
 
## What I actually learned
 
1. **Over-engineering is a love language.** Nobody needed this. I needed it.
2. **Free tools are enough.** Apps Script, Calendar, Tasks. No server, no database, no bills (I already have plenty of those)
3. **Forecasts beat willpower.** Knowing it's a low-energy week lets me plan around it instead of calling it laziness.
My cycle is a schedule I've been running on the whole time. I just finally wrote it down.
 
*(Not medical advice. The phases are estimates from averages. Day 1 is exact, and everything after it is a good guess. It is just an experiment-ish).*
 
![](/blog-images/post-4-image1.png)
