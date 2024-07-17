// modules/autoRemoveDeactivatedFriends.js
module.exports = {
    name: 'autoRemoveDeactivatedFriends',
    async start(vk) {
        setInterval(async () => {
            try {
                // Получение списка друзей
                const friends = await vk.api.friends.get({
                    fields: 'deactivated'
                });

                // Обработка каждого друга
                for (const friend of friends.items) {
                    if (friend.deactivated) {
                        await vk.api.friends.delete({ user_id: friend.id });
                        console.log(`Удален заблокированный друг с ID ${friend.id}`);
                    }
                }
            } catch (error) {
                console.error('Ошибка при обработке заблокированных друзей:', error);
            }
        }, 300000); // Интервал проверки друзей - 5 минут (300000 миллисекунд)

        console.log('Модуль автоочистки заблокированных друзей запущен.');
    }
};
