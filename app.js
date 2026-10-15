// Initial rich starter curriculum data
    const INITIAL_DEMO_DATA = {
      subjects: [
        {
          id: "sub-1",
          name: "Mathematics (Calculus & Linear Algebra)",
          code: "MATH-301",
          color: "#6366f1",
          createdAt: Date.now() - 86400000 * 10
        },
        {
          id: "sub-2",
          name: "Physics (Electromagnetism & Waves)",
          code: "PHYS-202",
          color: "#06b6d4",
          createdAt: Date.now() - 86400000 * 9
        },
        {
          id: "sub-3",
          name: "Computer Science (Data Structures & Algos)",
          code: "CS-210",
          color: "#10b981",
          createdAt: Date.now() - 86400000 * 8
        },
        {
          id: "sub-4",
          name: "Chemistry (Chemical Kinetics & Thermodynamics)",
          code: "CHEM-105",
          color: "#f59e0b",
          createdAt: Date.now() - 86400000 * 7
        }
      ],
      topics: [
        // Math topics
        {
          id: "top-101",
          subjectId: "sub-1",
          name: "Limits, Continuity & Mean Value Theorem",
          notes: "Stewart Calculus Ch. 2; problem set A completed",
          stages: { learned: true, exercised: true, rev1: true, rev2: true }
        },
        {
          id: "top-102",
          subjectId: "sub-1",
          name: "Integration Techniques: By Parts & Partial Fractions",
          notes: "Review trigonometric substitutions",
          stages: { learned: true, exercised: true, rev1: true, rev2: false }
        },
        {
          id: "top-103",
          subjectId: "sub-1",
          name: "Eigenvalues, Eigenvectors & Diagonalization",
          notes: "Strang Ch. 6, practice characteristic polynomials",
          stages: { learned: true, exercised: true, rev1: false, rev2: false }
        },
        {
          id: "top-104",
          subjectId: "sub-1",
          name: "Multivariable Calculus: Green's & Stokes' Theorems",
          notes: "Surface integrals & divergence vector fields",
          stages: { learned: true, exercised: false, rev1: false, rev2: false }
        },
        {
          id: "top-105",
          subjectId: "sub-1",
          name: "Differential Equations: 2nd Order Linear with Constant Coeffs",
          notes: "Homogeneous and non-homogeneous with undetermined coefficients",
          stages: { learned: false, exercised: false, rev1: false, rev2: false }
        },

        // Physics topics
        {
          id: "top-201",
          subjectId: "sub-2",
          name: "Gauss's Law & Electric Potential Fields",
          notes: "Flux through cylindrical and spherical surfaces",
          stages: { learned: true, exercised: true, rev1: true, rev2: true }
        },
        {
          id: "top-202",
          subjectId: "sub-2",
          name: "Biot-Savart Law & Ampere's Circuital Law",
          notes: "Solenoids and magnetic field of long straight wires",
          stages: { learned: true, exercised: true, rev1: true, rev2: false }
        },
        {
          id: "top-203",
          subjectId: "sub-2",
          name: "Faraday's Law of Induction & Lenz's Law",
          notes: "Motional EMF and eddy current losses",
          stages: { learned: true, exercised: true, rev1: false, rev2: false }
        },
        {
          id: "top-204",
          subjectId: "sub-2",
          name: "Maxwell's Equations & Electromagnetic Waves",
          notes: "Displacement current and Poynting energy vector",
          stages: { learned: true, exercised: false, rev1: false, rev2: false }
        },

        // CS topics
        {
          id: "top-301",
          subjectId: "sub-3",
          name: "Self-Balancing Trees (AVL & Red-Black Trees)",
          notes: "Rotations, insertion height guarantees, Big-O proof",
          stages: { learned: true, exercised: true, rev1: true, rev2: true }
        },
        {
          id: "top-302",
          subjectId: "sub-3",
          name: "Graph Algorithms: Dijkstra's, Bellman-Ford & Floyd-Warshall",
          notes: "Shortest path edge relaxation, negative cycle detection",
          stages: { learned: true, exercised: true, rev1: true, rev2: false }
        },
        {
          id: "top-303",
          subjectId: "sub-3",
          name: "Dynamic Programming: Knapsack & Longest Common Subsequence",
          notes: "Memoization table vs tabulation space optimization",
          stages: { learned: true, exercised: true, rev1: false, rev2: false }
        },
        {
          id: "top-304",
          subjectId: "sub-3",
          name: "Disjoint Set Union (Union-Find) with Path Compression",
          notes: "Inverse Ackermann complexity, Kruskal MST",
          stages: { learned: false, exercised: false, rev1: false, rev2: false }
        },

        // Chemistry topics
        {
          id: "top-401",
          subjectId: "sub-4",
          name: "First & Second Laws of Thermodynamics (Enthalpy & Entropy)",
          notes: "Gibbs free energy and spontaneity criteria",
          stages: { learned: true, exercised: true, rev1: true, rev2: false }
        },
        {
          id: "top-402",
          subjectId: "sub-4",
          name: "Chemical Kinetics: Rate Laws & Arrhenius Equation",
          notes: "Activation energy and reaction mechanisms",
          stages: { learned: true, exercised: false, rev1: false, rev2: false }
        },
        {
          id: "top-403",
          subjectId: "sub-4",
          name: "Electrochemistry: Nernst Equation & Galvanic Cells",
          notes: "Standard reduction potentials and equilibrium constants",
          stages: { learned: false, exercised: false, rev1: false, rev2: false }
        }
      ]
    };

    const STORAGE_KEY = "syllabus_mastery_tracker_db_v1";
    let state = {
      subjects: [],
      topics: [],
      activeSubjectId: null,
      currentView: "dashboard", // 'dashboard' or 'manage'
      selectedColor: "#6366f1",
      filterStage: "all",
      searchQuery: "",
      sortBy: "default",
      theme: "dark"
    };

    // Load state from localStorage or initialize with demo data
    function loadState() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.subjects) && Array.isArray(parsed.topics)) {
            state.subjects = parsed.subjects;
            state.topics = parsed.topics;
            state.activeSubjectId = state.subjects.length > 0 ? state.subjects[0].id : null;
          } else {
            resetToDemoData();
          }
        } else {
          resetToDemoData();
        }
      } catch (e) {
        console.error("Failed to load stored data, fallback to demo", e);
        resetToDemoData();
      }

      // Load theme
      const savedTheme = localStorage.getItem("s_theme") || "dark";
      setTheme(savedTheme);
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          subjects: state.subjects,
          topics: state.topics
        }));
      } catch (e) {
        console.error("Failed to save state to localStorage", e);
      }
      render();
    }

    function resetToDemoData() {
      state.subjects = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA.subjects));
      state.topics = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA.topics));
      state.activeSubjectId = state.subjects.length > 0 ? state.subjects[0].id : null;
      saveState();
    }

    // THEME HANDLING
    function setTheme(theme) {
      state.theme = theme;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("s_theme", theme);
      const icon = document.getElementById("theme-icon");
      const text = document.getElementById("theme-text");
      if (theme === "light") {
        icon.textContent = "🌙";
        text.textContent = "Dark";
      } else {
        icon.textContent = "☀️";
        text.textContent = "Light";
      }
    }

    document.getElementById("btn-theme").addEventListener("click", () => {
      setTheme(state.theme === "light" ? "dark" : "light");
    });

    // NAVIGATION VIEW SWITCHING
    function switchView(viewName) {
      state.currentView = viewName;
      const dashView = document.getElementById("view-dashboard");
      const manageView = document.getElementById("view-manage");
      const tabDash = document.getElementById("tab-nav-dashboard");
      const tabManage = document.getElementById("tab-nav-manage");

      if (viewName === "dashboard") {
        dashView.style.display = "flex";
        manageView.style.display = "none";
        tabDash.classList.add("active");
        tabManage.classList.remove("active");
      } else {
        dashView.style.display = "none";
        manageView.style.display = "grid";
        tabDash.classList.remove("active");
        tabManage.classList.add("active");
      }
      render();
    }

    function selectSubject(subjectId) {
      state.activeSubjectId = subjectId;
      switchView("manage");
    }

    function jumpToFilter(stageName) {
      switchView("manage");
      const filterSelect = document.getElementById("topic-stage-filter");
      if (stageName === "learned") filterSelect.value = "needs_learned";
      else if (stageName === "exercised") filterSelect.value = "needs_exercised";
      else if (stageName === "rev1") filterSelect.value = "needs_rev1";
      else if (stageName === "rev2") filterSelect.value = "needs_rev2";
      handleTopicFilterChange();
    }

    // TOPIC CALCULATIONS & STAGE PROGRESS
    function getTopicProgress(topic) {
      let count = 0;
      if (topic.stages.learned) count++;
      if (topic.stages.exercised) count++;
      if (topic.stages.rev1) count++;
      if (topic.stages.rev2) count++;
      const pct = Math.round((count / 4) * 100);
      return { count, pct, isMastered: count === 4 };
    }

    function getSubjectStats(subjectId) {
      const subTopics = state.topics.filter(t => t.subjectId === subjectId);
      const total = subTopics.length;
      if (total === 0) {
        return { total: 0, pct: 0, learned: 0, exercised: 0, rev1: 0, rev2: 0, mastered: 0 };
      }

      let totalPoints = 0;
      let learned = 0, exercised = 0, rev1 = 0, rev2 = 0, mastered = 0;

      subTopics.forEach(t => {
        const prog = getTopicProgress(t);
        totalPoints += prog.count;
        if (t.stages.learned) learned++;
        if (t.stages.exercised) exercised++;
        if (t.stages.rev1) rev1++;
        if (t.stages.rev2) rev2++;
        if (prog.isMastered) mastered++;
      });

      const maxPoints = total * 4;
      const pct = Math.round((totalPoints / maxPoints) * 100);
      return { total, pct, learned, exercised, rev1, rev2, mastered };
    }

    function getOverallStats() {
      const totalTopics = state.topics.length;
      if (totalTopics === 0) {
        return {
          totalSubjects: state.subjects.length,
          totalTopics: 0,
          overallPct: 0,
          learned: 0,
          exercised: 0,
          rev1: 0,
          rev2: 0,
          mastered: 0,
          attention: 0
        };
      }

      let totalPoints = 0;
      let learned = 0, exercised = 0, rev1 = 0, rev2 = 0, mastered = 0, attention = 0;

      state.topics.forEach(t => {
        const prog = getTopicProgress(t);
        totalPoints += prog.count;
        if (t.stages.learned) learned++;
        if (t.stages.exercised) exercised++;
        if (t.stages.rev1) rev1++;
        if (t.stages.rev2) rev2++;
        if (prog.isMastered) mastered++;
        // Needs attention if started but not finished revision 2
        if (prog.count > 0 && prog.count < 4) attention++;
      });

      const overallPct = Math.round((totalPoints / (totalTopics * 4)) * 100);
      return {
        totalSubjects: state.subjects.length,
        totalTopics,
        overallPct,
        learned,
        exercised,
        rev1,
        rev2,
        mastered,
        attention
      };
    }

    // STAGE TOGGLING ACTION (Learned, Exercised, Rev 1, Rev 2)
    function toggleTopicStage(topicId, stageKey) {
      const topic = state.topics.find(t => t.id === topicId);
      if (!topic) return;

      // Smart logical stage chaining:
      // If user marks Rev 2 as checked, automatically ensure learned, exercised, rev1 are checked
      // If user unchecks Learned, automatically uncheck downstream stages
      const currentVal = !!topic.stages[stageKey];
      const newVal = !currentVal;
      topic.stages[stageKey] = newVal;

      if (newVal === true) {
        if (stageKey === "exercised") topic.stages.learned = true;
        if (stageKey === "rev1") { topic.stages.learned = true; topic.stages.exercised = true; }
        if (stageKey === "rev2") { topic.stages.learned = true; topic.stages.exercised = true; topic.stages.rev1 = true; }
      } else {
        if (stageKey === "learned") { topic.stages.exercised = false; topic.stages.rev1 = false; topic.stages.rev2 = false; }
        if (stageKey === "exercised") { topic.stages.rev1 = false; topic.stages.rev2 = false; }
        if (stageKey === "rev1") { topic.stages.rev2 = false; }
      }

      saveState();
    }

    // QUICK ADVANCE TO NEXT STAGE
    function advanceTopicStage(topicId) {
      const topic = state.topics.find(t => t.id === topicId);
      if (!topic) return;
      if (!topic.stages.learned) topic.stages.learned = true;
      else if (!topic.stages.exercised) topic.stages.exercised = true;
      else if (!topic.stages.rev1) topic.stages.rev1 = true;
      else if (!topic.stages.rev2) topic.stages.rev2 = true;
      saveState();
    }

    // RENDER FUNCTIONS
    function render() {
      renderDashboard();
      renderManagement();
    }

    function renderDashboard() {
      const stats = getOverallStats();

      // Update Hero Gauge
      document.getElementById("hero-pct").textContent = stats.overallPct + "%";
      const gaugeCircle = document.getElementById("overall-gauge");
      const circumference = 2 * Math.PI * 70; // ~439.8
      const offset = circumference - (stats.overallPct / 100) * circumference;
      gaugeCircle.style.strokeDashoffset = offset;

      // Update Hero Mini Stage Bars
      const t = stats.totalTopics || 1;
      const lPct = Math.round((stats.learned / t) * 100);
      const ePct = Math.round((stats.exercised / t) * 100);
      const r1Pct = Math.round((stats.rev1 / t) * 100);
      const r2Pct = Math.round((stats.rev2 / t) * 100);

      document.getElementById("hero-stat-learned").textContent = `${stats.learned}/${stats.totalTopics} (${lPct}%)`;
      document.getElementById("hero-bar-learned").style.width = lPct + "%";

      document.getElementById("hero-stat-exercised").textContent = `${stats.exercised}/${stats.totalTopics} (${ePct}%)`;
      document.getElementById("hero-bar-exercised").style.width = ePct + "%";

      document.getElementById("hero-stat-rev1").textContent = `${stats.rev1}/${stats.totalTopics} (${r1Pct}%)`;
      document.getElementById("hero-bar-rev1").style.width = r1Pct + "%";

      document.getElementById("hero-stat-rev2").textContent = `${stats.rev2}/${stats.totalTopics} (${r2Pct}%)`;
      document.getElementById("hero-bar-rev2").style.width = r2Pct + "%";

      // KPI Numbers
      document.getElementById("kpi-subjects-count").textContent = stats.totalSubjects;
      document.getElementById("kpi-topics-count").textContent = stats.totalTopics;
      document.getElementById("kpi-mastered-count").textContent = stats.mastered;
      document.getElementById("kpi-attention-count").textContent = stats.attention;

      // Pipeline counts & labels
      document.getElementById("pipe-learned-count").textContent = stats.learned;
      document.getElementById("pipe-learned-meta").textContent = `${lPct}% syllabus explored`;

      document.getElementById("pipe-exercised-count").textContent = stats.exercised;
      document.getElementById("pipe-exercised-meta").textContent = `${ePct}% questions solved`;

      document.getElementById("pipe-rev1-count").textContent = stats.rev1;
      document.getElementById("pipe-rev1-meta").textContent = `${r1Pct}% spaced review 1`;

      document.getElementById("pipe-rev2-count").textContent = stats.rev2;
      document.getElementById("pipe-rev2-meta").textContent = `${r2Pct}% mastered (review 2)`;

      // Subjects Breakdown Grid
      const subContainer = document.getElementById("dashboard-subjects-container");
      if (state.subjects.length === 0) {
        subContainer.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-icon">📂</div>
            <h3>No subjects added yet</h3>
            <p>Create your first subject to start tracking topics and syllabus completion.</p>
            <button class="btn btn-primary btn-sm" onclick="openSubjectModal()">+ Create Subject</button>
          </div>
        `;
        return;
      }

      subContainer.innerHTML = state.subjects.map(sub => {
        const sStats = getSubjectStats(sub.id);
        return `
          <div class="subject-summary-card" onclick="selectSubject('${sub.id}')">
            <div class="sub-card-header">
              <div class="sub-tag-group">
                <div class="sub-color-dot" style="background: ${sub.color || '#6366f1'};"></div>
                <div>
                  <div class="sub-name">${escapeHtml(sub.name)}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(sub.code || "Active")} · ${sStats.total} topics</div>
                </div>
              </div>
              <div class="sub-pct" style="color: ${sub.color || '#6366f1'};">${sStats.pct}%</div>
            </div>

            <div class="sub-progress-bar-bg">
              <div class="sub-progress-bar-fill" style="width: ${sStats.pct}%; background: ${sub.color || '#6366f1'};"></div>
            </div>

            <div class="sub-stage-chips">
              <div class="sub-stage-chip" title="Learned">
                <span style="color: var(--stage-learned)">●</span> ${sStats.learned}/${sStats.total}
              </div>
              <div class="sub-stage-chip" title="Exercised">
                <span style="color: var(--stage-exercised)">●</span> ${sStats.exercised}/${sStats.total}
              </div>
              <div class="sub-stage-chip" title="Revision 1">
                <span style="color: var(--stage-rev1)">●</span> ${sStats.rev1}/${sStats.total}
              </div>
              <div class="sub-stage-chip" title="Revision 2">
                <span style="color: var(--stage-rev2)">●</span> ${sStats.rev2}/${sStats.total}
              </div>
            </div>
          </div>
        `;
      }).join("");
    }

    function renderManagement() {
      // 1. Render Sidebar Subject List
      const navList = document.getElementById("subject-nav-list");
      if (state.subjects.length === 0) {
        navList.innerHTML = `<li style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">No subjects yet.</li>`;
        state.activeSubjectId = null;
      } else {
        if (!state.activeSubjectId || !state.subjects.some(s => s.id === state.activeSubjectId)) {
          state.activeSubjectId = state.subjects[0].id;
        }

        navList.innerHTML = state.subjects.map(sub => {
          const sStats = getSubjectStats(sub.id);
          const isActive = sub.id === state.activeSubjectId;
          return `
            <li class="subject-nav-item ${isActive ? 'active' : ''}" onclick="selectSubjectNav('${sub.id}')">
              <div class="nav-item-left">
                <div class="sub-color-dot" style="background: ${sub.color || '#6366f1'};"></div>
                <span style="max-width: 170px; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(sub.name)}</span>
              </div>
              <span class="nav-item-badge">${sStats.pct}%</span>
            </li>
          `;
        }).join("");
      }

      // 2. Render Active Subject Header Details
      const activeSub = state.subjects.find(s => s.id === state.activeSubjectId);
      const subTitleEl = document.getElementById("current-sub-title");
      const subStatsEl = document.getElementById("current-sub-stats");
      const subDotEl = document.getElementById("current-sub-dot");
      const btnEditSub = document.getElementById("btn-edit-sub");
      const btnDeleteSub = document.getElementById("btn-delete-sub");

      if (!activeSub) {
        subTitleEl.textContent = "No Subject Selected";
        subStatsEl.textContent = "Create or choose a subject to begin";
        subDotEl.style.background = "#64748b";
        btnEditSub.style.display = "none";
        btnDeleteSub.style.display = "none";
        document.getElementById("topics-list-container").innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📚</div>
            <h3>No subject selected</h3>
            <p>Select a subject from the sidebar or create a new one to list topics.</p>
            <button class="btn btn-primary btn-sm" onclick="openSubjectModal()">+ Create Subject</button>
          </div>
        `;
        return;
      }

      btnEditSub.style.display = "inline-flex";
      btnDeleteSub.style.display = "inline-flex";
      subTitleEl.textContent = activeSub.name;
      subDotEl.style.background = activeSub.color || "#6366f1";
      const sStats = getSubjectStats(activeSub.id);
      subStatsEl.textContent = `${activeSub.code ? activeSub.code + " · " : ""}${sStats.total} topics total · ${sStats.pct}% syllabus completed · ${sStats.mastered} mastered`;

      // 3. Render Topics List for Active Subject
      renderTopicsList(activeSub.id);
    }

    function selectSubjectNav(subjectId) {
      state.activeSubjectId = subjectId;
      render();
    }

    function handleTopicFilterChange() {
      state.searchQuery = document.getElementById("topic-search-input").value.trim().toLowerCase();
      state.filterStage = document.getElementById("topic-stage-filter").value;
      state.sortBy = document.getElementById("topic-sort").value;
      if (state.activeSubjectId) {
        renderTopicsList(state.activeSubjectId);
      }
    }

    function renderTopicsList(subjectId) {
      const container = document.getElementById("topics-list-container");
      let topics = state.topics.filter(t => t.subjectId === subjectId);

      // Apply Search Filter
      if (state.searchQuery) {
        topics = topics.filter(t => 
          t.name.toLowerCase().includes(state.searchQuery) ||
          (t.notes && t.notes.toLowerCase().includes(state.searchQuery))
        );
      }

      // Apply Stage Filter
      if (state.filterStage === "not_started") {
        topics = topics.filter(t => !t.stages.learned && !t.stages.exercised && !t.stages.rev1 && !t.stages.rev2);
      } else if (state.filterStage === "needs_learned") {
        topics = topics.filter(t => !t.stages.learned);
      } else if (state.filterStage === "needs_exercised") {
        topics = topics.filter(t => t.stages.learned && !t.stages.exercised);
      } else if (state.filterStage === "needs_rev1") {
        topics = topics.filter(t => t.stages.exercised && !t.stages.rev1);
      } else if (state.filterStage === "needs_rev2") {
        topics = topics.filter(t => t.stages.rev1 && !t.stages.rev2);
      } else if (state.filterStage === "mastered") {
        topics = topics.filter(t => t.stages.learned && t.stages.exercised && t.stages.rev1 && t.stages.rev2);
      }

      // Apply Sorting
      if (state.sortBy === "progress_asc") {
        topics.sort((a, b) => getTopicProgress(a).pct - getTopicProgress(b).pct);
      } else if (state.sortBy === "progress_desc") {
        topics.sort((a, b) => getTopicProgress(b).pct - getTopicProgress(a).pct);
      } else if (state.sortBy === "alphabetical") {
        topics.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (topics.length === 0) {
        const isFiltered = state.searchQuery || state.filterStage !== "all";
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>${isFiltered ? "No matching topics found" : "No topics in this subject yet"}</h3>
            <p>${isFiltered ? "Try clearing your search query or stage filter." : "Click below to add your first chapter or topic for this subject."}</p>
            ${isFiltered 
              ? `<button class="btn btn-secondary btn-sm" onclick="clearFilters()">Reset Filters</button>`
              : `<button class="btn btn-primary btn-sm" onclick="openTopicModal()">+ Add Topic</button>`
            }
          </div>
        `;
        return;
      }

      container.innerHTML = topics.map(topic => {
        const prog = getTopicProgress(topic);
        const st = topic.stages;
        const stageBadgeClass = `stage-${prog.count}`;
        let stageText = "Not Started";
        if (prog.count === 1) stageText = "Learned (25%)";
        else if (prog.count === 2) stageText = "Exercised (50%)";
        else if (prog.count === 3) stageText = "Revision 1 Done (75%)";
        else if (prog.count === 4) stageText = "Mastered (100%)";

        return `
          <div class="topic-card ${prog.isMastered ? 'mastered' : ''}" id="card-${topic.id}">
            <div class="topic-row-top">
              <div class="topic-title-wrapper">
                <div class="topic-name">${escapeHtml(topic.name)}</div>
                ${topic.notes ? `<div class="topic-notes">${escapeHtml(topic.notes)}</div>` : ''}
              </div>

              <div class="topic-card-actions">
                <span class="stage-level-badge ${stageBadgeClass}">
                  ${prog.isMastered ? '🏆 ' : ''}${stageText}
                </span>
                <button class="btn btn-outline btn-sm" style="padding: 0.25rem 0.5rem;" title="Edit Topic" onclick="editTopic('${topic.id}')">✏️</button>
                <button class="btn btn-danger-outline btn-sm" style="padding: 0.25rem 0.5rem;" title="Delete Topic" onclick="deleteTopic('${topic.id}')">🗑️</button>
              </div>
            </div>

            <!-- 4 STATUS TABS: Learned, Exercised, Revision 1, Revision 2 -->
            <div class="status-tabs-container">
              <button 
                type="button" 
                class="status-tab ${st.learned ? 'active-learned' : ''}"
                onclick="toggleTopicStage('${topic.id}', 'learned')"
                title="Stage 1: Concept & Theory Covered"
              >
                <span class="check-icon">✓</span>
                <span>Learned</span>
              </button>

              <button 
                type="button" 
                class="status-tab ${st.exercised ? 'active-exercised' : ''}"
                onclick="toggleTopicStage('${topic.id}', 'exercised')"
                title="Stage 2: Problems & Exercises Solved"
              >
                <span class="check-icon">✓</span>
                <span>Exercised</span>
              </button>

              <button 
                type="button" 
                class="status-tab ${st.rev1 ? 'active-rev1' : ''}"
                onclick="toggleTopicStage('${topic.id}', 'rev1')"
                title="Stage 3: First Spaced Repetition Review"
              >
                <span class="check-icon">✓</span>
                <span>Revision 1</span>
              </button>

              <button 
                type="button" 
                class="status-tab ${st.rev2 ? 'active-rev2' : ''}"
                onclick="toggleTopicStage('${topic.id}', 'rev2')"
                title="Stage 4: Second Spaced Repetition Mastery"
              >
                <span class="check-icon">✓</span>
                <span>Revision 2</span>
              </button>
            </div>

            <div class="topic-progress-footer">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 110px; height: 6px; background: var(--bg-tertiary); border-radius: 99px; overflow: hidden;">
                  <div style="width: ${prog.pct}%; height: 100%; background: ${prog.pct === 100 ? 'var(--stage-rev2)' : 'var(--accent-primary)'}; transition: width 0.3s ease;"></div>
                </div>
                <span>${prog.count}/4 stages complete</span>
              </div>

              ${!prog.isMastered ? `
                <button class="btn btn-outline btn-sm" style="font-size: 0.72rem; padding: 0.2rem 0.55rem;" onclick="advanceTopicStage('${topic.id}')">
                  Advance to Next Stage ➔
                </button>
              ` : `
                <span style="color: var(--stage-rev2); font-weight: 600;">✓ Ready for Exam</span>
              `}
            </div>
          </div>
        `;
      }).join("");
    }

    function clearFilters() {
      document.getElementById("topic-search-input").value = "";
      document.getElementById("topic-stage-filter").value = "all";
      document.getElementById("topic-sort").value = "default";
      handleTopicFilterChange();
    }

    // SUBJECT MODAL LOGIC
    function openSubjectModal(subjectToEdit = null) {
      const modal = document.getElementById("subject-modal");
      const titleEl = document.getElementById("subject-modal-title");
      const idInput = document.getElementById("modal-subject-id");
      const nameInput = document.getElementById("sub-name-input");
      const targetInput = document.getElementById("sub-target-input");

      if (subjectToEdit) {
        titleEl.textContent = "Edit Subject";
        idInput.value = subjectToEdit.id;
        nameInput.value = subjectToEdit.name;
        targetInput.value = subjectToEdit.code || "";
        selectColorSwatch(subjectToEdit.color || "#6366f1");
      } else {
        titleEl.textContent = "Create New Subject";
        idInput.value = "";
        nameInput.value = "";
        targetInput.value = "";
        selectColorSwatch("#6366f1");
      }

      modal.classList.add("active");
      setTimeout(() => nameInput.focus(), 50);
    }

    function selectColorSwatch(color) {
      state.selectedColor = color;
      document.querySelectorAll(".color-swatch-btn").forEach(btn => {
        if (btn.getAttribute("data-color") === color) {
          btn.classList.add("selected");
        } else {
          btn.classList.remove("selected");
        }
      });
    }

    document.querySelectorAll(".color-swatch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        selectColorSwatch(btn.getAttribute("data-color"));
      });
    });

    function saveSubjectFromModal() {
      const id = document.getElementById("modal-subject-id").value;
      const name = document.getElementById("sub-name-input").value.trim();
      const code = document.getElementById("sub-target-input").value.trim();

      if (!name) {
        alert("Please enter a subject name.");
        return;
      }

      if (id) {
        // Edit existing
        const sub = state.subjects.find(s => s.id === id);
        if (sub) {
          sub.name = name;
          sub.code = code;
          sub.color = state.selectedColor;
        }
      } else {
        // Create new
        const newId = "sub-" + Date.now();
        state.subjects.push({
          id: newId,
          name,
          code,
          color: state.selectedColor,
          createdAt: Date.now()
        });
        state.activeSubjectId = newId;
      }

      closeModal("subject-modal");
      saveState();
    }

    function editCurrentSubject() {
      const activeSub = state.subjects.find(s => s.id === state.activeSubjectId);
      if (activeSub) openSubjectModal(activeSub);
    }

    function deleteCurrentSubject() {
      const activeSub = state.subjects.find(s => s.id === state.activeSubjectId);
      if (!activeSub) return;

      const subTopicsCount = state.topics.filter(t => t.subjectId === activeSub.id).length;
      const confirmMsg = subTopicsCount > 0 
        ? `Are you sure you want to delete "${activeSub.name}" and all its ${subTopicsCount} topics?`
        : `Delete "${activeSub.name}"?`;

      if (confirm(confirmMsg)) {
        state.subjects = state.subjects.filter(s => s.id !== activeSub.id);
        state.topics = state.topics.filter(t => t.subjectId !== activeSub.id);
        state.activeSubjectId = state.subjects.length > 0 ? state.subjects[0].id : null;
        saveState();
      }
    }

    // TOPIC MODAL LOGIC
    function openTopicModal(topicToEdit = null) {
      if (state.subjects.length === 0) {
        alert("Please create at least one subject before adding topics.");
        openSubjectModal();
        return;
      }

      const modal = document.getElementById("topic-modal");
      const titleEl = document.getElementById("topic-modal-title");
      const idInput = document.getElementById("modal-topic-id");
      const subSelect = document.getElementById("topic-subject-select");
      const nameInput = document.getElementById("topic-name-input");
      const notesInput = document.getElementById("topic-notes-input");

      const chkLearned = document.getElementById("modal-chk-learned");
      const chkExercised = document.getElementById("modal-chk-exercised");
      const chkRev1 = document.getElementById("modal-chk-rev1");
      const chkRev2 = document.getElementById("modal-chk-rev2");

      // Populate subject select
      subSelect.innerHTML = state.subjects.map(s => 
        `<option value="${s.id}" ${s.id === state.activeSubjectId ? 'selected' : ''}>${escapeHtml(s.name)}</option>`
      ).join("");

      if (topicToEdit) {
        titleEl.textContent = "Edit Topic";
        idInput.value = topicToEdit.id;
        subSelect.value = topicToEdit.subjectId;
        nameInput.value = topicToEdit.name;
        notesInput.value = topicToEdit.notes || "";
        chkLearned.checked = !!topicToEdit.stages.learned;
        chkExercised.checked = !!topicToEdit.stages.exercised;
        chkRev1.checked = !!topicToEdit.stages.rev1;
        chkRev2.checked = !!topicToEdit.stages.rev2;
      } else {
        titleEl.textContent = "Add New Topic";
        idInput.value = "";
        nameInput.value = "";
        notesInput.value = "";
        chkLearned.checked = false;
        chkExercised.checked = false;
        chkRev1.checked = false;
        chkRev2.checked = false;
      }

      modal.classList.add("active");
      setTimeout(() => nameInput.focus(), 50);
    }

    function saveTopicFromModal() {
      const id = document.getElementById("modal-topic-id").value;
      const subjectId = document.getElementById("topic-subject-select").value;
      const name = document.getElementById("topic-name-input").value.trim();
      const notes = document.getElementById("topic-notes-input").value.trim();

      const learned = document.getElementById("modal-chk-learned").checked;
      const exercised = document.getElementById("modal-chk-exercised").checked;
      const rev1 = document.getElementById("modal-chk-rev1").checked;
      const rev2 = document.getElementById("modal-chk-rev2").checked;

      if (!name) {
        alert("Please enter a topic name.");
        return;
      }

      if (id) {
        // Edit existing
        const topic = state.topics.find(t => t.id === id);
        if (topic) {
          topic.subjectId = subjectId;
          topic.name = name;
          topic.notes = notes;
          topic.stages = { learned, exercised, rev1, rev2 };
        }
      } else {
        // Create new
        state.topics.push({
          id: "top-" + Date.now(),
          subjectId,
          name,
          notes,
          stages: { learned, exercised, rev1, rev2 }
        });
        state.activeSubjectId = subjectId;
      }

      closeModal("topic-modal");
      saveState();
    }

    function editTopic(topicId) {
      const topic = state.topics.find(t => t.id === topicId);
      if (topic) openTopicModal(topic);
    }

    function deleteTopic(topicId) {
      const topic = state.topics.find(t => t.id === topicId);
      if (!topic) return;
      if (confirm(`Delete topic "${topic.name}"?`)) {
        state.topics = state.topics.filter(t => t.id !== topicId);
        saveState();
      }
    }

    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove("active");
    }

    // Close modal on Escape or backdrop click
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
      }
    });

    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("active");
      });
    });

    // BACKUP & RESTORE DATA
    document.getElementById("btn-export").addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        syllabus_data_version: 1,
        exportedAt: new Date().toISOString(),
        subjects: state.subjects,
        topics: state.topics
      }, null, 2));
      const dlAnchor = document.createElement("a");
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `syllabus_tracker_backup_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
    });

    document.getElementById("btn-import-trigger").addEventListener("click", () => {
      document.getElementById("file-importer").click();
    });

    document.getElementById("file-importer").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && Array.isArray(parsed.subjects) && Array.isArray(parsed.topics)) {
            if (confirm("Restore this syllabus backup? Current topics and subjects will be replaced.")) {
              state.subjects = parsed.subjects;
              state.topics = parsed.topics;
              state.activeSubjectId = state.subjects.length > 0 ? state.subjects[0].id : null;
              saveState();
              alert("Syllabus data restored successfully!");
            }
          } else {
            alert("Invalid backup file format.");
          }
        } catch (err) {
          alert("Could not parse JSON file.");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    document.getElementById("btn-reset-demo").addEventListener("click", () => {
      if (confirm("Reset to default sample curriculum data? All current subjects will be replaced.")) {
        resetToDemoData();
      }
    });

    // UTILITIES
    function escapeHtml(str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // INITIAL STARTUP
    loadState();
    render();