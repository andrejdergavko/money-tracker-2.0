import cron from 'node-cron';
import { importFromEmails } from './import-from-emails';

const task = cron.schedule('* * * * *', async () => {
  console.log('Running scheduled import task...');
  try {
    const transactions = await importFromEmails();
    console.log('Import completed:', transactions);
  } catch (error) {
    console.error('Error in scheduled import:', error);
  }
});

export default task;

