export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'AI/ML' | 'Enterprise';
  tags: string[];
  techStack: string[];
  summary: string;
  problem: string;
  solution: string;
  architectureNodes: { step: string; role: string; detail: string }[];
  keyInnovations: string[];
  metrics: { label: string; value: string }[];
  demoType?: 'traffic' | 'audio' | 'iris' | 'sketch' | 'ecommerce' | 'book';
  githubLink?: string;
  liveLink?: string;
}

export interface TimelinePhase {
  phase: string;
  codename: string;
  era: string;
  title: string;
  technologies: string[];
  description: string;
  coreBreakthrough: string;
  codeSnippet: string;
  snippetLang: string;
  takeaway: string;
}

export interface SkillNode {
  name: string;
  category: 'Languages' | 'Frameworks & Engines' | 'Databases & Tools';
  highlight: string;
  architectureContext: string;
}

export const PERSONAL_INFO = {
  fullName: "Vuppala Nagasai Eshwar Santhosh",
  preferredName: "Nagasai Vuppala",
  callsign: "NAGASAI.SYS // VUPPALA",
  title: "Full-Stack Engineer (MERN & Java Enterprise) | AI/ML Practitioner",
  tagline: "Think Simple, Work Smarter.",
  bio: "Architecting reliable full-stack applications, scalable microservices, and edge computer vision intelligence. Bridging enterprise Java backends and modern React frontends with clean, resilient design principles.",
  location: "Hyderabad, India",
  email: "vuppalanagasai5@gmail.com",
  github: "https://github.com/vuppalanagasai",
  linkedin: "https://www.linkedin.com/in/nagasai-vuppala",
  status: "ONLINE // READY TO DEPLOY",
  telemetry: [
    "Enterprise Java & Spring Boot",
    "Modern React & Node.js",
    "Computer Vision & YOLOv3",
    "Distributed REST Microservices"
  ],
  stats: [
    { label: "Core Architectures", value: "06+" },
    { label: "System Uptime Goal", value: "99.9%" },
    { label: "Domain Specializations", value: "02" },
    { label: "Engineering Philosophy", value: "DRY & KISS" }
  ]
};

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    phase: "01",
    codename: "GROUND ZERO",
    era: "Foundations",
    title: "Algorithmic Fundamentals & Memory Disciplines",
    technologies: ["C", "Python", "Data Structures", "Algorithms", "Low-Level I/O"],
    description: "Built foundational computational mastery by programming directly close to memory and mathematical logic. Explored time-space complexity, pointers, memory buffers, dynamic programming, and Python data crunching.",
    coreBreakthrough: "Deep appreciation for hardware execution boundaries, memory safety, and algorithmic asymptotic optimality before touching high-level frameworks.",
    codeSnippet: `// Pointer memory manipulation & binary search tree validation
int validateBST(TreeNode* root, long minVal, long maxVal) {
  if (!root) return 1;
  if (root->val <= minVal || root->val >= maxVal) return 0;
  return validateBST(root->left, minVal, root->val) &&
         validateBST(root->right, root->val, maxVal);
}`,
    snippetLang: "c",
    takeaway: "Mastery of fundamentals allows rapid assimilation of any framework."
  },
  {
    phase: "02",
    codename: "ARCHITECTURAL RIGOR",
    era: "Core Engineering",
    title: "Java Enterprise & Object-Oriented Blueprinting",
    technologies: ["Java", "OOP Design Patterns", "MySQL", "JDBC", "Apache Tomcat", "JSP"],
    description: "Transitioned to large-scale enterprise patterns: SOLID principles, multi-tier MVC architecture, relational database normalization (3NF), session management, and ACID transactions.",
    coreBreakthrough: "Engineered robust transactional e-commerce engines with zero data race hazards, bulletproof SQL indexing, and clean separation of concerns.",
    codeSnippet: `// Thread-safe Transaction Pipeline with Session Guard
public synchronized OrderResult processCheckout(SessionUser user, Cart cart) {
  try (Connection conn = dataSource.getConnection()) {
    conn.setAutoCommit(false);
    // Atomic deduction and order record creation
    validateInventory(conn, cart);
    Order order = createOrderRecord(conn, user, cart);
    conn.commit();
    return new OrderResult(Status.SUCCESS, order.getId());
  } catch (SQLException e) {
    rollbackSafely(conn);
    throw new EnterpriseTransactionException(e);
  }
}`,
    snippetLang: "java",
    takeaway: "True software longevity comes from decoupled design and strict invariants."
  },
  {
    phase: "03",
    codename: "DOMAIN EXPLORATION",
    era: "Full-Stack & Computer Vision",
    title: "MERN Stack, Real-Time Vision & Cloud Architecture",
    technologies: ["React.js", "Node.js", "Express", "MongoDB", "OpenCV", "YOLOv3", "REST APIs"],
    description: "Expanded horizons into asynchronous event loops, reactive declarative UIs, edge vehicle classification models, and decoupled microservice communication.",
    coreBreakthrough: "Implemented zone-based vehicle density signals using YOLOv3-tiny inference pipelines, reducing intersection idle wait times dramatically over static tripwires.",
    codeSnippet: `# Zone-based dynamic traffic timing calculation
def compute_signal_duration(detections, frame_shape):
  zones = partition_quadrants(frame_shape)
  densities = [count_vehicles_in_zone(detections, z) for z in zones]
  max_zone_idx = np.argmax(densities)
  # Dynamic green duration calculated adaptively
  dynamic_green_sec = np.clip(densities[max_zone_idx] * 2.8, 15.0, 75.0)
  return max_zone_idx, dynamic_green_sec`,
    snippetLang: "python",
    takeaway: "Software doesn't live in isolation; it perceives the physical world and scales across networks."
  },
  {
    phase: "04",
    codename: "SYSTEMIC CONVERGENCE",
    era: "Current Frontier",
    title: "Resilient Full-Stack Ecosystems & Intelligent Automation",
    technologies: ["Spring Boot", "React", "RESTful Architecture", "Scikit-Learn", "Microservices", "Cloud Ready"],
    description: "Synthesizing enterprise backend resilience with reactive, high-speed user interfaces and intelligent edge predictive models. Living by the mantra: 'Think Simple, Work Smarter.'",
    coreBreakthrough: "Engineered end-to-end full-stack architectures like the decoupled Music Listener and Book Review systems with sub-50ms latency and high query efficiency.",
    codeSnippet: `// Spring Boot Clean REST Controller Pattern
@RestController
@RequestMapping("/api/v1/tracks")
@CrossOrigin(origins = "\${app.cors.allowed-origins}", maxAge = 3600)
public class TrackController {
  @GetMapping("/{id}/stream")
  public ResponseEntity<ResourceRegion> streamAudio(
      @PathVariable String id, @RequestHeader HttpHeaders headers) {
    return audioService.getPartialContentRegion(id, headers.getRange());
  }
}`,
    snippetLang: "java",
    takeaway: "Elegance is simplicity achieved through rigorous engineering."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "music-listener",
    title: "Music Listener Web Application",
    subtitle: "High-Performance Decoupled Audio Streaming Engine",
    category: "Full-Stack",
    tags: ["React.js", "Spring Boot", "MySQL", "RESTful APIs", "Audio Streaming"],
    techStack: ["React 19", "Java 17", "Spring Boot", "MySQL 8.0", "Web Audio API", "Hibernate"],
    summary: "A high-fidelity music streaming ecosystem with a decoupled React SPA interface and a high-performance Spring Boot backend. Features partial-content audio byte streaming, relational catalog management, and decoupled API endpoints.",
    problem: "Traditional monolithic web music players suffer from sluggish client-server synchronization, latency during multi-megabyte audio buffering, and inefficient data transport.",
    solution: "Designed an event-driven decoupled architecture using HTTP 206 Partial Content range requests in Spring Boot, backed by an optimized MySQL relational schema with indexing on artist/album indices.",
    architectureNodes: [
      { step: "01. Client SPA", role: "React Web Audio API", detail: "Dynamic waveform rendering, buffer queueing, instantaneous playhead seeking." },
      { step: "02. Gateway & Routing", role: "Spring Boot Gateway", detail: "Configured origin mapping, bearer token validation, rate-limiting filter." },
      { step: "03. Audio Service", role: "Chunked Stream Provider", detail: "HTTP 206 Byte-Range streaming for low-memory footprint audio delivery." },
      { step: "04. Data Persistence", role: "MySQL Relational Pool", detail: "Normalized tables for Users, Playlists, Tracks with foreign key constraints." }
    ],
    keyInnovations: [
      "Zero-latency byte-range audio chunking preventing server memory bloat",
      "Decoupled CORS architecture ensuring clean client domain access to audio tracks",
      "Normalized relational schema optimized for sub-10ms playlist query retrieval",
      "Decoupled REST API contracts enabling independent scaling of frontend and microservice"
    ],
    metrics: [
      { label: "Audio Stream Latency", value: "< 45ms" },
      { label: "Query Execution", value: "3.2ms avg" },
      { label: "Architecture", value: "Decoupled REST" }
    ],
    demoType: "audio"
  },
  {
    id: "book-review-system",
    title: "Book Review Management System",
    subtitle: "Enterprise MERN Asynchronous Critique & Rating Engine",
    category: "Full-Stack",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "MERN Stack"],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth"],
    summary: "Full-stack asynchronous community critique platform. Features MongoDB ObjectId relational referencing, aggregation pipelines for real-time rating telemetry, and schema sanitization.",
    problem: "Review platforms struggle with inconsistent rating calculations, high read latencies under concurrent traffic, and vulnerable user input that can lead to NoSQL injection and XSS.",
    solution: "Architected a MERN application featuring Mongoose aggregation pipelines that compute running weighted average scores at query time, paired with robust JWT token authentication and request sanitization.",
    architectureNodes: [
      { step: "01. Reactive Frontend", role: "React UI & State", detail: "Optimistic UI updates for likes/reviews, rich markdown reader, responsive layout." },
      { step: "02. API Layer", role: "Express.js Router", detail: "Middleware validation pipelines, JWT authentication guards, rate-limiting." },
      { step: "03. Data Aggregation", role: "Mongoose Engine", detail: "ObjectId normalization, $lookup relational joins, $facet telemetry." },
      { step: "04. Document Cluster", role: "MongoDB", detail: "Indexed collections for Books, Reviews, Users with replica resilience." }
    ],
    keyInnovations: [
      "Optimized Mongoose aggregate pipelines computing multidimensional ratings on-the-fly",
      "Relational ObjectId referencing preventing document bloat beyond 16MB BSON limits",
      "Strict input sanitization preventing NoSQL operator injection and cross-site scripts",
      "Instantaneous optimistic updates for a fluid, instantaneous community feel"
    ],
    metrics: [
      { label: "Aggregation Pipeline", value: "< 28ms" },
      { label: "Auth Mechanism", value: "HMAC JWT" },
      { label: "Data Integrity", value: "Strict Schemas" }
    ],
    demoType: "book"
  },
  {
    id: "smart-traffic-system",
    title: "Smart Traffic Management System",
    subtitle: "Zone-Based Computer Vision Adaptive Signal Controller",
    category: "AI/ML",
    tags: ["Python", "OpenCV", "YOLOv3-tiny", "NumPy", "Edge AI", "Computer Vision"],
    techStack: ["Python 3.10", "OpenCV 4.x", "NumPy", "Darknet / YOLOv3-tiny", "Threaded Video Pipeline"],
    summary: "Real-time edge computer vision traffic controller. Rather than primitive static tripwires, it uses quadrant zone density analysis to dynamically allocate green light durations based on real-time vehicle loads.",
    problem: "Traditional traffic lights run on dumb fixed-timer schedules or single-line magnetic tripwires, causing emergency vehicle delays, unnecessary idling, fuel waste, and traffic pileups.",
    solution: "Engineered an intelligent surveillance pipeline with YOLOv3-tiny inference and NumPy matrix zoning. Real-time bounding boxes calculate true vehicular density per approach vector and dynamically adjust signal phases.",
    architectureNodes: [
      { step: "01. Vision Feed", role: "Threaded OpenCV Capture", detail: "Non-blocking RTSP frame acquisition with frame skipping to maintain 30 FPS." },
      { step: "02. Object Inference", role: "YOLOv3-tiny Darknet", detail: "Vehicle class detection (cars, buses, trucks, bikes) with 0.85+ confidence." },
      { step: "03. Spatial Zoning", role: "NumPy Matrix Partitioning", detail: "Quadrants mapped to lane junctions; calculates weighted vehicle density." },
      { step: "04. Adaptive Logic", role: "Signal Control Algorithm", detail: "Dynamic green window scaling from 15s to 75s based on density queues." }
    ],
    keyInnovations: [
      "Zone-based spatial density calculation replacing flawed single-point tripwires",
      "Edge-hardware optimization with YOLOv3-tiny achieving real-time inference on modest silicon",
      "Weighted vehicle factoring: buses and heavy trucks receive higher queue clearance priority",
      "Self-healing fallback mechanism that reverts to failsafe timer if camera feed drops"
    ],
    metrics: [
      { label: "Inference Latency", value: "24ms / frame" },
      { label: "Idle Wait Reduction", value: "~38% tested" },
      { label: "Model Architecture", value: "YOLOv3-tiny" }
    ],
    demoType: "traffic"
  },
  {
    id: "tech-store-ecommerce",
    title: "Tech Store E-Commerce Platform",
    subtitle: "Enterprise Java MVC Transactional Commerce System",
    category: "Enterprise",
    tags: ["Java", "JSP", "Apache Tomcat", "MySQL", "MVC Pattern", "ACID"],
    techStack: ["Java Enterprise", "JSP", "Java Servlets", "Apache Tomcat 9", "MySQL", "JDBC Connection Pooling"],
    summary: "Full-lifecycle enterprise commerce web portal built with Java Servlets and JSP. Implements session management, atomic checkout transactions, and parameterized SQL queries to prevent injection.",
    problem: "Small-to-medium retail portals often suffer from session hijacking, inventory race conditions (double-booking stock), and SQL injection vulnerabilities in parameter concatenation.",
    solution: "Constructed a strict Model-View-Controller (MVC) architecture with Apache Tomcat. Enforced atomic database transactions with rollback protection and parameterized PreparedStatements across all operations.",
    architectureNodes: [
      { step: "01. Presentation", role: "JSP Dynamic Views", detail: "Server-side rendering, JSTL custom tags, CSRF token inclusion." },
      { step: "02. Controller", role: "Java Servlets", detail: "Request routing, session validation, cart state serialization in HTTP session." },
      { step: "03. Business Logic", role: "Enterprise JavaBeans / POJO", detail: "Inventory reservation, pricing recalculation, discount algorithms." },
      { step: "04. Database Layer", role: "MySQL & JDBC Pool", detail: "ACID transactions with isolation level control to eliminate race conditions." }
    ],
    keyInnovations: [
      "Atomic transactional rollback ensuring inventory and billing remain 100% consistent",
      "Parameterized PreparedStatement architecture eliminating SQL Injection vectors",
      "Server-side session tracking with secure cookie flags (HttpOnly & SameSite)",
      "High-throughput connection pooling via Apache Tomcat DataSource"
    ],
    metrics: [
      { label: "Transaction Safety", value: "100% ACID" },
      { label: "Container", value: "Apache Tomcat" },
      { label: "Vulnerability Rate", value: "0 Injections" }
    ],
    demoType: "ecommerce"
  },
  {
    id: "iris-classification-ml",
    title: "Iris Classification ML Engine",
    subtitle: "Multi-Class Predictive Analytics & Feature Pipeline",
    category: "AI/ML",
    tags: ["Python", "Scikit-Learn", "Machine Learning", "Data Science", "EDA"],
    techStack: ["Python 3.10", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib / Seaborn"],
    summary: "End-to-end supervised machine learning pipeline. Implements feature normalization, cross-validation, and multi-class classification predicting botanical species based on morphological metrics.",
    problem: "Real-world continuous biometric and sensor data often exhibits feature scale disparity, overfitting on small sample sets, and lack of reproducible pipeline abstractions.",
    solution: "Constructed a production-style Scikit-Learn Pipeline combining StandardScaler and hyperparameter-tuned algorithms (SVM / Random Forest) achieving 98%+ validation accuracy.",
    architectureNodes: [
      { step: "01. Feature Ingestion", role: "Pandas DataFrame", detail: "Ingestion of sepal length/width and petal length/width telemetry." },
      { step: "02. Preprocessing", role: "StandardScaler", detail: "Z-score normalization ensuring scale invariance across dimensions." },
      { step: "03. Model Training", role: "Scikit-Learn Pipeline", detail: "Stratified K-Fold cross validation and grid search hyperparameter tuning." },
      { step: "04. Inference Engine", role: "Pickle / Vector Predictor", detail: "Instantaneous sub-millisecond class probability generation." }
    ],
    keyInnovations: [
      "Modular Scikit-Learn pipeline encapsulation preventing data leakage during training",
      "Exploratory data analysis uncovering optimal petal-to-sepal separation frontiers",
      "Probabilistic class outputs providing confidence metrics alongside discrete predictions",
      "Lightweight zero-overhead serialized inference suitable for edge deployment"
    ],
    metrics: [
      { label: "Model Accuracy", value: "98.2%" },
      { label: "Inference Time", value: "< 1ms" },
      { label: "Feature Scaling", value: "Z-Score Pipeline" }
    ],
    demoType: "iris"
  },
  {
    id: "digital-pencil-sketch",
    title: "Digital Pencil Sketch Converter",
    subtitle: "OpenCV Mathematical Matrix Image Processing Engine",
    category: "AI/ML",
    tags: ["Python", "OpenCV", "NumPy", "Computer Vision", "Image Processing"],
    techStack: ["Python 3.10", "OpenCV", "NumPy", "Matrix Linear Algebra"],
    summary: "Computational photography pipeline converting raw RGB raster imagery into fine hand-drawn pencil sketches using grayscale transformation, color inversion, Gaussian kernel filtering, and color dodge blending.",
    problem: "Traditional graphic software sketch filters are bloated, slow, and produce unnatural harsh digital thresholds rather than delicate analog pencil texture gradients.",
    solution: "Devised an elegant, high-speed mathematical pipeline using matrix operations in NumPy and OpenCV: $Sketch = (Grayscale \\times 256) / (255 - Blur)$, executing in milliseconds.",
    architectureNodes: [
      { step: "01. Color Desaturation", role: "Grayscale Transform", detail: "Luminance-weighted color matrix compression (0.299R + 0.587G + 0.114B)." },
      { step: "02. Negative Inversion", role: "Matrix Bitwise NOT", detail: "Inverting pixel luminance values to prepare for frequency isolation." },
      { step: "03. Gaussian Filtering", role: "Kernel Convolution", detail: "Applying 21x21 Gaussian kernel to diffuse high-frequency spatial gradients." },
      { step: "04. Dodge Blending", role: "Division Matrix Blend", detail: "Dividing original grayscale by inverted blurred frame to reveal stroke contours." }
    ],
    keyInnovations: [
      "Mathematical color dodge division recreating natural charcoal/graphite gradients",
      "Vectorized NumPy matrix division eliminating nested loop performance bottlenecks",
      "Configurable Gaussian sigma yielding variable pencil stroke hardness",
      "Zero heavyweight ML dependencies: pure linear algebra & fast OpenCV primitives"
    ],
    metrics: [
      { label: "Processing Speed", value: "18ms / 1080p" },
      { label: "Dependency Footprint", value: "< 40MB" },
      { label: "Algorithm", value: "Dodge Kernel Blend" }
    ],
    demoType: "sketch"
  }
];

