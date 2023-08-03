const Event = require("events");

class EventManager extends Event {
    static restart = require("../main");
    static Instance
    static getInstance() {
        if (EventManager.Instance) return EventManager.Instance
        else return EventManager.Instance = new EventManager()
    }
    static onChildClosed() {
        EventManager.restart.restart()
    }

}

EventManager.getInstance().on("configReady", EventManager.onChildClosed)
EventManager.getInstance().on("readySet", EventManager.onChildClosed)

module.exports.EventManager = EventManager