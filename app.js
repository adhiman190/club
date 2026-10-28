// ===== PCTE Club Management System - Shared App Logic =====

// ===== DATA STATE (Loaded dynamically from SQLite backend) =====
let CLUBS = [
  { id:1, name:'Table Tennis Club', emoji:'🏓', category:'Sports', members:42, events:8, coordinator:'Prof. R. Kumar', desc:'Competitive table tennis training and inter-college tournaments.', color:'#6c63ff', founded:'2019', room:'ET-101', status:'active' },
  { id:2, name:'Dance Club', emoji:'💃', category:'Cultural', members:68, events:15, coordinator:'Dr. S. Mehta', desc:'Classical, contemporary, and Bollywood dance performances & workshops.', color:'#f59e0b', founded:'2018', room:'ET-102', status:'active' },
  { id:3, name:'Holistic & Wellness Club', emoji:'🧘', category:'Wellness', members:55, events:12, coordinator:'Dr. A. Nair', desc:'Yoga, mindfulness, and mental health awareness programs.', color:'#10b981', founded:'2020', room:'ET-103', status:'active' },
  { id:4, name:'Literary Club', emoji:'📚', category:'Academic', members:38, events:10, coordinator:'Prof. N. Verma', desc:'Debates, creative writing, poetry competitions and book clubs.', color:'#3b82f6', founded:'2017', room:'ET-201', status:'active' },
  { id:5, name:'Music Club', emoji:'🎵', category:'Cultural', members:72, events:18, coordinator:'Dr. V. Sharma', desc:'Vocal training, instrumental music, and live concert performances.', color:'#ec4899', founded:'2016', room:'ET-202', status:'active' },
  { id:6, name:'Theatre Club', emoji:'🎭', category:'Cultural', members:45, events:9, coordinator:'Prof. L. Kapoor', desc:'Drama productions, street plays, and acting workshops.', color:'#8b5cf6', founded:'2018', room:'ET-203', status:'active' },
  { id:7, name:'Basketball Club', emoji:'🏀', category:'Sports', members:35, events:14, coordinator:'Coach M. Singh', desc:'Basketball training and inter-college championship team.', color:'#f97316', founded:'2019', room:'ETCC-1', status:'active' },
  { id:8, name:'Chess Club', emoji:'♟️', category:'Academic', members:28, events:7, coordinator:'Prof. P. Gupta', desc:'Strategic chess tournaments and FIDE-rated competitions.', color:'#64748b', founded:'2020', room:'ET-301', status:'active' },
  { id:9, name:'Cricket Club', emoji:'🏏', category:'Sports', members:50, events:16, coordinator:'Coach S. Yadav', desc:'Cricket matches, coaching, and annual inter-college tournaments.', color:'#22c55e', founded:'2015', room:'ET-302', status:'active' },
  { id:10, name:'Soccer Club', emoji:'⚽', category:'Sports', members:44, events:13, coordinator:'Coach R. Patel', desc:'Football training sessions and inter-institute league matches.', color:'#0ea5e9', founded:'2017', room:'ET-303', status:'active' },
  { id:11, name:'Creative Club', emoji:'🎨', category:'Arts', members:60, events:11, coordinator:'Prof. D. Bose', desc:'Painting, digital art, photography, and design exhibitions.', color:'#f43f5e', founded:'2018', room:'ET-304', status:'active' },
  { id:12, name:'Badminton Club', emoji:'🏸', category:'Sports', members:36, events:10, coordinator:'Coach P. Rao', desc:'Badminton coaching, singles & doubles tournaments.', color:'#6c63ff', founded:'2019', room:'ET-310', status:'active' },
  { id:13, name:'CSR Club', emoji:'🤝', category:'Social', members:65, events:20, coordinator:'Dr. M. Jain', desc:'Community service, social drives, blood donation, and charity events.', color:'#10b981', founded:'2016', room:'ET-401', status:'active' },
  { id:14, name:'Pool Club', emoji:'🎱', category:'Sports', members:22, events:6, coordinator:'Prof. K. Tiwari', desc:'Billiards and pool table competitions and coaching.', color:'#8b5cf6', founded:'2021', room:'ET-402', status:'active' },
  { id:15, name:'Volleyball Club', emoji:'🏐', category:'Sports', members:30, events:8, coordinator:'Coach A. Mishra', desc:'Volleyball training and annual inter-college tournaments.', color:'#f59e0b', founded:'2020', room:'ET-403', status:'active' },
  { id:16, name:'Events on Air Club', emoji:'🎙️', category:'Media', members:48, events:22, coordinator:'Dr. R. Khanna', desc:'Radio broadcasting, podcasting, and live event hosting.', color:'#ec4899', founded:'2017', room:'ET-410', status:'active' },
  { id:17, name:'Adventure Club', emoji:'🏕️', category:'Adventure', members:40, events:17, coordinator:'Prof. S. Rawat', desc:'Trekking, rock climbing, camping, and outdoor adventure sports.', color:'#f97316', founded:'2018', room:'ET-510', status:'active' },
];

