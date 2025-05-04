// Mock data to replace Contentlayer imports

export interface Note {
  _id: string
  slug: string
  title: string
  date?: string
  tags?: string[]
  ritual?: string
  highlightRefs?: string[]
  published: boolean
  body: {
    raw: string
    code: string
  }
  url: string
}

export interface Ritual {
  _id: string
  slug: string
  title: string
  steps: string[]
  tags?: string[]
  description?: string
  url: string
}

export interface Highlight {
  _id: string
  excerpt: string
  source: string
  author?: string
  date?: string
  tags?: string[]
  note?: string
  doctrineFragment?: string
}

// Mock Notes data
export const allNotes: Note[] = [
  {
    _id: "note-1",
    slug: "better-tshirt-rule",
    title: "The 'Better as a T-Shirt' Rule",
    date: "2025-05-03",
    tags: ["float", "doctrine", "symbolism"],
    ritual: "ritualAST::tshirt_compression",
    highlightRefs: ["https://readwise.io/bookreview/8569524/?highlight=167285047"],
    published: true,
    body: {
      raw: 'Concepts that resonate more as ritual slogans, meme glyphs, or embodied heuristics than structured essays. This is cognition as a wardrobe, not a cathedral.\n\nWhen an idea works better as a t-shirt slogan than a lengthy essay, it\'s often because it\'s:\n\n1. **Immediately resonant** - It clicks with existing mental models\n2. **Compressible** - Can be reduced to a memorable phrase\n3. **Actionable** - Provides clear direction without extensive explanation\n4. **Shareable** - Easy to pass along to others\n\nThe t-shirt rule helps us identify which ideas are ready for "memetic compression" - they can be reduced to their essence without losing their power.\n\n> "It\'s a wardrobe of cognition: concepts that wear well, spread fast, and compress wisdom into invocation."\n\nJust-in-time slogans, memetic heuristics, or sigil-wisdom that floats from chat, tweet, or wastebook into embodied action rituals.',
      code: '<p>Concepts that resonate more as ritual slogans, meme glyphs, or embodied heuristics than structured essays. This is cognition as a wardrobe, not a cathedral.</p><p>When an idea works better as a t-shirt slogan than a lengthy essay, it\'s often because it\'s:</p><ol><li><strong>Immediately resonant</strong> - It clicks with existing mental models</li><li><strong>Compressible</strong> - Can be reduced to a memorable phrase</li><li><strong>Actionable</strong> - Provides clear direction without extensive explanation</li><li><strong>Shareable</strong> - Easy to pass along to others</li></ol><p>The t-shirt rule helps us identify which ideas are ready for "memetic compression" - they can be reduced to their essence without losing their power.</p><blockquote><p>"It\'s a wardrobe of cognition: concepts that wear well, spread fast, and compress wisdom into invocation."</p></blockquote><p>Just-in-time slogans, memetic heuristics, or sigil-wisdom that floats from chat, tweet, or wastebook into embodied action rituals.</p>',
    },
    url: "/notes/better-tshirt-rule",
  },
  {
    _id: "note-2",
    slug: "memory-infrastructure",
    title: "Memory is a Ritual, Not a Map",
    date: "2025-05-02",
    tags: ["float", "memory", "infrastructure", "note-necromancy"],
    ritual: "ritualAST::wastebook_curation",
    highlightRefs: ["https://readwise.io/bookreview/50716015/?highlight=879888937"],
    published: true,
    body: {
      raw: "\"Memory infrastructure isn't about knowing exactly where it is, but trusting you've written it before and will find it again when needed.\"\n\nTraditional knowledge management systems often treat memory as a map - a precise location where information is stored. But human memory doesn't work that way, and perhaps our digital systems shouldn't either.\n\n## The Ritual of Memory\n\nMemory as ritual acknowledges that:\n\n1. **The act of capturing matters more than the organization**\n2. **Trust in the system is more important than its perfection**\n3. **Rediscovery is part of the learning process**\n4. **Fuzzy search and association mimic how our brains work**\n\nWhen we treat memory as a ritual rather than a map, we focus on the practices that help us externalize our thoughts, trusting that the right connections will emerge when needed.\n\n## Practical Implementation\n\n- **Wastebook First**: Capture without concern for organization\n- **Periodic Curation**: Light touch organization as a separate ritual\n- **Search Over Structure**: Rely on search and serendipity more than rigid hierarchies\n- **Embrace Forgetting**: Allow some notes to fade away naturally\n\nThe goal isn't perfect recall but rather a system that supports thinking, creating, and learning through ritualized practices of externalization and rediscovery.",
      code: "<p>\"Memory infrastructure isn't about knowing exactly where it is, but trusting you've written it before and will find it again when needed.\"</p><p>Traditional knowledge management systems often treat memory as a map - a precise location where information is stored. But human memory doesn't work that way, and perhaps our digital systems shouldn't either.</p><h2>The Ritual of Memory</h2><p>Memory as ritual acknowledges that:</p><ol><li><strong>The act of capturing matters more than the organization</strong></li><li><strong>Trust in the system is more important than its perfection</strong></li><li><strong>Rediscovery is part of the learning process</strong></li><li><strong>Fuzzy search and association mimic how our brains work</strong></li></ol><p>When we treat memory as a ritual rather than a map, we focus on the practices that help us externalize our thoughts, trusting that the right connections will emerge when needed.</p><h2>Practical Implementation</h2><ul><li><strong>Wastebook First</strong>: Capture without concern for organization</li><li><strong>Periodic Curation</strong>: Light touch organization as a separate ritual</li><li><strong>Search Over Structure</strong>: Rely on search and serendipity more than rigid hierarchies</li><li><strong>Embrace Forgetting</strong>: Allow some notes to fade away naturally</li></ul><p>The goal isn't perfect recall but rather a system that supports thinking, creating, and learning through ritualized practices of externalization and rediscovery.</p>",
    },
    url: "/notes/memory-infrastructure",
  },
  {
    _id: "note-3",
    slug: "ritual-unlock",
    title: "Externalization Rituals (Neurodivergent Executive Unlocks)",
    date: "2025-05-01",
    tags: ["ritual", "externalization", "nd"],
    ritual: "",
    highlightRefs: ["https://readwise.io/bookreview/10216460/?highlight=207841275"],
    published: true,
    body: {
      raw: "'I'm doing it. I did it.' — executive function micro-rituals activate momentum and break the spell of inertia.\n\nFor many neurodivergent individuals, the gap between intention and action can feel insurmountable. Traditional productivity advice often fails to address the unique executive function challenges that come with ADHD, autism, and other neurodivergent conditions.\n\n## Micro-Rituals as Executive Function Bridges\n\nExternalization rituals serve as bridges across the intention-action gap by:\n\n1. **Making the invisible visible** - Externalizing the process makes each step concrete\n2. **Creating momentum through declaration** - Stating \"I'm doing it\" shifts from planning to action mode\n3. **Reducing cognitive load** - External systems hold the structure so the brain doesn't have to\n4. **Providing completion anchors** - \"I did it\" creates a clear endpoint and dopamine reward\n\n## Practical Externalization Rituals\n\n- **Verbal declaration** - Simply saying \"I'm doing it\" out loud\n- **Physical anchors** - Moving a token or flipping a card to signal state change\n- **Digital breadcrumbs** - Quick notes or tweets that mark progress\n- **Body-based signals** - Standing up, changing locations, or other physical state changes\n\nThese rituals don't have to be elaborate. In fact, the simpler they are, the more likely they'll be used when executive function is already strained.\n\nThe power is in the consistent practice and the externalization of what would otherwise remain trapped in the planning phase.",
      code: "<p>'I'm doing it. I did it.' — executive function micro-rituals activate momentum and break the spell of inertia.</p><p>For many neurodivergent individuals, the gap between intention and action can feel insurmountable. Traditional productivity advice often fails to address the unique executive function challenges that come with ADHD, autism, and other neurodivergent conditions.</p><h2>Micro-Rituals as Executive Function Bridges</h2><p>Externalization rituals serve as bridges across the intention-action gap by:</p><ol><li><strong>Making the invisible visible</strong> - Externalizing the process makes each step concrete</li><li><strong>Creating momentum through declaration</strong> - Stating \"I'm doing it\" shifts from planning to action mode</li><li><strong>Reducing cognitive load</strong> - External systems hold the structure so the brain doesn't have to</li><li><strong>Providing completion anchors</strong> - \"I did it\" creates a clear endpoint and dopamine reward</li></ol><h2>Practical Externalization Rituals</h2><ul><li><strong>Verbal declaration</strong> - Simply saying \"I'm doing it\" out loud</li><li><strong>Physical anchors</strong> - Moving a token or flipping a card to signal state change</li><li><strong>Digital breadcrumbs</strong> - Quick notes or tweets that mark progress</li><li><strong>Body-based signals</strong> - Standing up, changing locations, or other physical state changes</li></ul><p>These rituals don't have to be elaborate. In fact, the simpler they are, the more likely they'll be used when executive function is already strained.</p><p>The power is in the consistent practice and the externalization of what would otherwise remain trapped in the planning phase.</p>",
    },
    url: "/notes/ritual-unlock",
  },
  {
    _id: "note-4",
    slug: "learning-in-the-flow",
    title: "Learning is Not an Event",
    date: "2025-04-30",
    tags: ["learning-culture", "float", "ritual"],
    ritual: "",
    highlightRefs: ["https://readwise.io/bookreview/13782285/?highlight=290172101"],
    published: true,
    body: {
      raw: 'Learning is a recursively-invoked ritual: embedded, ongoing, context-sensitive—not afterthought!\n\nTraditional approaches to learning treat it as a discrete event: attend a workshop, read a book, complete a course. But this event-based model fails to capture how effective learning actually happens, especially in fast-changing domains.\n\n## Learning as Recursive Ritual\n\nWhen we reframe learning as a recursively-invoked ritual, we recognize that:\n\n1. **Learning happens in the flow of work** - Not separate from it\n2. **Context matters more than content** - The same information lands differently depending on when and why you encounter it\n3. **Repetition with variation builds understanding** - Seeing the same concept in different contexts\n4. **Just-in-time beats just-in-case** - Learning when you need it sticks better than learning "someday"\n\n## Practical Implementation\n\n- **Embed learning triggers in workflows** - Create rituals that prompt learning at decision points\n- **Capture and curate in context** - Note what you learn while doing the work\n- **Share incomplete understanding** - Learning in public creates feedback loops\n- **Review and reflect rhythmically** - Regular rituals to consolidate learning\n\nBy treating learning as a ritual that\'s invoked repeatedly throughout our work rather than a separate event, we create systems that support continuous growth and adaptation.',
      code: '<p>Learning is a recursively-invoked ritual: embedded, ongoing, context-sensitive—not afterthought!</p><p>Traditional approaches to learning treat it as a discrete event: attend a workshop, read a book, complete a course. But this event-based model fails to capture how effective learning actually happens, especially in fast-changing domains.</p><h2>Learning as Recursive Ritual</h2><p>When we reframe learning as a recursively-invoked ritual, we recognize that:</p><ol><li><strong>Learning happens in the flow of work</strong> - Not separate from it</li><li><strong>Context matters more than content</strong> - The same information lands differently depending on when and why you encounter it</li><li><strong>Repetition with variation builds understanding</strong> - Seeing the same concept in different contexts</li><li><strong>Just-in-time beats just-in-case</strong> - Learning when you need it sticks better than learning "someday"</li></ol><h2>Practical Implementation</h2><ul><li><strong>Embed learning triggers in workflows</strong> - Create rituals that prompt learning at decision points</li><li><strong>Capture and curate in context</strong> - Note what you learn while doing the work</li><li><strong>Share incomplete understanding</strong> - Learning in public creates feedback loops</li><li><strong>Review and reflect rhythmically</strong> - Regular rituals to consolidate learning</li></ul><p>By treating learning as a ritual that\'s invoked repeatedly throughout our work rather than a separate event, we create systems that support continuous growth and adaptation.</p>',
    },
    url: "/notes/learning-in-the-flow",
  },
]

