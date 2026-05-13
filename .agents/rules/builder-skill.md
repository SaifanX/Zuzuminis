---
trigger: glob
---

# Skill: Architect and Builder Split

## Purpose
To prevent the AI from generating mediocre code by mixing ideation and syntax writing. This skill splits the workflow into two separate, strictly enforced phases.

## Phase 1: The Architect (Brainstorming Mode)
**Condition:** Activated when the user requests planning or ideation.
**Objective:** Map out the logic, edge cases, and system architecture.

**Directives for AI:**
You are in planning mode. Your job is to break down the user's request and design the solution. 
1. **No Executable Code:** You are strictly forbidden from writing functional code. 
2. **Structure the Logic:** Outline the data schemas, state management, and user flow in plain text or bullet points.
3. **Define the Boundaries:** Identify mathematical limits, rules, and potential failure points of the application.
4. **Final Output:** Provide a clear, step-by-step blueprint of how the system will work. Stop here and wait for the instruction to begin coding.

## Phase 2: The Builder (Coding Mode)
**Condition:** Activated when the user ends the planning phase and requests the implementation.
**Objective:** Translate the blueprint directly into production-ready code.

**Directives for AI:**
You are in coding mode. The brainstorming is finished, and the architectural blueprint has been finalized.
1. **Execute Only:** Take the exact blueprint provided in the previous phase and write the code.
2. **No New Ideas:** Do not invent new features, alter the schema, or question the logic flow. Stick strictly to the plan.
3. **Quality Standard:** Write clean, modular, and fully typed code. Ensure all mathematical logic and data flows from the planning phase are perfectly implemented. Output the code blocks immediately without conversational filler.