// modules/autoAcceptFriends.js
module.exports = {
    name: 'autoAcceptFriends',
    async start(vk) {
        setInterval(async () => {
            try {
                // Получение списка заявок в друзья
                const requests = await vk.api.friends.getRequests({
                    extended: 1,
                    need_viewed: 1
                });

                // Обработка каждой заявки
                for (const request of requests.items) {
                    const userId = request.user_id || request; // Учёт различных форматов данных
                    await vk.api.friends.add({ user_id: userId });
                    console.log(`Принята заявка в друзья от пользователя с ID ${userId}`);
                }
            } catch (error) {
                console.error('Ошибка при обработке заявок в друзья:', error);
            }
        }, 30000); // Интервал проверки заявок - 30 секунд.

        console.log('Модуль автоприёма друзей запущен.');
    }
};
