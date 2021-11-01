'use strict';

module.exports = {
    listeners: {
        playerEnter: state => function(player) {
            if (this.hasEffectType('speaking')) {
                return;
            }

            const speak = state.EffectFactory.create('speak', {}, {
                messageList: [
                    "Welcome, to this cursed land %player%.",
                    "Like me and many others you were summoned here, twisted and strange.",
                    "I could never leave this spot to find a greater purpose, but maybe you will"
                ],
                outputFn: message => {
                    message = message.replace(/%player%/, player.name);
                    state.ChannelManager.get('say').send(state, this, message);
                }
            });
            this.addEffect(speak);
        },

        playerLeave: state => function(player) {
            const speaking = this.effects.getByType('speaking');
            if (speaking) {
                speaking.remove();
            }
        }
    }
};