import Leap = require("leapjs");

export const init = () => {
    const controller = new Leap.Controller();
    controller.connect();
    controller.on("blur", (event: any) => {
        console.log("blur", event);
    });
    controller.on("connect", (event: any) => {
        console.log("connect", event);
    });
    controller.on("deviceConnected", (event: any) => {
        console.log("deviceConnected", event);
    });
    controller.on("deviceDisconnected", (event: any) => {
        console.log("deviceDisconnected", event);
    });
    controller.on("disconnect", (event: any) => {
        console.log("disconnect", event);
    });
    controller.on("focus", (event: any) => {
        console.log("focus", event);
    });
    controller.on("frame", (event: any) => {
        // console.log("frame", event);
    });
    controller.on("deviceRemoved", (event: any) => {
        console.log("deviceRemoved", event);
    });

    controller.on("deviceStopped", (event: any) => {
        console.log("deviceStopped", event);
    });

};
