# Unit 20: Final Capstone — Local Multimodal AI, Agentic Governance & 3D CAD/Print Pipeline

Unit 20 integrates the entire JavaScript engineering stack into a privacy-first, responsibly governed **Full-Stack Local Multimodal AI Chat Application**, progressing from local LLM token streaming and cosine-similarity RAG (`20.1`) to offline speech (STT/TTS), optional multimodal vision/video (**Bonus**), and parametric 3D CAD `.stl`/`.obj` generation for physical 3D printing (**Double Bonus — 2x Score**, `20.2`), culminating in classical/modern NLP pipelines, sandboxed ReAct agents with Human-in-the-Loop (HITL) gates, and NIST AI RMF / EU AI Act Model Cards (`20.3`).

## Lessons
1. **[Lesson 20.1 — Local LLM Architecture, SSE/NDJSON Streaming, RAG & Safety (`Stds 1.0, 2.0, 8.0, 16.0, 18.0`)](./01-Local-LLM-Architecture-and-Streaming/readme.md)**
   - Slides: [`01-Local-LLM-Architecture-and-Streaming/slides/slides.md`](./01-Local-LLM-Architecture-and-Streaming/slides/slides.md)
   - Student Lab: [`01-Local-LLM-Architecture-and-Streaming/student-lesson.md`](./01-Local-LLM-Architecture-and-Streaming/student-lesson.md)
   - Reference Code & Tests: [`localAiServer.mjs`](./01-Local-LLM-Architecture-and-Streaming/code/localAiServer.mjs) • [`localAiStreamAndRag.test.mjs`](./01-Local-LLM-Architecture-and-Streaming/code/localAiStreamAndRag.test.mjs)
2. **[Lesson 20.2 — Multimodal Voice, Vision/Video Bonus & 3D CAD/Print Double Bonus (`Stds 4.0, 9.0, 11.0, 12.0, 15.0, 19.0`)](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/readme.md)**
   - Slides: [`02-Multimodal-Voice-Vision-and-3D-Print-Capstone/slides/slides.md`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/slides/slides.md)
   - Student Lab: [`02-Multimodal-Voice-Vision-and-3D-Print-Capstone/student-lesson.md`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/student-lesson.md)
   - Full-Stack Capstone & Tests: [`code/capstone-app/`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/code/capstone-app/server.mjs) • [`multimodalAnd3dCad.test.mjs`](./02-Multimodal-Voice-Vision-and-3D-Print-Capstone/code/multimodalAnd3dCad.test.mjs)
3. **[Lesson 20.3 — NLP Pipelines, Agentic AI Loops, Model Cards & Responsible Governance (`AI101–AI202`, `Std 14.0`, `Azure AI-900`, `ITS AI`, `ITS Python`)](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/readme.md)**
   - Slides: [`03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/slides/slides.md`](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/slides/slides.md)
   - Student Lab: [`03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/student-lesson.md`](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/student-lesson.md) • [`nlpAgenticLab.mjs`](../0-student_files/20-agentic-nlp-governance/nlpAgenticLab.mjs)
   - Reference Code & Tests: [`nlpAgenticGovernanceDemo.mjs`](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/code/nlpAgenticGovernanceDemo.mjs) • [`nlpAgenticGovernanceDemo.test.mjs`](./03-NLP-Pipelines-Agentic-AI-and-Responsible-Governance/code/nlpAgenticGovernanceDemo.test.mjs)

## Unit Assessments & Capstone Project
- **Unit Guide & SMART Goals:** [`unit-guide.md`](./unit-guide.md)
- **Pre/Post Unit Evals:** [`evaluations/pre-unit-eval.md`](./evaluations/pre-unit-eval.md) | [`evaluations/post-unit-eval.md`](./evaluations/post-unit-eval.md)
- **Quizzes:** [`quizzes/quiz-1-concepts.md`](./quizzes/quiz-1-concepts.md) | [`quizzes/quiz-2-application.md`](./quizzes/quiz-2-application.md)
- **Final Capstone Project & 2x Rubric:** [`projects/unit-project.md`](./projects/unit-project.md) | [`projects/project-rubric.md`](./projects/project-rubric.md) (`0-student_files/projects/unit-20-local-ai-3d-capstone/`)
