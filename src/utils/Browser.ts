export default class Browser {
    public static type(browser: string) {
        let browserType;
        if (browser.toLowerCase() === 'firefox') {
            browserType = 'firefox';
        } else if (browser.toLowerCase() === 'webkit') {
            browserType = 'webkit';
        } else {
            browserType = 'chromium';
        }
        return browserType;
    }
}