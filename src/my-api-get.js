import {PolymerElement, html} from '@polymer/polymer';

    import '@polymer/iron-ajax/iron-ajax.js';
    import '@polymer/iron-list/iron-list.js';
    import '@polymer/iron-image/iron-image.js';
    import '@polymer/paper-button/paper-button.js';

class SampleElement extends PolymerElement {
            static get properties() { return { 
                  response: { type: Object },
                  _isRequest:{
                    type:Boolean, 
                    value:true
                  }

             }
            }
             static get template() {
                 return html`
                 <style>
                 :host {
                   display:block;
                   margin-top: 5px;
                 }
                 </style>
     

            <paper-button raised disabled="[[!_isRequest]]"  on-tap="_ajax_call">AJAX CALL</paper-button>
               <iron-ajax 
                 id="request"
                 url="https://api.github.com/repos/darrenwalkinshaw/HelloWorld/pulls"
                 last-response="{{response}}"
                  on-response="handleResponse"
              > </iron-ajax>
                 
                 <iron-list items="[[response]]" as="item" id="itemlist" scroll-target="document" selected-item="{{selectedItem}}" selection-enabled grid>
                 <template>
                       <div class = "flexchild" style="width:50%"> 
                        <iron-image   style ="width: 40px;height:40px; border-radius:30px;" src='[[item.state]]'></iron-image> 
                        <span>[[item.url]] [[item.title]]</span>  </div><br/>
                  </template>
                  </iron-list>
                  
                 
                  `;
            
             }
static get observers(){ return ['_checkLastResponse(response)'] }

_checkLastResponse(r) {
        // we have received a response from iron-ajax so allow for next call
        if (r) {
                 this._isRequest = true;
        }
}

// As you provided above code, you call ajax manually. 
_ajax_call() {
      if (this._isRequest) {

       this._isRequest = false; 
       setTimeout(()=> {
               this.$.request.generateRequest();
               
       },4000)}   
}   

     handleResponse(r) {
       console.log(r)
     }
  }
 customElements.define('sample-element', SampleElement);


class MyElement extends PolymerElement {

  static get properties() { return { 
    mood: String,
    is_even: {
      type:Boolean,
      value:true
    }
    }
  }

  static get template() {
    return html`
      <style> 

      .mood { 
        font-style: italic; 
      } 

      .cfalse {
        background-color: green;
      }

      .ctrue {
        background-color: red;
      }
      </style>

      Web Components are <span class$="mood c[[is_even]]">[[mood]] and [[is_even]]</span>!
    `;
  }
}

customElements.define('my-element', MyElement);
  