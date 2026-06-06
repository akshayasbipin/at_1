# A Beginner's Guide to Simple Agent Architectures

![](/blog-images/post-1-cover.jpeg)

So you want to start making agents and don't know where to begin. Relatable. Here are the patterns I actually used, and why each one made sense at the time.

Let’s begin.

## **So, what even is an agent?**

An AI agent is a program that uses a language model not just to answer questions, but to take actions. Instead of giving you one response and stopping, an agent can decide what to do next, call tools (like searching the web or running code), and keep going until the job is done.

Think of a regular LLM call like asking a friend a question. An agent is like hiring that same friend as an assistant - they can make phone calls, send emails, and check things on your behalf, all on their own.

**Key idea: **An agent = LLM + the ability to decide what to do + the ability to act on that decision.

## **Pick your tools: agentic frameworks**

Before getting into patterns, a quick note on frameworks. This guide uses LangChain and LangGraph for the code examples, but they are just two options from a growing list. Others include Google ADK, CrewAI, AutoGen, and DSPy. Think of them like web browsers: they all get you to the same destination, just with different interfaces and features.

The patterns below are framework-agnostic ideas. You will see them pop up in almost any agent codebase, regardless of which library is underneath.

**Version note: **Examples here use langchain==1.2.7 and langgraph==1.0.8. If something does not import correctly, check that your versions match.

## **Pattern 1: The Simple LLM Call**

Basically, the foundation. You send a prompt, the model replies. No tools, no memory, no loops. Just one clean round-trip.

In LangChain, you chain a prompt template to a model to an output parser using the pipe operator ( | ). The result is a tiny pipeline called a chain:

```
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a summarizer. Summarize clearly and concisely."),
    ("human", "{input_text}")
])

chain = prompt | llm | StrOutputParser()

result = chain.invoke({"input_text": my_text})
```

TADAAA!!! The pipe operator passes the output of each step into the next one. If you are new to LangChain, chains are the first thing to get comfortable with - they show up everywhere.

**When to use it: **Any task where you just need the model to do something once. Summarization, classification, rewriting, answering a question. Fast, cheap, and easy to debug.

## **Pattern 2: Agent with Memory**

A plain LLM has no memory between calls. Every time you send a new message, it starts fresh. That is a problem for anything resembling a real conversation.

Memory agents solve this by saving the conversation history and passing it along with each new message. LangGraph's MemorySaver does this by tying conversation history to a session ID - the same thread_id across multiple calls means the agent "remembers" what was said before.

```
memory = MemorySaver()

agent = create_react_agent(model=llm, tools=tools, checkpointer=memory)

config = {"configurable": {"thread_id": session_id}}

result = agent.invoke({"messages": [HumanMessage(content=user_input)]}, config=config)
```

Notice that the session_id is just a string - usually a UUID you generate at the start of a conversation. Pass the same one across turns, and the agent picks up where it left off. Use a different one, and you get a fresh slate.

**When to use it: **Chatbots, assistants, or anything where the user expects follow-up questions to make sense. Also great for agentic tasks that span multiple steps over time.

**Watch out: **Memory is stored in RAM by default with MemorySaver, so it disappears when the process restarts. For production, swap it out for a database-backed checkpointer.

## **Pattern 3: Simple LangGraph Agent**

LangGraph is built around a concept called a state graph. You define a state - basically a typed dictionary that represents what the agent knows at any point - and then you define nodes, which are functions that read the state and return updated values.

Here is the simplest possible version: one node, one job.

```
class SummarizerState(TypedDict):
    input_text: str
    summary: str

def summarizer_node(state: SummarizerState) -> SummarizerState:
    response = llm.invoke([...])
    return {"summary": response.content}

graph = StateGraph(SummarizerState)
graph.add_node("summarizer", summarizer_node)
graph.set_entry_point("summarizer")
graph.set_finish_point("summarizer")

agent = graph.compile()
```

TypedDicts are a fixed structure that ensures specific keys exist and have predefined value types, making the state explicit and checkable. It gives the “state”, a schema, data is passed between nodes in this structure.

**When to use it: **When you want more control than a basic chain but do not need multi-agent routing yet. The state graph is a clean way to add conditional logic, loops, and multiple steps without things getting messy.

## **Pattern 4: Agent Executor with Tools**

This pattern gives the agent tools it can decide to use. The AgentExecutor runs a loop: the model picks a tool, the tool runs, the result goes back to the model, and the process repeats until the model says it is done.

Tools in LangChain are just Python functions decorated with @tool. The docstring matters - the model reads it to decide whether to use the tool.

```
@tool
def format_summary(text: str) -> str:
    """Format the summary in a concise, readable way."""
    return f"Summary: {text.strip()}"

agent = create_tool_calling_agent(llm=llm, tools=tools, prompt=prompt)

executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
```

The verbose=True flag is worth keeping during development. It prints every step the agent takes, which is the fastest way to understand what is actually happening under the hood.

**When to use it: **when you need to build agents that must make multi-step decisions using external tools, rather than just generating a single text response

## **Pattern 5: Orchestrator with Multiple Agents**

This is where things get genuinely interesting. Instead of one agent with tools, you build a team: specialised agents that each handle one domain, and an orchestrator that figures out who should do what.

The orchestrator reads the user's query, decides which agent should handle it (or which sequence of agents, if the task has multiple parts), and routes accordingly. Each sub-agent only sees the task it was assigned.

```
class MultiAgentState(TypedDict):
    messages: List[BaseMessage]
    next_agent: str
    task_type: str
    remaining_subtasks: List[str]
```

The orchestrator node uses the LLM itself to classify the query and decide on routing. This means the routing logic is flexible - you do not have to hard-code rules for every possible input. The downside is that the orchestrator can occasionally route incorrectly, so logging and fallback handling matter.

**When to use it: **Complex tasks that require different kinds of expertise in sequence. For example: 'Summarize this paper, then research related work, then calculate how many citations the top result has.' Each part goes to a different specialist.

**Heads up: **Multi-agent systems are powerful but also harder to debug. Start with the simpler patterns and only reach for orchestration when you need it.

## **Where to go from here**

These five patterns cover most of what I needed when starting with agents. A plain LLM call for simple tasks, a memory layer for conversations, a state graph for controlled multi-step logic, tool-calling for real-world actions, and orchestration for complex multi-agent workflows.

A few things worth keeping in mind as you experiment:

- Start with the simplest pattern that solves your problem. Agents are not always better than a well-written prompt.
- Write good tool docstrings. The model uses them to decide when to call a tool, and bad descriptions lead to bad decisions.
- Log everything during development. Agents can behave unpredictably, and visibility is the only way to figure out why.
- LangGraph's state graph is worth learning properly. It is the foundation of everything beyond basic chains in the LangChain ecosystem.

*The best way to learn agents is to build one, break it, and figure out why. Pick a small task you actually care about and start there. For example, an agent to make Trade settlements, it could require an orchestrator and sub-agents like Compliance check, Report generation, etc. Have fun!!!*
