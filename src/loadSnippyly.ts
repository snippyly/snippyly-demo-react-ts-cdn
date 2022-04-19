const loadSnippyly = (callback: Function) => {
    const existingScript = document.getElementById('snippylyScript');
    const existingStylesheet = document.getElementById('snippylyStylesheet');
    if (!existingStylesheet) {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');
        link.id = 'snippylyStylesheet';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://cdn.jsdelivr.net/npm/@snippyly/sdk@1.0.27/snippyly.css';
        link.media = 'all';
        head.appendChild(link);
    }
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@snippyly/sdk@1.0.27/snippyly.js';
        script.id = 'snippylyScript';
        script.type = 'module';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) {
                callback();
            }
        };
    } else {
        if (callback) {
            callback();
        }
    }
};
export default loadSnippyly;