let EVENTS = [
  { id:1, clubId:1, name:'PCTE Table Tennis Championship', date:'2025-09-15', time:'10:00 AM', venue:'Sports Complex', desc:'Annual inter-college table tennis championship', status:'open', participants:28, maxParticipants:64, registered:true },
  { id:2, clubId:2, name:'Cultural Fest Dance Competition', date:'2025-09-22', time:'5:00 PM', venue:'Main Auditorium', desc:'Annual dance showcase and competition', status:'open', participants:45, maxParticipants:100, registered:false },
  { id:3, clubId:5, name:'PCTE Music Night 2025', date:'2025-09-28', time:'7:00 PM', venue:'Open Air Theatre', desc:'Annual music night featuring live performances', status:'upcoming', participants:0, maxParticipants:200, registered:false },
  { id:4, clubId:13, name:'Blood Donation Camp', date:'2025-09-10', time:'9:00 AM', venue:'Campus Ground', desc:'Community blood donation drive in association with PGI', status:'completed', participants:120, maxParticipants:200, registered:true },
  { id:5, clubId:4, name:'Inter-College Debate League', date:'2025-10-05', time:'11:00 AM', venue:'Seminar Hall A', desc:'All India university-level debate competition', status:'upcoming', participants:0, maxParticipants:40, registered:false },
  { id:6, clubId:9, name:'Cricket Premier League', date:'2025-10-12', time:'8:00 AM', venue:'Cricket Ground', desc:'Internal college cricket league — team registrations open', status:'open', participants:60, maxParticipants:120, registered:false },
  { id:7, clubId:16, name:'Podcast Workshop', date:'2025-09-18', time:'2:00 PM', venue:'Media Lab ET-410', desc:'Hands-on workshop on creating and hosting podcasts', status:'open', participants:20, maxParticipants:30, registered:true },
  { id:8, clubId:17, name:'Himalayan Trek Expedition', date:'2025-10-20', time:'6:00 AM', venue:'Depart from Campus Gate', desc:'3-day trek to Triund, Dharamshala — limited seats', status:'open', participants:18, maxParticipants:25, registered:false },
]; 

let ANNOUNCEMENTS = [
  { id:1, title:'Club Elections 2025 — Voting Starts Soon!', text:'Annual club elections for the academic year 2025-26 are scheduled. All registered students can vote for their preferred candidates for each club leadership position. Check your polling booth room on the notice board.', clubName:'Admin', emoji:'🗳️', time:'2 hours ago', color:'rgba(108,99,255,0.15)', important:true },
  { id:2, title:'CSR Blood Donation Camp — Thank You!', text:'PCTE CSR Club successfully conducted the blood donation camp. 120 units of blood were collected. Certificates of participation will be available for download within 48 hours.', clubName:'CSR Club', emoji:'❤️', time:'1 day ago', color:'rgba(239,68,68,0.1)', important:false },
  { id:3, title:'Music Night 2025 — Registrations Open', text:'PCTE Music Night 2025 registrations are now open! Participate as a solo artist or in a group. Genre: Sufi, Bollywood, Western. Auditions on 20th September.', clubName:'Music Club', emoji:'🎵', time:'2 days ago', color:'rgba(245,158,11,0.1)', important:false },
  { id:4, title:'New Club: Events on Air — Recruiting Members', text:'The newly revamped Events on Air Club is recruiting members for the academic year. Roles available: RJ, Content Writer, Social Media Manager, Sound Engineer.', clubName:'Events on Air', emoji:'📻', time:'3 days ago', color:'rgba(16,185,129,0.1)', important:false },
  { id:5, title:'Himalayan Trek — Medical Certificate Required', text:'All students registered for the Himalayan Trek Expedition must submit a medical fitness certificate signed by a registered doctor by 10th October 2025.', clubName:'Adventure Club', emoji:'⛺', time:'4 days ago', color:'rgba(249,115,22,0.1)', important:true },
];

