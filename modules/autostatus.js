// modules/autoStatus.js
const { format } = require('date-fns');
const { ru } = require('date-fns/locale');

module.exports = {
    name: 'autoStatus',
    async start(vk) {
        setInterval(async () => {
            try {
                // Получение текущего времени
                const now = new Date();
                const formattedTime = format(now, 'PPPPpppp', { locale: ru });

                // Получение количества чатов
                const chats = await vk.api.messages.getConversations({
                    count: 200 // Максимальное количество за один запрос
                });

                const chatCount = chats.count;

                const statusMessage = `На связи! Время: ${formattedTime} | Количество чатов: ${chatCount}`;

                // Установка статуса
                await vk.api.status.set({
                    text: statusMessage
                });

                console.log('Автостатус обновлен:', statusMessage);
            } catch (error) {
                console.error('Ошибка при обновлении автостатуса:', error);
            }
        }, 50000); // Интервал обновления статуса - 1 минута (60000 миллисекунд)

        console.log('Модуль автостатуса запущен.');
    }
};
