export default function NotificationContoller(io) {
       
    io.on("connection", (socket) => {
      
        socket.on("sendData",(data)=>{
            console.log(data);
        })
       
    })
    return {
        myFunction(req, res) {
            
        io.on("connection", (socket) => {
            console.log("a user is commcted");
        }) 
      }
      
    };
  }
   