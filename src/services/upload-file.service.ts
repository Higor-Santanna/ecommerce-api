import fs from "fs";
import { getDownloadURL, getStorage } from "firebase-admin/storage"

export class UploadFileService {

    constructor(private path : string = ""){} //O path tem a função de definir o caminho diretório dos nossos arquivos dentro do Cloud Storage

    async upload(base64: string): Promise<string>{
        const fileBuffer = Buffer.from(base64, "base64"); //transformar a imagem que está na base64 em um buffer.
        const fileName = "image.png";
        fs.writeFileSync(fileName, fileBuffer);//Armazenar a imagem no disco

        const bucket = getStorage().bucket("e-commerce-curso-434a3.firebasestorage.app");//dá a referência do nosso banco de dados e onde deve ser armazenado a imagem.
        const uploadResponse = await bucket.upload(fileName, {
            destination: this.path + fileName
        });

        return getDownloadURL(uploadResponse[0]); //retorna a URL da imagem
    };
};