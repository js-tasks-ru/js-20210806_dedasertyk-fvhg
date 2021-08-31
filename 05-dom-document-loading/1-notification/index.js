export default class NotificationMessage {

    static visiableMessage = null;

    element = null;

    constructor(message = '', {
            duration = 2000, 
            type = 'success' 
    } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;
        this.render();
    }

    getTemplate() {
        return  `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
                    <div class="timer"></div>
                    <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">
                        ${this.message}
                    </div>
                    </div>
                </div>`
    }

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;
    }

    show(container = document.body) {
        if(NotificationMessage.visiableMessage) NotificationMessage.visiableMessage.remove();

        NotificationMessage.visiableMessage = this.element;
        container.append(this.element);

        setTimeout(() => {
            this.destroy();
        }, this.duration);
    }

    destroy() {
        this.remove();
    }

    remove() {
        this.element.remove();
    }
}
