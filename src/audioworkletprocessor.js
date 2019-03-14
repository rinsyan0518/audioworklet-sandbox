import constants from './constants';

class SandboxProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{
      name: 'gain',
      defaultValue: 1,
      automationRate: 'k-rate'
    }];
  }

  constructor() {
    super();
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const gain = parameters.gain[0];
    for (let ch = 0; ch < input.length; ch++) {
      const inputChannel = input[ch];
      const outputChannel = output[ch];
      for (let i = 0; i < inputChannel.length; i++) {
        outputChannel[i] = inputChannel[i] * gain;
      }
    }

    return true;
  }
}

registerProcessor(constants.ProcessorName, SandboxProcessor);