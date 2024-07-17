// commands/ping.js
module.exports = {
    name: 'кто ты',
    description: 'Кто я?',
    async execute(context, vk) {
        const message = await context.send('Я?...');
        await vk.api.messages.edit({
            peer_id: context.peerId,
            message_id: message.id,
            message: 'Я бот помощник для ваших чатов, где установлен @pxolly.\nПроще говоря, я дополняю функции чат менеджера.'
        });
    },
};
