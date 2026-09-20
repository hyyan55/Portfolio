import { BlogPost } from '../types';

export const initialBlog: BlogPost[] = [
  {
    id: "building-easy-convert-pdf-utility",
    slug: "building-easy-convert-pdf-utility",
    title: "Building Easy-Convert: Developing a Fast PDF & Document Utility",
    description: "Technical insights into building Easy-Convert with React and TypeScript, focusing on privacy-centric document workflows.",
    content: `Easy-Convert was built to solve a concrete, everyday problem: fast, lightweight conversion and utility operations on PDF documents. When dealing with sensitive files, privacy and local-first execution are paramount.

In this article, I discuss the architectural choices made for Easy-Convert, structuring file processing pipelines on the web, and designing an uncluttered user interface that gets out of the user's way.

### Core Objectives
1. **Zero unnecessary server hops**: Process as much document logic on client hardware whenever possible.
2. **Predictable user interface**: Minimize friction by placing controls directly in line with user focus.
3. **Robust error boundaries**: Protect the session against corrupt or oversized files gracefully.`,
    author: "Hayyan Mohamed",
    date: "2026-09-15",
    tags: ["Development", "React", "TypeScript", "Open Source"],
    published: true,
    readingTime: "3 min read"
  },
  {
    id: "light-across-kassala-visual-storytelling",
    slug: "light-across-kassala-visual-storytelling",
    title: "Light Across Kassala: Photography & Visual Storytelling in Eastern Sudan",
    description: "Reflections on documenting the granite landscapes of Jabal Tootil and capturing natural ambient light in Kassala.",
    content: `Eastern Sudan offers a unique visual landscape. The granite boulders of Jabal Tootil rise directly from the plains, creating dramatic shadows during early morning and late afternoon golden hours.

Photography teaches a discipline of attention: waiting for the right angle of light, respecting geometric balance, and documenting the character of places honestly. In this piece, I share notes on framing and focal length selection in high-contrast environments.

### Visual Balance
- **Early morning contrasts**: Soft amber light skimming granite contours.
- **Compositional restraint**: Allowing negative space in the sky to emphasize natural rock scale.
- **Authentic color rendering**: Avoiding hyper-saturated grading in favor of organic regional tones.`,
    author: "Hayyan Mohamed",
    date: "2026-09-08",
    tags: ["Photography", "Kassala", "Visuals"],
    published: true,
    readingTime: "4 min read"
  },
  {
    id: "medicine-and-software-engineering",
    slug: "medicine-and-software-engineering",
    title: "Medicine & Code: Analytical Parallels Between Clinical Thinking and Engineering",
    description: "How medical diagnostic discipline and systematic software engineering complement one another in problem-solving.",
    content: `Studying medicine and writing code share a common foundation: systematic diagnosis and structured thinking. In clinical medicine, one gathers symptoms, identifies underlying pathophysiological mechanisms, and devises targeted treatment plans. In software engineering, debugging follows an identical heuristic.

Balancing medical education with development cultivates both analytical rigor and creative problem-solving.

### Shared Heuristics
- **Systematic differential diagnosis**: Narrowing down possibilities before acting.
- **First-principles reasoning**: Decomposing complex states into predictable, observable components.
- **Iterative feedback**: Measuring intervention results systematically.`,
    author: "Hayyan Mohamed",
    date: "2026-08-28",
    tags: ["Medicine", "Technology", "Perspective"],
    published: true,
    readingTime: "4 min read"
  }
];
