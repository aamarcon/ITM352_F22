const message = () => {
    console.log("This is a anonimous function");
}


const sayHelloThanMessage = () => {
    console.log("Hello")
    return message();
}
message();

sayHelloThanMessage();


