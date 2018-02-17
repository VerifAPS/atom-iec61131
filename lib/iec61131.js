'use babel';

import Iec61131View from './iec61131-view';
import { CompositeDisposable } from 'atom';

let helpers;

export default {

  iec61131View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.iec61131View = new Iec61131View(state.iec61131ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.iec61131View.getElement(),
      visible: false
    });

    helpers = require('atom-linter')

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'iec61131:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.iec61131View.destroy();
  },

  serialize() {
    return {
      iec61131ViewState: this.iec61131View.serialize()
    };
  },

  toggle() {
    console.log('Iec61131 was toggled!');
  }

  provideLinter() {
    return {
      name: 'IEC61131',
      scope: 'file', // or 'project'
      lintsOnChange: true, // or true
      grammarScopes: ['source.iec61131'],
      lint : async (textEditor) => {
        const filePath = textEditor.getPath()
        if(!filePath) {
          return [];
        }
        const results = await helpers.exec(execPath, parameters, execOpts);
        //https://github.com/AtomLinter/linter-pycodestyle/blob/master/lib/index.js#L121
        return []
      }
    }
  }
};
