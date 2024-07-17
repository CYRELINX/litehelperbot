// index.js
const { VK } = require('vk-io');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

dotenv.config();
const vk = new VK({ token: process.env.TOKEN });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

const allowedUserIds = [process.env.OWNER_ID];
const commandsFolder = path.join(__dirname, 'commands');
const modulesFolder = path.join(__dirname, 'modules');

fs.readdirSync(commandsFolder).forEach(file => {
    const command = require(path.join(commandsFolder, file));
    vk.updates.on('message_new', async (context, next) => {
        if (context.text && context.text.toLowerCase() === `!${command.name}`.toLowerCase()) {
            if (allowedUserIds.includes(String(context.senderId))) {
                await command.execute(context, vk);
            } else {
                await context.send('У вас нет прав на выполнение этой команды.');
            }
        }
        await next();
    });
});

fs.readdirSync(modulesFolder).forEach(file => {
    const module = require(path.join(modulesFolder, file));
    if (module.start && typeof module.start === 'function') {
        module.start(vk).catch(error => {
            logger.error(`Ошибка при запуске модуля ${module.name}: ${error.message}`);
        });
    }
});

vk.updates.start().catch(error => {
    logger.error(`Ошибка при запуске обновлений: ${error.message}`);
    console.error('Ошибка при запуске обновлений:', error);
});

console.log(`[PxollyBot🚀] » Started!`);
vk.api.messages.send({
    user_id: process.env.USER_ID,
    message: `[PxollyBot🚀] » Started!`,
    random_id: 0
})
