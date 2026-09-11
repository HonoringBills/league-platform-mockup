/**
 * Discord integration scaffold.
 * This is intentionally not connected to a live guild in mock mode.
 * Production wiring can reuse the same database records as the website.
 */
import 'dotenv/config';

const plannedCommands = [
  '/registerteam',
  '/roster',
  '/freeagent',
  '/schedule',
  '/report',
  '/startveto',
  '/resumeveto',
  '/cancelveto',
  '/8s join',
  '/8s leave',
  '/8s leaderboard',
  '/verify',
  '/staff review',
];

console.log('LeagueOS Discord scaffold');
console.log('Planned commands:');
for (const command of plannedCommands) console.log(`  ${command}`);
console.log('\nMock mode only — no Discord token is consumed by this scaffold.');
