import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @ViewChild('contactForm') contactForm: ElementRef | undefined;
  // @ViewChild('name') name: ElementRef | undefined;
  // @ViewChild('email') email: ElementRef | undefined;
  // @ViewChild('message') message: ElementRef | undefined;
  // @ViewChild('contactButton') contactButton: ElementRef | undefined;

  $validName: Boolean = false;
  $validEmail: Boolean = false;
  $validMessage: Boolean = false;

  nameField: any | undefined;
  emailField: any | undefined;
  messageField: any | undefined;
  sendButton: any | undefined;
  eventlisteners: any | undefined;
  endpoint: string =
    'https://stefan-heinemann.developerakademie.net/send_mail/send_mail.php';

  constructor() {}

  ngOnInit(): void {
    this.eventlisteners = [
      {
        name: (this.nameField = document.getElementById('name')),
        boolean: this.$validName,
      },
      {
        name: (this.emailField = document.getElementById('email')),
        boolean: this.$validEmail,
      },
      {
        name: (this.messageField = document.getElementById('message')),
        boolean: this.$validMessage,
      },
    ];

    this.setEventListeners(this.eventlisteners);
  }

  setEventListeners(eventlisteners: any): void {
    for (const listener of eventlisteners) {
      listener.name.addEventListener('keyup', () => {
        if (listener.name.value.length > 1) {
          if (listener.name.id === 'email') {
            console.log('emailField');
            if (this.validateEmail(listener.name)) {
              listener.boolean = true;
              listener.name.style = 'border-color: var(--green);';
              listener.name.nextSibling.classList.remove('required-note');
            }
          } else {
            listener.boolean = true;
            listener.name.style = 'border-color: var(--green);';
            listener.name.nextSibling.classList.remove('required-note');
          }
        } else {
          listener.boolean = false;
          listener.name.style = 'border-color: var(--text-red);';
          listener.name.nextSibling.classList.add('required-note');
        }
      });
      listener.name.addEventListener('click', () => {
        if (!listener.boolean) {
          listener.name.style = 'border-color: var(--text-red);';
          listener.name.nextSibling.classList.add('required-note');
        }
      });
      listener.name.addEventListener('change', () => {
        console.log('change event');

        if (listener.boolean) {
          listener.name.style = 'border-color: var(--green);';
          listener.name.nextSibling.classList.remove('required-note');
        }
      });
    }
  }

  validateEmail(email: any) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  sendMail() {
    let name = this.eventlisteners[0].boolean;
    let email = this.eventlisteners[1].boolean;
    let message = this.eventlisteners[2].boolean;

    if (name && email && message) {
      let nameContact = this.contactForm?.nativeElement.name;
      let emailContact = this.contactForm?.nativeElement.email;
      let messageContact = this.contactForm?.nativeElement.message;
      let sendButtonContact = this.contactForm?.nativeElement[3];

      console.log(sendButtonContact);
      // console.log(this.contactForm.nativeElement.button);
      console.log(this.contactForm);

      console.log(nameContact.value);
      console.log(emailContact.value);
      console.log(messageContact.value);

      nameContact.disabled = true;
      emailContact.disabled = true;
      messageContact.disabled = true;
      sendButtonContact.disabled = true;
    } else {
      console.log('input form not valid');
    }
  }
}