export const SKILL_NODES: SkillNode[] = [
  // Languages
  { name: "Java", category: "Languages", highlight: "OOP, Multithreading, Streams, JDBC, Servlets", architectureContext: "Core backend services and transactional architectures." },
  { name: "Python", category: "Languages", highlight: "OpenCV, NumPy, Scikit-Learn, YOLOv3, Data Pipelines", architectureContext: "Computer vision and machine learning engineering." },
  { name: "JavaScript / ESNext", category: "Languages", highlight: "Asynchronous Event Loop, Promises, DOM APIs, Closures", architectureContext: "Reactive frontends and Node.js microservices." },
  { name: "C Language", category: "Languages", highlight: "Memory Management, Pointers, Structs, Compilers", architectureContext: "Computational algorithms and low-level performance principles." },
  { name: "SQL", category: "Languages", highlight: "Complex Joins, Indexing Strategies, ACID Invariants, Normalization", architectureContext: "Relational data modeling and transaction guarantees." },

  // Frameworks & Engines
  { name: "React.js", category: "Frameworks & Engines", highlight: "Hooks, Context, Web Audio API, Virtual DOM, Modular Design", architectureContext: "High-performance reactive user experiences." },
  { name: "Spring Boot", category: "Frameworks & Engines", highlight: "REST APIs, Audio Byte Streaming, Decoupled Architecture, IoC Container", architectureContext: "Scalable enterprise microservices and endpoints." },
  { name: "Node.js & Express", category: "Frameworks & Engines", highlight: "Event-driven routing, Middleware pipelines, Async I/O, REST APIs", architectureContext: "Fast REST APIs and backend aggregation services." },
  { name: "OpenCV & Computer Vision", category: "Frameworks & Engines", highlight: "Gaussian Kernels, Frame Manipulation, Matrix transforms", architectureContext: "Real-time edge video processing and vision tools." },
  { name: "YOLOv3 / Deep Vision", category: "Frameworks & Engines", highlight: "Darknet Weights, Anchor Boxes, Quadrant Density Analysis", architectureContext: "Adaptive spatial intelligence and vehicle detection." },
  { name: "NumPy & Scikit-Learn", category: "Frameworks & Engines", highlight: "Matrix Algebra, StandardScaler, Classifiers, Evaluation", architectureContext: "Predictive analytics and mathematical vector pipelines." },

  // Databases & Tools
  { name: "MySQL", category: "Databases & Tools", highlight: "3NF Normalization, Foreign Keys, Query Tuning, Connection Pools", architectureContext: "ACID compliant transactional persistence." },
  { name: "MongoDB", category: "Databases & Tools", highlight: "ObjectId Referencing, Aggregation Pipelines, Mongoose Schemas", architectureContext: "Dynamic hierarchical data and rapid iteration." },
  { name: "Apache Tomcat", category: "Databases & Tools", highlight: "Servlet Containers, Session Replication, Connection Pooling", architectureContext: "Enterprise Java server-side deployment." },
  { name: "Git & GitHub", category: "Databases & Tools", highlight: "Branching strategies, CI/CD awareness, semantic commit hygiene", architectureContext: "Version control and production release management." },
  { name: "Postman & API Testing", category: "Databases & Tools", highlight: "Automated test suites, API contract assertion, mock servers", architectureContext: "Contract-first API validation and integration testing." }
];

