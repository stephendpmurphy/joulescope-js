var HID = require('node-hid');
var devices = HID.devices();

console.log(devices);
// var device = new HID.HID(0x16D0, 0x0E88);
// console.log(device);