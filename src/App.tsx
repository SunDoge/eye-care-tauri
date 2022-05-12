import { Component, createEffect, createSignal, Match, Switch } from 'solid-js';
import { appWindow } from "@tauri-apps/api/window"




enum Status {
  ScreenOn,
  ScreenOff,
}

const App: Component = () => {


  const [fullscreen, setFullscreen] = createSignal(false);
  // const [minutes, setMinutes] = createSignal(1);
  // const [seconds, setSeconds] = createSignal(0);
  const [status, setStatus] = createSignal(Status.ScreenOn);

  const [screenOnMinutes, setScreenOnMinutes] = createSignal(25);
  const [screenOffMinutes, setScreenOffMinutes] = createSignal(5);
  const [totalSeconds, setTotalSeconds] = createSignal(screenOnMinutes() * 60);
  const [remainingSeconds, setRemainingSeconds] = createSignal(totalSeconds());
  const [running, setRunning] = createSignal(false);
  const [timer, setTimer] = createSignal(0);


  // const minutes = () => {
  //   switch(status()) {
  //     case Status.ScreenOn: {
  //       return Math.floor()
  //     }
  //   } 
  // }

  const minutes = () => {
    return Math.floor(remainingSeconds() / 60);
  }

  const seconds = () => {
    return Math.round(remainingSeconds() % 60);
  }

  const ratio = () => {
    return (1. - remainingSeconds() / totalSeconds());
  }

  createEffect(async () => {
    await appWindow.setFullscreen(fullscreen());
    await appWindow.setFocus()
  })


  function switchStatus() {
    switch (status()) {
      case Status.ScreenOn: {
        setStatus(Status.ScreenOff);
        break;
      }
      case Status.ScreenOff: {
        setStatus(Status.ScreenOn);
        break;
      }
    }
    updateTotalSeconds();
  }

  function updateTotalSeconds() {
    switch (status()) {
      case Status.ScreenOn: {
        setTotalSeconds(screenOnMinutes() * 60);
        break;
      }
      case Status.ScreenOff: {
        setTotalSeconds(screenOffMinutes() * 60);
        break;
      }
    }
    if (!running()) {
      setRemainingSeconds(totalSeconds());
    }
  }

  function countDown() {
    const startTime = Date.now();
    setRemainingSeconds(totalSeconds());

    setTimer(setInterval(async () => {
      const currentTime = Date.now();
      const delta = currentTime - startTime;

      setRemainingSeconds(totalSeconds() - delta / 1000);

      if (remainingSeconds() <= 0) {
        setRemainingSeconds(0);
        clearInterval(timer());

        switch (status()) {
          case Status.ScreenOn: {
            setFullscreen(true);
            break;
          }
          case Status.ScreenOff: {
            setFullscreen(false);
            break
          }
        }
      }
    }, 1000))

  }

  return (

    <div class="flex h-screen justify-center items-center">
      <div
        class="flex flex-col w-full p-4 max-w-xl"
      >
        <Switch>
          <Match when={status() === Status.ScreenOn}>
            <div class="alert alert-info shadow-lg">
              <div>
                <span>Screen on</span>
              </div>
            </div>
          </Match>
          <Match when={status() === Status.ScreenOff}>
            <div class="alert alert-error shadow-lg">
              <div>
                <span>Screen off</span>
              </div>
            </div>
          </Match>
        </Switch>

        <p class="text-6xl">{minutes()} m</p>
        <p class="text-4xl">{seconds()} s</p>

        <div>
          <progress
            class="progress progress-primary w-full"
            value={ratio()}
            max="1"
          >
          </progress>
        </div>

        <div class="form-control w-full py-2">
          <label class="label">
            <span>Screen on minutes: </span>
          </label>
          <input
            type="number" class="input input-bordered w-full"
            value={screenOnMinutes()}
            min="0"
            onInput={(e) => {
              setScreenOnMinutes(parseInt(e.currentTarget.value));
              updateTotalSeconds()
            }}
          />
          <label class="label">
            <span>Screen off minutes: </span>
          </label>
          <input
            type="number" class="input input-bordered w-full"
            value={screenOffMinutes()}
            min="0"
            onInput={(e) => {
              setScreenOffMinutes(parseInt(e.currentTarget.value));
              updateTotalSeconds()
            }}
          />
        </div>


        <div class="flex justify-center py-2">
          <div
            class="btn-group w-96"
          >
            <button
              class="btn btn-primary flex-1"
              onClick={(e) => countDown()}
            >Start</button>
            <button
              class="btn btn-secondary flex-1"
              onClick={(e) => {
                clearInterval(timer());
                setRemainingSeconds(0);
              }}
            >Stop</button>
            <button
              class="btn flex-1" onClick={(e) => switchStatus()}
            >Switch</button>
          </div>
        </div>

        <div
          class="form-control w-full"
        >
          <label class="label cursor-pointer">
            <span class="label-text text-lg">Fullscreen</span>
            <input
              type="checkbox" class="toggle toggle-primary" checked={fullscreen()}
              onChange={(e) => setFullscreen(e.currentTarget.checked)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