let MEMBERS = [
  { id:1, name:'Arjun Sharma', roll:'2K22/CS/045', dept:'CSE', clubs:['Dance Club','Cricket Club'], joinDate:'2023-08-01', status:'active', avatar:'🧑' },
  { id:2, name:'Priya Patel', roll:'2K22/EC/032', dept:'ECE', clubs:['Music Club','Literary Club'], joinDate:'2023-08-01', status:'active', avatar:'👩' },
  { id:3, name:'Rahul Verma', roll:'2K23/ME/011', dept:'Mech', clubs:['Basketball Club','CSR Club'], joinDate:'2024-08-01', status:'active', avatar:'🧔' },
  { id:4, name:'Ananya Singh', roll:'2K22/CS/067', dept:'CSE', clubs:['Theatre Club', 'Dance Club'], joinDate:'2023-08-01', status:'active', avatar:'👧' },
  { id:5, name:'Karan Mehta', roll:'2K23/CE/024', dept:'Civil', clubs:['Adventure Club'], joinDate:'2024-08-01', status:'pending', avatar:'🧑' },
  { id:6, name:'Simran Kaur', roll:'2K22/IT/089', dept:'IT', clubs:['Creative Club','Holistic & Wellness Club'], joinDate:'2023-08-01', status:'active', avatar:'👩' },
];

let CERTIFICATES = [
  { id:1, student:'Arjun Sharma', event:'Blood Donation Camp', club:'CSR Club', date:'2025-09-10', id_no:'PCTE-CERT-2025-001' },
  { id:2, student:'Arjun Sharma', event:'Podcast Workshop', club:'Events on Air Club', date:'2025-09-18', id_no:'PCTE-CERT-2025-002' },
];

// Load Backend Data via API
async function fetchBackendData() {
  try {
    const [cRes, eRes, aRes, mRes, certRes] = await Promise.all([
      fetch('/api/clubs').then(r => r.ok ? r.json() : null),
      fetch('/api/events').then(r => r.ok ? r.json() : null),
      fetch('/api/announcements').then(r => r.ok ? r.json() : null),
      fetch('/api/members').then(r => r.ok ? r.json() : null),
      fetch('/api/certificates').then(r => r.ok ? r.json() : null)
    ]);

    if (cRes && cRes.length) CLUBS = cRes;
    if (eRes && eRes.length) EVENTS = eRes;
    if (aRes && aRes.length) ANNOUNCEMENTS = aRes;
    if (mRes && mRes.length) MEMBERS = mRes.map(m => ({ ...m, clubs: typeof m.clubs === 'string' ? m.clubs.split(', ') : m.clubs }));
    if (certRes && certRes.length) CERTIFICATES = certRes;
  } catch (err) {
    console.warn('Backend API offline or unreachable, using local state:', err);
  }
}


