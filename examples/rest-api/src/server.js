const process = require('process');
const cluster = require('cluster');
const serverWorker = require('./server-worker.js');

/**
 * Cluster Primary.
 */
if (cluster.isPrimary) {
    /** Header. */
    console.clear();
    console.log(`[${process.pid}] Starting primary cluster...\n.\n.`);

    // Create workers.
    const workers = Number(process.env.NUMBER_OF_WORKER) || 5;
    console.log(`[${process.pid}] Creating ${workers} workers...`);
    for (let i = 0; i < workers; i += 1) {
        setTimeout(() => cluster.fork(), (i * 50));
    }

    // Watch exit worker.
    cluster.addListener('exit', (worker) => {
        console.error(`[EXIT] Worker-${worker.process.pid} is exit.`);
        cluster.fork();
        console.log('[NEW] Creating new worker...');
    });

    // Waiting message from workers.
    cluster.on('online', (worker) => {
        worker.on('message', async (message) => {
            if (message.key === 'sn-updated') {
                process.exit(0);
            }
        });
    });
}

/**
 * Cluster Workers.
 */
if (cluster.isWorker) {
    /** Setup worker server. */
    serverWorker.setup();
}
