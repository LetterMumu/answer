export const publicFun = {
  methods: {
    // 防抖
    debounce(fn, wait) {
      let timeout = null;
      return function () {
        if (timeout !== null)
          clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      }
    },
    // 节流
    fnThrottle(method, delay) {
      let that = this;
      let timer = this.timer;
      let begin = new Date().getTime();
      return function () {
        let context = that;
        let args = arguments;
        let current = new Date().getTime();
        clearTimeout(timer);
        if (current - begin >= delay) {
          method.apply(context, args);
          begin = current;
        } else {
          that.timer = setTimeout(function () {
            method.apply(context, args);
          }, delay);
        }
      }()
    },
  }
}
