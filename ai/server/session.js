'use strict';

let sessions = {}

const get = (key)=> { return sessions[key] }
const set = (key, value)=> { sessions[key] = value }

module.exports = {get:get, set: set, data: sessions}
