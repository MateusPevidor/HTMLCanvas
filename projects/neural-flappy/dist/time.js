class Time {
    static calculateDeltaTime() {
        const currentTime = Date.now();
        Time.deltaTime = (currentTime - Time.lastTime) / 1000;
        Time.lastTime = currentTime;
    }
}
Time.deltaTime = 0;
Time.lastTime = Date.now();
export default Time;
//# sourceMappingURL=time.js.map