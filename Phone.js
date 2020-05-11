const operator = new Operator();
function Phone(model, osType, size, pNumber) {

  this.model = model;
 this.osType = osType;
 this.size = size;
 this.phoneNumber = pNumber;

 this.callTo = number => {
  this.callDate = new Date();
   operator.callFromTo(this.phoneNumber, number, result => {
     if (!result) {
       console.log('Call is failing.');
     }     
   });
 };
 this.onCall = caller => {
   console.log(`Call from ${caller}`);
   this.callDate = new Date();
 };
//  this.print = function () {
//    console.log(`Model: ${this.model}`);
//    console.log(`OS: ${this.osType}`);
//    console.log(`Size: ${JSON.stringify(this.size)}`);
//  };
 operator.addAbonent(this, this.phoneNumber);
 this.sendMessage = (number, message) => {
   operator.sendMessage(this.phoneNumber, number, message);
   this.messageDate = new Date();
 };
 this.onReceiveMessage = (sender, message) => {
  this.messageDate = new Date();
   console.log(`From: ${sender} \nMessage: ${message}`);
 };
 this.getCallInformationsFor = function (number) {
   operator.getCallInformations(number)
 }
 this.getMessageInformationsFor = function(number) {
   operator.getMessageInformations(number)
 }
}

function Operator() {
 let abonents = {};
 let calls = [];
 let messages = [];

 this.addAbonent = (phone, number) => {
   abonents[number] = phone;
 };
 this.callFromTo = (caller, receiver, callback) => {
   const receiverPhone = abonents[receiver];
   if (receiverPhone) {
     receiverPhone.onCall(caller);
     calls.push({callDate: receiverPhone.callDate, caller: caller, receiver: receiver})
     callback(true);
   } else {
     callback(false);
   }
 };

 this.getCallInformations = function (number) {
    console.log(calls.filter(call => call.receiver == number || call.caller == number))
 }

 this.sendMessage = function (sender, receiver, message) {
   const receivePhone = abonents[receiver];
   if (receivePhone) {
     receivePhone.onReceiveMessage(sender, message);
    messages.push({messageDate: receivePhone.messageDate, sender: sender, receiver: receiver, message: message})
   }
 };

 this.getMessageInformations = function(number) {
   console.log(messages.filter(message => message.receiver == number || message.sender == number))
 }
}

function Size(h = 1440, w = 720) {
 this.height = h;
 this.width = w;
}
const phone = new Phone('Samsung', 'Android', new Size(2560, 1440), '666666');
const iPhone = new Phone('iPhone', 'iOS', new Size(), '777777');
phone.callTo('777777');
iPhone.callTo('666666');
phone.callTo('667666');
phone.sendMessage('777777', 'Hello 777777');
iPhone.sendMessage('666666', 'Hello 666666');
phone.getCallInformationsFor('777777')
phone.getCallInformationsFor('666666')
phone.getMessageInformationsFor('777777')
iPhone.getMessageInformationsFor('666666')
