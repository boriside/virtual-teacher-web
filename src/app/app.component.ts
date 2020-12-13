import { Component } from "@angular/core";
import { WebsocketService } from "./websocket.service";
import { ChatService } from "./chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [WebsocketService, ChatService]
})
export class AppComponent {
  msg: any = {};
  animate = true;
  color = 'white';
  show_number = true;
  show_shape = true;
  shape = 'rechteck';
  question = true;
  show_success_msg = false;

  colorArray = ['#0000CD', '#003F87', '#006400', '#007FFF', '#008B00', 
                '#008B45', '#00BFFF', '#551033', '#551A8B', '#8470FF',
                '#8E236B', '#9D1309', '#AA5303', '#B03060', '#B81324',
                '#C71585', '#C82536', '#CC1100', '#CD0000', '#CD3700'];

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + JSON.stringify(msg));
      this.msg = msg;
      msg.type == 'algebra'

      this.color = this.colorArray[this.getRandomInt(0, 20)];
      // this.show_success_msg = true;
      // this.question = false;
      if (msg.success) {
        this.show_success_msg = true;
        this.question = false
        setTimeout(() => {
          this.show_success_msg = false;
          this.question = true
          this.showQuestion(msg)
        }, 1500);
      }else{

        this.showQuestion(msg)
      }

      
    });
    chatService.messages.next({ "device_id": "new_id1234" });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showQuestion(msg) {
    if (msg.type == 'algebra') {
      this.msg = msg
      this.show_number = true;
      this.show_shape = false;

    } else {
      console.log("Shape")
      this.show_number = false;
      this.show_shape = true;
      this.shape = msg.shape
    }
  }
}