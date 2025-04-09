const cron = require('node-cron');

export const  startCleanupJob = () => {
  cron.schedule('* * * * *', async () => {
    try {
      console.log('Se eliminan registros')
    } catch (err) {
      console.error('Error en limpieza:', err);
    }
  });

  console.log('Tarea programada para ejecutarse cada 1 minuto');
}