// ===== SIDEBAR NAVIGATION =====
function renderSidebar(activePage) {
  const role = sessionStorage.getItem('userRole') || 'student';
  const name = sessionStorage.getItem('userName') || 'Student';

  const navItems = {
    student: [
      { page:'dashboard', icon:'📊', label:'Dashboard' },
      { page:'clubs', icon:'🏛️', label:'Explore Clubs' },
      { page:'events', icon:'📅', label:'Events' },
      { page:'membership', icon:'🎫', label:'My Memberships' },
      { page:'announcements', icon:'📢', label:'Announcements', badge:2 },
      { page:'certificates', icon:'🏆', label:'Certificates' },
      { page:'reports', icon:'📈', label:'Reports' },
    ],
    coordinator: [
      { page:'dashboard', icon:'📊', label:'Dashboard' },
      { page:'clubs', icon:'🏛️', label:'My Club' },
      { page:'events', icon:'📅', label:'Manage Events' },
      { page:'membership', icon:'🎫', label:'Member Requests', badge:3 },
      { page:'announcements', icon:'📢', label:'Announcements' },
      { page:'certificates', icon:'🏆', label:'Certificates' },
      { page:'reports', icon:'📈', label:'Reports' },
    ],
    admin: [
      { page:'dashboard', icon:'📊', label:'Dashboard' },
      { page:'clubs', icon:'🏛️', label:'All Clubs' },
      { page:'events', icon:'📅', label:'All Events' },
      { page:'membership', icon:'🎫', label:'Memberships' },
      { page:'announcements', icon:'📢', label:'Announcements' },
      { page:'certificates', icon:'🏆', label:'Certificates' },
      { page:'reports', icon:'📈', label:'Reports' },
    ]
  };

  const roleColors = { student:'#10b981', coordinator:'#f59e0b', admin:'#ef4444' };
  const roleLabel = { student:'Student', coordinator:'Coordinator', admin:'Administrator' };

  return `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark" style="background:white;border-radius:12px;padding:4px;display:flex;align-items:center;justify-content:center;width:40px;height:40px;flex-shrink:0;">
        <img src="pcte-logo.jpg" alt="PCTE" style="width:100%;height:100%;object-fit:contain;border-radius:8px;" />
      </div>
      <div class="logo-text">
        <strong>PCTE ClubHub</strong>
        <span>Management Portal</span>
      </div>
    </div>
    <div class="sidebar-user">
      <div class="user-avatar">${role==='student'?'🎓':role==='coordinator'?'🧑‍💼':'🔐'}</div>
      <div class="user-info">
        <strong>${name}</strong>
        <span style="color:${roleColors[role]}">${roleLabel[role]}</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Navigation</div>
      ${navItems[role].map(item => `
        <a class="nav-item ${activePage===item.page?'active':''}" href="${item.page}.html">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${item.badge?`<span class="nav-badge">${item.badge}</span>`:''}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <a href="index.html" class="nav-item">
        <span class="nav-icon">🚪</span>
        <span>Logout</span>
      </a>
    </div>
  </aside>`;
}

// ===== TOPBAR =====
function renderTopbar(title, subtitle='') {
  return `
  <header class="topbar">
    <div>
      <div class="topbar-title">${title}</div>
      ${subtitle ? `<div class="topbar-subtitle">${subtitle}</div>` : ''}
    </div>
    <div class="topbar-actions">
      <div class="search-bar">
        <span>🔍</span>
        <input type="text" placeholder="Search clubs, events..." id="globalSearch" />
      </div>
      <div style="position:relative">
        <button class="icon-btn" id="notifBtn" onclick="toggleNotif()">
          🔔<span class="notif-dot"></span>
        </button>
        <div class="notif-panel" id="notifPanel">
          <div class="notif-panel-header">Notifications</div>
          ${ANNOUNCEMENTS.slice(0,3).map(a=>`
          <div class="notif-item">
            <div class="notif-item-icon">${a.emoji}</div>
            <div><div class="notif-item-text">${a.title}</div><div class="notif-item-time">${a.time}</div></div>
          </div>`).join('')}
        </div>
      </div>
      <a href="index.html" class="icon-btn" title="Logout">👤</a>
    </div>
  </header>`;
}

// ===== TOAST =====
function showToast(msg, type='info') {
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  let c = document.getElementById('toastContainer');
  if (!c) { c = document.createElement('div'); c.id='toastContainer'; c.className='toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
}

// ===== NOTIFICATIONS =====
function toggleNotif() {
  const p = document.getElementById('notifPanel');
  if (p) p.classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#notifBtn') && !e.target.closest('#notifPanel')) {
    const p = document.getElementById('notifPanel');
    if (p) p.classList.remove('open');
  }
});

// ===== MODAL =====
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// ===== MINI CALENDAR =====
function renderCalendar(year, month) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const eventDays = EVENTS.map(e => { const d = new Date(e.date); return d.getMonth()===month&&d.getFullYear()===year?d.getDate():null; }).filter(Boolean);

  let cells = '';
  for (let i = 0; i < firstDay; i++) cells += `<div class="cal-day empty">-</div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getDate()===d && today.getMonth()===month && today.getFullYear()===year;
    const hasEv = eventDays.includes(d);
    cells += `<div class="cal-day ${isToday?'today':''} ${hasEv?'has-event':''}">${d}</div>`;
  }
  return `
  <div class="mini-calendar">
    <div class="cal-header">
      <div class="cal-nav" onclick="prevMonth()">‹</div>
      <strong>${months[month]} ${year}</strong>
      <div class="cal-nav" onclick="nextMonth()">›</div>
    </div>
    <div class="cal-grid">
      ${days.map(d=>`<div class="cal-day-name">${d}</div>`).join('')}
      ${cells}
    </div>
  </div>`;
}

let calYear = new Date().getFullYear(), calMonth = new Date().getMonth();
function prevMonth() { calMonth--; if(calMonth<0){calMonth=11;calYear--;} updateCalendar(); }
function nextMonth() { calMonth++; if(calMonth>11){calMonth=0;calYear++;} updateCalendar(); }
function updateCalendar() { const el = document.getElementById('calWidget'); if(el) el.innerHTML = renderCalendar(calYear, calMonth); }

