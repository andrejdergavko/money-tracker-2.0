import { NextApiRequest, NextApiResponse } from 'next';
import cronTask from '~modules/emails-import/start-importing-from-emails-cron-job';

let isTaskStarted = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isTaskStarted) {
    cronTask.start();
    isTaskStarted = true;
  }

  res.status(200).json({
    success: true,
    message: 'Cron task is started',
  });
}

