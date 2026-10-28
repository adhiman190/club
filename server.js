const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Support clean HTML routes (e.g. /dashboard -> dashboard.html)
app.get('/:page', (req, res, next) => {
  if (req.params.page.startsWith('api')) return next();
  const filePath = path.join(__dirname, `${req.params.page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next();
  });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.static(path.join(__dirname)));

// Initialize SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'clubhub.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database: clubhub.db');
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    // Create tables
    db.run(`CREATE TABLE IF NOT EXISTS clubs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      emoji TEXT,
      category TEXT,
      members INTEGER DEFAULT 0,
      events INTEGER DEFAULT 0,
      coordinator TEXT,
      desc TEXT,
      color TEXT,
      founded TEXT,
      room TEXT,
      status TEXT DEFAULT 'active'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clubId INTEGER,
      name TEXT NOT NULL,
      date TEXT,
      time TEXT,
      venue TEXT,
      desc TEXT,
      status TEXT DEFAULT 'open',
      participants INTEGER DEFAULT 0,
      maxParticipants INTEGER DEFAULT 100,
      FOREIGN KEY(clubId) REFERENCES clubs(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      text TEXT,
      clubName TEXT,
      emoji TEXT,
      time TEXT,
      color TEXT,
      important INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll TEXT,
      dept TEXT,
      clubs TEXT,
      joinDate TEXT,
      status TEXT DEFAULT 'active',
      avatar TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS event_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId INTEGER,
      studentName TEXT,
      roll TEXT,
      registeredAt TEXT,
      UNIQUE(eventId, roll)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS club_memberships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clubId INTEGER,
      studentName TEXT,
      roll TEXT,
      dept TEXT,
      status TEXT DEFAULT 'pending',
      requestedAt TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student TEXT NOT NULL,
      event TEXT NOT NULL,
      club TEXT NOT NULL,
      date TEXT,
      id_no TEXT UNIQUE
    )`);

    // Seed Data if tables are empty
    db.get(`SELECT COUNT(*) as count FROM clubs`, (err, row) => {
      if (row && row.count === 0) {
        console.log('Seeding initial data into database...');
        seedData();
      }
    });
  });
}

function seedData() {
  const clubs = [
    { name:'Table Tennis Club', emoji:'🏓', category:'Sports', members:42, events:8, coordinator:'Prof. R. Kumar', desc:'Competitive table tennis training and inter-college tournaments.', color:'#6c63ff', founded:'2019', room:'ET-101', status:'active' },
    { name:'Dance Club', emoji:'💃', category:'Cultural', members:68, events:15, coordinator:'Dr. S. Mehta', desc:'Classical, contemporary, and Bollywood dance performances & workshops.', color:'#f59e0b', founded:'2018', room:'ET-102', status:'active' },
    { name:'Holistic & Wellness Club', emoji:'🧘', category:'Wellness', members:55, events:12, coordinator:'Dr. A. Nair', desc:'Yoga, mindfulness, and mental health awareness programs.', color:'#10b981', founded:'2020', room:'ET-103', status:'active' },
    { name:'Literary Club', emoji:'📚', category:'Academic', members:38, events:10, coordinator:'Prof. N. Verma', desc:'Debates, creative writing, poetry competitions and book clubs.', color:'#3b82f6', founded:'2017', room:'ET-201', status:'active' },
    { name:'Music Club', emoji:'🎵', category:'Cultural', members:72, events:18, coordinator:'Dr. V. Sharma', desc:'Vocal training, instrumental music, and live concert performances.', color:'#ec4899', founded:'2016', room:'ET-202', status:'active' },
    { name:'Theatre Club', emoji:'🎭', category:'Cultural', members:45, events:9, coordinator:'Prof. L. Kapoor', desc:'Drama productions, street plays, and acting workshops.', color:'#8b5cf6', founded:'2018', room:'ET-203', status:'active' },
    { name:'Basketball Club', emoji:'🏀', category:'Sports', members:35, events:14, coordinator:'Coach M. Singh', desc:'Basketball training and inter-college championship team.', color:'#f97316', founded:'2019', room:'ETCC-1', status:'active' },
    { name:'Chess Club', emoji:'♟️', category:'Academic', members:28, events:7, coordinator:'Prof. P. Gupta', desc:'Strategic chess tournaments and FIDE-rated competitions.', color:'#64748b', founded:'2020', room:'ET-301', status:'active' },
    { name:'Cricket Club', emoji:'🏏', category:'Sports', members:50, events:16, coordinator:'Coach S. Yadav', desc:'Cricket matches, coaching, and annual inter-college tournaments.', color:'#22c55e', founded:'2015', room:'ET-302', status:'active' },
    { name:'Soccer Club', emoji:'⚽', category:'Sports', members:44, events:13, coordinator:'Coach R. Patel', desc:'Football training sessions and inter-institute league matches.', color:'#0ea5e9', founded:'2017', room:'ET-303', status:'active' },
    { name:'Creative Club', emoji:'🎨', category:'Arts', members:60, events:11, coordinator:'Prof. D. Bose', desc:'Painting, digital art, photography, and design exhibitions.', color:'#f43f5e', founded:'2018', room:'ET-304', status:'active' },
    { name:'Badminton Club', emoji:'🏸', category:'Sports', members:36, events:10, coordinator:'Coach P. Rao', desc:'Badminton coaching, singles & doubles tournaments.', color:'#6c63ff', founded:'2019', room:'ET-310', status:'active' },
    { name:'CSR Club', emoji:'🤝', category:'Social', members:65, events:20, coordinator:'Dr. M. Jain', desc:'Community service, social drives, blood donation, and charity events.', color:'#10b981', founded:'2016', room:'ET-401', status:'active' },
    { name:'Pool Club', emoji:'🎱', category:'Sports', members:22, events:6, coordinator:'Prof. K. Tiwari', desc:'Billiards and pool table competitions and coaching.', color:'#8b5cf6', founded:'2021', room:'ET-402', status:'active' },
    { name:'Volleyball Club', emoji:'🏐', category:'Sports', members:30, events:8, coordinator:'Coach A. Mishra', desc:'Volleyball training and annual inter-college tournaments.', color:'#f59e0b', founded:'2020', room:'ET-403', status:'active' },
    { name:'Events on Air Club', emoji:'🎙️', category:'Media', members:48, events:22, coordinator:'Dr. R. Khanna', desc:'Radio broadcasting, podcasting, and live event hosting.', color:'#ec4899', founded:'2017', room:'ET-410', status:'active' },
    { name:'Adventure Club', emoji:'🏕️', category:'Adventure', members:40, events:17, coordinator:'Prof. S. Rawat', desc:'Trekking, rock climbing, camping, and outdoor adventure sports.', color:'#f97316', founded:'2018', room:'ET-510', status:'active' }
  ];

  const stmtClub = db.prepare(`INSERT INTO clubs (name, emoji, category, members, events, coordinator, desc, color, founded, room, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
  clubs.forEach(c => stmtClub.run(c.name, c.emoji, c.category, c.members, c.events, c.coordinator, c.desc, c.color, c.founded, c.room, c.status));
  stmtClub.finalize();

  const events = [
    { clubId:1, name:'PCTE Table Tennis Championship', date:'2025-09-15', time:'10:00 AM', venue:'Sports Complex', desc:'Annual inter-college table tennis championship', status:'open', participants:28, maxParticipants:64 },
    { clubId:2, name:'Cultural Fest Dance Competition', date:'2025-09-22', time:'5:00 PM', venue:'Main Auditorium', desc:'Annual dance showcase and competition', status:'open', participants:45, maxParticipants:100 },
    { clubId:5, name:'PCTE Music Night 2025', date:'2025-09-28', time:'7:00 PM', venue:'Open Air Theatre', desc:'Annual music night featuring live performances', status:'upcoming', participants:0, maxParticipants:200 },
    { clubId:13, name:'Blood Donation Camp', date:'2025-09-10', time:'9:00 AM', venue:'Campus Ground', desc:'Community blood donation drive in association with PGI', status:'completed', participants:120, maxParticipants:200 },
    { clubId:4, name:'Inter-College Debate League', date:'2025-10-05', time:'11:00 AM', venue:'Seminar Hall A', desc:'All India university-level debate competition', status:'upcoming', participants:0, maxParticipants:40 },
    { clubId:9, name:'Cricket Premier League', date:'2025-10-12', time:'8:00 AM', venue:'Cricket Ground', desc:'Internal college cricket league — team registrations open', status:'open', participants:60, maxParticipants:120 },
    { clubId:16, name:'Podcast Workshop', date:'2025-09-18', time:'2:00 PM', venue:'Media Lab ET-410', desc:'Hands-on workshop on creating and hosting podcasts', status:'open', participants:20, maxParticipants:30 },
    { clubId:17, name:'Himalayan Trek Expedition', date:'2025-10-20', time:'6:00 AM', venue:'Depart from Campus Gate', desc:'3-day trek to Triund, Dharamshala — limited seats', status:'open', participants:18, maxParticipants:25 }
  ];

  const stmtEv = db.prepare(`INSERT INTO events (clubId, name, date, time, venue, desc, status, participants, maxParticipants) VALUES (?,?,?,?,?,?,?,?,?)`);
  events.forEach(e => stmtEv.run(e.clubId, e.name, e.date, e.time, e.venue, e.desc, e.status, e.participants, e.maxParticipants));
  stmtEv.finalize();

  const announcements = [
    { title:'Club Elections 2025 — Voting Starts Soon!', text:'Annual club elections for the academic year 2025-26 are scheduled. All registered students can vote for their preferred candidates for each club leadership position.', clubName:'Admin', emoji:'🗳️', time:'2 hours ago', color:'rgba(108,99,255,0.15)', important:1 },
    { title:'CSR Blood Donation Camp — Thank You!', text:'PCTE CSR Club successfully conducted the blood donation camp. 120 units of blood were collected. Certificates of participation will be available for download.', clubName:'CSR Club', emoji:'❤️', time:'1 day ago', color:'rgba(239,68,68,0.1)', important:0 },
    { title:'Music Night 2025 — Registrations Open', text:'PCTE Music Night 2025 registrations are now open! Participate as a solo artist or in a group. Auditions on 20th September.', clubName:'Music Club', emoji:'🎵', time:'2 days ago', color:'rgba(245,158,11,0.1)', important:0 },
    { title:'New Club: Events on Air — Recruiting Members', text:'The newly revamped Events on Air Club is recruiting members for the academic year.', clubName:'Events on Air', emoji:'📻', time:'3 days ago', color:'rgba(16,185,129,0.1)', important:0 },
    { title:'Himalayan Trek — Medical Certificate Required', text:'All students registered for the Himalayan Trek Expedition must submit a medical fitness certificate signed by a registered doctor by 10th October 2025.', clubName:'Adventure Club', emoji:'⛺', time:'4 days ago', color:'rgba(249,115,22,0.1)', important:1 }
  ];

  const stmtAnn = db.prepare(`INSERT INTO announcements (title, text, clubName, emoji, time, color, important) VALUES (?,?,?,?,?,?,?)`);
  announcements.forEach(a => stmtAnn.run(a.title, a.text, a.clubName, a.emoji, a.time, a.color, a.important));
  stmtAnn.finalize();

  const members = [
    { name:'Arjun Sharma', roll:'2K22/CS/045', dept:'CSE', clubs:'Dance Club, Cricket Club', joinDate:'2023-08-01', status:'active', avatar:'🧑' },
    { name:'Priya Patel', roll:'2K22/EC/032', dept:'ECE', clubs:'Music Club, Literary Club', joinDate:'2023-08-01', status:'active', avatar:'👩' },
    { name:'Rahul Verma', roll:'2K23/ME/011', dept:'Mech', clubs:'Basketball Club, CSR Club', joinDate:'2024-08-01', status:'active', avatar:'🧔' },
    { name:'Ananya Singh', roll:'2K22/CS/067', dept:'CSE', clubs:'Theatre Club, Dance Club', joinDate:'2023-08-01', status:'active', avatar:'👧' },
    { name:'Karan Mehta', roll:'2K23/CE/024', dept:'Civil', clubs:'Adventure Club', joinDate:'2024-08-01', status:'pending', avatar:'🧑' },
    { name:'Simran Kaur', roll:'2K22/IT/089', dept:'IT', clubs:'Creative Club, Holistic & Wellness Club', joinDate:'2023-08-01', status:'active', avatar:'👩' }
  ];

  const stmtMem = db.prepare(`INSERT INTO members (name, roll, dept, clubs, joinDate, status, avatar) VALUES (?,?,?,?,?,?,?)`);
  members.forEach(m => stmtMem.run(m.name, m.roll, m.dept, m.clubs, m.joinDate, m.status, m.avatar));
  stmtMem.finalize();

  const certs = [
    { student:'Arjun Sharma', event:'Blood Donation Camp', club:'CSR Club', date:'2025-09-10', id_no:'PCTE-CERT-2025-001' },
    { student:'Arjun Sharma', event:'Podcast Workshop', club:'Events on Air Club', date:'2025-09-18', id_no:'PCTE-CERT-2025-002' },
    { student:'Priya Patel', event:'Cultural Fest Dance Competition', club:'Dance Club', date:'2025-09-22', id_no:'PCTE-CERT-2025-003' }
  ];

  const stmtCert = db.prepare(`INSERT INTO certificates (student, event, club, date, id_no) VALUES (?,?,?,?,?)`);
  certs.forEach(c => stmtCert.run(c.student, c.event, c.club, c.date, c.id_no));
  stmtCert.finalize();

  console.log('Database successfully seeded!');
}

// ===== API ROUTES =====

// GET /api/clubs
app.get('/api/clubs', (req, res) => {
  db.all('SELECT * FROM clubs', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/events
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/events/register
app.post('/api/events/register', (req, res) => {
  const { eventId, studentName, roll } = req.body;
  if (!eventId || !studentName) return res.status(400).json({ error: 'Missing required parameters' });

  const now = new Date().toISOString().split('T')[0];
  db.run(`INSERT INTO event_registrations (eventId, studentName, roll, registeredAt) VALUES (?,?,?,?)`,
    [eventId, studentName, roll || '2K22/CS/045', now],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'You are already registered for this event!' });
        }
        return res.status(500).json({ error: err.message });
      }
      // Update participant count
      db.run(`UPDATE events SET participants = participants + 1 WHERE id = ?`, [eventId]);
      res.json({ success: true, message: 'Successfully registered for event' });
    }
  );
});

// GET /api/announcements
app.get('/api/announcements', (req, res) => {
  db.all('SELECT * FROM announcements ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/announcements
app.post('/api/announcements', (req, res) => {
  const { title, text, clubName, emoji, color, important } = req.body;
  db.run(`INSERT INTO announcements (title, text, clubName, emoji, time, color, important) VALUES (?,?,?,?,?,?,?)`,
    [title, text, clubName || 'Admin', emoji || '📢', 'Just now', color || 'rgba(108,99,255,0.15)', important ? 1 : 0],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// GET /api/members
app.get('/api/members', (req, res) => {
  db.all('SELECT * FROM members', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/clubs/join
app.post('/api/clubs/join', (req, res) => {
  const { clubId, studentName, roll, dept } = req.body;
  const now = new Date().toISOString().split('T')[0];
  db.run(`INSERT INTO club_memberships (clubId, studentName, roll, dept, status, requestedAt) VALUES (?,?,?,?,?,?)`,
    [clubId, studentName || 'Arjun Sharma', roll || '2K22/CS/045', dept || 'CSE', 'pending', now],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Membership request submitted successfully!' });
    }
  );
});

// GET /api/certificates
app.get('/api/certificates', (req, res) => {
  db.all('SELECT * FROM certificates', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/certificates/verify
app.post('/api/certificates/verify', (req, res) => {
  const { certId } = req.body;
  db.get('SELECT * FROM certificates WHERE id_no = ?', [certId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.json({ valid: false, message: 'Certificate ID not found' });
    res.json({ valid: true, certificate: row });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`PCTE ClubHub Backend server running on http://localhost:${PORT}`);
});