// Mock Rituals data
export const allRituals: Ritual[] = [
  {
    _id: "ritual-1",
    slug: "wastebook-ritual",
    title: "Curation Sweep (Wastebook → Ritual)",
    steps: [
      "On Sunday, open your wastebook.",
      "Skim for fragments that spark resonance.",
      "Tag, prune, and float 2-3 thoughts forward.",
      "Archive what drifts to compost.",
    ],
    tags: ["curation", "wastebook", "weekly"],
    description: "A weekly ritual to curate your digital wastebook and surface valuable insights.",
    url: "/rituals/wastebook-ritual",
  },
  {
    _id: "ritual-2",
    slug: "unlock-exec",
    title: "Externalization Unlock",
    steps: ["Declare: 'I'm doing it.'", "Capture micro-note or tweet.", "Move from intent → action."],
    tags: ["executive-function", "micro-ritual", "neurodivergent"],
    description:
      "A micro-ritual to bridge the gap between intention and action, especially helpful for neurodivergent executive function.",
    url: "/rituals/unlock-exec",
  },
]

// Mock Highlights data
export const allHighlights: Highlight[] = [
  {
    _id: "highlight-1",
    excerpt:
      "FLOAT evolved into a recursive, symbolic, and modular cognitive system rooted in neurodivergent experience and early computer exploration.",
    source: "https://readwise.io/bookreview/50934019/?highlight=882754965",
    author: "@e_p82",
    tags: ["float", "memory", "ritual"],
    date: "2025-05-04",
  },
  {
    _id: "highlight-2",
    excerpt: "The practice of Task Avoidance/structured procrastination is a Ritual.",
    source: "https://readwise.io/bookreview/8569524/?highlight=167537478",
    author: "Dale Lyles",
    tags: ["ritual", "procrastination", "lichtenbergianism"],
    date: "2025-05-03",
  },
  {
    _id: "highlight-3",
    excerpt:
      "A Zettelkasten with a gremlin in the slip box. Productivity for recursive thinkers who need ritual, not routine.",
    source: "https://readwise.io/bookreview/6075924/?highlight=882256236",
    author: "@e_p82",
    tags: ["float", "ritual", "note-necromancy"],
    date: "2025-05-02",
  },
  {
    _id: "highlight-4",
    excerpt: "Learning is a recursively-invoked ritual: embedded, ongoing, context-sensitive—not afterthought!",
    source: "https://readwise.io/bookreview/13782285/?highlight=290172101",
    author: "",
    tags: ["learning", "ritual", "float"],
    date: "2025-05-01",
  },
]
