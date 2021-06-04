class ReactiveState {
    constructor(element, data, template) {
        this.element = element;
        this.data = data;
        this.template = template;
    };

    // Render UI
    render() {
        const elementToInject = document.querySelector(this.element);
        elementToInject.innerHTML = this.template(this.data);
    };

    // Update the state 
    setState(object) {
        for(let key in object) {
            this.data[key] = object[key];
        };    
    };

    // Obtain a immutable copy of the state
    getState() {
        return JSON.parse(JSON.stringify(this.data));
    };
};

export {
    ReactiveState
};