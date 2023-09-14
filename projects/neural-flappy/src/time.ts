class Time {
  public static deltaTime = 0;
  public static lastTime = Date.now();

  public static calculateDeltaTime() {
    const currentTime = Date.now();
    Time.deltaTime = (currentTime - Time.lastTime) / 1000;
    Time.lastTime = currentTime;
  }
}

export default Time;