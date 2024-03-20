import { readFileSync } from 'fs'
import axios from 'axios'

const token = process.env.WHATSAPP_TOKEN as string
const url = process.env.URL_WHATSAPP as string

export class WhatsAppController {

    async sendMessage(number: string, message: string): Promise<void> {
        
        const data = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: number,
            type: 'text',
            text: {
                body: message
            }
        }

        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Erro na requisição');
            }
            return response.json();
          })
          .then(body => {
            console.log('Resposta:', body);
          })
          .catch(error => {
            console.error('Erro:', error);
          });
    }

    async sendMenu(number: string, options: Array<Object>): Promise<void> {

      const data = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: number,
        type: 'interactive',
        interactive: {
          type: 'list',
          body: {
            text: 'Escolha uma opção:'
          },
          action: {
            button: 'Escolha uma opção',
            sections: [
              {
                title: 'Opções',
                rows: []
              }
            ]
          }
        }
      }

      this.fillRows(data, options)

      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(body => {
        console.log('Resposta:', body);
      })
      .catch(error => {
        console.error('Erro:', error);
      });

    }

    async sendFile(number: string, media_id: string): Promise<void> {
      const data = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: number,
        type: 'document',
        document: {
          id: media_id,
          filename: 'filename.pdf',
        }
      }

      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      })
      .then(response => {
        // if (!response.ok) {
        //   throw new Error('Erro na requisição');
        // }
        return response.json();
      })
      .then(body => {
        console.log('Resposta:', body);
      })
      .catch(error => {
        console.error('Erro:', error);
      });

    }

    async uploadPdfFile(filePath: string): Promise<any> {
      const fileContent = readFileSync(filePath);
      
      // Convert Buffer to Blob
      const blob = new Blob([fileContent], { type: 'application/pdf' });
      
      let data = new FormData();
      data.append('file', blob, 'filename.pdf');
      data.append('type', 'application/pdf');
      data.append('messaging_product', 'whatsapp');

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://graph.facebook.com/v19.0/227529953769198/media',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data'
        },
        data : data
      };

      try {
        const response = await axios.request(config);
        const responseData = response.data;
        const media_id = responseData.id;
        return media_id;
      } catch (error) {
        console.error("Erro na solicitação:", error);
        throw error; 
      }

    }

    fillRows(data: any, options: Array<any>) {
      data.interactive.action.sections[0].rows = options.map((option) => {
        return {
          id: option.id,
          title: option.title
        }
      })
    }

}