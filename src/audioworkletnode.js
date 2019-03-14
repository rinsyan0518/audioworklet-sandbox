import 'audioworklet-polyfill';
import constants from "./constants";

export class SandboxNode extends AudioWorkletNode {
  constructor(context, options) {
    super(context, constants.ProcessorName, {
      parameterData: options,
    });
    this._gain = this.parameters.get('gain');

    this.port.onmessage = this._onMessage.bind(this);
    this.onprocessorerror = this._onProcessorError.bind(this);
  }

  get gain() {
    return this._gain;
  }

  _onMessage(ev) {
    console.log(ev);
  }

  _onProcessorError(ev) {
    console.error(ev);
  }
}
