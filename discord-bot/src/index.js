/**
 * Discord integration scaffold for the combined esports organization + league platform.
 * Mock mode only: no live guild connection and no token consumption.
 *
 * Production design:
 * - Main Org / Community Discord owns community roles + Community 8s.
 * - League Discord owns league roles + scheduling + reporting + League 8s + vetoes.
 * - Both share the same website user/player identities through Discord OAuth.
 */
import 'dotenv/config';

const commandGroups = {
  competition: [
    '/registerteam',
    '/roster',
    '/schedule',
    '/report',
    '/verify',
    '/freeagent',
  ],
  veto: [
    '/startveto',
    '/resumeveto',
    '/cancelveto',
  ],
  eights: [
    '/8s join',
    '/8s leave',
    '/8s leaderboard',
  ],
  staff: [
    '/staff review',
    '/caster',
  ],
};

const plannedEvents = [
  'team.registration.submitted',
  'team.registration.approved',
  'roster.change.requested',
  'match.time.proposed',
  'match.time.accepted',
  'match.reminder.due',
  'match.report.submitted',
  'veto.session.started',
  'eight.queue.updated',
  'org.news.published',
];

console.log('Org + League Discord scaffold');
for (const [group, commands] of Object.entries(commandGroups)) {
  console.log(`\n${group.toUpperCase()}`);
  for (const command of commands) console.log(`  ${command}`);
}

console.log('\nPLANNED SITE / BOT EVENTS');
for (const event of plannedEvents) console.log(`  ${event}`);

console.log('\nMock mode only — no Discord token is consumed by this scaffold.');