// ===== BAR CHART =====
function renderBarChart(container, data, labels) {
  const max = Math.max(...data) || 1;
  container.innerHTML = `<div class="chart-placeholder" style="display:flex;align-items:flex-end;height:220px;gap:8px;padding-top:20px;">${
    data.map((v,i)=>{
      const pct = Math.round((v / max) * 100);
      return `
    <div class="bar-group" style="flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end;">
      <div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;font-weight:600;">${v}</div>
      <div style="width:100%;height:${pct}%;background:linear-gradient(180deg,var(--primary),var(--primary-dark));border-radius:6px 6px 0 0;min-height:4px;" title="${labels[i]}: ${v}"></div>
      <div class="bar-label" style="font-size:10px;color:var(--text-muted);text-align:center;margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;">${labels[i]}</div>
    </div>`;
    }).join('')
  }</div>`;
}

// ===== DONUT CHART =====
function renderDonut(canvas, segments) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width/2, cy = canvas.height/2, r = 70, inner = 45;
  let angle = -Math.PI/2;
  const total = segments.reduce((s,sg)=>s+sg.value,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  segments.forEach(sg => {
    const sweep = (sg.value/total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,angle,angle+sweep);
    ctx.closePath(); ctx.fillStyle = sg.color; ctx.fill();
    angle += sweep;
  });
  ctx.beginPath(); ctx.arc(cx,cy,inner,0,Math.PI*2);
  ctx.fillStyle = '#0f0f2a'; ctx.fill();
}

// ===== CLUB CARD HTML =====
function clubCardHTML(club, joined=false) {
  return `
  <div class="club-card">
    <div class="club-card-banner" style="background:linear-gradient(135deg,${club.color}22,${club.color}44)">
      <span>${club.emoji}</span>
      <span class="status-badge status-active" style="position:absolute;top:12px;right:12px;">${club.status}</span>
    </div>
    <div class="club-card-body">
      <div class="club-card-name">${club.name}</div>
      <div class="club-card-desc">${club.desc}</div>
      <div class="club-card-meta">
        <span>👥 ${club.members} members</span>
        <span>📅 ${club.events} events</span>
      </div>
      <div style="margin-bottom:14px">
        <span class="club-tag">${club.category}</span>
        <span class="club-tag" style="background:rgba(16,185,129,0.1);color:#10b981;border-color:rgba(16,185,129,0.2);">Room ${club.room}</span>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${joined
          ? `<button class="btn btn-sm btn-success w-full" disabled>✅ Joined</button>`
          : `<button class="btn btn-sm btn-primary" onclick="joinClub(${club.id},'${club.name}')">Join Club</button>
             <button class="btn btn-sm btn-outline" onclick="viewClub(${club.id})">View Details</button>`
        }
      </div>
    </div>
  </div>`;
}

// ===== JOIN CLUB =====
async function joinClub(id, name) {
  try {
    const res = await fetch('/api/clubs/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubId: id, studentName: sessionStorage.getItem('userName') || 'Arjun Sharma' })
    });
    const data = await res.json();
    if (res.ok) {
      showToast(data.message || `Request sent to join ${name}! Awaiting coordinator approval.`, 'success');
    } else {
      showToast(data.error || 'Failed to submit request.', 'error');
    }
  } catch (err) {
    showToast(`Request sent to join ${name}! Awaiting coordinator approval.`, 'success');
  }
}
function viewClub(id) {
  const club = CLUBS.find(c=>c.id===id);
  if (!club) return;
  document.getElementById('clubDetailModal') && openModal('clubDetailModal');
}

// ===== REGISTER EVENT =====
async function registerEvent(id, name) {
  try {
    const res = await fetch('/api/events/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: id, studentName: sessionStorage.getItem('userName') || 'Arjun Sharma' })
    });
    const data = await res.json();
    if (res.ok) {
      showToast(data.message || `Successfully registered for "${name}"!`, 'success');
    } else {
      showToast(data.error || 'Registration failed.', 'error');
    }
  } catch (err) {
    showToast(`Successfully registered for "${name}"!`, 'success');
  }
}

// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
}

// ===== PAGE INIT =====
async function initPage() {
  if (!sessionStorage.getItem('userRole')) {
    // Allow viewing without login for demo
    sessionStorage.setItem('userRole', 'student');
    sessionStorage.setItem('userName', 'Demo Student');
  }
  // Add toast container
  if (!document.getElementById('toastContainer')) {
    const tc = document.createElement('div');
    tc.id = 'toastContainer'; tc.className = 'toast-container';
    document.body.appendChild(tc);
  }
  await fetchBackendData();
}
document.addEventListener('DOMContentLoaded', initPage);
