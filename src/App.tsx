import type { Component } from 'solid-js';

const App: Component = () => {
  return (

    <div class="flex h-screen justify-center items-center">
      <div
        class="flex flex-col w-full p-4 max-w-xl"
      >
        <div class="alert alert-info shadow-lg">
          <div>
            <span>Screen on</span>
          </div>
        </div>

        <p class="text-6xl">x m</p>
        <p class="text-4xl">x s</p>

        <div>
          <progress
            class="progress progress-primary w-full"
            value="10"
            max="100"
          >
          </progress>
        </div>

        <div class="form-control w-full py-4">
          <label class="label">
            <span>Screen on minutes: </span>
          </label>
          <input type="number" class="input input-bordered w-full" />
          <label class="label">
            <span>Screen on minutes: </span>
          </label>
          <input type="number" class="input input-bordered w-full" />
        </div>


        <div
          class="btn-group justify-center"
        >
          <button
            class="btn btn-primary"
          >Start</button>
          <button
            class="btn btn-secondary"
          >Stop</button>
          <button
            class="btn"
          >Switch</button>
        </div>

        <div
          class="form-control w-full"
        >
          <label class="label cursor-pointer">
            <span class="label-text">Fullscreen</span>
            <input type="checkbox" class="toggle toggle-primary" checked />
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
