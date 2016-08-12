'use strict';

const Wit = require('node-wit').Wit;
const interactive = require('node-wit').interactive;

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/basic.js <wit-access-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

const actions = {
  getGrade(request) {
    const {sessionId, context, entities} = request;
    const { intent } = entities;
    
    const className = entities.className && entities.className[0].value

    // check for facebook connection

    // check for school

    // check for class in context
    if (!className) {
      // API calls
      return Promise.resolve({missing_class: true})
    } else {
      // API calls
      return Promise.resolve({ class: className, grade: "F+" })  
    }
    
  },

  getNextStep(request) {
    return Promise.resolve({ next_step_name: "To-Do: Finish everything", next_step_due: "Yesterday" })
  },

  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('user said...', request.text);
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
};

const client = new Wit({accessToken, actions});
interactive(client);