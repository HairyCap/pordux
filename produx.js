function store(initModel = {}) {
    let model = {};
    let subscriber = new Map();
    model.pathGet = function (paths) {
        if (paths.length == 0) return;
        return paths.reduce((acc, crr) => {
            return acc[crr]
        }, this)
    }
    model.pathSet = function (paths, val) {
        if (paths.length == 0) return;
        let sparhs = [...paths]
        let last = sparhs.pop();
        let lastP1 = sparhs.reduce((acc, crr) => {
            return acc[crr]
        }, this)
        lastP1[last] = val;
        return this
    }

    function create(initModel) {
        Object.assign(model, initModel);
        const action = {};
        action.addAction = function (tag, getPaths, setPaths, fn) {
            if (isFunction(setPaths)) {
                fn = setPaths;
                setPaths = getPaths;
            }
            let getter = () => model.pathGet(getPaths)
            let setter = (val) => {
                model.pathSet(setPaths, val)
                let pathsKey = setPaths.toString()
                if (subscriber.has(pathsKey)) {
                    subscriber.get(pathsKey).forEach(sfn => sfn(getter()))
                }
            }
            action[tag] = (...op) => {
                fn(getter(), setter, ...op);
            };
        }
        action.subscribe = function (paths, fn) {
            let pathsKey = paths.toString()
            if (subscriber.has(pathsKey)) {
                subscriber.get(pathsKey).push(fn)
            } else {
                subscriber.set(pathsKey, [fn]);
            }
        }
        return action;
    }
    function isFunction(fn) {
        return Object.prototype.toString.call(fn) === "[object Function]"
    }
    return create(initModel)
}

export default store;
