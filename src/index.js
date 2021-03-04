// joulescope VID = 16D0   PID = 0x0E88

// var HID = require('node-hid');
// var devices = HID.devices();

var usb = require('usb');
usb.setDebugLevel(4);
var joulescope = usb.findByIds(0x16D0, 0x0E88);

// Open a connection to the device
joulescope.open();

joulescope.timeout = 1000;

// Claim the interface for this device
var intf = joulescope.interface(0);
intf.claim();

intf.endpoints[0].startPoll(1, 64);
intf.endpoints[0].transfer(64, (err, data) => {
    if (!error) {
        console.log(data);
    } else {
        console.log(error);
    }
});
intf.endpoints[0].on('data', (dataBuf) => {
    let dataArr = Array.prototype.slice.call(new Uint8Array(dataBuf, 0, 64)); // convert buffer to array
    console.log( `Data array: ${dataArr}` );
})
intf.endpoints[0].on('error', (err) => {
    console.log(`An error occured: ${err}`);
});
intf.endpoints[0].on('end', () => {
    console.log("Stream ended.");
});

let req = new Uint8Array(8);

// Req type - 1100 0000
req[0] = 0xC0; // Req type
req[1] = 0x04; // Joulescope request
req[2] = 0x00; // Value[0]
req[3] = 0x00; // Value[1]
req[4] = 0x00; // Index[0]
req[5] = 0x00; // Index[1]
req[6] = 0x00; // Length[0]
req[7] = 0x00; // Length[1]

joulescope.controlTransfer(0xC0, 0x04, 0x00, 0x00, 0, (err, data) => {
    if( !err ) {
        console.log(data);
    }
    else {
        console.log(err);
    }
});