class Component {
  constructor(data) {
    Object.keys(data).forEach((key) => {
      let privateValue = this[key];
      
      Object.defineProperty(this, key, {
        get() {
          return privateValue;
        },
        set(value) {
          privateValue = value;

          const modelElements = document.querySelectorAll(`[\\@${key}]`);

          modelElements.forEach((element) => {
            element.innerHTML = value;
          });
        },
      });
    });

    // we do this last so that it triggers the setters
    Object.assign(this, data);
  }
}
