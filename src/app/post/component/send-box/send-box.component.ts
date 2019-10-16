import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/entity';

@Component({
    selector: 'app-send-box',
    templateUrl: './send-box.component.html',
    styleUrls: ['./send-box.component.css']
})
export class SendBoxComponent implements OnInit {

    private content = '';
    private isSending = false;
    private placeHolder = '有什么新鲜事?';

    @Input() user: User;
    constructor() {
    }

    ngOnInit() {
    }

    handleSubmit() {
        console.log(this.content);
    }
}