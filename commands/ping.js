// commands/ping.js
module.exports = {
    name: 'пинг',
    description: 'Отвечает pong на ping запросы и редактирует сообщение.',
    async execute(context, vk) {
        const message = await context.send('сек...');
        await vk.api.messages.edit({
            peer_id: context.peerId,
            message_id: message.id,
            message: 'понг!'
        });
    },
};
