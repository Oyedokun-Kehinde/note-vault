const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('Demo123!', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@notevault.com' },
    update: {},
    create: {
      username: 'demo_user',
      email: 'demo@notevault.com',
      password: hashedPassword,
      fullName: 'Demo User',
      bio: 'Welcome to NoteVault! This is a demo account.',
      theme: 'auto',
      defaultView: 'grid',
      notificationsEnabled: true,
    },
  });

  console.log('✅ Created demo user:', demoUser.email);

  // Create note templates
  const templates = [
    {
      name: 'Meeting Notes',
      description: 'Template for meeting notes with agenda and action items',
      category: 'Work',
      content: '<h1>Meeting Notes</h1><h2>Date & Time</h2><p></p><h2>Attendees</h2><ul><li></li></ul><h2>Agenda</h2><ol><li></li></ol><h2>Discussion Points</h2><p></p><h2>Action Items</h2><ul data-type="taskList"><li><label><input type="checkbox"></label><div></div></li></ul>',
      tags: ['meeting', 'work', 'productivity'],
    },
    {
      name: 'Daily Journal',
      description: 'Daily reflection and gratitude journal',
      category: 'Journalling',
      content: '<h1>Daily Journal</h1><h2>Date</h2><p></p><h2>Mood</h2><p>😊</p><h2>Gratitude</h2><ul><li>I am grateful for...</li><li></li><li></li></ul><h2>Today\'s Highlights</h2><p></p><h2>Lessons Learned</h2><p></p><h2>Tomorrow\'s Goals</h2><ul data-type="taskList"><li><label><input type="checkbox"></label><div></div></li></ul>',
      tags: ['journal', 'daily', 'reflection'],
    },
    {
      name: 'Project Plan',
      description: 'Project planning template with milestones and tasks',
      category: 'Work',
      content: '<h1>Project Plan</h1><h2>Project Name</h2><p></p><h2>Objective</h2><p></p><h2>Timeline</h2><p>Start Date: <br>End Date: </p><h2>Milestones</h2><ol><li></li></ol><h2>Tasks</h2><ul data-type="taskList"><li><label><input type="checkbox"></label><div></div></li></ul><h2>Resources Needed</h2><ul><li></li></ul>',
      tags: ['project', 'planning', 'work'],
    },
    {
      name: 'Book Notes',
      description: 'Template for summarizing books and key takeaways',
      category: 'Ideas',
      content: '<h1>Book Notes</h1><h2>Title & Author</h2><p></p><h2>Key Themes</h2><ul><li></li></ul><h2>Important Quotes</h2><blockquote><p></p></blockquote><h2>Main Takeaways</h2><ol><li></li></ol><h2>My Thoughts</h2><p></p><h2>Action Items</h2><ul data-type="taskList"><li><label><input type="checkbox"></label><div></div></li></ul>',
      tags: ['reading', 'learning', 'books'],
    },
    {
      name: 'Sermon Notes',
      description: 'Template for taking notes during spiritual teachings',
      category: 'Spirituality',
      content: '<h1>Sermon Notes</h1><h2>Date & Speaker</h2><p></p><h2>Scripture References</h2><ul><li></li></ul><h2>Key Message</h2><p></p><h2>Important Points</h2><ol><li></li></ol><h2>Personal Application</h2><p></p><h2>Prayer Points</h2><ul><li></li></ul>',
      tags: ['sermon', 'spiritual', 'faith'],
    },
  ];

  for (const template of templates) {
    const createdTemplate = await prisma.noteTemplate.create({
      data: {
        ...template,
        userId: demoUser.id,
      },
    });
    console.log('✅ Created template:', createdTemplate.name);
  }

  // Create sample notes
  const sampleNotes = [
    {
      title: 'Welcome to NoteVault! 🎉',
      content: '<h1>Welcome to NoteVault!</h1><p>This is your <strong>first note</strong> in the most powerful note-taking app! 🚀</p><h2>What can you do?</h2><ul><li>Create notes with <strong>rich formatting</strong></li><li>Use <em>categories</em> and <code>#tags</code> to organize</li><li>📌 Pin important notes</li><li>❤️ Mark favorites</li><li>🗂️ Archive completed notes</li><li>🗑️ Soft delete with recovery</li></ul><h2>Pro Tips</h2><ul data-type="taskList"><li><label><input type="checkbox" checked></label><div>Try the dark mode toggle in the navbar</div></li><li><label><input type="checkbox"></label><div>Use templates for quick note creation</div></li><li><label><input type="checkbox"></label><div>Add cover images to your notes</div></li><li><label><input type="checkbox"></label><div>Export notes to PDF or Markdown</div></li></ul><p>Happy noting! 📝</p>',
      category: 'Personal',
      tags: ['welcome', 'getting-started'],
      isPinned: true,
      color: '#9333ea',
    },
    {
      title: 'Features Overview',
      content: '<h1>NoteVault Features</h1><h2>Rich Text Editing</h2><p>Format your notes with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and more!</p><h2>Organization</h2><ul><li>7 categories</li><li>Custom tags with #hashtags</li><li>Pin and favorite notes</li></ul><h2>Advanced</h2><ul><li>Search across all notes</li><li>Grid and list views</li><li>Analytics dashboard</li><li>Dark mode</li></ul>',
      category: 'Ideas',
      tags: ['features', 'documentation'],
      isFavorite: true,
    },
  ];

  for (const note of sampleNotes) {
    const createdNote = await prisma.note.create({
      data: {
        ...note,
        userId: demoUser.id,
      },
    });
    console.log('✅ Created sample note:', createdNote.title);
  }

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📧 Demo Login Credentials:');
  console.log('   Email: demo@notevault.com');
  console.log('   Password: Demo123!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
