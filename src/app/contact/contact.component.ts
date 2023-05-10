import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() language: string;
  @ViewChild('contactForm') contactForm: ElementRef | undefined;

  $validName: Boolean = false;
  $validEmail: Boolean = false;
  $validMessage: Boolean = false;

  nameField: any | undefined;
  emailField: any | undefined;
  messageField: any | undefined;
  sendButton: any | undefined;
  eventlisteners: any | undefined;
  endpoint: string =
    'https://www.heinemann.berlin/send_mail_portfolio/send_mail.php';

  constructor() {}

  ngOnInit(): void {
    /** define event listener and set them */
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

  /**
   * set event listeners
   * @param eventlisteners
   */
  setEventListeners(eventlisteners: any): void {
    this.setKeyListeners(eventlisteners);
    this.setClickListeners(eventlisteners);
  }

  /**
   * set key listeners
   * @param eventlisteners
   */
  setKeyListeners(eventlisteners: any): void {
    for (const listener of eventlisteners) {
      listener.name.addEventListener('keyup', () => {
        if (listener.name.value.length > 1) {
          if (listener.name.id === 'email') {
            if (this.validateEmail(listener.name)) {
              this.setFieldAsTrue(listener);
            } else {
              this.setFieldAsFalse(listener);
            }
          } else {
            this.setFieldAsTrue(listener);
          }
        } else {
          this.setFieldAsFalse(listener);
        }
      });
    }
  }

  /**
   * set click listeners
   * @param eventlisteners
   */
  setClickListeners(eventlisteners: any): void {
    for (const listener of eventlisteners) {
      listener.name.addEventListener('click', () => {
        listener.name.parentNode
          .querySelector('.status-wrapper')
          .classList.remove('d-none');
        if (!listener.boolean) {
          listener.name.classList.add('red-frame');
          listener.name.nextSibling.classList.add('required-note');
        }
      });
    }
  }

  /**  set input field as valid */
  setFieldAsTrue(listener: any): void {
    listener.boolean = true;

    if (listener.name.id === 'name') {
      this.$validName = true;
    }
    if (listener.name.id === 'email') {
      this.$validEmail = true;
    }
    if (listener.name.id === 'message') {
      this.$validMessage = true;
    }
    listener.name.classList.add('green-frame');
    listener.name.classList.remove('red-frame');
    listener.name.nextSibling.classList.remove('required-note');
    listener.name.parentNode.querySelector('img').src =
      'assets/img/contact/check.png';
  }

  /**  set input field as invalid */
  setFieldAsFalse(listener: any): void {
    listener.boolean = false;
    if (listener.name.id === 'name') {
      this.$validName = false;
    }
    if (listener.name.id === 'email') {
      this.$validEmail = false;
    }
    if (listener.name.id === 'message') {
      this.$validMessage = false;
    }
    listener.name.parentNode.querySelector('img').src =
      'assets/img/contact/exclamation_mark.png';
    listener.name.classList.remove('green-frame');
    listener.name.classList.add('red-frame');
    listener.name.nextSibling.classList.add('required-note');
  }

  /**
   * validate email
   * @param email
   * @returns {boolean}
   */
  validateEmail(email: any): boolean {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * send mail
   */
  async sendMail() {
    let nameC = this.contactForm?.nativeElement.name;
    let emailC = this.contactForm?.nativeElement.email;
    let messageC = this.contactForm?.nativeElement.message;
    let sendButtonC = this.contactForm?.nativeElement[3];

    if (this.$validName && this.$validEmail && this.$validMessage) {
      this.disableContactFields(nameC, emailC, messageC, sendButtonC);
      let formData = new FormData();
      formData.append('name', nameC.value);
      formData.append('email', emailC.value);
      formData.append('message', messageC.value);
      await fetch(this.endpoint, {
        method: 'POST',
        body: formData,
      });
      document.querySelector('.send-message').classList.add('required-note');
      this.clearInputFields(nameC, emailC, messageC);
      this.enableContactFields(nameC, emailC, messageC, sendButtonC);
    }
  }

  clearInputFields(
    nameC: { value: string },
    emailC: { value: string },
    messageC: { value: string }
  ) {
    nameC.value = '';
    emailC.value = '';
    messageC.value = '';
  }

  /**
   * disable contact fields
   * @param nameC
   * @param emailC
   * @param messageC
   */
  disableContactFields(
    nameContact: { disabled: boolean },
    emailContact: { disabled: boolean },
    messageContact: { disabled: boolean },
    sendButtonContact: { disabled: boolean }
  ): void {
    nameContact.disabled = true;
    emailContact.disabled = true;
    messageContact.disabled = true;
    sendButtonContact.disabled = true;
  }

  /**
   * enable contact fields
   * @param nameC
   * @param emailC
   * @param messageC
   */
  enableContactFields(
    nameContact: { disabled: boolean },
    emailContact: { disabled: boolean },
    messageContact: { disabled: boolean },
    sendButtonContact: { disabled: boolean }
  ): void {
    nameContact.disabled = false;
    emailContact.disabled = false;
    messageContact.disabled = false;
    sendButtonContact.disabled = false;
  }
}
