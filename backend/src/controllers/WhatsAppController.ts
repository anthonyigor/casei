
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


}