export const PANDA_KNOWLEDGE_BASE = [
  {
    triggers: ["music", "audio", "spring boot", "music listener"],
    response: "The Music Listener app is one of Nagasai's proudest full-stack builds! It features a decoupled React frontend and a Spring Boot backend connected to MySQL. The secret sauce is HTTP 206 Partial Content byte-range audio streaming: the server serves audio in lightweight chunks so it doesn't hoard memory, while React's Web Audio API provides buttery-smooth seeking and visualizer waveforms."
  },
  {
    triggers: ["traffic", "yolo", "opencv", "smart traffic", "density", "zone"],
    response: "Ah, the Smart Traffic Management System! Most rookie traffic projects use basic single-line tripwires that miscount vehicles if they stop or tailgate. Nagasai engineered a quadrant-based zone density analyzer using YOLOv3-tiny and OpenCV. The algorithm calculates the real spatial vehicle density in each junction approach and dynamically scales the green light window between 15s and 75s. Smarter intersections, less idle carbon emissions!"
  },
  {
    triggers: ["book", "book review", "mern", "mongodb", "express"],
    response: "For the Book Review Management System, Nagasai built an asynchronous MERN platform. Instead of embedding endless review arrays inside single book documents (which can blow past MongoDB's 16MB document limit), he used normalized ObjectId referencing paired with powerful Mongoose aggregation pipelines ($lookup, $group, $facet). This gives you lightning-fast weighted rating calculations and clean data structure!"
  },
  {
    triggers: ["philosophy", "motto", "tagline", "think simple", "work smarter"],
    response: "Nagasai's engineering philosophy is: 'Think Simple, Work Smarter.' That means avoiding over-engineering and AI buzzword slop, choosing clean decoupled architectures, writing readable and maintainable code, and letting solid algorithms do the heavy lifting. Simplicity is the ultimate sophistication in production systems!"
  },
  {
    triggers: ["journey", "background", "experience", "story", "phases", "chrono"],
    response: "Nagasai's path is a masterclass in progressive mastery! Phase 1 (Ground Zero) tackled C and Python fundamentals and memory pointers. Phase 2 (Architectural Rigor) mastered Java OOP, MVC design, and ACID SQL transactions. Phase 3 (Domain Exploration) dove into reactive MERN, YOLOv3 computer vision, and distributed REST APIs. Now in Phase 4 (Convergence), he synthesizes end-to-end resilient ecosystems powered by intelligent edge models!"
  },
  {
    triggers: ["ecommerce", "tech store", "jsp", "tomcat", "acid"],
    response: "The Tech Store E-Commerce platform was built with classic Java Enterprise rigor: JSP, Servlets, and Apache Tomcat with MySQL. Nagasai implemented atomic ACID transaction boundaries with rollback handlers to completely prevent double-booking inventory during simultaneous checkouts, plus parameterized queries for reliable data consistency."
  },
  {
    triggers: ["sketch", "pencil", "image", "blur", "gaussian"],
    response: "The Digital Pencil Sketch converter is pure mathematical elegance! No bloated AI model needed. Nagasai built it using OpenCV and NumPy matrix operations: Grayscale -> Invert -> Gaussian Blur -> Color Dodge Division blend: Sketch = (Grayscale * 256) / (255 - Blur). It runs in under 20ms and generates gorgeous analog charcoal textures!"
  },
  {
    triggers: ["iris", "machine learning", "scikit", "classification"],
    response: "The Iris Classification ML Engine demonstrates disciplined data science engineering: clean Pandas ingestion, StandardScaler normalization to avoid feature scale skew, and cross-validated multi-class classifiers achieving 98%+ validation accuracy with sub-millisecond inference time."
  },
  {
    triggers: ["contact", "hire", "email", "reach out", "connect", "collaborate"],
    response: "You can transmit a direct directive to Nagasai via the 'Let's Connect' section below, or drop an email directly to vuppalanagasai5@gmail.com! He's also active on LinkedIn (linkedin.com/in/nagasai-vuppala) and GitHub (github.com/vuppalanagasai). Status: READY TO DEPLOY!"
  }
];
